/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { StocksWatchListItem } from '../../../types/stock-watchlist-item';
import { getLocalStorage } from '../../../helpers/local-storage-helper';
import { User } from '../../../types/user';

type AddToWatchListType = (symbol: string) => Promise<string>;
type LoadWatchListType = () => Promise<string[]>;

const API_SERVER = process.env.REACT_APP_API_SERVER;
const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

namespace WatchlistService {
  export const addToWatchlist: AddToWatchListType = async (symbol: string) => {
    let response: 'success' | 'failed';

    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);

    if (!user) {
      throw new Error('You have to Sign in!');
      response = 'failed';
    }

    const { data } = await axios.get<StocksWatchListItem[]>(`${API_SERVER}/users_watchlist`);
    const existingWatchListItem = data.find((item: StocksWatchListItem) => item.userId === user.id);

    if (existingWatchListItem?.stocks.includes(symbol)) {
      throw new Error('Already in you Watchlist');
      response = 'failed';
    }

    if (existingWatchListItem) {
      await axios.patch<StocksWatchListItem>(
        `${API_SERVER}/stock_watchlist/${user.id}`,
        { stocks: [...existingWatchListItem.stocks, symbol] },
      );
      response = 'success';
    } else {
      await axios.post<StocksWatchListItem>(
        `${API_SERVER}/users_watchlist`,
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
    const { data } = await axios.get<StocksWatchListItem>(`${API_SERVER}/users_watchlist/${user.id}`);
    return data.stocks;
  };
}

export default WatchlistService;
