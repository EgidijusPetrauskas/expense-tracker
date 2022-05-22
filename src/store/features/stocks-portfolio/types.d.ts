import {
  STOCKS_SET_STOCK, STOCKS_DELETE_STOCK, STOCKS_CLEAR_ERROR, STOCKS_SET_ERROR,
} from './stocks-action-types';

export type StocksState = {
  stocks: Stocks[],
  error: string | null,
};

export type ChartData = {
  date: string,
  value: string,
};

export type Stock = {
  id: string,
  symbol: string,
  chartData: ChartData[]
};

export type ResponseStock = {
  'Meta Data': {
    '1. Information': string,
    '2. Symbol': string,
    '3. Last Refreshed': string,
    '4. Output Size': string,
    '5. Time Zone': string,
  },
  'Time Series (Daily)': object
};

export type StocksSetStockAction = {
  type: typeof STOCKS_SET_STOCK,
  payload: ResponseStock
};

export type StocksDeleteStockAction = {
  type: typeof STOCKS_DELETE_STOCK,
  payload: string
};

export type StocksSetErrorAction = {
  type: typeof STOCKS_SET_ERROR,
  payload: {
    error: string
  }
};

export type StocksClearErrorAction = {
  type: typeof STOCKS_CLEAR_ERROR,
};

export type StocksActions = StocksSetStockAction | StocksDeleteStockAction | StocksSetErrorAction | StocksClearErrorAction;
