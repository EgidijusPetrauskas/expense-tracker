import ActionTypes from './action-types';

export const setUser = (name: string) => ({
  type: ActionTypes.SET_USER,
  payload: name,
});

export const logIn = (name: string) => ({
  type: ActionTypes.LOGIN,
  payload: name,
});

export const logOut = () => ({
  type: ActionTypes.LOGOUT,
});
