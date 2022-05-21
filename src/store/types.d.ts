import { AuthActions, AuthState } from './features/auth/types';

export type MainState = {
  auth: AuthState
};

export type Action = AuthActions;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;
