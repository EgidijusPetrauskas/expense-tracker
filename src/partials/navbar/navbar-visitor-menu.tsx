import React from 'react';

import { Container } from '@mui/material';

import { StyledNavbarButton } from './navbar-styles';
import Logo from '../../components/logo';

import LogoLg from '../../images/logo-lg.png';

const NavBarVisitorMenu: React.FC = () => (
  <Container
    sx={(theme) => theme.mixins.navbar}
  >
    <StyledNavbarButton to="/">Home</StyledNavbarButton>
    <StyledNavbarButton to="/about">About</StyledNavbarButton>
    <Logo src={LogoLg} width={70} />
    <StyledNavbarButton to="/register">Register</StyledNavbarButton>
    <StyledNavbarButton to="/signin">Sign In</StyledNavbarButton>
  </Container>
);

export default NavBarVisitorMenu;
