import React from 'react';

import { Box, Typography, Container } from '@mui/material';

import { NavLink } from 'react-router-dom';
import Image from '../../images/intro-section-bg.jpg';

const IntroSection: React.FC = () => (
  <Container
    maxWidth={false}
    component="main"
    sx={(theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 1,
      height: '100vh',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      boxShadow: `inset 5px -90px 110px 80px ${theme.palette.myBlack.main}`,
    })}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color: 'primary.main',
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: 110,
        }}
        variant="h1"
        component="h1"
      >
        {' '}
        Expense Tracker
      </Typography>
      <Typography
        sx={{
          fontSize: 25,
          color: 'primary.light',
          letterSpacing: 1,
        }}
      >
        Track, analyse and plan your spending
      </Typography>
      <NavLink
        style={{ textDecoration: 'none' }}
        to="/about"
      >
        <Typography
          sx={{
            fontSize: 15,
            color: 'primary.light',
            fontFamily: 'Roboto',
          }}
        >
          Learn more...
        </Typography>
      </NavLink>
    </Box>
  </Container>
);

export default IntroSection;
