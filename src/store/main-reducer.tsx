import { combineReducers } from 'redux';
import authReducer from './features/auth/auth-reducer';
import navReducer from './features/navigation/nav-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  navigation: navReducer,
});

export default mainReducer;
