import React from 'react';

import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import NavBar from '../partials/navbar/index';

const MainLayout: React.FC = () => (
  <>
    <NavBar />
    <Box component="main">
      <Outlet />
    </Box>
  </>
);

export default MainLayout;
