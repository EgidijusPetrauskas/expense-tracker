import axios from 'axios';
import { Credentials, User, TempUser } from '../../../types';

export type AuthPromiseType = (credentials: Credentials) => Promise<User>;

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthService {
  export const login: AuthPromiseType = async ({ username, password }: Credentials): Promise<User> => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`http://localhost:5000/users?username=${username}`);
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
    const { data: tempUsers } = await axios.get<TempUser[]>('http://localhost:5000/users');
    const userExists = tempUsers.map((user) => user.username).includes(username);

    if (userExists) {
      throw new Error('Username already exists');
    }

    const { data: createdNewUser } = await axios.post('http://localhost:5000/users', { username, password });

    const createdUser: User = {
      id: createdNewUser.id,
      username: createdNewUser.username,
    };

    return createdUser;
  };
}

export default AuthService;
