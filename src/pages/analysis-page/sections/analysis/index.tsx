import React from 'react';

import { Container } from '@mui/material';
import PieBudgetChart from './components/pie-budget-chart';
import InfoTable from './components/info-table';

const data = [
  { name: 'Food and necessities', value: 300 },
  { name: 'Transport', value: 400 },
  { name: 'Leisure and entertainment', value: 200 },
  { name: 'Health', value: 200 },
  { name: 'Investment', value: 200 },
  { name: 'Other', value: 200 },
];

const budget = 900;

const AnalysisSection: React.FC = () => (
  <Container sx={{
    width: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
  >
    <PieBudgetChart data={data} />
    <InfoTable data={data} budget={budget} />
  </Container>
);

export default AnalysisSection;
