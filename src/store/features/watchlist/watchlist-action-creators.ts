import { Dispatch } from 'redux';
import axios from 'axios';
import WatchlistService from './watchlist-service';
import { MainState } from '../../types';
import {
  WatchlistClearListAction,
  WatchlistDeleteItemAction,
  WatchlistRefreshAction,
  WatchlistSetErrorAction,
  WatchlistSetIsSetAction,
  WatchlistSetSuccessAction,
  WatchlistActions,
  WatchlistClearErrorAction,
  WatchlistSetLoadingAction,
  WatchlistSetItemAction,
  WatchlistActionType,
  WatchlistItem,
} from './types';

const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

export const watchlistSetLoadingAction: WatchlistSetLoadingAction = {
  type: WatchlistActionType.WATCHLIST_SET_LOADING,
};

export const watchlistClearErrorAction: WatchlistClearErrorAction = {
  type: WatchlistActionType.WATCHLIST_CLEAR_ERROR,
};

export const watchlistSetIsSetAction: WatchlistSetIsSetAction = {
  type: WatchlistActionType.WATCHLIST_SET_IS_SET,
};

export const watchlistRefreshAction: WatchlistRefreshAction = {
  type: WatchlistActionType.WATCHLIST_REFRESH,
};

export const watchlistClearListAction: WatchlistClearListAction = {
  type: WatchlistActionType.WATCHLIST_CLEAR_LIST,
};

export const createWatchlistSetItemAcion = (itemData: WatchlistItem): WatchlistSetItemAction => ({
  type: WatchlistActionType.WATCHLIST_SET_ITEM,
  payload: itemData,
});

export const createWatchlistDeleteItemAcion = (symbol: WatchlistItem['symbol']): WatchlistDeleteItemAction => ({
  type: WatchlistActionType.WATCHLIST_DELETE_ITEM,
  payload: symbol,
});

export const createWatchlistSetErrorAction = (error: string): WatchlistSetErrorAction => ({
  type: WatchlistActionType.WATCHLIST_SET_ERROR,
  payload: { error },
});

export const createWatchlistSetSuccessAction = (response: boolean | string): WatchlistSetSuccessAction => ({
  type: WatchlistActionType.WATCHLIST_SET_SUCCESS,
  payload: response,
});

export const createWatchlistItemFetchAction = async (
  symbol: string,
  dispatch: Dispatch<WatchlistActions>,
) => {
  try {
    const API_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await axios.get(API_URL);
    const { data } = await response;
    if (data.Note) {
      throw new Error('To many calls to the server. Try in 1 min');
    }
    if (data.Information) {
      throw new Error('Reached maximum requist\'s per day');
    }
    dispatch(watchlistClearErrorAction);
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

export const createSetWatchlistAction = () => async (dispatch: Dispatch<WatchlistActions>, getState: () => MainState): Promise<void> => {
  dispatch(watchlistSetLoadingAction);
  const { watchlist } = getState();
  if (!watchlist.isSet) {
    dispatch(watchlistClearListAction);
    const watchlistList = await WatchlistService.loadWatchlist();
    await watchlistList.forEach((listItem) => createWatchlistItemFetchAction(listItem, dispatch));
    dispatch(watchlistSetIsSetAction);
  }
  dispatch(watchlistSetLoadingAction);
};

export const createAppendToWatchListAction = (
  symbol: string,
) => async (dispatch: Dispatch<WatchlistActions>): Promise<void> => {
  try {
    const response = await WatchlistService.addToWatchlist(symbol);
    if (response === 'success') {
      dispatch(createWatchlistSetSuccessAction(true));
      createWatchlistItemFetchAction(symbol, dispatch);
      setTimeout(() => {
        dispatch(createWatchlistSetSuccessAction(false));
      }, 1700);
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    if (errMsg === `${symbol} is already in your Watchlist`) {
      dispatch(createWatchlistSetSuccessAction(errMsg));
      setTimeout(() => {
        dispatch(createWatchlistSetSuccessAction(false));
      }, 1700);
    } else {
      const watchlistSetErrorAction = createWatchlistSetErrorAction(errMsg);
      dispatch(watchlistSetErrorAction);
    }
  }
};

export const createRemoveFromWatchlistAction = (
  symbol: string,
) => async (dispatch: Dispatch<WatchlistActions>): Promise<void> => {
  try {
    await WatchlistService.removeFromWatchlist(symbol);
    const watchlistDeleteItemAction = createWatchlistDeleteItemAcion(symbol);
    dispatch(watchlistDeleteItemAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const watchlistSetErrorAction = createWatchlistSetErrorAction(errMsg);
    dispatch(watchlistSetErrorAction);
    setTimeout(() => {
      dispatch(watchlistClearErrorAction);
    }, 1700);
  }
};
