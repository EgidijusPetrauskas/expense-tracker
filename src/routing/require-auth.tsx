import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { selectUserLoggedIn } from '../store/selectors';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const loggedIn = useRootSelector(selectUserLoggedIn);

  if (!loggedIn) {
    return <Navigate to={`/signin?redirect=${location.pathname}`} />;
  }

  return children;
};

export default RequireAuth;
