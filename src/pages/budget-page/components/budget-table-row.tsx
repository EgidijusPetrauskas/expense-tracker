import React from 'react';

import { TableRow, TableCell } from '@mui/material';

import { Expense } from '../../../types/expense';

import { useRootDispatch, useRootSelector } from '../../../store/hooks';
import { createBudgetRemoveExpenseActionThunk } from '../../../store/features/budget/budget-action-creators';
import { selectBudgetCategories } from '../../../store/features/budget/budget-selectors';

import DeleteButton from '../../../components/delete-button';

const styles = {
  title: {
    fontSize: 14,
    fontFamily: 'roboto',
    color: 'white',
    letterSpacing: 0.5,
    border: 'none',
  },
};

type BudgetTableRowProps = {
  data: Expense
};

const BudgetTableRow: React.FC<BudgetTableRowProps> = ({ data }) => {
  const {
    id, title, category, price, amount, description,
  } = data;

  const dispatch = useRootDispatch();
  const categories = useRootSelector(selectBudgetCategories);

  const handleDelete = (expenseId: string) => {
    dispatch(createBudgetRemoveExpenseActionThunk(expenseId));
  };

  return (
    <TableRow
      sx={(theme) => ({
        width: 1,
        height: 60,
        background: theme.palette.secondary.light,
      })}
    >
      <TableCell align="center" sx={{ ...styles.title }}>{title}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{categories.find((ctgr) => ctgr.id === category)?.title}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{`${price}€`}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{amount}</TableCell>
      <TableCell align="center" sx={{ ...styles.title, fontSize: 13 }}>{description}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}><DeleteButton hoverText="Delete Expense" deleteBy={id} handleDelete={handleDelete} /></TableCell>
    </TableRow>
  );
};

export default BudgetTableRow;
