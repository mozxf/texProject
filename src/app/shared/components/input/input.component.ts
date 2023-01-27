import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { IInput } from 'src/app/models/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
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
