import React from 'react';

import {
  Paper, Box, Typography, Button,
} from '@mui/material';

import { selectUser } from '../../store/features/auth/auth-selectors';
import { useRootSelector } from '../../store/hooks';

const styles = {
  mainContainer: {
    width: 1,
    height: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2.2,
    color: 'primary.light',
    px: 5,
    py: 9,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: 'primary.main',
    textAlign: 'center',
  },
  info: {
    fontFamily: 'roboto',
    textAlign: 'center',
  },
  errorSection: {
    width: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'primary.light',
    fontSize: 24,
  },
};

const PersonalInfoSection: React.FC = ({ children }) => {
  const user = useRootSelector(selectUser);

  if (!user) {
    return (
      <Paper
        elevation={24}
        sx={(theme) => ({
          ...styles.errorSection,
          background: theme.palette.secondary.light,
        })}
      >
        Something went wrong.. :(
      </Paper>
    );
  }

  return (
    <Paper
      elevation={24}
      sx={(theme) => ({
        ...styles.mainContainer,
        backgroundColor: theme.palette.secondary.light,
      })}
    >
      <Box>
        <Typography sx={{ ...styles.title }}>Username</Typography>
        <Typography sx={{ ...styles.info }}>Jonas</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...styles.title }}>First Name</Typography>
        <Typography sx={{ ...styles.info }}>Jonas</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...styles.title }}>Last Name</Typography>
        <Typography sx={{ ...styles.info }}>Paulius</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...styles.title }}>Email</Typography>
        <Typography sx={{ ...styles.info }}>neperisikiskia@gmail.com</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...styles.title }}>Age</Typography>
        <Typography sx={{ ...styles.info }}>74</Typography>
      </Box>
      <Box>
        {children}
      </Box>
    </Paper>
  );
};

export default PersonalInfoSection;
