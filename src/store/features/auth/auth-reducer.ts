/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { User } from '../../../types';
import { getLocalStorage, setLocalStorage } from '../../../helpers/local-storage-helper';
import {
  AuthActionType,
  AuthState,
  AuthActions,
} from './types';

const initialState: AuthState = {
  user: getLocalStorage<User>('user'),
  loading: false,
  error: null,
};

const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_SET_USER: {
      setLocalStorage('user', action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }

    case AuthActionType.AUTH_LOADING: {
      let loading: AuthState['loading'];
      if (state.loading) { loading = false; } else { loading = true; }
      return {
        ...state,
        loading,
      };
    }

    case AuthActionType.AUTH_SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
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
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
