export type RegisterRequest = { fullName: string; email: string; password: string; };
export type RegisterResponse = { userId: string; fullName: string; email: string; };

export type LoginRequest = { email: string; password: string; };
export type LoginResponse = {
    userId: string; fullName: string; email: string; roles: string[];
    accessToken: string; accessTokenExpiresAt: string;
    refreshToken: string; refreshTokenExpiresAt: string;
    sessionId: string; sessionExpiresAt: string;
};

export type RefreshRequest = { refreshToken: string; };
export type RefreshResponse = {
    accessToken: string; accessTokenExpiresAt: string;
    refreshToken: string; refreshTokenExpiresAt: string;
};

export type AuthState = {
  accessToken: string | null;
  accessTokenExp: number | null;
  refreshToken: string | null;
  refreshTokenExp: number | null;

  userId: string | null;
  fullName: string | null;
  email: string | null;
  roles: string[] | null;
  sessionId: string | null;
  sessionExp: number | null;
};