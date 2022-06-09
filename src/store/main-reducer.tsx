import { combineReducers } from 'redux';
import authReducer from './features/auth/auth-reducer';
import navReducer from './features/navigation/nav-reducer';
import stocksReducer from './features/stocks/stocks-reducer';
import watchlistReducer from './features/watchlist/watchlist-reducer';
import budgetReducer from './features/budget/budget-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  navigation: navReducer,
  stocks: stocksReducer,
  watchlist: watchlistReducer,
  budget: budgetReducer,
});

export default mainReducer;
