import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 419) {
          // CSRF token mismatch, refresh the token and retry the request
          return this.authService.refreshCsrfToken().pipe(
            switchMap(() => {
              const clonedRequest = req.clone();
              return next.handle(clonedRequest);
            }),
            catchError(err => {
              // If refreshing the CSRF token fails, handle the error
              console.error('Failed to refresh CSRF token:', err);
              return throwError(err);
            })
          );
        }
        if (error.status === 401) {
          // Unauthorized, log the user out
          this.authService.logout().subscribe({
            next: () => {
              window.location.href = '/login';
            },
          });
        }
        return throwError(error);
      })
    );
  }
}
