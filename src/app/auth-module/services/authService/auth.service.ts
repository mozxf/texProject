import { EmployeesService } from './../../../dashboard/services/emloyees/employees.service';
import { TasksService } from './../../../dashboard/services/tasks/tasks.service';
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
  getDoc,
  getDocs,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { Storage } from '@angular/fire/storage';
import {
  concat,
  firstValueFrom,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ITeam } from 'src/app/models/team';

@Injectable()
export class AuthService {
  constructor(
    private fs: Firestore,
    private fireAuth: AngularFireAuth,
    private storage: Storage,
    private tasksService: TasksService,
    private employeesService: EmployeesService
  ) {}

  async login(email: string, password: string) {
    return await this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err));
  }

  async createUser(user: IUserInfo, profilePicFile: File) {
    const { email, password } = user;
    await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password as string
    );
    await this.uploadPhoto(profilePicFile);
    await this.createUserDoc(user);
  }

  async createUserDoc(user: IUserInfo) {
    const userAuth = await firstValueFrom(this.fireAuth.user);
    const userUid = userAuth?.uid as string;
    const employeesRef = collection(this.fs, 'employees');
    const teamId = await this.employeesService.getTeamId(user.team);

    const userRef = doc(employeesRef, userUid);

    const personalInfoRef = collection(userRef, 'personalInfo');
    this.createUserPersonalInfo(user.cpf, user.salary, personalInfoRef);

    this.tasksService.createUserTasks(userRef, {
      description: 'create new tasks',
      deadline: new Date('10/02/2023'),
      priority: 'high',
    });

    const userpublicInfo = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      position: user.position,
      team: user.team,
      teamId,
    };
    const userDoc = await setDoc(userRef, userpublicInfo);

    return userDoc;
  }

  async uploadPhoto(photo: File) {
    const userUid = (await firstValueFrom(this.fireAuth.user))?.uid;
    const storageRef = ref(this.storage, `userPics/${userUid}`);
    await uploadBytes(storageRef, photo);
  }

  async createUserPersonalInfo(
    cpf: string,
    salary: number,
    personalInfoRef: CollectionReference
  ) {
    const uid = (await firstValueFrom(this.fireAuth.user))?.uid;
    const personalInfoDoc = doc(personalInfoRef, uid);
    return setDoc(personalInfoDoc, { cpf, salary });
  }
}
