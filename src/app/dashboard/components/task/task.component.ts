import { EmployeesService } from './../../services/emloyees/employees.service';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { TasksService } from './../../services/tasks/tasks.service';
import { ITask } from './../../../models/tasks';
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: ITask;
  form: FormGroup;
  @Input() shouldDelete: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private employeesService: EmployeesService,
    private authService: AuthService
  ) {
    this.form = formBuilder.group({
      name: [null],
      cpf: [null],
      position: [null],
      team: [null],
      salary: [null],
      email: [null],
      password: [null],
      phoneNumber: [null],
    });
  }

  ngOnInit(): void {
    this.form.addControl(
      'checkbox',
      this.formBuilder.control(this.task.isCompleted)
    );
  }

  async handleChange() {
    this.task.isCompleted = this.form.value.checkbox as boolean;
    this.employeesService.getUserRef().subscribe((userRef) => {
      this.tasksService.updateTaskState(userRef, this.task);
    });
  }

  async handleDeleteTask() {
    this.employeesService.getUserRef().subscribe((userRef) => {
      const shouldDelete = confirm(
        'Are you sure you want to delete this task?'
      );
      if (shouldDelete) {
        this.tasksService.deleteTask(userRef, this.task);
      }
    });
  }
}
