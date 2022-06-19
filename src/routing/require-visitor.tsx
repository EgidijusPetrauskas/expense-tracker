import React from 'react';

import { Navigate } from 'react-router-dom';

import { selectUserLoggedIn, selectRedirect } from '../store/selectors';
import { useRootSelector } from '../store/hooks';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const redirect = useRootSelector(selectRedirect);
  const loggedIn = useRootSelector(selectUserLoggedIn);

  if (loggedIn) {
    return <Navigate to={redirect ?? '/'} />;
  }

  return children;
};

export default RequireVisitor;
