import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { MyTeamPageComponent } from './pages/my-team-page/my-team-page.component';
import { OtherTeamsPageComponent } from './pages/other-teams-page/other-teams-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    TasksPageComponent,
    SidebarMenuComponent,
    DashboardMainComponent,
    TaskComponent,
    CreateTaskModalComponent,
    MyTeamPageComponent,
    OtherTeamsPageComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    TasksPageComponent,
    SidebarMenuComponent,
    DashboardMainComponent,
    TaskComponent,
  ],
})
export class DashboardModule {}
