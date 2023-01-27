import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collectionData } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Injectable } from '@angular/core';
import { ITask } from 'src/app/models/tasks';
import { collection, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private authService: AuthService) {}

  async getUserTasks() {
    const userRef = await this.authService.getUserDocReference();
    const tasksRef = collection(userRef, 'tasks');
    return collectionData(tasksRef) as Observable<ITask[]>;
  }

  async updateTaskState(task: ITask) {
    const userRef = await this.authService.getUserDocReference();
    const tasksRef = collection(userRef, 'tasks');
    const taskToUpdate = doc(tasksRef, task.id);
    return updateDoc(taskToUpdate, { isCompleted: task.isCompleted });
  }
}
