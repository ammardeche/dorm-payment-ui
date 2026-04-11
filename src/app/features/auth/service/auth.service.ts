import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/api-response.model';
import { LoginResponse } from '../loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  // Login method

  login(email: string, password: string) {
    return this.api.post<LoginResponse>('/auth/login', { email, password });
  }
}
