import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUserInfo } from './../../../models/user-info';
import { ITeam } from './../../../models/team';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeesService } from './../../services/emloyees/employees.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  form: FormGroup;
  changedFields: string[] = [];

  profilePicUrl: string = '';
  teams$: Observable<ITeam[]>;
  changeValuesSubscription: Subscription[] = [];

  editMode: boolean = false;
  resetPasswordEmailSent: boolean = false;
  constructor(
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      cpf: [null],
      position: [null],
      team: [null],
      salary: [null],
      profilePic: [null],
      profilePicSource: [null],
      email: [null],
      phoneNumber: [null],
    });
    this.teams$ = this.employeesService.getTeams();
  }

  ngOnInit(): void {
    this.employeesService.getUserFullInfo().subscribe((userFullInfo) => {
      if (this.changeValuesSubscription.length) {
        this.changeValuesSubscription.forEach((subscription) => {
          subscription.unsubscribe();
        });
      }
      if (userFullInfo) {
        this.profilePicUrl = userFullInfo.profilePic as string;
        this.initializeUserInfo(userFullInfo);
      }
    });
  }

  initializeUserInfo(userFullInfo: IUserInfo) {
    this.form.patchValue({
      name: userFullInfo.name,
      cpf: userFullInfo.cpf,
      position: userFullInfo.position,
      team: userFullInfo.team,
      salary: userFullInfo.salary,
      email: userFullInfo.email,
      phoneNumber: userFullInfo.phoneNumber,
    });

    const formControls = Object.keys(this.form.controls);
    formControls.forEach((control) => {
      const subscription = this.form
        .get(control)
        ?.valueChanges.subscribe((value) => {
          if (!this.changedFields.includes(control)) {
            console.log(`Pushed: ${control}, value: ${value} `);
            this.changedFields.push(control);
          }
        });
      this.changeValuesSubscription.push(subscription as Subscription);
    });
  }

  handleEditMode() {
    this.editMode = !this.editMode;
  }

  handleResetPassword() {
    const email = this.form.value.email;
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.resetPasswordEmailSent = true;
    });
  }

  updateProfilePic(event: Event) {
    const file = event.target as HTMLInputElement;
    if (file.files?.length) {
      const pic = file.files[0];
      this.form.patchValue({
        profilePic: pic,
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result as string;
      };
      reader.readAsDataURL(pic);
    }
  }

  async handleSubmit() {
    const changePersonalInfo =
      this.changedFields.includes('cpf') ||
      this.changedFields.includes('salary');

    if (this.changedFields.length) {
      if (!changePersonalInfo) {
        await this.employeesService.updateUserPublicInfo(
          this.changedFields,
          this.form
        );
        this.editMode = false;

        this.changedFields = [];
        this.ngOnInit();
      } else {
        await this.employeesService.updateUserPublicInfo(
          this.changedFields,
          this.form
        );
        const { cpf, salary } = this.form.value;
        this.employeesService.updateUserPersonalInfo({ cpf, salary });
        this.editMode = false;

        this.changedFields = [];
        this.ngOnInit();
      }
      this.editMode = false;

      this.changedFields = [];
      this.ngOnInit();
    }
    return this.handleEditMode();
  }
}
