import { User } from '../../../types/user';

export type AuthState = {
  token: string | null,
  loading: boolean,
  error: string | null,
  user: User | null,
  userUpdateFormOpen: boolean
};

export enum AuthActionType {
  USER_UPDATE_USER = 'USER_UPDATE_USER',
  USER_SET_UPDATE_FORM_OPEN = 'USER_SET_UPDATE_FORM_OPEN',
  AUTH_SET_USER = 'AUTH_SET_USER',
  AUTH_LOADING = 'AUTH_LOADING',
  AUTH_SET_ERROR = 'AUTH_SET_ERROR',
  AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export type AuthSetUserAction = {
  type: AuthActionType.AUTH_SET_USER,
  payload: {
    user: User,
    token: string
  }
};

export type AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export type AuthErrorAction = {
  type: AuthActionType.AUTH_SET_ERROR,
  payload: {
    error: string
  }
};

export type AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export type AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT;
};

export type UserUpdateAction = {
  type: AuthActionType.USER_UPDATE_USER,
  payload: User
};

export type UserSetUpdateFormOpenAction = {
  type: AuthActionType.USER_SET_UPDATE_FORM_OPEN
};

export type AuthActions = AuthSetUserAction | AuthLoadingAction | AuthErrorAction | AuthLogoutAction | AuthClearErrorAction | UserUpdateAction | UserSetUpdateFormOpenAction;
