import { LoginPageComponent } from './../pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule],
  exports: [LoginPageComponent],
})
export class AuthModuleModule {}
