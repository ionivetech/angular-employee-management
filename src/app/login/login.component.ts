import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
// Components
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorUsername: boolean = false;
  errorPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Create Form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  // Handle submit form
  submitForm(): void {
    if (this.loginForm.valid) {
      this.errorUsername = this.loginForm.value.username !== 'admin';
      this.errorPassword = this.loginForm.value.password !== '123456';

      if (!this.errorUsername && !this.errorPassword) {
        this.router.navigateByUrl('/dashboard/employee');
      }
    }
  }
}
