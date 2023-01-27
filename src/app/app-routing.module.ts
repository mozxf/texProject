import { LoginPageComponent } from './auth-module/pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './dashboard/pages/dashboard-main/dashboard-main.component';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RegisterPageComponent } from './auth-module/pages/register-page/register-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectloggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectloggedInToDashboard },
  },
  {
    path: 'signup',
    component: RegisterPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectloggedInToDashboard },
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
