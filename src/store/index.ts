import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension/';
import thunk from 'redux-thunk';
import mainReducer from './main-reducer';

const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools(),
  ),
);

export default store;
