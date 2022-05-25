import { User } from '../../../types/user';

export type AuthState = {
  user: User | null,
  loading: boolean,
  error: string | null,
};

export enum AuthActionType {
  AUTH_SET_USER = 'AUTH_SET_USER',
  AUTH_LOADING = 'AUTH_LOADING',
  AUTH_SET_ERROR = 'AUTH_SET_ERROR',
  AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export type AuthSetUserAction = {
  type: AuthActionType.AUTH_SET_USER,
  payload: {
    user: User
  }
};

export type AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export type AuthErrorAction = {
  type: AuthActionType.AUTH_SET_ERROR,
  payload: {
    error: string
  }
};

export type AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export type AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT;
};

export type AuthActions = AuthSetUserAction | AuthLoadingAction | AuthErrorAction | AuthLogoutAction | AuthClearErrorAction;
