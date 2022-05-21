import { styled, MenuList, MenuItem } from '@mui/material';

import { NavLink } from 'react-router-dom';

export const StyledNavbarButton = styled(NavLink)(({ theme }) => ({
  position: 'relative',
  padding: '0.5em 1.1em',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'none',
  textDecoration: 'none',
  fontSize: 17,
  maxHeight: 42.5,
  minWidth: 86,
  color: theme.palette.primary.light,
  transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.complex }),
  '&::after, &::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '20%',
    height: '20%',
    border: '3px solid',
    borderRadius: 2,
  },
  '&::after': {
    bottom: 0,
    right: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.complex }),
    borderBottomColor: theme.palette.primary.main,
    borderRightColor: theme.palette.primary.main,
  },
  '&::before': {
    top: 0,
    left: 0,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.complex }),
    borderTopColor: theme.palette.primary.main,
    borderLeftColor: theme.palette.primary.main,
  },
  '&:hover:after, &:hover:before': {
    width: '100%',
    height: '100%',
  },
  '&:hover': {
    color: theme.palette.common.white,
  },
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

export const StyledMenuList = styled(MenuList)({
  display: 'flex',
  height: 45,
  marginTop: 5,
  padding: 0,
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  width: 100,
  height: '100%',
  fontSize: 18,
  border: `1px solid ${theme.palette.secondary.main}`,
  backgroundColor: 'transparent',
  color: theme.palette.primary.light,
  transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.short }),
  ':hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
  },
}));
