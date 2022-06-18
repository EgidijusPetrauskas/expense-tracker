import React from 'react';

import { Grid, Paper, Typography } from '@mui/material';

type DescriptionCardProps = {
  text: string
};

const DescriptionCard: React.FC<DescriptionCardProps> = ({ text }) => (
  <Grid
    item
    height={250}
    xl={6}
    lg={6}
    md={6}
    sm={6}
    xs={6}
  >
    <Paper
      elevation={10}
      sx={(theme) => ({
        width: 1,
        height: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.secondary.light,
        borderRadius: 0,
      })}
    >
      <Typography
        sx={(theme) => ({
          maxWidth: 400,
          fontSize: {
            xl: 18,
            lg: 18,
            md: 18,
            sm: 16,
            xs: 14,
          },
          color: theme.palette.primary.light,
          textAlign: 'center',
          letterSpacing: 0.4,
          px: {
            xl: 0,
            lg: 0,
            md: 3,
            sm: 3,
            xs: 2,
          },
        })}
      >
        {text}
      </Typography>
    </Paper>
  </Grid>
);

export default DescriptionCard;
