import { FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IInput } from 'src/app/models/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() inputInfo!: IInput;
  @Input() control!: FormControl;
  @Input() isReadonly?: boolean = false;
  @Input() error: { message: string; shouldDisplay: boolean | undefined } = {
    message: '',
    shouldDisplay: false,
  };
  @Input() mask: string = '';
  @Input() prefix: string = '';
}
