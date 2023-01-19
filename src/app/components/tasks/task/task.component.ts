import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [ReactiveFormsModule, FormsModule],
})
export class TaskComponent {
  @Input() priority: 'Important' | 'Normal' | 'Low' = 'Low';
  form: FormGroup;
  checked: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      checkbox: [null],
    });
  }
}
