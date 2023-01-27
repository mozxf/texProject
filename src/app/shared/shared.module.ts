import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent],
})
export class SharedModule {}
