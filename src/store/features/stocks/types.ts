export type StocksState = {
  stocks: Stock[],
  error: string | null,
  loading: boolean,
};

export type ChartData = {
  date: string,
  price: string,
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

export enum StocksActionType {
  STOCKS_SET_STOCK = 'STOCKS_SET_STOCK',
  STOCKS_DELETE_STOCK = 'STOCKS_DELETE_STOCK',
  STOCKS_SET_ERROR = 'STOCKS_SET_ERROR',
  STOCKS_CLEAR_ERROR = 'STOCKS_CLEAR_ERROR',
  STOCKS_SET_LOADING = 'STOCKS_SET_LOADING',

}

export type StocksSetStockAction = {
  type: StocksActionType.STOCKS_SET_STOCK,
  payload: ResponseStock
};

export type StocksDeleteStockAction = {
  type: StocksActionType.STOCKS_DELETE_STOCK,
  payload: string
};

export type StocksSetErrorAction = {
  type: StocksActionType.STOCKS_SET_ERROR,
  payload: {
    error: string
  }
};

export type StocksClearErrorAction = {
  type: StocksActionType.STOCKS_CLEAR_ERROR,
};

export type StocksSetLoadingAction = {
  type: StocksActionType.STOCKS_SET_LOADING,
};

export type StocksActions = StocksSetStockAction | StocksDeleteStockAction | StocksSetErrorAction | StocksClearErrorAction | StocksSetLoadingAction;
