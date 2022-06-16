/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import { getLocalStorage } from '../helpers/local-storage-helper';

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
const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

namespace UserService {
  export const update = async (user: User | null, userDetails: UserDetails) => {
    if (user === null) {
      throw new Error('Something went wrong..');
    }

    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
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
      `${API_SERVER}/api/user/update`,
      {
        firstName, lastName, email, age,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return fullUserData;
  };

  export const getDetails = async (user: User | null): Promise<Required<UserDetails>> => {
    if (!user) {
      throw new Error('User doesnt exist!');
    }

    const userDetails = Object.fromEntries(Object.entries(user).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password' && detail[0] !== 'watchlist' && detail[0] !== 'expenses')) as Required<UserDetails>;

    return userDetails;
  };
}

export default UserService;
