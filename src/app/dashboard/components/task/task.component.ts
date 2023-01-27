import { TasksService } from './../../services/tasks/tasks.service';
import { ITask } from './../../../models/tasks';
import { Timestamp } from 'firebase/firestore';
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
  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService
  ) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.form.addControl(
      'checkbox',
      this.formBuilder.control(this.task.isCompleted)
    );
  }

  handleChange() {
    this.task.isCompleted = this.form.value.checkbox as boolean;
    this.tasksService.updateTaskState(this.task);
  }
}
