import { Dispatch } from 'redux';

import { UserDetails, User } from '../../../types/user';
import { MainState, GlobalActions } from '../../types';
import {
  AuthActions,
  UserUpdateAction,
  AuthActionType,
  UserSetUpdateFormOpenAction,
  UserDeleteAction,
} from './types';

import { createAuthSetErrorAction } from './auth-action-creators';
import UserService from '../../../services/user-services';
import BudgetService from '../../../services/budget-service';

export const createUpdateUserAction = (user: User): UserUpdateAction => ({
  type: AuthActionType.USER_UPDATE_USER,
  payload: user,
});

export const userSetUpdateFormOpenAction: UserSetUpdateFormOpenAction = {
  type: AuthActionType.USER_SET_UPDATE_FORM_OPEN,
};

export const userDeleteAction: UserDeleteAction = {
  type: AuthActionType.USER_DELETE,
};

export const createUpdateUserActionThunk = (userDetails: UserDetails) => async (dispatch: Dispatch<AuthActions>, getState: () => MainState): Promise<void> => {
  const { auth } = getState();
  try {
    const { user } = auth;
    const updatedUser = await UserService.update(user, userDetails);
    dispatch(createUpdateUserAction(updatedUser));
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

export const createUserDeleteActionThunk = async (dispatch: Dispatch<GlobalActions>, getState: () => MainState): Promise<void> => {
  const { auth } = getState();
  try {
    const { user } = auth;
    if (user === null) throw new Error('Something went wrong.. Try again!');
    await BudgetService.clearAllExpenses();
    await UserService.deleteUser(user.id);
    dispatch(userDeleteAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authSetErrorAction = createAuthSetErrorAction(errMsg);
    dispatch(authSetErrorAction);
  }
};
