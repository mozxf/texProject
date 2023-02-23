import { EmployeesService } from './../../services/emloyees/employees.service';
import { Timestamp } from 'firebase/firestore';
import { ITaskDTO } from './../../../models/tasks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from './../../services/tasks/tasks.service';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent {
  @Input() shouldAppear: boolean = false;
  @Output() closedModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private employeesService: EmployeesService,
    private tasksService: TasksService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });
  }

  async handleSubmit() {
    this.employeesService.getUserRef().subscribe((userRef) => {
      if (this.form.valid && userRef) {
        const { description, deadline, priority } = this.form.value;
        const task: ITaskDTO = {
          description,
          deadline: new Date(deadline),
          priority,
        };
        this.tasksService.createUserTasks(userRef, task);
        this.shouldAppear = false;
        this.closedModal.emit(false);
        this.form.reset();
      }
    });
  }
}
