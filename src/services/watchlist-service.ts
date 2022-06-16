/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { getLocalStorage } from '../helpers/local-storage-helper';
import { User } from '../types/user';

type AddToWatchListType = (symbol: string) => Promise<string>;
type DeleteFromWatchListType = (symbol: string) => Promise<void>;
type LoadWatchListType = () => Promise<string[]>;

const API_SERVER = process.env.REACT_APP_API_SERVER;
const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

namespace WatchlistService {
  export const addToWatchlist: AddToWatchListType = async (symbol: string) => {
    let response: 'success' | 'failed';

    const user: User | null = getLocalStorage('user');

    if (!user) {
      response = 'failed';
      throw new Error('You have to Sign in!');
    }

    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    const { watchlist } = data;

    if (watchlist.includes(symbol)) {
      throw new Error(`${symbol} is already in your Watchlist`);
      response = 'failed';
    }

    await axios.patch<User>(
      `${API_SERVER}/users/${user.id}`,
      { watchlist: [...watchlist, symbol] },
    );
    response = 'success';

    return response;
  };

  export const removeFromWatchlist: DeleteFromWatchListType = async (symbol: string) => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    const { watchlist } = data;

    await axios.patch<User>(
      `${API_SERVER}/users/${user.id}`,
      { watchlist: watchlist.filter((item) => item !== symbol) },
    );
  };

  export const loadWatchlist: LoadWatchListType = async () => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }
    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    return data.watchlist;
  };
}

export default WatchlistService;
