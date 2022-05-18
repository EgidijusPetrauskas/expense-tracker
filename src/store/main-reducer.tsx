/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import {
  Action,
  State,
  SetUserAction,
  SetErrorAction,
} from './types';
import {
  SET_USER,
  SET_LOADING,
  SET_ERROR,
  SET_CLEAR_ERROR,
  SET_LOGOUT,
} from './action-types';

const initialState: State = {
  auth: {
    user: null,
    loading: false,
    error: null,
  },
};

const mainReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { payload } = action as SetUserAction;
      return {
        ...state,
        user: payload,
      };
    }

    case SET_LOADING: {
      let loading: State['auth']['loading'];
      if (state.auth.loading) { loading = false; } else { loading = true; }
      return {
        ...state,
        loading,
      };
    }

    case SET_ERROR: {
      const { payload } = action as SetErrorAction;
      return {
        ...state,
        error: payload,
      };
    }

    case SET_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case SET_LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return { ...state };
  }
};

export default mainReducer;
