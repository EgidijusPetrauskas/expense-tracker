/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { v4 as createId } from 'uuid';

import {
  StocksActions,
  StocksState,
  StocksActionType,
} from './types';

const initialState: StocksState = {
  stocks: [],
  error: null,
  loading: false,
};

const stocksReducer: Reducer<StocksState, StocksActions> = (state = initialState, action) => {
  switch (action.type) {
    case StocksActionType.STOCKS_SET_STOCK: {
      return {
        ...state,
        stocks: [
          ...state.stocks,
          {
            id: createId(),
            symbol: action.payload['Meta Data']['2. Symbol'],
            chartData:
              Object.entries(action.payload['Time Series (Daily)']).map((item) => ({
                date: item[0],
                price: Object.values(item[1] as object)[0],
              })).reverse(),
          },
        ],
        loading: false,
      };
    }

    case StocksActionType.STOCKS_DELETE_STOCK: {
      return {
        ...state,
        stocks: state.stocks.filter(({ id }) => id !== action.payload),
      };
    }

    case StocksActionType.STOCKS_SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case StocksActionType.STOCKS_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }

    case StocksActionType.STOCKS_SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    default:
      return { ...state };
  }
};

export default stocksReducer;
