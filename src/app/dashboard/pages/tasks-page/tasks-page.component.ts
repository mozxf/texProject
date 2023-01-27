import { Observable } from 'rxjs';
import { TasksService } from './../../services/tasks/tasks.service';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { ITask } from 'src/app/models/tasks';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent {
  tasks$?: Observable<ITask[]>;
  completedTasks?: ITask[];
  incompletedTasks?: ITask[];
  constructor(
    private authService: AuthService,
    private tasksService: TasksService
  ) {
    this.tasksService.getUserTasks().then((tasks) => {
      this.tasks$ = tasks;
      tasks.subscribe((tasks) => {
        this.completedTasks = tasks.filter((task) => task.isCompleted === true);
        this.incompletedTasks = tasks.filter(
          (tasks) => tasks.isCompleted === false
        );
      });
    });
  }
}
