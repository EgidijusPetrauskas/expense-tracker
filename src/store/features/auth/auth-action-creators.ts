import { Dispatch } from 'redux';

import { Credentials, UserRegistration } from '../../../types';
import { MainState, GlobalActions } from '../../types';
import AuthService, { AuthPromiseType } from './auth-service';
import { User, UserDetails } from '../../../types/user';
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

export const createAuthSetUserAction = (user: User): AuthSetUserAction => ({
  type: AuthActionType.AUTH_SET_USER,
  payload: { user },
});

export const createAuthSetErrorAction = (error: string): AuthErrorAction => ({
  type: AuthActionType.AUTH_SET_ERROR,
  payload: { error },
});

export const authenticate = async (
  dispatch: Dispatch<GlobalActions>,
  userData: Credentials,
  authCallBack: AuthPromiseType,
  redirect: string,
) => {
  dispatch(authSetLoadingAction);
  try {
    const user = await authCallBack(userData);
    const authSetUserAction = createAuthSetUserAction(user);
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
  await authenticate(dispatch, userData, AuthService.login, redirect);
};

export const createRegisterAction = (
  userRegistration: UserRegistration,
  redirect: string,
) => async (dispatch: Dispatch<AuthActions>): Promise<void> => {
  const { username, password } = userRegistration;
  const userData: Credentials = { username, password };
  await authenticate(dispatch, userData, AuthService.register, redirect);
};

export const createLogOutAction = () => async (dispatch: Dispatch<GlobalActions>): Promise<void> => {
  dispatch(authSetLogoutAction);
  dispatch(watchlistClearListAction);
};

export const createUpdateUserAction = (userDetails: UserDetails) => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
  dispatch(authSetLoadingAction);
  const { auth } = getState();
  try {
    const { user } = auth;
    const fullUserData = await AuthService.update(user, userDetails);
    dispatch(createAuthSetUserAction(fullUserData));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authSetErrorAction = createAuthSetErrorAction(errMsg);
    dispatch(authSetErrorAction);
  }
};
