import { styled } from '@mui/material';

import { NavLink } from 'react-router-dom';

const StyledNavbarButton = styled(NavLink)(({ theme }) => ({
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
  '&::after, &::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '20%',
    height: '20%',
    border: '2px solid',
    transition: 'all 0.6s ease',
    // change transition
    borderRadius: 2,
  },
  '&::after': {
    bottom: 0,
    right: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: theme.palette.primary.main,
    borderRightColor: theme.palette.primary.main,
  },
  '&::before': {
    top: 0,
    left: 0,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
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
}));

export default StyledNavbarButton;
