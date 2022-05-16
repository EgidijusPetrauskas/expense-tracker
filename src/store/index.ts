import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension/';
import mainReducer from './main-reducer';

const store = createStore(
  mainReducer,
  composeWithDevTools(),
);

export default store;
