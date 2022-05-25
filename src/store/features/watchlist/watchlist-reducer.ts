/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { WatchlistState, WatchlistActions, WatchlistActionType } from './types';

const initialState: WatchlistState = {
  list: [],
  error: null,
  loading: false,
};

const watchlistReducer: Reducer<WatchlistState, WatchlistActions> = (state = initialState, action) => {
  switch (action.type) {
    case WatchlistActionType.WATCHLIST_SET_ITEM: {
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
          },
        ],
      };
    }

    case WatchlistActionType.WATCHLIST_SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case WatchlistActionType.WATCHLIST_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }

    case WatchlistActionType.WATCHLIST_SET_LOADING: {
      let loading: WatchlistState['loading'];
      if (state.loading) { loading = false; } else { loading = true; }
      return {
        ...state,
        loading,
      };
    }

    default: return state;
  }
};

export default watchlistReducer;
