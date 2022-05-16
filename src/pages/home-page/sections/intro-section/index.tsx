import React from 'react';

import { Box } from '@mui/material';

import Image from '../../images/intro-section-bg.jpg';

const IntroSection: React.FC = () => (
  <Box
    component="main"
    sx={{
      width: 1,
      height: '100vh',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      boxShadow: 'inset 5px -90px 110px 80px #0B0C10',
    }}
  />
);

export default IntroSection;
