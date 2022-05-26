import React from 'react';

import { Container, Box } from '@mui/material';
import { StyledButton } from './analysis-page-styles';

const AnalysisPage: React.FC = () => (
  <Container
    sx={{
      width: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 20,
    }}
  >
    <Box
      sx={{
        width: 1,
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        mb: 4,
      }}
    >
      <StyledButton to="/analysis/analysis">Budget Analysis</StyledButton>
      <StyledButton to="/analysis/watchlist">Stock Watchlist</StyledButton>
      <StyledButton to="/analysis/research">Stock Research</StyledButton>
    </Box>
  </Container>
);

export default AnalysisPage;
