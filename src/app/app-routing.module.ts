import { TasksPageComponent } from './pages/dashboard/tasks-page/tasks-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './pages/dashboard/dashboard-main/dashboard-main.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
