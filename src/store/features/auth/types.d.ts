import { User } from '../../../types/user';
import {
  AUTH_SET_USER, AUTH_LOADING, AUTH_SET_ERROR, AUTH_CLEAR_ERROR, AUTH_LOGOUT,
} from './auth-action-types';

export type AuthState = {
  user: User | null,
  loading: boolean,
  error: string | null,
};

export type AuthSetUserAction = {
  type: typeof AUTH_SET_USER,
  payload: {
    user: User
  }
};

export type AuthLoadingAction = {
  type: typeof AUTH_LOADING,
};

export type AuthErrorAction = {
  type: typeof AUTH_SET_ERROR,
  payload: {
    error: string
  }
};

export type AuthClearErrorAction = {
  type: typeof AUTH_CLEAR_ERROR,
};

export type AuthLogoutAction = {
  type: typeof AUTH_LOGOUT;
};

export type AuthActions = AuthSetUserAction | AuthLoadingAction | AuthErrorAction | AuthLogoutAction | AuthClearErrorAction;
