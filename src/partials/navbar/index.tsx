import React from 'react';

import {
  AppBar, Container, Typography,
} from '@mui/material';

import StyledNavbarButton from './navbar-styles';

const NavBar: React.FC = () => (
  <AppBar
    color="transparent"
    sx={{ alignItems: 'center', boxShadow: 'none' }}
  >
    <Container
      sx={(theme) => theme.mixins.navbar}
    >
      <StyledNavbarButton to="/">Home</StyledNavbarButton>
      <StyledNavbarButton to="/about">About</StyledNavbarButton>
      <Typography>
        Logo
      </Typography>
      <StyledNavbarButton to="/register">Register</StyledNavbarButton>
      <StyledNavbarButton to="/signin">Sign In</StyledNavbarButton>
    </Container>
  </AppBar>
);

export default NavBar;
