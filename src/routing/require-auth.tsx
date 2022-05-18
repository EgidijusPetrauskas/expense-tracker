import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { State } from '../store/types';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const loggedIn = useRootSelector((state: State) => Boolean(state.auth.user));
  if (!loggedIn) {
    return <Navigate to={`/signin?next=${location.pathname}`} />;
  }

  return children;
};

export default RequireAuth;
