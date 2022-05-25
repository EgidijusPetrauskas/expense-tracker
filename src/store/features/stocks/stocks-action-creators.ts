/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import axios from 'axios';

import {
  StocksSetLoadingAction,
  StocksClearErrorAction, StocksSetErrorAction,
  StocksActions,
  StocksDeleteStockAction,
  ResponseStock,
  StocksSetStockAction,
  Stock,
  StocksActionType,
} from './types';

export const createStocksSetStockAction = (stockData: ResponseStock): StocksSetStockAction => ({
  type: StocksActionType.STOCKS_SET_STOCK,
  payload: stockData,
});

export const createStocksDeleteStockAction = (id: Stock['id']): StocksDeleteStockAction => ({
  type: StocksActionType.STOCKS_DELETE_STOCK,
  payload: id,
});

export const createStocksSetErrorAction = (error: string): StocksSetErrorAction => ({
  type: StocksActionType.STOCKS_SET_ERROR,
  payload: { error },
});

export const stocksClearErrorAction: StocksClearErrorAction = {
  type: StocksActionType.STOCKS_CLEAR_ERROR,
};

export const stocksSetLoadingAction: StocksSetLoadingAction = {
  type: StocksActionType.STOCKS_SET_LOADING,
};

export const createStocksFetchStockAction = (
  symbol: string,
) => async (dispatch: Dispatch<StocksActions>): Promise<void> => {
  dispatch(stocksSetLoadingAction);
  try {
    const API_KEY = 'GA62GOU1YT7XJ0OP';
    const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
    const response = await axios.get(API_URL);
    const { data } = await response;
    const stocksSetStockAction = createStocksSetStockAction(data);
    dispatch(stocksSetStockAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const stocksSetErrorAction = createStocksSetErrorAction(errMsg);
    dispatch(stocksSetErrorAction);
  }
};
