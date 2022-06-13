import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import {
  Container,
  Grid,
  Table,
  TableBody,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';

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

const styles = {
  outsideContainer: {
    width: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: 17.5,
  },
  topContainer: {
    width: 1,
    height: 55,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
  },
  topContainerPaper: {
    width: 1 / 3,
    height: 1,
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 0,
  },
  addAndClearBtn: {
    px: 1.4,
    fontSize: 13,
    letterSpacing: 1,
  },
};

const BudgetPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('Year Month');
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState<boolean>(false);
  const expenses = useRootSelector(selectExpenses);
  const currentCategory = useRootSelector(selectBudgetCurrentCategory);
  const categoryOptions = useRootSelector(selectBudgetCategories);
  const loading = useRootSelector(selectBudgetLoading);
  const formOpen = useRootSelector(selectBudgetFormOpen);
  const dispatch = useRootDispatch();

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
        sx={{ ...styles.topContainer }}
      >
        <Paper
          sx={(theme) => ({ ...styles.topContainerPaper, background: theme.palette.secondary.light })}
        >
          <Typography
            sx={{
              color: 'primary.light',
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            {currentDate}
          </Typography>
        </Paper>
        <Box sx={{ width: 1 / 3 }}>
          <CategoryButton height={55} id="all" btnText="All" />
        </Box>
        <Paper
          sx={(theme) => ({ ...styles.topContainerPaper, background: theme.palette.secondary.light })}
        >
          <Button
            color="primary"
            onClick={openAddExpenseForm}
            variant="outlined"
            sx={{ ...styles.addAndClearBtn }}
          >
            ADD EXPENSE
          </Button>
          {!formOpen && (
            <Button
              variant="outlined"
              onClick={() => setClearAllDialogOpen(!clearAllDialogOpen)}
              sx={{ ...styles.addAndClearBtn }}
            >
              Clear All
            </Button>
          )}
          <ClearAllDialog onClose={() => setClearAllDialogOpen(!clearAllDialogOpen)} open={clearAllDialogOpen} />
        </Paper>
      </Box>
      <Grid container spacing={0.7}>
        {categoryOptions.map((option) => (
          <CategoryButton key={option.id} id={option.id} btnText={option.title} />
        ))}
      </Grid>
      {formOpen
        ? <AddExpenseForm closeForm={() => openAddExpenseForm()} openForm={formOpen} />
        : (
          <Table>
            <TableBody>
              <BudgetTableHead />
              {expenses.map((expense) => (
                <BudgetTableRow
                  key={expense.id}
                  data={{
                    id: expense.id,
                    title: expense.title,
                    category: expense.category,
                    price: expense.price,
                    amount: expense.amount,
                    description: expense.description,
                  }}
                />
              ))}
            </TableBody>
          </Table>
        )}
    </Container>
  );
};

export default BudgetPage;
