import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: [null],
      password: [null],
    });

    console.log(this.form);
  }

  handleSubmit() {
    const { email, password } = this.form.value;
    try {
      this.authService.login(email, password);
      this.router.navigate(['/dashboard']);
    } catch (err) {
      alert(err);
    }
  }
}

type TInput = {
  email: string;
  password: string;
};
