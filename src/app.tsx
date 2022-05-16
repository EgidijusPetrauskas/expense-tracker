import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import RequireVisitor from './routing/require-visitor';
import RequireAuth from './routing/require-auth';
import HomePage from './pages/home-page/index';
import AboutPage from './pages/about-page';
import RegisterPage from './pages/register-page';
import SignInPage from './pages/sign-in-page';
import MainLayout from './layouts/main-layout';
import AnalysisPage from './pages/analysis-page/index';
import MyBudgetPage from './pages/my-budget-page/index';
import ProfilePage from './pages/profile-page/index';

const App: React.FC = () => (
  <BrowserRouter>
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
              <AnalysisPage />
            </RequireAuth>
            )}
        />
        <Route
          path="/budget"
          element={(
            <RequireAuth>
              <MyBudgetPage />
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
  </BrowserRouter>
);

export default App;
