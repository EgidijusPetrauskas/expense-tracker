import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import {
  styled,
  Container,
  Grid,
  Table,
  TableBody,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CategoryButton from './components/category-button';
import BudgetTableHead from './components/budget-table-head';
import BudgetTableRow from './components/budget-table-row';
import AddExpenseForm from './components/add-expense-form';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectExpenses } from '../../store/selectors';
import {
  createSetCategoriesAction,
  createSetBudgetExpenses,
  createBudgetSetFormOpenAction,
  createBudgetSetLoadingAction,
} from '../../store/features/budget/budget-action-creators';
import {
  selectBudgetCategories,
  selectBudgetCurrentCategory,
  selectBudgetFormOpen,
  selectBudgetLoading,
} from '../../store/features/budget/budget-selectors';
import CustomBackDrop from '../../components/custom-backdrop';
import ClearAllDialog from './components/clear-all-dialog';
import CustomButton from './components/custom-button';

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: '33%',
  height: '100%',
  alignSelf: 'flex-end',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: 0,
  background: theme.palette.secondary.light,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const styles = {
  outsideContainer: {
    width: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: {
      xl: 17.5,
      lg: 17.5,
      md: 17.5,
      sm: 14.5,
      xs: 14.5,
    },
  },
  topContainer: {
    width: 1,
    height: {
      xl: 55,
      lg: 55,
      md: 55,
      sm: 55 * 3,
      xs: 55 * 3,
    },
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
  },
};

const BudgetPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('Year Month');
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState<boolean>(false);
  const expenses = useRootSelector(selectExpenses);
  const currentCategory = useRootSelector(selectBudgetCurrentCategory);
  const categories = useRootSelector(selectBudgetCategories);
  const loading = useRootSelector(selectBudgetLoading);
  const formOpen = useRootSelector(selectBudgetFormOpen);
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(format(new Date(), 'yyyy MMMM'));
    dispatch(createSetCategoriesAction());
  }, []);

  useEffect(() => {
    dispatch(createSetBudgetExpenses(currentCategory));
  }, [currentCategory]);

  const openAddExpenseForm = () => {
    dispatch(createBudgetSetFormOpenAction(!formOpen));
  };

  return (
    <Container sx={{ ...styles.outsideContainer }}>
      <CustomBackDrop open={loading} handleClose={() => dispatch(createBudgetSetLoadingAction(false))} />

      <Box
        sx={(theme) => ({
          ...styles.topContainer,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            justifyContent: 'center',
          },
        })}
      >

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
      </Box>

      <Grid container spacing={0.7}>
        {categories.map((option) => (
          <CategoryButton key={option.id} id={option.id} btnText={option.title} />
        ))}
      </Grid>

      {formOpen
        ? <AddExpenseForm closeForm={() => openAddExpenseForm()} openForm={formOpen} />
        : (
          <Box
            sx={(theme) => ({
              width: 1,
              [theme.breakpoints.down('lg')]: {
                overflow: 'scroll',
              },
            })}
          >
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
          </Box>
        )}
    </Container>
  );
};

export default BudgetPage;
