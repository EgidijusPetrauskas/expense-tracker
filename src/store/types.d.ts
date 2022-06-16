import { AuthActions, AuthState } from './features/auth-and-user/types';
import { NavActions, NavState } from './features/navigation/types';
import { StocksActions, StocksState } from './features/stocks/types';
import { WatchlistActions, WatchlistState } from './features/watchlist/types';
import { BudgetState, BudgetActions } from './features/budget/types';

export type MainState = {
  auth: AuthState,
  navigation: NavState,
  stocks: StocksState,
  watchlist: WatchlistState,
  budget: BudgetState
};

export type GlobalActions = AuthActions | NavActions | StocksActions | WatchlistActions | BudgetActions;

export type AppDispatch = ThunkDispatch<RootState, undefined, GlobalActions>;
