/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import {
  Credentials,
  User,
  TempUser,
  UserDetails,
} from '../../../types';

export type AuthPromiseType = (credentials: Credentials) => Promise<User>;

const API_SERVER = process.env.REACT_APP_API_SERVER;

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

    const { data: users } = await axios.get<User[]>(`${API_SERVER}/users?username=${username}`);
    const [fullUser] = users;
    const userDetails = Object.fromEntries(Object.entries(fullUser).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password'));

    return {
      id: user.id,
      username: user.username,
      watchlist: fullUser.watchlist,
      expenses: fullUser.expenses,
      ...userDetails,
    };
  };

  export const register = async ({ username, password }: Credentials) => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users`);
    const userExists = tempUsers.map((user) => user.username).includes(username);

    if (userExists) {
      throw new Error('Username already exists');
    }

    const { data: createdNewUser } = await axios.post(`${API_SERVER}/users`, {
      username, password, watchlist: [], expenses: [],
    });

    const createdUser: User = {
      id: createdNewUser.id,
      username: createdNewUser.username,
      watchlist: createdNewUser.watchlist,
      expenses: createdNewUser.expenses,
    };

    return createdUser;
  };

  export const update = async (user: User | null, userDetails: UserDetails) => {
    if (user === null) {
      throw new Error('Something went wrong..');
    }

    const filteredUserData = Object.fromEntries(Object.entries(userDetails).map((detail) => (
      detail[1] === undefined ? [detail[0], ''] : detail)));

    const fullUserData = {
      ...user,
      ...filteredUserData,
    };

    const {
      firstName, lastName, email, age,
    } = filteredUserData;

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      {
        firstName, lastName, email, age,
      },
    );

    return fullUserData;
  };
}

export default AuthService;
