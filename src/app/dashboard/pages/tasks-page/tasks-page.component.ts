import { EmployeesService } from './../../services/emloyees/employees.service';
import { Observable, switchMap } from 'rxjs';
import { TasksService } from './../../services/tasks/tasks.service';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/tasks';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent {
  completedTasks?: ITask[];
  incompleteTasks?: ITask[];
  tasks$: Observable<ITask[]> = new Observable<ITask[]>();
  showCreateTaskModal: boolean = false;
  showDeleteTasksLayer: boolean = false;
  incompleteTasksExists: boolean = true;
  completedTasksExists: boolean = true;
  constructor(
    private authService: AuthService,
    private employeesService: EmployeesService,
    private tasksService: TasksService
  ) {
    this.tasks$ = this.employeesService.getUserRef().pipe(
      switchMap((userRef) => {
        console.log(userRef);
        return this.tasksService.getUserTasks(userRef);
      })
    );
    this.tasks$.subscribe((tasks) => {
      this.incompleteTasksExists = !!tasks.find(
        (task) => task.isCompleted === false
      );
      this.completedTasksExists = !!tasks.find(
        (task) => task.isCompleted === true
      );
    });
  }

  handleCreateTaskModal(state?: boolean) {
    if (state) {
      this.showCreateTaskModal = state;
    } else {
      this.showCreateTaskModal = !this.showCreateTaskModal;
    }
  }
  handleDeleteTasks() {
    this.showDeleteTasksLayer = !this.showDeleteTasksLayer;
  }

  displayNoTaskElement(list: HTMLUListElement) {
    const tasksList = Array.from(list.childNodes);
    return !tasksList.find((task: any) => task.localName === 'app-task');
  }
}
