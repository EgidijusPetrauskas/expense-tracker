import { Dispatch } from 'redux';

import { UserDetails, User } from '../../../types/user';
import { MainState } from '../../types';
import {
  AuthActions,
  UserUpdateAction,
  AuthActionType,
  UserSetUpdateFormOpenAction,
} from './types';

import { createAuthSetErrorAction } from './auth-action-creators';
import UserService from '../../../services/user-services';

export const createUpdateUserAction = (user: User): UserUpdateAction => ({
  type: AuthActionType.USER_UPDATE_USER,
  payload: user,
});

export const createUserSetUpdateFormOpenAction: UserSetUpdateFormOpenAction = {
  type: AuthActionType.USER_SET_UPDATE_FORM_OPEN,
};

export const createUpdateUserActionThunk = (userDetails: UserDetails) => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
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

export const createSetUserDetailsActionThunk = () => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
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
