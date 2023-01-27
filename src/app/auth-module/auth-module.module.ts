import { SharedModule } from './../shared/shared.module';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../shared/components/input/input.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent, RegisterPageComponent],
})
export class AuthModuleModule {}
