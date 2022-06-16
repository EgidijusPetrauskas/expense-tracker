import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Popper,
  Box,
  Divider,
  ClickAwayListener,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { StyledNavbarButton, StyledMenuList, StyledMenuItem } from './navbar-styles';
import { createLogOutAction } from '../../store/features/auth-and-user/auth-action-creators';
import { useRootDispatch } from '../../store/hooks';

import Logo from '../../components/logo';
import Avatar from '../../images/avatar.svg';

const NavBarAuthMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const popperPlace = useRef<HTMLDivElement>(null);
  const defaultTheme = useTheme();
  const smallerThanMd = useMediaQuery(defaultTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useRootDispatch();

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNav = (next: string) => {
    setMenuOpen(false);
    navigate(next);
  };

  const handleLogOut = () => {
    dispatch(createLogOutAction());
  };

  return (
    <Container
      sx={(theme) => theme.mixins.navbar}
    >
      <StyledNavbarButton to="/">Home</StyledNavbarButton>
      <StyledNavbarButton to="/about">About</StyledNavbarButton>
      <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
        <Box
          ref={popperPlace}
          onClick={handleMenu}
          sx={{ display: smallerThanMd ? 'none' : 'block' }}
        >
          <Logo mode="hover" active={menuOpen} src={Avatar} width={70} />
          <Popper
            anchorEl={popperPlace.current}
            open={menuOpen}
            placement="bottom"
          >
            <Box>
              <StyledMenuList>
                <StyledMenuItem onClick={() => handleNav('/profile')}>Profile</StyledMenuItem>
                <Divider />
                <StyledMenuItem onClick={handleLogOut}>Log Out</StyledMenuItem>
              </StyledMenuList>
            </Box>
          </Popper>
        </Box>
      </ClickAwayListener>
      <StyledNavbarButton to="/budget">My Budget</StyledNavbarButton>
      <StyledNavbarButton to="/analysis">Analysis</StyledNavbarButton>
    </Container>
  );
};

export default NavBarAuthMenu;
