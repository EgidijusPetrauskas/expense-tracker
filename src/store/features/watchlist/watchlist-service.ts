/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { StocksWatchListItem } from '../../../types/stock-watchlist-item';
import { getLocalStorage } from '../../../helpers/local-storage-helper';
import { User } from '../../../types/user';

type AddToWatchListType = (symbol: string) => Promise<string>;
type LoadWatchListType = () => Promise<string[]>;

namespace WatchlistService {
  export const addToWatchlist: AddToWatchListType = async (symbol: string) => {
    let response: 'success' | 'failed';

    const user: User | null = getLocalStorage('user');

    if (!user) {
      throw new Error('You have to Sign in!');
      response = 'failed';
    }

    const { data } = await axios.get<StocksWatchListItem[]>(
      'http://localhost:5000/stock_watchlist',
    );
    const existingWatchListItem = data.find((item: StocksWatchListItem) => item.userId === user.id);

    if (existingWatchListItem?.stocks.includes(symbol)) {
      throw new Error('Already in you Watchlist');
      response = 'failed';
    }

    if (existingWatchListItem) {
      await axios.patch<StocksWatchListItem>(
        `http://localhost:5000/stock_watchlist/${user.id}`,
        { stocks: [...existingWatchListItem.stocks, symbol] },
      );
      response = 'success';
    } else {
      await axios.post<StocksWatchListItem>(
        'http://localhost:5000/stock_watchlist',
        { userId: user.id, stocks: [symbol] },
      );
      response = 'success';
    }
    return response;
  };

  export const loadWatchlist: LoadWatchListType = async () => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }
    const { data } = await axios.get<StocksWatchListItem>(
      `http://localhost:5000/stock_watchlist/${user.id}`,
    );
    return data.stocks;
  };
}

export default WatchlistService;
