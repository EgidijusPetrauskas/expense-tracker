import React from 'react';

import { Box } from '@mui/material';

import Image from '../../images/intro-section-bg.jpg';

const IntroSection: React.FC = () => (
  <Box
    component="main"
    sx={{
      width: 1,
      height: 850,
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
  />
);

export default IntroSection;
