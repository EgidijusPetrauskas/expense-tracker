import { Credentials } from './credentials';

export type UserRegistration = Credentials & {
  repPassword: string
};
