import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { LoginRequest } from '../../service/models/loginRequest.model';
import { form, FormField, required } from '@angular/forms/signals';
import { LoginResponse } from '../../service/models/loginResponse.model';
import { ApiError } from '../../../../core/models/api-error.model';
import { finalize } from 'rxjs';
import { AuthInputComponent } from '../../components/auth-input-component/auth-input-component';
import { AuthButtonComponent } from '../../components/auth-button-component/auth-button-component';
import { AuthHeaderComponent } from '../../components/auth-header-component/auth-header-component';
import { LoginPayloadModel } from '../../service/models/login-payload';

@Component({
  selector: 'app-login-component',
  imports: [AuthInputComponent, AuthButtonComponent, AuthHeaderComponent],

  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  _authService = inject(AuthService);
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  loginResponse = signal<LoginPayloadModel | null>(null);

  errorMessage = signal<string>('');

  loginModel = signal<LoginRequest>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().valid()) {
      this.isLoading.set(true);
      this.errorMessage.set(''); // ✅ clear old error
      const { email, password } = this.loginModel();
      this._authService
        .login(email, password)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res) => {
            this.loginResponse.set(res.payload);
          },
          error: (err: ApiError) => {
            this.errorMessage.set(err.message);
            this.isLoading.set(false);
          },
        });
    }
  }


  togglePassword() {
    this.showPassword.update((show) => !show);
  }
}
