import React from 'react';

import { Paper, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';

type LoadingErrorProps = {
  variant: 'refresh' | 'close',
  error: string,
  onClick: () => void
};

const LoadingError: React.FC<LoadingErrorProps> = ({ variant, error, onClick }) => (
  <Paper
    sx={(theme) => ({
      width: 2 / 5,
      height: 55,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '7px 40px 40px 7px',
      pl: 2,
      fontSize: 19,
      background: theme.palette.primary.light,
      color: theme.palette.myBlack.main,
    })}
  >
    <ErrorOutlineIcon color="error" sx={{ fontSize: 32 }} />
    {error}
    <Box sx={{ height: 1 }}>
      <Button
        variant="contained"
        onClick={onClick}
        sx={(theme) => ({
          height: 1,
          borderRadius: 100,
          background: theme.palette.secondary.main,
          color: theme.palette.secondary.dark,
        })}
      >
        {variant === 'close'
          ? (
            <CloseIcon sx={{ fontSize: 30 }} />
          ) : (
            <RefreshIcon sx={{ fontSize: 30 }} />
          ) }
      </Button>
    </Box>
  </Paper>
);

export default LoadingError;
