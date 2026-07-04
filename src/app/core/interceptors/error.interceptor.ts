import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../features/auth/service/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../models/api-error.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let _apiError: ApiError;
      if (err.error && typeof err.error === 'object') {
        _apiError = {
          success: err.error.success ?? false,
          statusCode: err.status,
          message: err.error.message ?? 'An error occurred',
        };
      } else {
        _apiError = {
          success: false,
          statusCode: err.status,
          message: 'An error occurred',
        };
      }

      // ✅ Centralized behavior
      switch (_apiError.statusCode) {
        case 401:
          authService.logout();
          break;

        case 403:
          router.navigate(['/dashboard']);
          break;

        case 404:
          // you now have the real message from backend
          console.warn(_apiError.message);
          break;

        case 500:
          console.error(_apiError.message);
          break;
      }

      // ✅ IMPORTANT: return cleaned error, not raw HttpErrorResponse
      return throwError(() => _apiError);
    }),
  );
};
