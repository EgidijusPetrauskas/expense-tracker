/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { User } from '../../../types';
import { getLocalStorage, setLocalStorage } from '../../../helpers/local-storage-helper';
import {
  AUTH_SET_USER,
  AUTH_LOADING,
  AUTH_ERROR,
  AUTH_CLEAR_ERROR,
  AUTH_LOGOUT,
} from './auth-action-types';
import {
  AuthErrorAction, AuthUserAction, AuthState, AuthActions,
} from './types';

const initialState: AuthState = {
  user: getLocalStorage<User>('user'),
  loading: false,
  error: null,
};

const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_USER: {
      const { payload } = action as AuthUserAction;
      setLocalStorage('user', payload.user);
      return {
        ...state,
        user: payload.user,
        loading: false,
      };
    }

    case AUTH_LOADING: {
      let loading: AuthState['loading'];
      if (state.loading) { loading = false; } else { loading = true; }
      return {
        ...state,
        loading,
      };
    }

    case AUTH_ERROR: {
      const { payload } = action as AuthErrorAction;
      return {
        ...state,
        error: payload.error,
      };
    }

    case AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case AUTH_LOGOUT: {
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
