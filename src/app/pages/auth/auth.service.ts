import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, RefreshRequest, RefreshResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http  = inject(HttpClient);
  private store = inject(AuthStore);
  private base  = "https://localhost:44338/api/Auth";

  register(body: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${this.base}/register`, body);
  }

  login(body: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.base}/login`, body).pipe(
      tap(res => this.store.setAuth(res))
    );
  }

  refresh(): Observable<RefreshResponse> {
    const refreshToken = this.store.refreshToken;
    return this.http.post<RefreshResponse>(`${this.base}/refresh`, { refreshToken }).pipe(
      tap(res => this.store.setTokens(res.accessToken, res.accessTokenExpiresAt, res.refreshToken, res.refreshTokenExpiresAt))
    );
  }

  logout() {
    return this.http.post<void>(`${this.base}/logout`, {}).pipe(
      tap(() => this.store.clear())
    );
  }

  clearLocal() { this.store.clear(); }
}
