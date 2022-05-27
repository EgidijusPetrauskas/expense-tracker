export type WatchlistItem = {
  symbol: string,
  exchange: string,
  currency: string,
  sector: string,
  high: string,
  low: string,
};

export type WatchlistState = {
  list: WatchlistItem[],
  loading: boolean,
  error: string | null,
  appendSuccess: boolean | string,
  isSet: boolean
};

export enum WatchlistActionType {
  WATCHLIST_SET_ITEM = 'WATCHLIST_SET_ITEM',
  WATCHLIST_DELETE_ITEM = 'WATCHLIST_DELETE_ITEM',
  WATCHLIST_SET_ERROR = 'WATCHLIST_SET_ERROR',
  WATCHLIST_CLEAR_ERROR = 'WATCHLIST_CLEAR_ERROR',
  WATCHLIST_SET_LOADING = 'WATCHLIST_SET_LOADING',
  WATCHLIST_SET_SUCCESS = 'WATCHLIST_SET_SUCCESS',
  WATCHLIST_SET_IS_SET = 'WATCHLIST_SET_IS_SET',
  WATCHLIST_REFRESH = 'WATCHLIST_REFRESH',
}

export type WatchlistSetItemAction = {
  type: WatchlistActionType.WATCHLIST_SET_ITEM,
  payload: WatchlistItem
};

export type WatchlistDeleteItemAction = {
  type: WatchlistActionType.WATCHLIST_DELETE_ITEM,
  payload: string
};

export type WatchlistSetErrorAction = {
  type: WatchlistActionType.WATCHLIST_SET_ERROR
  payload: {
    error: string
  }
};

export type WatchlistClearErrorAction = {
  type: WatchlistActionType.WATCHLIST_CLEAR_ERROR
};

export type WatchlistSetLoadingAction = {
  type: WatchlistActionType.WATCHLIST_SET_LOADING
};

export type WatchlistSetSuccessAction = {
  type: WatchlistActionType.WATCHLIST_SET_SUCCESS,
  payload: boolean | string
};

export type WatchlistSetIsSetAction = {
  type: WatchlistActionType.WATCHLIST_SET_IS_SET
};

export type WatchlistRefreshAction = {
  type: WatchlistActionType.WATCHLIST_REFRESH
};

export type WatchlistActions = WatchlistSetItemAction | WatchlistDeleteItemAction | WatchlistSetErrorAction | WatchlistClearErrorAction | WatchlistSetLoadingAction | WatchlistSetSuccessAction | WatchlistSetIsSetAction | WatchlistRefreshAction;
