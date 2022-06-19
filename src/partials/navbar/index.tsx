import React from 'react';

import { AppBar, useMediaQuery, useTheme } from '@mui/material';

import { selectUserLoggedIn } from '../../store/selectors';
import { useRootSelector } from '../../store/hooks';

import NavBarVisitorMenu from './navbar-visitor-menu';
import NavBarAuthMenu from './navbar-auth-menu';
import SideMenu from './side-menu';

const NavBar: React.FC = () => {
  const loggedIn = useRootSelector(selectUserLoggedIn);
  const theme = useTheme();
  const smallerThanMd = useMediaQuery(theme.breakpoints.down('md'));

  if (smallerThanMd) return <SideMenu />;

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
