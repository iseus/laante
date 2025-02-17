import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.tokenExtractor.getToken() as string;
    const bearerToken = localStorage.getItem('token');

    let requestToForward = req.clone({
      withCredentials: true,
    });

    if (csrfToken !== null) {
      requestToForward = requestToForward.clone({
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken,
        },
      });
    }

    if (bearerToken !== null) {
      requestToForward = requestToForward.clone({
        setHeaders: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });
    }

    return next.handle(requestToForward);
  }
}
