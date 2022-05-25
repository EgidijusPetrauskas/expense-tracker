/* eslint-disable import/prefer-default-export */
import { MainState } from '../../types';

export const selectRedirect = (state: MainState) => state.navigation.redirect;
