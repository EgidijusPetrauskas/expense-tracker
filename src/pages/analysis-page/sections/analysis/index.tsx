import React, { useEffect } from 'react';

import { Container } from '@mui/material';

import PieBudgetChart from './components/pie-budget-chart';
import InfoTable from './components/info-table';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { selectCalculatedExpenses } from '../../../../store/features/budget/budget-selectors';
import { createCalculateExpensesAction } from '../../../../store/features/budget/budget-action-creators';

const AnalysisSection: React.FC = () => {
  const dispatch = useRootDispatch();
  const calulatedExpenses = useRootSelector(selectCalculatedExpenses);

  useEffect(() => {
    dispatch(createCalculateExpensesAction());
  }, []);

  return (
    <Container sx={{
      width: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <PieBudgetChart data={calulatedExpenses} />
      <InfoTable data={calulatedExpenses} />
    </Container>
  );
};

export default AnalysisSection;
