import { EmployeesService } from './../../../dashboard/services/emloyees/employees.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth-module/services/authService/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  teams$: Observable<any>;
  form: FormGroup;
  profilePicUrl: string = '';
  profilePicFile?: File;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.teams$ = this.employeesService.getTeams();
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
          ),
        ],
      ],
      position: [null, [Validators.required, Validators.minLength(3)]],
      team: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      profilePic: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      phoneNumber: [null, [Validators.required]],
    });
    this.teams$.subscribe((team) => console.log(team));
  }

  updateProfilePic(event: Event) {
    const file = event.target as HTMLInputElement;
    if (file.files?.length) {
      const pic = file.files[0];
      this.profilePicFile = pic;
      console.log(pic);
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
    if (this.profilePicFile) {
      try {
        const user = { ...this.form.value, profilePic: '' };
        await this.authService
          .createUser(user, this.profilePicFile)
          .then(() => {
            this.router.navigate(['/dashboard']);
          });
      } catch (err) {
        alert(err);
      }
    }
  }

  shouldDisplayError(controlName: string): boolean {
    const shouldDisplay =
      this.form.get(controlName)?.invalid &&
      this.form.get(controlName)?.touched;

    return shouldDisplay as boolean;
  }
}
