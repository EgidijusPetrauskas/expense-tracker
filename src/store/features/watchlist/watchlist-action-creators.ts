import { Dispatch } from 'redux';
import axios from 'axios';
import WatchlistService from './watchlist-service';
import {
  WatchlistSetSuccessAction,
  WatchlistActions,
  WatchlistClearErrorAction,
  WatchlistSetLoadingAction,
  WatchlistSetItemAction,
  WatchlistActionType,
  WatchlistItem,
  WatchlistSetErrorAction,
} from './types';

export const createWatchlistSetItemAcion = (itemData: WatchlistItem): WatchlistSetItemAction => ({
  type: WatchlistActionType.WATCHLIST_SET_ITEM,
  payload: itemData,
});

export const createWatchlistSetErrorAction = (error: string): WatchlistSetErrorAction => ({
  type: WatchlistActionType.WATCHLIST_SET_ERROR,
  payload: { error },
});

export const watchlistSetLoadingAction: WatchlistSetLoadingAction = {
  type: WatchlistActionType.WATCHLIST_SET_LOADING,
};

export const watchlistClearErrorAction: WatchlistClearErrorAction = {
  type: WatchlistActionType.WATCHLIST_CLEAR_ERROR,
};

export const watchlistsetSuccessAction: WatchlistSetSuccessAction = {
  type: WatchlistActionType.WATCHLIST_SET_SUCCESS,
};

export const createWatchlistItemFetchAction = (
  symbol: string,
) => async (dispatch: Dispatch<WatchlistActions>): Promise<void> => {
  dispatch(watchlistSetLoadingAction);
  try {
    const API_KEY = 'GA62GOU1YT7XJ0OP';
    const API_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await axios.get(API_URL);
    const { data } = await response;
    const {
      Symbol, Exchange, Currency, Sector,
    } = data;
    const high = data['52WeekHigh'];
    const low = data['52WeekLow'];
    const cleanData: WatchlistItem = {
      symbol: Symbol,
      exchange: Exchange,
      currency: Currency,
      sector: Sector,
      high,
      low,
    };
    const watchlistSetItemAction = createWatchlistSetItemAcion(cleanData);
    dispatch(watchlistSetItemAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const watchlistSetErrorAction = createWatchlistSetErrorAction(errMsg);
    dispatch(watchlistSetErrorAction);
  }
};

export const createAppendToWatchListAction = (
  symbol: string,
) => async (dispatch: Dispatch<WatchlistActions>): Promise<void> => {
  dispatch(watchlistSetLoadingAction);
  try {
    const response = await WatchlistService.addToWatchlist(symbol);
    if (response === 'success') dispatch(watchlistsetSuccessAction);
    setTimeout(() => {
      dispatch(watchlistsetSuccessAction);
    }, 1700);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const watchlistSetErrorAction = createWatchlistSetErrorAction(errMsg);
    dispatch(watchlistSetErrorAction);
  }
};
