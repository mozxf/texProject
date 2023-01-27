import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    TasksPageComponent,
    SidebarMenuComponent,
    DashboardMainComponent,
    TaskComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
  exports: [
    TasksPageComponent,
    SidebarMenuComponent,
    DashboardMainComponent,
    TaskComponent,
  ],
})
export class DashboardModule {}
