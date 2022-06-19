import React, { useEffect } from 'react';

import { Container } from '@mui/material';

import {
  selectBudgetCalculatedExpenses,
  selectBudgetChartDataLoaded,
} from '../../../../store/features/budget/budget-selectors';
import {
  createBudgetCalculateExpensesActionThunk,
  budgetSetChartDataLoaded,
  budgetSetChartIsSetAction,
} from '../../../../store/features/budget/budget-action-creators';

import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import PieBudgetChart from './components/pie-budget-chart';
import InfoTable from './components/info-table';
import SectionInfoCard from '../../components/section-info-card';
import CustomBackDrop from '../../../../components/custom-backdrop';

const AnalysisSection: React.FC = () => {
  const dispatch = useRootDispatch();
  const calulatedExpenses = useRootSelector(selectBudgetCalculatedExpenses);
  const chartDataLoaded = useRootSelector(selectBudgetChartDataLoaded);

  const showInfoCard = calulatedExpenses.length === 0;

  useEffect(() => {
    dispatch(createBudgetCalculateExpensesActionThunk());
    dispatch(budgetSetChartIsSetAction);
  }, []);

  return (
    <Container sx={{
      width: 1,
      height: 580,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      pb: {
        xl: 4,
        lg: 4,
        md: 6,
        sm: 12,
        xs: 12,
      },
    }}
    >
      <CustomBackDrop open={!chartDataLoaded} handleClose={() => dispatch(budgetSetChartDataLoaded)} />
      {chartDataLoaded && !showInfoCard && <PieBudgetChart data={calulatedExpenses} />}
      {chartDataLoaded && !showInfoCard && <InfoTable data={calulatedExpenses} />}
      {(chartDataLoaded && showInfoCard) && <SectionInfoCard title="Budget Analysis" text="Start tracking Your expenses in Budget page!" />}
    </Container>
  );
};

export default AnalysisSection;
