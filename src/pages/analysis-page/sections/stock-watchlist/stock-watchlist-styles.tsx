/* eslint-disable import/prefer-default-export */
import { styled } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const SpiningHourglass = styled(HourglassEmptyIcon)({
  fontSize: 50,
  transform: 'rotateY: 180deg',
  animation: 'spin 2s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(360deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
});
