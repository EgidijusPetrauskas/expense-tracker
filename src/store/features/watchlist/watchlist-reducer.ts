/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { WatchlistState, WatchlistActions, WatchlistActionType } from './types';

const initialState: WatchlistState = {
  list: [],
  error: null,
  loading: false,
  appendSuccess: false,
  isSet: false,
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

    case WatchlistActionType.WATCHLIST_DELETE_ITEM: {
      return {
        ...state,
        list: state.list.filter((item) => item.symbol !== action.payload),
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
      return {
        ...state,
        appendSuccess: action.payload,
      };
    }

    case WatchlistActionType.WATCHLIST_SET_IS_SET: {
      return {
        ...state,
        isSet: true,
      };
    }

    case WatchlistActionType.WATCHLIST_REFRESH: {
      return {
        ...state,
        isSet: false,
      };
    }

    case WatchlistActionType.WATCHLIST_CLEAR_LIST: {
      return {
        ...state,
        list: [],
        isSet: false,
      };
    }

    default: return state;
  }
};

export default watchlistReducer;
