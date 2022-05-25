export type NavState = {
  redirect: string | null
};

export enum NavActionType {
  NAV_SET_REDIRECT = 'NAV_SET_REDIRECT',
  NAV_CLEAR_REDIRECT = 'NAV_CLEAR_REDIRECT',

}

export type NavSetRedirectAction = {
  type: NavActionType.NAV_SET_REDIRECT,
  payload: {
    redirect: string
  }
};

export type NavClearRedirectAction = {
  type: NavActionType.NAV_CLEAR_REDIRECT
};

export type NavActions = NavSetRedirectAction | NavClearRedirectAction;
