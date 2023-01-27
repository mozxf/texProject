import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    private router: Router
  ) {
    this.teams$ = this.authService.getTeams();
    this.form = this.formBuilder.group({
      name: [null],
      cpf: [null],
      position: [null],
      team: [null],
      salary: [null],
      profilePic: [],
      email: [null],
      password: [null],
      phoneNumber: [null],
    });
    this.teams$.subscribe((team) => console.log(team));
  }

  updateProfilePic(event: Event) {
    const file = event.target as HTMLInputElement;
    if (file.files?.length) {
      const pic = file.files[0];
      this.profilePicFile = pic;
      this.form.patchValue({
        profilePic: pic,
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result as string;
        console.log(reader.result);
      };
      reader.readAsDataURL(pic);
    }
  }

  async handleSubmit() {
    if (this.profilePicFile) {
      try {
        const user = { ...this.form.value, profilePic: '' };
        await this.authService.createUser(user, this.profilePicFile);
        this.router.navigate(['/dashboard']);
      } catch (err) {
        alert(err);
      }
    }
  }
}
