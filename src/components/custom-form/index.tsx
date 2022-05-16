import React from 'react';

import { Button, Paper, Box } from '@mui/material';

import logoImg from '../../images/main-logo.png';
import Logo from '../logo';

type CustomFormProps = {
  buttonText: string,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

const CustomForm: React.FC<CustomFormProps> = ({ children, buttonText, onSubmit }) => (
  <Paper
    elevation={24}
    component="form"
    autoComplete="off"
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      width: 1.7 / 5,
      minWidth: 250,
      backgroundColor: '#222c38',
      p: 7,

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
    <Button size="large" sx={{ maxWidth: 110, mt: 3 }} variant="contained" type="submit">{buttonText}</Button>
  </Paper>
);

export default CustomForm;
