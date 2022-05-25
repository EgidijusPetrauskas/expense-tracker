import { MainState } from '../../types';

export const selectStocks = (state: MainState) => state.stocks.stocks;

export const selectStocksError = (state: MainState) => state.stocks.error;

export const selectStocksLoading = (state: MainState) => state.stocks.loading;
