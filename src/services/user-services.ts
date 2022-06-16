/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

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

namespace UserService {
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

  export const getDetails = async (username: Credentials['username'] | undefined): Promise<Required<UserDetails>> => {
    if (username === undefined) {
      throw new Error('User doesnt exist!');
    }
    const { data: users } = await axios.get<User[]>(`${API_SERVER}/users?username=${username}`);
    const [fullUser] = users;
    const userDetails = Object.fromEntries(Object.entries(fullUser).filter((detail) => detail[0] !== 'id' && detail[0] !== 'username' && detail[0] !== 'password' && detail[0] !== 'watchlist' && detail[0] !== 'expenses')) as Required<UserDetails>;

    return userDetails;
  };
}

export default UserService;
