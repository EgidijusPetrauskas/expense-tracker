import { AuthActions, AuthState } from './features/auth/types';
import { NavActions, NavState } from './features/navigation/types';
import { StocksActions, StocksState } from './features/stocks/types';
import { WatchlistActions, WatchlistState } from './features/watchlist/types';

export type MainState = {
  auth: AuthState,
  navigation: NavState,
  stocks: StocksState,
  watchlist: WatchlistState
};

export type GlobalActions = AuthActions | NavActions | StocksActions | WatchlistActions;

export type AppDispatch = ThunkDispatch<RootState, undefined, GlobalActions>;
