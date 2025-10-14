import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const store = inject(AuthStore);
  const svc   = inject(AuthService);

  const token = store.accessToken;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) return throwError(() => err);
      if (!store.refreshToken) { svc.clearLocal(); return throwError(() => err); }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshSubject.next(false);
        return svc.refresh().pipe(
          switchMap(() => {
            refreshSubject.next(true);
            const newToken = store.accessToken;
            const retried = newToken ? req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }) : req;
            return next(retried);
          }),
          catchError(e => { svc.clearLocal(); return throwError(() => e); }),
          finalize(() => { isRefreshing = false; })
        );
      } else {
        return refreshSubject.pipe(
          filter(done => done === true),
          take(1),
          switchMap(() => {
            const newToken = store.accessToken;
            const retried = newToken ? req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }) : req;
            return next(retried);
          })
        );
      }
    })
  );
};
