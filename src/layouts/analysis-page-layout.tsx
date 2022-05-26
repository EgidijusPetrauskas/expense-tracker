import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';
import AnalysisPage from '../pages/analysis-page/index';

const AnalysisPageLayout: React.FC = () => (
  <>
    <AnalysisPage />
    <Container component="main">
      <Outlet />
    </Container>
  </>
);

export default AnalysisPageLayout;
