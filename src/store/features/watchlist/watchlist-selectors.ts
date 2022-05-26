import { MainState } from '../../types';

export const selectWatchlist = (state: MainState) => state.watchlist.list;

export const selectWatchlistError = (state: MainState) => state.watchlist.error;

export const selectWatchlistLoading = (state: MainState) => state.watchlist.loading;

export const selectWatchlistSuccess = (state: MainState) => state.watchlist.success;
