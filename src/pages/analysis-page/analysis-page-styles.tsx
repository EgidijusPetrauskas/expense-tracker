/* eslint-disable import/prefer-default-export */
import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledButton = styled(NavLink)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.primary.light,
  background: 'none',
  border: `1px solid ${theme.palette.primary.main}`,
  fontSize: 18,
  letterSpacing: 2,
  textDecoration: 'none',
  transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.short }),
  ':hover': {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  '&.active': {
    color: 'white',
    background: theme.palette.secondary.main,
    border: 'none',
  },
}));
