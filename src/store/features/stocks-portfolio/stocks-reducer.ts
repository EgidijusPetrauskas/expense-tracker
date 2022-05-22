/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { v4 as createId } from 'uuid';

import {
  STOCKS_SET_STOCK, STOCKS_DELETE_STOCK, STOCKS_SET_ERROR, STOCKS_CLEAR_ERROR,
} from './stocks-action-types';
import {
  StocksSetErrorAction,
  StocksActions,
  StocksState,
  StocksSetStockAction,
  StocksDeleteStockAction,
} from './types';

const initialState: StocksState = {
  stocks: [],
  error: null,
};

const stocksReducer: Reducer<StocksState, StocksActions> = (state = initialState, action) => {
  switch (action.type) {
    case STOCKS_SET_STOCK: {
      const { payload } = action as StocksSetStockAction;
      return {
        ...state,
        stocks: [
          ...state.stocks,
          {
            id: createId(),
            symbol: payload['Meta Data']['2. Symbol'],
            chartData:
              Object.entries(payload['Time Series (Daily)']).map((item) => ({
                date: item[0],
                value: Object.values(item[1] as object)[0],
              })),
          },
        ],
      };
    }

    case STOCKS_DELETE_STOCK: {
      const { payload } = action as StocksDeleteStockAction;
      return {
        ...state,
        stocks: state.stocks.filter(({ id }) => id !== payload),
      };
    }

    case STOCKS_SET_ERROR: {
      const { payload } = action as StocksSetErrorAction;
      return {
        ...state,
        error: payload.error,
      };
    }

    case STOCKS_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return { ...state };
  }
};

export default stocksReducer;
