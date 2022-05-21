import { NAV_SET_REDIRECT, NAV_CLEAR_REDIRECT } from './navigation-action-types';
import { NavSetRedirectAction, NavClearRedirectAction } from './types';

export const createNavSetRedirectAction = (redirect: string): NavSetRedirectAction => ({
  type: NAV_SET_REDIRECT,
  payload: { redirect },
});

export const createNavClearRedirectAction: NavClearRedirectAction = {
  type: NAV_CLEAR_REDIRECT,
};
