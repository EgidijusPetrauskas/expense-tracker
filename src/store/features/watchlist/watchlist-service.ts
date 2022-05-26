/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { StocksWatchListItem } from '../../../types/stock-watchlist-item';
import { getLocalStorage } from '../../../helpers/local-storage-helper';
import { User } from '../../../types/user';

export type WatchlistPromiseType = (symbol: string) => Promise<string>;

namespace WatchlistService {
  export const addToWatchlist: WatchlistPromiseType = async (symbol: string) => {
    let response: 'success' | 'failed';

    const user: User | null = getLocalStorage('user');

    if (!user) {
      throw new Error('You have to Sign in!');
      response = 'failed';
    }

    const { data } = await axios.get<StocksWatchListItem[]>('http://localhost:5000/stock_watchlist');
    // const existingWatchList = data.find((x) => x.userId === user.id);
    const userExists = data.map((item) => item.userId).includes(user.id);
    const items = data.filter((item) => item.userId === user.id).map((item) => [...item.stocks]);

    const [itemSymbols] = items;
    if (itemSymbols.includes(symbol)) {
      throw new Error('Already in you Watchlist');
      response = 'failed';
    }

    if (userExists) {
      const [watchlistItem] = data.filter((item: StocksWatchListItem) => item.userId === user.id);
      await axios.patch<StocksWatchListItem>(
        `http://localhost:5000/stock_watchlist/${user.id}`,
        { stocks: [...watchlistItem.stocks, symbol] },
      );
      response = 'success';
    } else {
      await axios.post<StocksWatchListItem>('http://localhost:5000/stock_watchlist', { userId: user.id, stocks: [symbol] });
      response = 'success';
    }

    return response;
  };
}

export default WatchlistService;
