import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>, // Takes the outgoing HTTP request
    next: HttpHandler // Passes the request to the next handler in the chain
  ): Observable<HttpEvent<any>> {
    // Retrieves the token from localStorage
    const token = localStorage.getItem('token');

    // If a token exists, clone the request and add the Authorization header with the token
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }

    // Pass the modified request (with token) to the next handler and handle the response
    return next.handle(request).pipe(
      // Catch any errors that occur during the request
      catchError((err) => {
        // Check if the error is an instance of HttpErrorResponse
        if (err instanceof HttpErrorResponse) {
          // If the error status is 401 (Unauthorized), redirect the user to the login page
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }

        // Throw the error to be handled by other parts of the application
        return throwError(() => err);
      })
    );
  }
}
