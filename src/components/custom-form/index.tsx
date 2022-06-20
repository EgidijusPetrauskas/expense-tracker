import React from 'react';

import {
  Button,
  Paper,
  Box,
  Alert,
  ClickAwayListener,
} from '@mui/material';

import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthError, selectAuthLoading } from '../../store/selectors';
import { authClearErrorAction } from '../../store/action-creators';

import logoImg from '../../images/main-logo.png';
import Logo from '../logo';
import { OutsideContainer } from './custom-form-styles';

type CustomFormProps = {
  buttonText: string,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  isDisabled?: boolean
  logo?: boolean,
  fullWidth?: boolean,
};

const styles = {
  mainContainer: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    px: 7,
    py: 9,
  },
  alert: {
    width: {
      xl: 1.7 / 5,
      lg: 1.7 / 5,
      md: 2 / 5,
      sm: 3 / 5,
      xs: 3 / 5,
    },
    position: 'absolute',
    top: 0,
    zIndex: 45,
  },
  button: {
    maxWidth: 110,
    mt: 3,
    fontWeight: 600,
    ':disabled': { color: 'secondary.main' },
  },
};

const CustomForm: React.FC<CustomFormProps> = ({
  children, buttonText, onSubmit, isDisabled, logo, fullWidth,
}) => {
  const error = useRootSelector(selectAuthError);
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  const clearError = () => {
    dispatch(authClearErrorAction);
  };

  return (
    <OutsideContainer>
      {error && (
        <ClickAwayListener onClickAway={clearError}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Alert
              variant="filled"
              severity="error"
              sx={{ ...styles.alert }}
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
          ...styles.mainContainer,
          width: fullWidth ? 1 : {
            xl: 1.7 / 5,
            lg: 2 / 5,
            md: 3 / 5,
            sm: 4 / 5,
          },
          backgroundColor: theme.palette.secondary.light,
          input: {
            color: theme.palette.primary.light,
          },
        })}
        onSubmit={onSubmit}
      >
        {logo && (
          <Box sx={{ mb: 2.5 }}>
            <Logo src={logoImg} width={85} />
          </Box>
        )}
        {children}
        <Button
          disabled={loading || isDisabled}
          size="large"
          variant="contained"
          type="submit"
          sx={{ ...styles.button }}
        >
          {buttonText}
        </Button>
      </Paper>
    </OutsideContainer>
  );
};

export default CustomForm;
