import { styled } from '@mui/material';

import { NavLink } from 'react-router-dom';

const StyledNavbarButton = styled(NavLink)({
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
  color: 'white',
  // change color
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
    borderBottomColor: 'white',
    borderRightColor: 'white',
    // change color
  },
  '&::before': {
    top: 0,
    left: 0,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    // change color
  },
  '&:hover:after, &:hover:before': {
    width: '100%',
    height: '100%',
  },

  '&.active:after, &.active:before': {
    width: '100%',
    height: '100%',
  },
});

export default StyledNavbarButton;
