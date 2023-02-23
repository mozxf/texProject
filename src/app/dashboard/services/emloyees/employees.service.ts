import { ITeam } from 'src/app/models/team';
import {
  IUserInfo,
  IUserPublicInfo,
  TUserPrivateInfo,
} from './../../../models/user-info';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Storage } from '@angular/fire/storage';
import { TasksService } from './../tasks/tasks.service';
import {
  collection,
  collectionData,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { getDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private userRef: BehaviorSubject<DocumentReference> =
    new BehaviorSubject<DocumentReference>(
      doc(collection(this.fs, 'employees'))
    );
  private userFullInfo: BehaviorSubject<IUserInfo> =
    new BehaviorSubject<IUserInfo>(undefined!);

  private userPublicInfo: BehaviorSubject<IUserPublicInfo> =
    new BehaviorSubject<IUserPublicInfo>(undefined!);

  private userUid: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private fs: Firestore,
    private tasksService: TasksService,
    private fireAuth: AngularFireAuth,
    private storage: Storage
  ) {
    this.fireAuth.user.subscribe((user) => {
      this.userUid.next(user?.uid as string);
      const employeesRef = collection(this.fs, 'employees');
      const userRef = doc(employeesRef, user?.uid as string);
      this.userRef.next(userRef);
      this.setUserFullinfo(userRef);
      this.setUserPublicInfo(userRef);
    });
  }

  getUserRef() {
    return this.userRef.asObservable();
  }
  getUserUid() {
    return this.userUid.asObservable();
  }
  getUserFullInfo() {
    return this.userFullInfo.asObservable();
  }

  getUserPublicInfo() {
    return this.userPublicInfo.asObservable();
  }

  private setUserFullinfo(userRef: DocumentReference<DocumentData>) {
    const personalInfoRef = collection(userRef, 'personalInfo');

    Promise.all([
      collectionData(personalInfoRef),
      getDownloadURL(ref(this.storage, `userPics/${userRef.id}`)),
      getDoc(userRef),
    ]).then((response) => {
      const userPrivateInfo$ = response[0];
      const profilePicUrl = response[1];
      const user = response[2].data();

      userPrivateInfo$.subscribe((userInfo) => {
        const userPrivateInfo: IUserInfo = {
          ...(user as IUserPublicInfo),
          ...(userInfo[0] as TUserPrivateInfo),
          profilePic: profilePicUrl,
        };
        this.userFullInfo.next(userPrivateInfo);
      });
    });
  }

  private async setUserPublicInfo(userRef: DocumentReference<DocumentData>) {
    const userUid = await firstValueFrom(this.getUserUid());
    const user = (await getDoc(userRef)).data() as IUserPublicInfo;
    const profilePicurl = await getDownloadURL(
      ref(this.storage, `userPics/${userUid}`)
    );
    const userPublicInfo: IUserPublicInfo = {
      ...user,
      profilePic: profilePicurl,
    };

    this.userPublicInfo.next(userPublicInfo);
  }

  async updateUserPublicInfo(changedFields: string[], form: any) {
    const userRef = await firstValueFrom(this.getUserRef());
    const modifiedUser: any = {};
    for (let field of changedFields) {
      if (field === 'team') {
        modifiedUser[field] = form.value[field];
        modifiedUser['teamId'] = await this.getTeamId(form.value['team']);
      } else if (field === 'email') {
        (await firstValueFrom(this.fireAuth.user))
          ?.updateEmail(form.value['email'])
          .then(() => {
            modifiedUser[field] = form.value[field];
          })
          .catch((err) => {
            alert(err);
          });
      } else if (field === 'profilePic') {
        await this.updateUserProfilePic(form.value.profilePic);
      } else {
        modifiedUser[field] = form.value[field];
      }
    }

    await updateDoc(userRef, { ...modifiedUser });
    this.setUserFullinfo(userRef);
    this.setUserPublicInfo(userRef);
  }

  async updateUserPersonalInfo(updatedInfo: any) {
    const uid = await firstValueFrom(this.getUserUid());
    const userRef = await firstValueFrom(this.getUserRef());
    const personalInfoRef = collection(userRef, 'personalInfo');
    const personalInfoDoc = doc(personalInfoRef, uid);

    updateDoc(personalInfoDoc, updatedInfo);
  }

  async updateUserProfilePic(profilePicFile: File) {
    const uid = await firstValueFrom(this.getUserUid());
    const profilePicRef = ref(this.storage, `userPics/${uid}`);
    await uploadBytes(profilePicRef, profilePicFile);
  }

  getTeams() {
    const teamsRef = collection(this.fs, 'teams');
    return collectionData(teamsRef) as Observable<ITeam[]>;
  }

  async getTeamId(team: string) {
    const teamRef = collection(this.fs, 'teams');
    const teamQuery = query(teamRef, where('name', '==', team));
    const teamId = (await getDocs(teamQuery)).docs[0].id;
    return teamId;
  }

  getMyTeam(team: string) {
    const myTeam: IUserPublicInfo[] = [];
    const employeesRef = collection(this.fs, 'employees');
    const myTeamRef = query(employeesRef, where('team', '==', team));
    getDocs(myTeamRef).then((docs) => {
      docs.forEach((doc) => {
        const teamMemberId = doc.id;
        const teamMemberInfo = doc.data() as IUserPublicInfo;
        getDownloadURL(ref(this.storage, `userPics/${teamMemberId}`)).then(
          (profilePicUrl) => {
            const teammateInfo: IUserPublicInfo = {
              ...teamMemberInfo,
              profilePic: profilePicUrl,
            };
            myTeam.push(teammateInfo);
          }
        );
      });
    });
    return myTeam;
  }

  getOtherTeams(myTeam: string) {
    const otherTeams: ITeam[] = [];
    const teamsRef = collection(this.fs, 'teams');
    const other = query(teamsRef, where('name', '!=', myTeam));
    getDocs(other).then((teams) => {
      teams.forEach((team) => {
        otherTeams.push({ ...(team.data() as ITeam), employees: [] });

        const employeesRef = collection(this.fs, 'employees');
        const teamName = team.data()['name'];
        const otherTeamsQuery = query(
          employeesRef,
          where('team', '==', teamName)
        );
        getDocs(otherTeamsQuery).then((docs) => {
          docs.forEach((doc) => {
            const memberId = doc.id;
            const memberData = doc.data() as IUserPublicInfo;
            getDownloadURL(ref(this.storage, `userPics/${memberId}`)).then(
              (profilePicUrl) => {
                const memberInfo = { ...memberData, profilePic: profilePicUrl };
                otherTeams
                  .find((team) => team.name == teamName)
                  ?.employees?.push(memberInfo);
              }
            );
          });
        });
      });
    });
    return otherTeams;
  }
}
