import { EmployeesService } from './../../services/emloyees/employees.service';
import { Router } from '@angular/router';
import { IUserPublicInfo } from '../../../models/user-info';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  userInfo?: IUserPublicInfo;

  constructor(
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.fireAuth.user.subscribe((user) => {
      user?.uid &&
        this.employeesService.getUserPublicInfo().subscribe((user) => {
          this.userInfo = user;
        });
    });
  }

  logout() {
    const shouldSignOut = confirm('Sign out?');
    shouldSignOut &&
      this.fireAuth.signOut().then(() => {
        this.router.navigate(['/']);
      });
  }
}
