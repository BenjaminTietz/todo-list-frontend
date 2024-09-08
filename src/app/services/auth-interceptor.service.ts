import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieves the token from localStorage (this is used for user authentication)
  const token = localStorage.getItem('token');

  // If a token exists, modify the request to include the Authorization header with the token
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
  }

  // Pass the modified (or original) request to the next handler and return its result (the HTTP response)
  return next(req).pipe(
    // Catch any errors that occur during the HTTP request
    catchError((err) => {
      // If the error is a 401 (Unauthorized), the user is redirected to the login page
      if (err.status === 401) {
        const router = inject(Router); // The Angular Router is injected to allow navigation
        router.navigateByUrl('/login'); // Redirect the user to the login page
      }
      // Rethrow the error so it can be handled elsewhere in the application
      return throwError(() => err);
    })
  );
};
