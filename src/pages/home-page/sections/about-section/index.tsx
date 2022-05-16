import React from 'react';

import { Container } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import AboutCard from './about-section-card';

const iconSx = { color: 'secondary.main', fontSize: 60 };

const AboutSection: React.FC = () => (
  <Container
    maxWidth={false}
    component="main"
    sx={(theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 1,
      height: 650,
      background: theme.palette.myBlack.main,
    })}
  >
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 7,
        width: 2 / 3,
        height: 3 / 5,
      }}
    >
      <AboutCard
        text="Track your spending!"
      >
        <AttachMoneyIcon sx={iconSx} />
      </AboutCard>
      <AboutCard
        text="Analyse and asses your monthly spending!"
      >
        <DataUsageIcon sx={iconSx} />
      </AboutCard>
      <AboutCard
        text="Learn about investment oportunities for you!"
      >
        <ShowChartIcon sx={iconSx} />
      </AboutCard>
    </Container>
  </Container>
);

export default AboutSection;
