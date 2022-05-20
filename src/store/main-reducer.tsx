import { combineReducers } from 'redux';
import authReducer from './features/auth/auth-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
});

export default mainReducer;
