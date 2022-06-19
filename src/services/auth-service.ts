/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import {
  Credentials,
  User,
} from '../types';

import { formatError, isResponseError } from '../helpers/service-helpers';

export type AuthResponseBody = {
  user: User,
  token: string,
};

type LoginRegisterType = (credentials: Credentials) => Promise<AuthResponseBody>;
type AuthenticateType = (token: string) => Promise<AuthResponseBody>;
type CheckUsernameAvailabilityType = (username: string) => Promise<boolean>;

const API_SERVER = process.env.REACT_APP_API_SERVER;

namespace AuthService {
  export const login: LoginRegisterType = async (credentials) => {
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

  export const register: LoginRegisterType = async (credentials) => {
    try {
      const { data } = await axios.post<AuthResponseBody>(`${API_SERVER}/api/auth/register`, credentials);

      return data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  };

  export const authenticate: AuthenticateType = async (token) => {
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

  export const checkUsernameAvailability: CheckUsernameAvailabilityType = async (username) => {
    try {
      const response = await axios.get<{ valid: boolean }>(`${API_SERVER}/api/auth/check-username?username=${username}`);
      return response.data.valid;
    } catch (err) {
      throw new Error(formatError(err));
    }
  };
}

export default AuthService;
