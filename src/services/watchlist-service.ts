/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { getLocalStorage } from '../helpers/local-storage-helper';

type AddToWatchListType = (symbol: string) => Promise<string>;
type DeleteFromWatchListType = (symbol: string) => Promise<void>;
type LoadWatchListType = () => Promise<string[]>;

const API_SERVER = process.env.REACT_APP_API_SERVER;
const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

namespace WatchlistService {
  export const loadWatchlist: LoadWatchListType = async () => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.get<{ watchlistItems: string[] }>(
      `${API_SERVER}/api/watchlist`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const { watchlistItems } = data;

    return watchlistItems;
  };

  export const addToWatchlist: AddToWatchListType = async (symbol) => {
    let response: 'success' | 'failed';

    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const watchlist = await loadWatchlist();

    if (watchlist.includes(symbol)) {
      response = 'failed';
      throw new Error(`${symbol} is already in your Watchlist`);
    }

    await axios.post(
      `${API_SERVER}/api/watchlist/add-item`,
      { symbol },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    response = 'success';

    return response;
  };

  export const removeFromWatchlist: DeleteFromWatchListType = async (symbol) => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    await axios.delete(
      `${API_SERVER}/api/watchlist/delete-item/${symbol}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
  };
}

export default WatchlistService;
