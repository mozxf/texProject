import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { OtherTeamsPageComponent } from './pages/other-teams-page/other-teams-page.component';
import { MyTeamPageComponent } from './pages/my-team-page/my-team-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'myTeam', component: MyTeamPageComponent },
  { path: 'otherTeams', component: OtherTeamsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
