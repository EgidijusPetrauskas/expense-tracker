import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { selectLoggedIn } from '../store/selectors';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const loggedIn = useRootSelector(selectLoggedIn);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireVisitor;
