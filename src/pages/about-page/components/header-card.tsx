import React from 'react';

import { Grid, Paper, Typography } from '@mui/material';

import Image from '../../home-page/images/intro-section-bg.jpg';

const HeaderCard: React.FC = () => (
  <Grid
    item
    xl={12}
    lg={12}
    md={12}
    sm={12}
    xs={12}
    sx={{
      height: {
        xl: 400,
        lg: 400,
        md: 400,
        sm: 400,
        xs: 300,
      },
    }}
  >
    <Paper
      elevation={10}
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${Image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Typography
        sx={{
          color: 'primary.main',
          fontFamily: 'Roboto',
          textAlign: 'center',
          fontWeight: 500,
          fontSize: {
            xl: 70,
            lg: 70,
            md: 60,
            sm: 40,
            xs: 25,
          },
        }}
        variant="h1"
        component="h1"
      >
        {' '}
        Expense Tracker
      </Typography>
      <Typography
        sx={{
          color: 'primary.light',
          textAlign: 'center',
          letterSpacing: 1,
          fontSize: {
            xl: 18,
            lg: 16,
            md: 14,
            sm: 12,
            xs: 10,
          },
        }}
      >
        A very good place for You and for Moneyy
      </Typography>
    </Paper>
  </Grid>
);

export default HeaderCard;
