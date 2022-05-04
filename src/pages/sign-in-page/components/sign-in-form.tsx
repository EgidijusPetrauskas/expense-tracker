import React from 'react';

import {
  Button, Paper, TextField, Box, styled,
} from '@mui/material';

import logoImg from '../../../images/main-logo.png';
import Logo from '../../../components/logo';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': { color: theme.palette.primary.main },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { borderColor: theme.palette.primary.light },
  },
}));

const SignInForm: React.FC = () => (
  <Paper
    elevation={24}
    component="form"
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      width: 1.7 / 5,
      minWidth: 250,
      height: 2.5 / 5,
      backgroundColor: '#222c38',
      px: 6,

      input: {
        color: theme.palette.primary.light,
      },
    })}
  >
    <Box sx={{ mb: 2.5 }}>
      <Logo src={logoImg} width={85} />
    </Box>
    <StyledTextField
      label="Username"
      name="username"
      fullWidth
    />
    <StyledTextField
      label="Password"
      name="password"
      fullWidth
    />
    <Button size="large" sx={{ maxWidth: 110, mt: 3 }} variant="contained" type="submit">Sign In</Button>
  </Paper>
);

export default SignInForm;
