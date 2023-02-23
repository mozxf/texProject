import { ITaskDTO } from './../../../models/tasks';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITask } from 'src/app/models/tasks';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  getUserTasks(userRef: DocumentReference<DocumentData>) {
    const tasksRef = collection(userRef, 'tasks');
    return collectionData(tasksRef) as Observable<ITask[]>;
  }

  async updateTaskState(userRef: DocumentReference, task: ITask) {
    const tasksRef = collection(userRef, 'tasks');
    const taskToUpdate = doc(tasksRef, task.id);
    return updateDoc(taskToUpdate, { isCompleted: task.isCompleted });
  }

  createUserTasks(userRef: DocumentReference, tasksInfo: ITaskDTO) {
    const tasksReference = collection(userRef, 'tasks');
    const userTask = doc(tasksReference);
    const taskId = userTask.id;

    return setDoc(userTask, {
      id: taskId,
      description: tasksInfo.description,
      deadline: Timestamp.fromDate(tasksInfo.deadline),
      isCompleted: false,
      priority: tasksInfo.priority,
    });
  }

  deleteTask(userRef: DocumentReference, task: ITask) {
    const tasksRef = collection(userRef, 'tasks');
    const taskToDelete = doc(tasksRef, task.id);
    return deleteDoc(taskToDelete);
  }
}
