import { Dispatch } from 'redux';

import { Credentials, UserRegistration } from '../../../types';
import { Action } from '../../types';
import AuthService, { AuthPromiseType } from './auth-service';
import { User } from '../../../types/user';
import {
  AuthLoadingAction,
  AuthErrorAction,
  AuthClearErrorAction,
  AuthLogoutAction,
} from './types';
import {
  AUTH_SET_USER,
  AUTH_LOADING,
  AUTH_ERROR,
  AUTH_CLEAR_ERROR,
  AUTH_LOGOUT,
} from './auth-action-types';

export const createAuthSetUserAction = (user: User) => ({
  type: AUTH_SET_USER,
  payload: { user },
});

export const createAuthSetErrorAction = (error: string): AuthErrorAction => ({
  type: AUTH_ERROR,
  payload: { error },
});

export const authSetLoadingAction: AuthLoadingAction = {
  type: AUTH_LOADING,
};

export const authClearErrorAction: AuthClearErrorAction = {
  type: AUTH_CLEAR_ERROR,
};

export const authSetLogoutAction: AuthLogoutAction = {
  type: AUTH_LOGOUT,
};

export const authenticate = async (
  dispatch: Dispatch<Action>,
  userData: Credentials,
  authCallBack: AuthPromiseType,
) => {
  dispatch(authSetLoadingAction);
  try {
    const user = await authCallBack(userData);
    const authSetUserAction = createAuthSetUserAction(user);
    dispatch(authSetUserAction);
  } catch (err) {
    const { message } = err as Error;
    const authSetErrorAction = createAuthSetErrorAction(message);
    dispatch(authSetErrorAction);
  }
};

export const createSignInAction = (
  userData: Credentials,
) => async (dispatch: Dispatch<Action>): Promise<void> => {
  await authenticate(dispatch, userData, AuthService.login);
};

export const createRegisterAction = (
  userRegistration: UserRegistration,
) => async (dispatch: Dispatch<Action>): Promise<void> => {
  const { username, password } = userRegistration;
  const userData: Credentials = { username, password };
  await authenticate(dispatch, userData, AuthService.register);
};
