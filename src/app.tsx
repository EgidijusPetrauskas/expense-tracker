import React from 'react';

import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { useRootSelector, useRootDispatch } from './store/hooks';
import { selectAuthToken, selectUserLoggedIn } from './store/features/auth-and-user/auth-selectors';
import { createAuthenticateActionThunk } from './store/action-creators';

import RequireVisitor from './routing/require-visitor';
import RequireAuth from './routing/require-auth';
import HomePage from './pages/home-page/index';
import AboutPage from './pages/about-page';
import RegisterPage from './pages/register-page';
import SignInPage from './pages/sign-in-page';
import MainLayout from './layouts/main-layout';
import BudgetPage from './pages/budget-page/index';
import ProfilePage from './pages/profile-page/index';
import AnalysisPageLayout from './layouts/analysis-page-layout';
import AnalysisSection from './pages/analysis-page/sections/analysis';
import WatchlistSection from './pages/analysis-page/sections/stock-watchlist/index';
import ResearchSection from './pages/analysis-page/sections/stock-research/index';
import InfoCard from './pages/analysis-page/components/general-info-card';

const App: React.FC = () => {
  const location = useLocation();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectUserLoggedIn);
  const dispatch = useRootDispatch();

  if (!loggedIn && token) {
    dispatch(createAuthenticateActionThunk(token, location.pathname));
    return <div />;
  }
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/register"
          element={(
            <RequireVisitor>
              <RegisterPage />
            </RequireVisitor>
        )}
        />
        <Route
          path="/signin"
          element={(
            <RequireVisitor>
              <SignInPage />
            </RequireVisitor>
            )}
        />
        <Route
          path="/analysis"
          element={(
            <RequireAuth>
              <AnalysisPageLayout />
            </RequireAuth>
          )}
        >
          <Route index element={<InfoCard />} />
          <Route
            path="/analysis/analysis"
            element={(
              <RequireAuth>
                <AnalysisSection />
              </RequireAuth>
                        )}
          />
          <Route
            path="/analysis/watchlist"
            element={(
              <RequireAuth>
                <WatchlistSection />
              </RequireAuth>
                        )}
          />
          <Route
            path="/analysis/research"
            element={(
              <RequireAuth>
                <ResearchSection />
              </RequireAuth>
                        )}
          />
        </Route>
        <Route
          path="/budget"
          element={(
            <RequireAuth>
              <BudgetPage />
            </RequireAuth>
            )}
        />
        <Route
          path="/profile"
          element={(
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
            )}
        />
      </Route>
    </Routes>
  );
};

export default App;
