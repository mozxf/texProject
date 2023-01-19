import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksPageComponent } from '../pages/dashboard/tasks-page/tasks-page.component';
import { SidebarMenuComponent } from '../components/sidebar-menu/sidebar-menu.component';
import { DashboardMainComponent } from '../pages/dashboard/dashboard-main/dashboard-main.component';
import { TaskComponent } from '../components/tasks/task/task.component';

@NgModule({
  declarations: [
    TasksPageComponent,
    SidebarMenuComponent,
    DashboardMainComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, TaskComponent],
  exports: [TasksPageComponent, SidebarMenuComponent, DashboardMainComponent],
})
export class DashboardModule {}
