import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    // this.fireAuth.signOut().then(() => {
    //   router.navigate(['']);
    // });
  }
}
