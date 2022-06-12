export type User = {
  id:string,
  username: string,
  watchlist: string[],
  user_expenses: string[],
  firstName?: string,
  lastName?: string,
  email?: string,
  age?: string,
};

export type UserDetails = Omit<User, 'id' | 'username' | 'watchlist' | 'user_expenses'>;
