import { TasksPageComponent } from './../pages/dashboard/tasks-page/tasks-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from '../pages/dashboard/dashboard-main/dashboard-main.component';

const routes: Routes = [{ path: '', component: TasksPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
