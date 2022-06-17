import React from 'react';

import { Paper, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AboutCard from '../../../components/about-card';

type SectionInfoCardProps = {
  title: string,
  text: string,
};

const SectionInfoCard: React.FC<SectionInfoCardProps> = ({ title, text }) => (
  <Paper
    elevation={16}
    sx={(theme) => ({
      width: 1,
      py: 10,
      px: {
        xs: 2,
      },
      background: theme.palette.secondary.dark,
      color: 'primary.light',
    })}
  >
    <AboutCard text={text}>
      <Typography variant="h5">{title}</Typography>
      <MoreHorizIcon sx={{ fontSize: 50 }} />
    </AboutCard>
  </Paper>
);

export default SectionInfoCard;
