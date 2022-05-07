import React from 'react';

import { Box } from '@mui/material';
import StyledTextField from '../../components/custom-form/custom-form-styles';
import CustomForm from '../../components/custom-form';

const SignInPage: React.FC = () => (
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
      buttonText="Sign In"
    >
      <StyledTextField
        type="text"
        label="Username"
        name="username"
        fullWidth
      />
      <StyledTextField
        type="password"
        label="Password"
        name="password"
        fullWidth
      />
    </CustomForm>
  </Box>
);

export default SignInPage;
