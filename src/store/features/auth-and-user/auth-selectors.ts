import { MainState } from '../../types';

export const selectUser = (state: MainState) => state.auth.user;

export const selectLoggedIn = (state: MainState) => Boolean(state.auth.user);

export const selectAuthToken = (state: MainState) => state.auth.token;

export const selectAuthLoading = (state: MainState) => state.auth.loading;

export const selectAuthError = (state: MainState) => state.auth.error;
