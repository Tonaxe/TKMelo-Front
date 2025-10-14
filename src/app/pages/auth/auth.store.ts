import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from './auth.models';

const KEY = 'tkmelo.auth.session';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private state$ = new BehaviorSubject<AuthState>(this.load());
  readonly auth$ = this.state$.asObservable();

  get accessToken()  { return this.state$.value.accessToken; }
  get refreshToken() { return this.state$.value.refreshToken; }
  get fullName()     { return this.state$.value.fullName; }
  get email()        { return this.state$.value.email; }
  get roles()        { return this.state$.value.roles ?? []; }

  setAuth(res: {
    userId: string; fullName: string; email: string; roles: string[];
    accessToken: string; accessTokenExpiresAt: string;
    refreshToken: string; refreshTokenExpiresAt: string;
    sessionId: string; sessionExpiresAt: string;
  }) {
    const next: AuthState = {
      accessToken: res.accessToken,
      accessTokenExp: Date.parse(res.accessTokenExpiresAt),
      refreshToken: res.refreshToken,
      refreshTokenExp: Date.parse(res.refreshTokenExpiresAt),

      userId: res.userId,
      fullName: res.fullName,
      email: res.email,
      roles: res.roles ?? [],
      sessionId: res.sessionId,
      sessionExp: Date.parse(res.sessionExpiresAt),
    };
    this.state$.next(next);
    sessionStorage.setItem(KEY, JSON.stringify(next));
  }

  setTokens(access: string, accessExpIso: string, refresh: string, refreshExpIso: string) {
    const cur = this.state$.value;
    const next: AuthState = {
      ...cur,
      accessToken: access,
      accessTokenExp: Date.parse(accessExpIso),
      refreshToken: refresh,
      refreshTokenExp: Date.parse(refreshExpIso),
    };
    this.state$.next(next);
    sessionStorage.setItem(KEY, JSON.stringify(next));
  }

  clear() {
    const blank: AuthState = {
      accessToken: null, accessTokenExp: null,
      refreshToken: null, refreshTokenExp: null,
      userId: null, fullName: null, email: null,
      roles: null, sessionId: null, sessionExp: null
    };
    this.state$.next(blank);
    sessionStorage.removeItem(KEY);
  }

  private load(): AuthState {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || 'null') ?? {
        accessToken: null, accessTokenExp: null,
        refreshToken: null, refreshTokenExp: null,
        userId: null, fullName: null, email: null,
        roles: null, sessionId: null, sessionExp: null
      };
    } catch {
      return {
        accessToken: null, accessTokenExp: null,
        refreshToken: null, refreshTokenExp: null,
        userId: null, fullName: null, email: null,
        roles: null, sessionId: null, sessionExp: null
      };
    }
  }
}
