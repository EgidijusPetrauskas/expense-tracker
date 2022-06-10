import { Expense } from './expense';

export type User = {
  id:string,
  username: string,
  watchlist: string[],
  expenses: Expense[],
  firstName?: string,
  lastName?: string,
  email?: string,
  age?: string,
};

export type UserDetails = Omit<User, 'id' | 'username' | 'watchlist' | 'expenses'>;
