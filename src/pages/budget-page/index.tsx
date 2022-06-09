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
import { ExpenseCategory } from '../../types/expense-category';

const styles = {
  outsideContainer: {
    width: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    py: 20,
  },
  middleContainerPaper: {
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

const categoryOptions: ExpenseCategory[] = [
  {
    id: '1',
    title: 'Food and Necessities',
  },
  {
    id: '2',
    title: 'Transport',
  },
  {
    id: '3',
    title: 'Leisure and Entertainment',
  },
  {
    id: '4',
    title: 'Health',
  },
  {
    id: '5',
    title: 'Investment',
  },
  {
    id: '6',
    title: 'Other',
  },
];

const BudgetPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('Year Month');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'yyyy MMMM'));
  });

  const addExpense = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Container sx={{ ...styles.outsideContainer }}>
      <Grid container spacing={0.7}>
        {categoryOptions.map((btn) => (
          <CategoryButton key={btn.id} btnText={btn.title} />
        ))}
      </Grid>
      <Box
        sx={{
          width: 1,
          height: 60,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Paper
          sx={(theme) => ({ ...styles.middleContainerPaper, background: theme.palette.secondary.light })}
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
        <Paper
          sx={(theme) => ({ ...styles.middleContainerPaper, background: theme.palette.secondary.light })}
        >
          <Button
            color={formOpen ? 'error' : 'primary'}
            onClick={addExpense}
            variant="outlined"
            sx={{ ...styles.addAndClearBtn }}
          >
            {formOpen
              ? 'Cancel'
              : 'Add Expense'}
          </Button>
          {!formOpen && (
            <Button
              variant="outlined"
              sx={{ ...styles.addAndClearBtn }}
            >
              Clear All
            </Button>
          )}
        </Paper>
      </Box>
      {formOpen
        ? <AddExpenseForm />
        : (
          <Table>
            <TableBody>
              <BudgetTableHead />
              <BudgetTableRow data={{
                title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me a.',
              }}
              />
            </TableBody>
          </Table>
        )}
    </Container>
  );
};

export default BudgetPage;
