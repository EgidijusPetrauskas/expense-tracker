import React from 'react';

import {
  Button,
  Paper,
  Box,
  Alert,
  CircularProgress,
  ClickAwayListener,
} from '@mui/material';

import logoImg from '../../images/main-logo.png';
import Logo from '../logo';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthError, selectAuthLoading } from '../../store/selectors';
import { authClearErrorAction } from '../../store/action-creators';

type CustomFormProps = {
  buttonText: string,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  isDisabled?: boolean
};

const formStyles = {
  outsideContainer: {
    width: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: {
      xl: 1.7 / 5,
      lg: 2 / 5,
      md: 3 / 5,
      sm: 4 / 5,
    },
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    px: 7,
    py: 9,
    backgroundColor: '#222c38',
  },
};

const CustomForm: React.FC<CustomFormProps> = ({
  children, buttonText, onSubmit, isDisabled,
}) => {
  const error = useRootSelector(selectAuthError);
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  const clearError = () => {
    dispatch(authClearErrorAction);
  };

  return (
    <Box sx={{ ...formStyles.outsideContainer }}>
      {error && (
        <ClickAwayListener onClickAway={clearError}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Alert
              variant="filled"
              severity="error"
              sx={{
                width: 1.7 / 5,
                position: 'absolute',
                top: 0,
                zIndex: 45,
              }}
              onClose={clearError}
            >
              {error}
            </Alert>
          </Box>
        </ClickAwayListener>
      )}
      <Paper
        elevation={24}
        component="form"
        autoComplete="off"
        sx={(theme) => ({
          ...formStyles.mainContainer,
          input: {
            color: theme.palette.primary.light,
          },
        })}
        onSubmit={onSubmit}
      >
        <Box sx={{ mb: 2.5 }}>
          <Logo src={logoImg} width={85} />
        </Box>
        {children}
        <Button
          disabled={loading || isDisabled}
          size="large"
          variant="contained"
          type="submit"
          sx={{
            maxWidth: 110,
            mt: 3,
            ':disabled': { color: 'secondary.main' },
          }}
        >
          {loading ? <CircularProgress color="secondary" /> : buttonText}
        </Button>
      </Paper>
    </Box>
  );
};

export default CustomForm;
