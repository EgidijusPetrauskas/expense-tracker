export type WatchlistItem = {
  id: string,
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
  error: string | null
};

export enum WatchlistActionType {
  WATCHLIST_SET_ITEM = 'WATCHLIST_SET_ITEM',
  WATCHLIST_SET_ERROR = 'WATCHLIST_SET_ERROR',
  WATCHLIST_CLEAR_ERROR = 'WATCHLIST_CLEAR_ERROR',
  WATCHLIST_SET_LOADING = 'WATCHLIST_SET_LOADING',
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

export type WatchlistActions = WatchlistSetItemAction | WatchlistSetErrorAction | WatchlistClearErrorAction | WatchlistSetLoadingAction;
