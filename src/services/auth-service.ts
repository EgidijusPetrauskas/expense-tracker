/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import { formatError, isResponseError } from '../helpers/service-helpers';

import {
  Credentials,
  User,
  UserDetails,
} from '../types';

export type AuthResponseBody = {
  user: User,
  token: string,
};

const API_SERVER = process.env.REACT_APP_API_SERVER;

namespace AuthService {
  export const login = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const { data } = await axios.post<AuthResponseBody>(`${API_SERVER}/api/auth/login`, credentials);

      const userDetails = Object.fromEntries(Object.entries(data.user).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password' && detail[0] !== 'watchlist' && detail[0] !== 'user_expenses'));

      return {
        user: {
          ...data.user,
          ...userDetails,
        },
        token: data.token,
      };
    } catch (error) {
      throw new Error(formatError(error));
    }
  };

  export const register = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const { data } = await axios.post<AuthResponseBody>(`${API_SERVER}/api/auth/register`, credentials);

      return data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  };

  export const authenticate = async (token: string): Promise<AuthResponseBody> => {
    try {
      const response = await axios.post<AuthResponseBody>(`${API_SERVER}/api/auth/authenticate`, {}, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (err) {
      if (isResponseError(err)) {
        throw new Error(err.response.data.error);
      }
      throw (err);
    }
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

  export const getDetails = async (username : Credentials['username'] | undefined): Promise<Required<UserDetails>> => {
    if (username === undefined) {
      throw new Error('User doesnt exist!');
    }
    const { data: users } = await axios.get<User[]>(`${API_SERVER}/users?username=${username}`);
    const [fullUser] = users;
    const userDetails = Object.fromEntries(Object.entries(fullUser).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password' && detail[0] !== 'watchlist' && detail[0] !== 'expenses')) as Required<UserDetails>;

    return userDetails;
  };

  export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      const response = await axios.get<{ valid: boolean }>(`${API_SERVER}/api/auth/check-username?username=${username}`);
      return response.data.valid;
    } catch (err) {
      throw new Error(formatError(err));
    }
  };
}

export default AuthService;
