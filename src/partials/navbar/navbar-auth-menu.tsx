import React from 'react';

import { Container } from '@mui/material';

import StyledNavbarButton from './navbar-styles';
import Logo from '../../components/logo';

import LogoLg from '../../images/logo-lg.png';

const NavBarAuthMenu: React.FC = () => (
  <Container
    sx={(theme) => theme.mixins.navbar}
  >
    <StyledNavbarButton to="/">Home</StyledNavbarButton>
    <StyledNavbarButton to="/about">About</StyledNavbarButton>
    <Logo src={LogoLg} width={70} />
    <StyledNavbarButton to="/budget">My Budget</StyledNavbarButton>
    <StyledNavbarButton to="/analysis">Analysis</StyledNavbarButton>
  </Container>
);

export default NavBarAuthMenu;
