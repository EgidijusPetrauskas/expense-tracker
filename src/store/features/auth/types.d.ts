import { User } from '../../../types/user';

export type AuthState = {
  user: User | null,
  loading: boolean,
  error: string | null,
};

export type AuthUserAction = {
  type: typeof Set_USER,
  payload: {
    user: User
  }
};

export type AuthLoadingAction = {
  type: typeof SET_LOADING,
};

export type AuthErrorAction = {
  type: typeof SET_ERROR,
  payload: {
    error: string
  }
};

export type AuthClearErrorAction = {
  type: typeof SET_CLEAR_ERROR,
};

export type AuthLogoutAction = {
  type: typeof SET_LOGOUT;
};

export type AuthActions = AuthUserAction | AuthLoadingAction | AuthErrorAction | AuthLogoutAction;
