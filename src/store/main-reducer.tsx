import { combineReducers } from 'redux';
import authReducer from './features/auth/auth-reducer';
import navReducer from './features/navigation/nav-reducer';
import stocksReducer from './features/stocks-portfolio/stocks-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  navigation: navReducer,
  stocks: stocksReducer,
});

export default mainReducer;
