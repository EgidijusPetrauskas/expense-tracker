import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { selectLoggedIn, selectRedirect } from '../store/selectors';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const redirect = useRootSelector(selectRedirect);
  const loggedIn = useRootSelector(selectLoggedIn);

  if (loggedIn) {
    return <Navigate to={redirect ?? '/'} />;
  }

  return children;
};

export default RequireVisitor;
