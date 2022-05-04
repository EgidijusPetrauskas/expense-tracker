import React from 'react';

import { Box } from '@mui/material';
import SignInForm from './components/sign-in-form';

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
    <SignInForm />
  </Box>
);

export default SignInPage;
