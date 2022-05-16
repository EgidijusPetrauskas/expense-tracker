import React from 'react';

import {
  AppBar, Container,
} from '@mui/material';

import StyledNavbarButton from './navbar-styles';
import Logo from '../../components/logo';

import LogoLg from '../../images/logo-lg.png';

const NavBar: React.FC = () => (
  <AppBar
    color="transparent"
    sx={{
      alignItems: 'center',
      boxShadow: 'none',
      position: 'absolute',
    }}
  >
    <Container
      sx={(theme) => theme.mixins.navbar}
    >
      <StyledNavbarButton to="/">Home</StyledNavbarButton>
      <StyledNavbarButton to="/about">About</StyledNavbarButton>
      <Logo src={LogoLg} width={70} />
      <StyledNavbarButton to="/register">Register</StyledNavbarButton>
      <StyledNavbarButton to="/signin">Sign In</StyledNavbarButton>
    </Container>
  </AppBar>
);

export default NavBar;
