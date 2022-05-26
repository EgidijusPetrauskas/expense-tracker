import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import RequireVisitor from './routing/require-visitor';
import RequireAuth from './routing/require-auth';
import HomePage from './pages/home-page/index';
import AboutPage from './pages/about-page';
import RegisterPage from './pages/register-page';
import SignInPage from './pages/sign-in-page';
import MainLayout from './layouts/main-layout';
import BudgetPage from './pages/budget-page/index';
import ProfilePage from './pages/profile-page/index';
import store from './store/index';
import AnalysisPageLayout from './layouts/analysis-page-layout';
import AnalysisSection from './pages/analysis-page/sections/analysis';
import WatchlistSection from './pages/analysis-page/sections/stock-watchlist/index';
import ResearchSection from './pages/analysis-page/sections/stock-research/index';
import InfoCard from './pages/analysis-page/components/info-card';

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
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
          <Route path="/analysis" element={<AnalysisPageLayout />}>
            <Route index element={<InfoCard />} />
            <Route path="/analysis/analysis" element={<AnalysisSection />} />
            <Route path="/analysis/watchlist" element={<WatchlistSection />} />
            <Route path="/analysis/research" element={<ResearchSection />} />
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
    </Provider>
  </BrowserRouter>
);

export default App;
