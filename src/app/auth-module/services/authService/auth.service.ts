import { IUserInfo, IUserPublicInfo } from '../../../models/user-info';
import { getLocaleMonthNames } from '@angular/common';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  query,
  where,
  setDoc,
  Timestamp,
  getDoc,
  getDocs,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { Storage } from '@angular/fire/storage';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class AuthService {
  user?: IUserPublicInfo;

  constructor(
    private fs: Firestore,
    private fireAuth: AngularFireAuth,
    private storage: Storage
  ) {
    this.getUserPublicInfo().then((user) => {
      this.user = user;
    });
  }

  async getUserDocReference() {
    const userUid = (await firstValueFrom(this.fireAuth.user))?.uid;
    const employeesRef = collection(this.fs, 'employees');
    const userRef = doc(employeesRef, userUid);
    return userRef;
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getTeams() {
    const teamsRef = collection(this.fs, 'teams');
    return collectionData(teamsRef) as Observable<any>;
  }

  async getTeamId(team: string) {
    const teamRef = collection(this.fs, 'teams');
    const teamQuery = query(teamRef, where('name', '==', team));
    const teamId = (await getDocs(teamQuery)).docs[0].id;
    return teamId;
  }

  async createUser(user: IUserInfo, profilePicFile: File) {
    const { email, password } = user;
    await this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await this.createUserDoc(user);
        await this.uploadPhoto(profilePicFile);
      });
  }

  async createUserDoc(user: IUserInfo) {
    const userAuth = await firstValueFrom(this.fireAuth.user);
    const userUid = userAuth?.uid as string;
    const employeesRef = collection(this.fs, 'employees');
    const teamId = await this.getTeamId(user.team);

    const userRef = doc(employeesRef, userUid);

    const personalInfoRef = collection(userRef, 'personalInfo');
    this.createUserPersonalInfo(user.cpf, user.salary, personalInfoRef);

    const tasksRef = collection(userRef, 'tasks');
    this.createUserTasks(tasksRef);

    const userpublicInfo = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      position: user.position,
      team: user.team,
      teamId,
    };

    return setDoc(userRef, userpublicInfo);
  }

  async uploadPhoto(photo: File) {
    const userUid = (await firstValueFrom(this.fireAuth.user))?.uid;
    const storageRef = ref(this.storage, `userPics/${userUid}`);
    uploadBytes(storageRef, photo);
  }

  createUserPersonalInfo(
    cpf: string,
    salary: number,
    personalInfoRef: CollectionReference
  ) {
    return addDoc(personalInfoRef, { cpf, salary });
  }

  createUserTasks(tasksReference: CollectionReference) {
    const userTask = doc(tasksReference);
    const taskId = userTask.id;

    return setDoc(userTask, {
      id: taskId,
      description: 'Create new tasks',
      deadline: Timestamp.fromDate(new Date('02-10-2023')),
      isCompleted: false,
      priority: 'high',
    });
  }

  async getUserPublicInfo() {
    const userUid = (await firstValueFrom(this.fireAuth.user))?.uid;
    const employeesRef = collection(this.fs, 'employees');
    const userRef = doc(employeesRef, userUid);
    const profilePicUrl = await getDownloadURL(
      ref(this.storage, `userPics/${userUid}`)
    );
    const userPublicInfo = (await getDoc(userRef)).data() as IUserPublicInfo;

    return {
      ...userPublicInfo,
      profilePic: profilePicUrl,
    };
    // const querySnapshot = await getDocs(queryTeams);
    // querySnapshot.forEach(async (team) => {
    //   const teamDoc = doc(this.fs, 'teams', team.id);
    //   const employeesRef = collection(teamDoc, 'employees');
    //   const userRef = doc(employeesRef, userUid);
    //   this.firebaseUserRef.next(userRef);
    //   const userDoc = await getDoc(userRef);
    //   if (userDoc.exists()) {
    //     console.log(userDoc.data());
    //     const profilePicUrl = await getDownloadURL(
    //       ref(this.storage, `userPics/${userUid}`)
    //     );
    //     const userPublicInfo = userDoc.data() as IUserPublicInfo;
    //     this.user.next({
    //       ...userPublicInfo,
    //       profilePic: profilePicUrl,
    //     });
    //   }
    // });
  }
}
