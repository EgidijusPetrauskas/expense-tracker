export type User = {
  username: string
};

export type State = {
  users: User[]
};

export type Action = {
  type: string,
  payload: any,
};
