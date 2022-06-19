/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import {
  AuthActionType,
  AuthState,
  AuthActions,
} from './types';

import { getLocalStorage, setLocalStorage } from '../../../helpers/local-storage-helper';

const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

const initialState: AuthState = {
  token: getLocalStorage(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE),
  user: null,
  loading: false,
  error: null,
  userUpdateFormOpen: false,
};

const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_SET_USER: {
      setLocalStorage(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE, action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    }

    case AuthActionType.AUTH_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    case AuthActionType.AUTH_SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        user: null,
        token: null,
        loading: false,
      };
    }

    case AuthActionType.AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }

    case AuthActionType.AUTH_LOGOUT: {
      localStorage.removeItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    }

    case AuthActionType.USER_UPDATE_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }

    case AuthActionType.USER_SET_UPDATE_FORM_OPEN: {
      return {
        ...state,
        userUpdateFormOpen: !state.userUpdateFormOpen,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
