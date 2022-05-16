import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const logedIn = localStorage.getItem('user');
  if (logedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireVisitor;
