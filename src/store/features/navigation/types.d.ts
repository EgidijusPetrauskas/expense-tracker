import { NAV_SET_REDIRECT, NAV_CLEAR_REDIRECT } from './navigation-action-types';

export type NavState = {
  redirect: string | null
};

export type NavSetRedirectAction = {
  type: typeof NAV_SET_REDIRECT,
  payload: {
    redirect: string
  }
};

export type NavClearRedirectAction = {
  type: typeof NAV_CLEAR_REDIRECT
};

export type NavActions = NavSetRedirectAction | NavClearRedirectAction;
