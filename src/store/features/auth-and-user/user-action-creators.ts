import { Dispatch } from 'redux';

import { UserDetails, User } from '../../../types/user';

import { MainState } from '../../types';
import { AuthActions, AuthUserUpdateAction, AuthActionType } from './types';
import { authSetLoadingAction, createAuthSetErrorAction } from './auth-action-creators';
import UserService from '../../../services/user-services';

export const createUpdateUserAction = (user: User): AuthUserUpdateAction => ({
  type: AuthActionType.AUTH_UPDATE_USER,
  payload: user,
});

export const createUpdateUserActionThunk = (userDetails: UserDetails) => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
  dispatch(authSetLoadingAction);
  const { auth } = getState();
  try {
    const { user } = auth;
    const response = await UserService.update(user, userDetails);
    dispatch(createUpdateUserAction(response));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authSetErrorAction = createAuthSetErrorAction(errMsg);
    dispatch(authSetErrorAction);
  }
};

export const createSetUserDetailsAction = () => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
  const { auth } = getState();
  try {
    const { user } = auth;
    const userDetails = await UserService.getDetails(user);
    const fullUserData = await UserService.update(user, userDetails);
    dispatch(createUpdateUserAction(fullUserData));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authSetErrorAction = createAuthSetErrorAction(errMsg);
    dispatch(authSetErrorAction);
  }
};
