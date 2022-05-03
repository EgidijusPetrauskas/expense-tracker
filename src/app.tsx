import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './pages/home-page/index';
import AboutPage from './pages/about-page';
import RegisterPage from './pages/register-page';
import SignInPage from './pages/sign-in-page';
import MainLayout from './layouts/main-layout';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
