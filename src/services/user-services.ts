/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import {
  User,
  UserDetails,
} from '../types';

import { getLocalStorage } from '../helpers/local-storage-helper';

export type AuthResponseBody = {
  user: User,
  token: string,
};

type UpdateType = (user: User | null, userDetails: UserDetails) =>Promise<User>;
type GetUserDetailsType = (user: User | null) => Promise<Required<UserDetails>>;
type DeleteUseType = (id: string) => Promise<string>;

const API_SERVER = process.env.REACT_APP_API_SERVER;
const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

namespace UserService {
  export const update: UpdateType = async (user, userDetails) => {
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

  export const getDetails: GetUserDetailsType = async (user) => {
    if (!user) {
      throw new Error('User doesnt exist!');
    }

    const userDetails = Object.fromEntries(Object.entries(user).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password' && detail[0] !== 'watchlist' && detail[0] !== 'expenses')) as Required<UserDetails>;

    return userDetails;
  };

  export const deleteUser: DeleteUseType = async (id) => {
    if (!id) {
      throw new Error('User doesnt exist!');
    }

    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data: deletedUsername } = await axios.delete(
      `${API_SERVER}/api/user/remove/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    localStorage.removeItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);

    return deletedUsername;
  };
}

export default UserService;
