import React from 'react';

import { Box } from '@mui/material';
import StyledTextField from '../../components/custom-form/custom-form-styles';
import CustomForm from '../../components/custom-form';

const RegisterPage: React.FC = () => (
  <Box
    component="main"
    sx={{
      width: 1,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CustomForm
      buttonText="Register"
    >
      <StyledTextField
        type="text"
        label="New Username"
        name="username"
        fullWidth
      />
      <StyledTextField
        type="password"
        label="Password"
        name="password"
        fullWidth
      />
      <StyledTextField
        type="password"
        label="Repeat Password"
        name="password"
        fullWidth
      />
    </CustomForm>
  </Box>
);

export default RegisterPage;
