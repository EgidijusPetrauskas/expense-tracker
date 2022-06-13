import React from 'react';

import { Container, Box } from '@mui/material';
import { StyledButton } from './analysis-page-styles';

const AnalysisPage: React.FC = () => (
  <Container
    sx={(theme) => ({
      width: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 17.5,
      [theme.breakpoints.down('md')]: {
        pt: 15,
      },
    })}
  >
    <Box
      sx={(theme) => ({
        width: 1,
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        mb: 4,
        [theme.breakpoints.down('sm')]: {
          width: 1,
          flexDirection: 'column',
          pb: 19,
          px: 2,
        },
      })}
    >
      <StyledButton to="/analysis/analysis">Budget Analysis</StyledButton>
      <StyledButton to="/analysis/watchlist">Stocks Watchlist</StyledButton>
      <StyledButton to="/analysis/research">Stock Research</StyledButton>
    </Box>
  </Container>
);

export default AnalysisPage;
