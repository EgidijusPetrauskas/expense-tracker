import { AuthActions, AuthState } from './features/auth/types';
import { NavActions, NavState } from './features/navigation/types';

export type MainState = {
  auth: AuthState,
  navigation: NavState
};

export type GlobalActions = AuthActions | NavActions;

export type AppDispatch = ThunkDispatch<RootState, undefined, GlobalActions>;
