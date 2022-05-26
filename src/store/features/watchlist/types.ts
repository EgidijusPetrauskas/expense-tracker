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
  success: boolean,
};

export enum WatchlistActionType {
  WATCHLIST_SET_ITEM = 'WATCHLIST_SET_ITEM',
  WATCHLIST_SET_ERROR = 'WATCHLIST_SET_ERROR',
  WATCHLIST_CLEAR_ERROR = 'WATCHLIST_CLEAR_ERROR',
  WATCHLIST_SET_LOADING = 'WATCHLIST_SET_LOADING',
  WATCHLIST_SET_SUCCESS = 'WATCHLIST_SET_SUCCESS',
}

export type WatchlistSetItemAction = {
  type: WatchlistActionType.WATCHLIST_SET_ITEM,
  payload: WatchlistItem
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
  type: WatchlistActionType.WATCHLIST_SET_SUCCESS
};

export type WatchlistActions = WatchlistSetItemAction | WatchlistSetErrorAction | WatchlistClearErrorAction | WatchlistSetLoadingAction | WatchlistSetSuccessAction;
