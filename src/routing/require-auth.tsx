import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const logedIn = localStorage.getItem('user');

  if (!logedIn) {
    return <Navigate to={`/signin?next=${location.pathname}`} />;
  }

  return children;
};

export default RequireAuth;
