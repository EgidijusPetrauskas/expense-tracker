import { NavSetRedirectAction, NavClearRedirectAction, NavActionType } from './types';

export const createNavClearRedirectAction: NavClearRedirectAction = {
  type: NavActionType.NAV_CLEAR_REDIRECT,
};

export const createNavSetRedirectAction = (redirect: string): NavSetRedirectAction => ({
  type: NavActionType.NAV_SET_REDIRECT,
  payload: { redirect },
});
