import React from 'react';

import { Grid, Paper, Typography } from '@mui/material';

type TitleCardProps = {
  title: string
};

const TitleCard: React.FC<TitleCardProps> = ({ children, title }) => (
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.myBlack.main,
        borderRadius: 0,
      })}
    >
      {children}
      <Typography
        color="primary"
        sx={{
          maxWidth: 300,
          textAlign: 'center',
          fontSize: {
            xl: 24,
            lg: 24,
            md: 24,
            sm: 22,
            xs: 16,
          },
          letterSpacing: 0.4,
        }}
      >
        {title}
      </Typography>
    </Paper>
  </Grid>
);

export default TitleCard;
