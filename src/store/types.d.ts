import { AuthActions, AuthState } from './features/auth/types';
import { NavActions, NavState } from './features/navigation/types';
import { StocksActions, StocksState } from './features/stocks-portfolio/types';

export type MainState = {
  auth: AuthState,
  navigation: NavState,
  stocks: StocksState
};

export type GlobalActions = AuthActions | NavActions | StocksActions;

export type AppDispatch = ThunkDispatch<RootState, undefined, GlobalActions>;
