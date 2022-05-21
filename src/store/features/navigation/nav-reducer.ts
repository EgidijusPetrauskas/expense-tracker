/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { NavState, NavActions } from './types';
import { NAV_SET_REDIRECT, NAV_CLEAR_REDIRECT } from './navigation-action-types';

const initialValues: NavState = {
  redirect: null,
};

const navReducer: Reducer<NavState, NavActions> = (state = initialValues, action) => {
  switch (action.type) {
    case NAV_SET_REDIRECT: {
      return {
        ...state,
        redirect: action.payload.redirect,
      };
    }

    case NAV_CLEAR_REDIRECT: {
      return {
        ...state,
        redirect: null,
      };
    }
    default: return state;
  }
};

export default navReducer;
