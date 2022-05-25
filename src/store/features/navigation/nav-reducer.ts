/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { NavState, NavActions, NavActionType } from './types';

const initialValues: NavState = {
  redirect: null,
};

const navReducer: Reducer<NavState, NavActions> = (state = initialValues, action) => {
  switch (action.type) {
    case NavActionType.NAV_SET_REDIRECT: {
      return {
        ...state,
        redirect: action.payload.redirect,
      };
    }

    case NavActionType.NAV_CLEAR_REDIRECT: {
      return {
        ...state,
        redirect: null,
      };
    }
    default: return state;
  }
};

export default navReducer;
