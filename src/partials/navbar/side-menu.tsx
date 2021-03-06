/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { Button, Drawer, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectUserLoggedIn } from '../../store/selectors';
import { authSetLogoutAction } from '../../store/action-creators';

import NavBarVisitorMenu from './navbar-visitor-menu';
import NavBarAuthMenu from './navbar-auth-menu';
import Logo from '../../components/logo';

import LogoLg from '../../images/logo-lg.png';
import Avatar from '../../images/avatar.svg';

const SideMenu: React.FC = () => {
  const loggedIn = useRootSelector(selectUserLoggedIn);
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useRootDispatch();

  const handleLogOut = () => {
    dispatch(authSetLogoutAction);
  };

  const toggleDrawer = (open: boolean) => (e: React.MouseEvent<HTMLElement>) => {
    setSideMenu(open);
  };

  return (
    <Box
      sx={{
        width: 1,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      {loggedIn
        ? <Logo src={Avatar} width={70} />
        : <Logo src={LogoLg} width={70} />}
      <Button sx={{ position: 'absolute', right: 0 }} onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 32 }} />
      </Button>
      <Drawer
        anchor="left"
        open={sideMenu}
        onClick={toggleDrawer(false)}
        sx={(theme) => ({
          '& .MuiDrawer-paper': {
            background: theme.palette.secondary.dark,
          },
        })}
      >
        {loggedIn ? <NavBarAuthMenu /> : <NavBarVisitorMenu />}
        {loggedIn && (
          <Box sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            pt: 5,
          }}
          >
            <Button>
              <AccountBoxIcon
                onClick={() => navigate('/profile')}
                sx={(theme) => ({ color: theme.palette.primary.main, fontSize: 34 })}
              />
            </Button>
            <Button>
              <LogoutIcon
                onClick={handleLogOut}
                sx={(theme) => ({ color: theme.palette.primary.main, fontSize: 34 })}
              />
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default SideMenu;
