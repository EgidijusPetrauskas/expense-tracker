import { User } from '../types';
import {
  Set_USER, SET_LOADING, SET_ERROR, SET_CLEAR_ERROR, SET_LOGOUT,
} from './action-types';

export type SetUserAction = {
  type: typeof Set_USER,
  payload: {
    user: User
  }
};

export type SetLoadingAction = {
  type: typeof SET_LOADING,
};

export type SetErrorAction = {
  type: typeof SET_ERROR,
  payload: string
};

export type SetClearErrorAction = {
  type: typeof SET_CLEAR_ERROR,
};

export type SetLogoutAction = {
  type: typeof SET_LOGOUT;
};

export type State = {
  auth: {
    user: User | null,
    loading: boolean,
    error: string | null,
  }
};

export type Action = SetUserAction | SetLoadingAction | SetErrorAction | SetLogoutAction;
