/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { WatchlistState, WatchlistActions, WatchlistActionType } from './types';

const initialState: WatchlistState = {
  list: [],
  error: null,
  loading: false,
  success: false,
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

    case WatchlistActionType.WATCHLIST_SET_SUCCESS: {
      const current: WatchlistState['success'] = state.success;
      let newVal: WatchlistState['success'];
      if (current) {
        newVal = false;
      } else {
        newVal = true;
      }
      return {
        ...state,
        success: newVal,
      };
    }

    default: return state;
  }
};

export default watchlistReducer;
