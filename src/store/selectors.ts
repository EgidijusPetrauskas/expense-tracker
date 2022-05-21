import { MainState } from './types';

export const selectLoggedIn = (state: MainState) => Boolean(state.auth.user);

export const selectUser = (state: MainState) => state.auth.user;

export const selectAuthLoading = (state: MainState) => state.auth.loading;

export const selectAuthError = (state: MainState) => state.auth.error;

export const selectRedirect = (state: MainState) => state.navigation.redirect;
