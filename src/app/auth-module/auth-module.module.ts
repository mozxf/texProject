import { RouterModule } from '@angular/router';
import { InputComponent } from './../components/input/input.component';
import { LoginPageComponent } from './../pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  exports: [LoginPageComponent],
})
export class AuthModuleModule {}
