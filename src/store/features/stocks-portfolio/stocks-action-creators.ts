/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { Dispatch } from 'redux';
import { STOCKS_DELETE_STOCK, STOCKS_SET_STOCK } from '../../action-types';
import { STOCKS_SET_ERROR, STOCKS_CLEAR_ERROR } from './stocks-action-types';
import {
  StocksClearErrorAction, StocksSetErrorAction,
  StocksActions,
  StocksDeleteStockAction,
  ResponseStock,
  StocksSetStockAction,
  Stock,
} from './types';

export const createStocksSetStockAction = (stockData: ResponseStock): StocksSetStockAction => ({
  type: STOCKS_SET_STOCK,
  payload: stockData,
});

export const createStocksDeleteStockAction = (id: Stock['id']): StocksDeleteStockAction => ({
  type: STOCKS_DELETE_STOCK,
  payload: id,
});

export const createStocksSetErrorAction = (error: string): StocksSetErrorAction => ({
  type: STOCKS_SET_ERROR,
  payload: { error },
});

export const stocksClearErrorAction: StocksClearErrorAction = {
  type: STOCKS_CLEAR_ERROR,
};

export const createStocksFetchStockAction = (
  symbol: string,
) => async (dispatch: Dispatch<StocksActions>): Promise<void> => {
  try {
    const API_KEY = 'GA62GOU1YT7XJ0OP';
    const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
    const response = await axios.get(API_URL);
    const { data } = await response;
    const stocksSetStockAction = createStocksSetStockAction(data);
    dispatch(stocksSetStockAction);
  } catch (err) {
    const { message } = err as Error;
    const stocksSetErrorAction = createStocksSetErrorAction(message);
    dispatch(stocksSetErrorAction);
  }
};
