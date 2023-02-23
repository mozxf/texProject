import { IUserPublicInfo } from './../../../models/user-info';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/emloyees/employees.service';

@Component({
  selector: 'app-my-team-page',
  templateUrl: './my-team-page.component.html',
  styleUrls: ['./my-team-page.component.scss'],
})
export class MyTeamPageComponent implements OnInit {
  myTeam?: IUserPublicInfo[];
  teamName: string = '';

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService.getUserPublicInfo().subscribe((user) => {
      if (user) {
        this.teamName = user.team;
        this.myTeam = this.employeesService.getMyTeam(user.team);
      }
    });
  }
}
