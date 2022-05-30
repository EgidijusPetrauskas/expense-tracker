import axios from 'axios';
import { Credentials, User, TempUser } from '../../../types';
import { StocksWatchListItem } from '../../../types/stock-watchlist-item';

export type AuthPromiseType = (credentials: Credentials) => Promise<User>;

const API_SERVER = process.env.REACT_APP_API_SERVER;

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthService {
  export const login: AuthPromiseType = async ({ username, password }: Credentials): Promise<User> => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users?username=${username}`);
    if (tempUsers.length === 0) {
      throw new Error('This username doesnt exist');
    }

    const [user] = tempUsers;

    if (user.password !== password) {
      throw new Error('Wrong Password');
    }

    return {
      id: user.id,
      username: user.username,
    };
  };

  export const register = async ({ username, password }: Credentials) => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users`);
    const userExists = tempUsers.map((user) => user.username).includes(username);

    if (userExists) {
      throw new Error('Username already exists');
    }

    const { data: createdNewUser } = await axios.post(`${API_SERVER}/users`, { username, password });
    await axios.post<StocksWatchListItem>(
      `${API_SERVER}/users_watchlist`,
      { userId: createdNewUser.id, stocks: [] },
    );

    const createdUser: User = {
      id: createdNewUser.id,
      username: createdNewUser.username,
    };

    return createdUser;
  };
}

export default AuthService;
