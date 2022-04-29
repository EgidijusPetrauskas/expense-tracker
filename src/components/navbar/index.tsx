import React from 'react';

import {
  AppBar, Toolbar, Typography,
} from '@mui/material';

import StyledNavbarButton from './navbar-styles';

const NavBar: React.FC = () => (
  <AppBar
    color="transparent"
    sx={{ alignItems: 'center' }}
  >
    <Toolbar
      sx={{
        width: 2 / 3,
        justifyContent: 'space-around',
      }}
    >
      <StyledNavbarButton to="/">Home</StyledNavbarButton>
      <StyledNavbarButton to="/">About</StyledNavbarButton>
      <Typography>
        Logo
      </Typography>
      <StyledNavbarButton to="/">Register</StyledNavbarButton>
      <StyledNavbarButton to="/">Sign In</StyledNavbarButton>
    </Toolbar>
  </AppBar>
);

export default NavBar;
