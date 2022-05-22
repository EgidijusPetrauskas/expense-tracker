/* eslint-disable import/prefer-default-export */
import { styled, ToggleButton } from '@mui/material';

export const StyledButton = styled(ToggleButton)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.light,
  background: 'none',
  border: `1px solid ${theme.palette.primary.main}`,
  fontSize: 16,
  letterSpacing: 2,
  transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.short }),
  ':hover': {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  '&.Mui-selected, &.Mui-selected: hover': {
    color: 'white',
    background: theme.palette.secondary.main,
    border: 'none',
  },
}));
