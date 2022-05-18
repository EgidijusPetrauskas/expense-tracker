import { User } from '../types/user';
import {
  SET_USER,
  SET_LOGOUT,
  SET_LOADING,
  SET_ERROR,
  SET_CLEAR_ERROR,
} from './action-types';

import {
  SetClearErrorAction, SetLoadingAction, SetErrorAction, SetLogoutAction,
} from './types';

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const SetLoading: SetLoadingAction = {
  type: SET_LOADING,
};

export const SetError = (msg: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: msg,
});

export const SetClearError: SetClearErrorAction = {
  type: SET_CLEAR_ERROR,
};

export const SetLogout: SetLogoutAction = {
  type: SET_LOGOUT,
};
