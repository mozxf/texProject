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
    private authService: AuthService
  ) {
    this.authService.getUserPublicInfo().then((user) => {
      this.userInfo = user;
    });
  }
}
