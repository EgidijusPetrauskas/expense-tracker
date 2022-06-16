import { Dispatch } from 'redux';

import { Credentials, UserRegistration } from '../../../types';
import { GlobalActions } from '../../types';
import AuthService, { AuthResponseBody } from '../../../services/auth-service';
import { createNavSetRedirectAction, createNavClearRedirectAction } from '../navigation/nav-action-creators';
import { watchlistClearListAction } from '../watchlist/watchlist-action-creators';
import {
  AuthSetUserAction,
  AuthLoadingAction,
  AuthErrorAction,
  AuthClearErrorAction,
  AuthLogoutAction,
  AuthActionType,
  AuthActions,
} from './types';

export const authSetLoadingAction: AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export const authClearErrorAction: AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export const authSetLogoutAction: AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT,
};

export const createAuthSetUserAction = (authResponseBody: AuthResponseBody): AuthSetUserAction => ({
  type: AuthActionType.AUTH_SET_USER,
  payload: authResponseBody,
});

export const createAuthSetErrorAction = (error: string): AuthErrorAction => ({
  type: AuthActionType.AUTH_SET_ERROR,
  payload: { error },
});

export const authenticate = async (
  dispatch: Dispatch<GlobalActions>,
  authCallback: () => Promise<AuthResponseBody>,
  redirect: string,
) => {
  dispatch(authSetLoadingAction);
  try {
    const authResponseBody = await authCallback();
    const authSetUserAction = createAuthSetUserAction(authResponseBody);
    const navSetRedirectAction = createNavSetRedirectAction(redirect);
    dispatch(navSetRedirectAction);
    dispatch(authSetUserAction);
    dispatch(createNavClearRedirectAction);
  } catch (err) {
    const { message } = err as Error;
    const authSetErrorAction = createAuthSetErrorAction(message);
    dispatch(authSetErrorAction);
  }
};

export const createSignInAction = (
  userData: Credentials,
  redirect: string,
) => async (dispatch: Dispatch<AuthActions>): Promise<void> => {
  await authenticate(dispatch, async () => AuthService.login(userData), redirect);
};

export const createRegisterAction = (
  userRegistration: UserRegistration,
  redirect: string,
) => async (dispatch: Dispatch<AuthActions>): Promise<void> => {
  const { username, password } = userRegistration;
  const userData: Credentials = { username, password };
  await authenticate(dispatch, async () => AuthService.register(userData), redirect);
};

export const createAuthenticateAction = (token: string, redirect: string) => async (
  dispatch: Dispatch<AuthActions>,
): Promise<void> => {
  await authenticate(dispatch, async () => AuthService.authenticate(token), redirect);
};

export const createLogOutAction = () => async (dispatch: Dispatch<GlobalActions>): Promise<void> => {
  dispatch(authSetLogoutAction);
  dispatch(watchlistClearListAction);
};
