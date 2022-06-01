import React from 'react';

import {
  Typography,
  Paper,
  Box,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AboutCard from '../../../components/about-card';

const InfoCard: React.FC = () => (
  <Paper
    elevation={16}
    sx={(theme) => ({
      width: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      color: theme.palette.primary.light,
      background: 'inherit',
      pt: 4,
      pb: 7,
      px: {
        xl: 1,
        lg: 1,
        md: 3,
        xs: 2,
      },
    })}
  >
    <Typography
      sx={{
        textDecoration: 'underline',
        letterSpacing: 1.9,
        fontSize: {
          xl: 45,
          lg: 45,
          md: 35,
          xs: 30,
        },
      }}
    >
      ANALYSIS
    </Typography>
    <Box
      sx={(theme) => ({
        display: 'flex',
        gap: 4,
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
      })}
    >
      <AboutCard text="Analyse your monthly budget and spending">
        <Typography variant="h5">Budget Analysis</Typography>
        <MoreHorizIcon sx={{ fontSize: 50 }} />
      </AboutCard>
      <AboutCard text="Create and follow Your own stocks watchlist">
        <Typography variant="h5">Stocks Watchlist</Typography>
        <MoreHorizIcon sx={{ fontSize: 50 }} />
      </AboutCard>
      <AboutCard text="Research and analyse the stocks in the market">
        <Typography variant="h5">Stock Research</Typography>
        <MoreHorizIcon sx={{ fontSize: 50 }} />
      </AboutCard>
    </Box>
  </Paper>
);

export default InfoCard;
