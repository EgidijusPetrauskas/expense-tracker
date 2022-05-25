import { MainState } from '../../types';

export const selectWatchlist = (state: MainState) => state.watchlist.list;

export const selectWatchlistError = (state: MainState) => state.watchlist.error;

export const selectWatchlistLoading = (state: MainState) => state.watchlist.loading;
