import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { IInput } from 'src/app/models/input';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [ReactiveFormsModule],
})
export class InputComponent {
  @Input() inputInfo!: IInput;
  // @Output() fieldInfo: any = new EventEmitter<string>();
  value: string = '';
  @Input() control!: FormControl;

  handleBlur(data: string) {
    this.value = data;
    // this.fieldInfo.emit(data);
  }
}
