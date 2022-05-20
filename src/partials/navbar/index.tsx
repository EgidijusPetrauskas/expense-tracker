import React from 'react';

import { AppBar } from '@mui/material';

import NavBarVisitorMenu from './navbar-visitor-menu';
import NavBarAuthMenu from './navbar-auth-menu';
import { useRootSelector } from '../../store/hooks';
import { selectLoggedIn } from '../../store/selectors';

const NavBar: React.FC = () => {
  const loggedIn = useRootSelector(selectLoggedIn);
  return (
    <AppBar
      color="transparent"
      sx={{
        alignItems: 'center',
        boxShadow: 'none',
        position: 'absolute',
      }}
    >
      { loggedIn ? <NavBarAuthMenu /> : <NavBarVisitorMenu />}
    </AppBar>
  );
};

export default NavBar;
