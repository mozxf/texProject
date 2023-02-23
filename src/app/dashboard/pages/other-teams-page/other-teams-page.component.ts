import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/app/models/team';
import { EmployeesService } from '../../services/emloyees/employees.service';

@Component({
  selector: 'app-other-teams-page',
  templateUrl: './other-teams-page.component.html',
  styleUrls: ['./other-teams-page.component.scss'],
})
export class OtherTeamsPageComponent implements OnInit {
  otherTeams: ITeam[] = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService.getUserPublicInfo().subscribe((user) => {
      if (user) {
        this.otherTeams = this.employeesService.getOtherTeams(user.team);
      }
    });
  }
}
