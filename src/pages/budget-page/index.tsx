import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import {
  Grid,
  Table,
  TableBody,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { selectBudgetExpenses } from '../../store/selectors';
import {
  createBudgetSetCategoriesActionThunk,
  createSetBudgetExpensesActionThunk,
  createBudgetSetFormOpenAction,
  createBudgetSetLoadingAction,
} from '../../store/features/budget/budget-action-creators';
import {
  selectBudgetCategories,
  selectBudgetCurrentCategory,
  selectBudgetFormOpen,
  selectBudgetLoading,
  selectBudgetIsSet,
} from '../../store/features/budget/budget-selectors';
import { useRootSelector, useRootDispatch } from '../../store/hooks';

import CustomBackDrop from '../../components/custom-backdrop';
import ClearAllDialog from './components/clear-all-dialog';
import CustomButton from './components/custom-budget-button';
import {
  BudgetPageOutsideContainer,
  BudgetPageTopContainerContainer, CustomPaper,
} from './budget-page-styles';
import SectionInfoCard from '../analysis-page/components/section-info-card';
import CategoryButton from './components/category-button';
import BudgetTableHead from './components/budget-table-head';
import BudgetTableRow from './components/budget-table-row';
import AddExpenseForm from './components/add-expense-form';

const BudgetPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('Year Month');
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState<boolean>(false);
  const expenses = useRootSelector(selectBudgetExpenses);
  const currentCategory = useRootSelector(selectBudgetCurrentCategory);
  const categories = useRootSelector(selectBudgetCategories);
  const loading = useRootSelector(selectBudgetLoading);
  const formOpen = useRootSelector(selectBudgetFormOpen);
  const isSet = useRootSelector(selectBudgetIsSet);
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(format(new Date(), 'yyyy MMMM'));
    dispatch(createBudgetSetCategoriesActionThunk());
  }, []);

  useEffect(() => {
    dispatch(createSetBudgetExpensesActionThunk(currentCategory));
  }, [currentCategory]);

  const openAddExpenseForm = () => {
    dispatch(createBudgetSetFormOpenAction(!formOpen));
  };

  return (
    <BudgetPageOutsideContainer>
      <CustomBackDrop open={loading} handleClose={() => dispatch(createBudgetSetLoadingAction(false))} />
      <BudgetPageTopContainerContainer>
        <CustomPaper>
          <Typography
            sx={{
              color: 'primary.light',
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            {currentDate}
          </Typography>
        </CustomPaper>

        <Box sx={{
          width: {
            xl: 1 / 3, lg: 1 / 3, md: 1 / 3, sm: 1, xs: 1,
          },
        }}
        >
          <CategoryButton height={55} id="all" btnText="All" />
        </Box>

        <CustomPaper>
          <CustomButton btnText="ADD EXPENSE" onClick={openAddExpenseForm} />
          <CustomButton btnText="ANALYSIS" onClick={() => navigate('/analysis/analysis')} />
          {!formOpen
          && <CustomButton btnText="CLEAR ALL" onClick={() => setClearAllDialogOpen(!clearAllDialogOpen)} />}
          <ClearAllDialog onClose={() => setClearAllDialogOpen(!clearAllDialogOpen)} open={clearAllDialogOpen} />
        </CustomPaper>
      </BudgetPageTopContainerContainer>

      <Grid container spacing={0.7}>
        {categories.map((option) => (
          <CategoryButton key={option.id} id={option.id} btnText={option.title} />
        ))}
      </Grid>
      <AddExpenseForm closeForm={() => openAddExpenseForm()} openForm={formOpen} />
      <Box
        sx={(theme) => ({
          width: 1,
          [theme.breakpoints.down('lg')]: {
            overflow: 'scroll',
          },
        })}
      >
        {(expenses.length < 1 && isSet)
          ? (
            <SectionInfoCard title="Budget" text="Track Your spending! Start now by pressing ADD EXPENSE" />
          ) : (
            <Table>
              <TableBody>
                <BudgetTableHead />
                {expenses.map((expense) => (
                  <BudgetTableRow
                    key={expense.id}
                    data={{
                      id: expense.id,
                      title: expense.title,
                      category: expense.category[0],
                      price: expense.price,
                      amount: expense.amount,
                      description: expense.description,
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          )}
      </Box>
    </BudgetPageOutsideContainer>
  );
};

export default BudgetPage;
