import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { State } from '../store/types';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const loggedIn = useRootSelector((state: State) => Boolean(state.auth.user));

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireVisitor;
