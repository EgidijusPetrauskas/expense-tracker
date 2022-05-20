import { AuthActions, AuthState } from './features/auth/types';

export type MainState = {
  auth: AuthState
};

export type Action = AuthActions;
