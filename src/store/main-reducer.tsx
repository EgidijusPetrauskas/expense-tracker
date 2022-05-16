import { Reducer } from 'redux';
import { Action, State } from './types';
import ActionTypes from './action-types';

const initialState: State = {
  users: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const mainReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        users: [
          ...state.users,
          {
            username: action.payload,
          },
        ],
      };
    default:
      return { ...state };
  }
};

export default mainReducer;
