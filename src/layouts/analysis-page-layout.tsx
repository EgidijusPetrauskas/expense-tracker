import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import AnalysisPage from '../pages/analysis-page/index';

const AnalysisPageLayout: React.FC = () => (
  <>
    <AnalysisPage />
    <Box component="main">
      <Outlet />
    </Box>
  </>
);

export default AnalysisPageLayout;
