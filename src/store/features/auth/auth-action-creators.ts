import { User } from '../../../types';
import {
  AuthLoadingAction,
  AuthErrorAction,
  AuthClearErrorAction,
  AuthLogoutAction,
} from './types';
import {
  AUTH_USER,
  AUTH_LOADING,
  AUTH_ERROR,
  AUTH_CLEAR_ERROR,
  AUTH_LOGOUT,
} from './auth-action-types';

export const setUser = (user: User) => ({
  type: AUTH_USER,
  payload: user,
});

export const SetLoading: AuthLoadingAction = {
  type: AUTH_LOADING,
};

export const SetError = (msg: string): AuthErrorAction => ({
  type: AUTH_ERROR,
  payload: msg,
});

export const SetClearError: AuthClearErrorAction = {
  type: AUTH_CLEAR_ERROR,
};

export const SetLogout: AuthLogoutAction = {
  type: AUTH_LOGOUT,
};
