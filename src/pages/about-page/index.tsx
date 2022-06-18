import React from 'react';

import {
  Container,
  Grid,
} from '@mui/material';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TitleCard from './components/title-card';
import DescriptionCard from './components/description-card';
import HeaderCard from './components/header-card';

const iconSx = { color: 'secondary.main', fontSize: 60 };

const AboutPage: React.FC = () => (
  <Container
    maxWidth={false}
    sx={(theme) => ({
      background: theme.palette.myBlack.main,
    })}
  >
    <Container sx={{ py: 17.5 }}>
      <Grid container>
        <HeaderCard />
        <TitleCard
          title="Track Your spending!"
        >
          <AttachMoneyIcon sx={iconSx} />
        </TitleCard>
        <DescriptionCard
          text="Track all of your monthly expenses, filter them by categories, start every month from scratch!"
        />
        <DescriptionCard
          text="Analyse your montly spending by category, see where you spend the most so that You can start making necessary changes!"
        />
        <TitleCard
          title="Analyse and asses your monthly spending!"
        >
          <DataUsageIcon sx={iconSx} />
        </TitleCard>
        <TitleCard
          title="Learn about investment oportunities for you!"
        >
          <ShowChartIcon sx={iconSx} />
        </TitleCard>
        <DescriptionCard
          text="Research stocks, analyse their price for the last 25 days, if You like what You see - add them to your Watchlist!"
        />
      </Grid>
    </Container>
  </Container>
);

export default AboutPage;
