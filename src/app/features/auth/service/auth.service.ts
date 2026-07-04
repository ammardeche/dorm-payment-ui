import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/api-response.model';
import { LoginResponse } from './models/loginResponse.model';
import { BehaviorSubject, tap } from 'rxjs';
import { RegisterRequest } from './models/registerRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  private _currentUserSubject$ = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this._currentUserSubject$.asObservable();

  constructor() {
    this.LoadUserFromStorage();
  }

  // login method

  login(email: string, password: string) {
    return this.api.post<LoginResponse>('/auth/login', { email, password }).pipe(
      tap((res) => {
        this.tokenService.setToken(res.token);
        this._currentUserSubject$.next(res.user);
        this.storeUser(res.user);
        this.router.navigate(['/dashboard']);
      }),
    );
  }

  // register method
  register(req: RegisterRequest) {
    return this.api.post<any>('auth/register', req);
  }

  // logout method
  logout() {
    this.tokenService.removeToken();
    this._currentUserSubject$.next(null);
    this.router.navigate(['/login']);
  }

  // get the current user roles
  hasRole(role: string): boolean {
    return this._currentUserSubject$.value?.roles.includes(role) ?? false;
  }

  // check if the user is Logged in
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  // get the current user
  getCurrentUser(): User | null {
    return this._currentUserSubject$.value;
  }

  // store the user if refresh the page
  private storeUser(user: User) {
    if (!user) return;
    localStorage.setItem('dms_user', JSON.stringify(user));
  }
  // load the user from storage if refresh the page
  private LoadUserFromStorage(): void {
    if (this.tokenService.isLoggedIn()) {
      const store = localStorage.getItem('dms_user');

      if (!store || store === 'undefined') {
        return;
      }

      try {
        this._currentUserSubject$.next(JSON.parse(store));
      } catch (e) {
        console.error('Invalid user in storage:', store);
        localStorage.removeItem('dms_user');
      }
    }
  }
}
