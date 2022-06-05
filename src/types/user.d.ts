export type User = {
  id:string,
  username: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  age?: string,
};

export type UserDetails = Omit<User, 'id' | 'username'>;
