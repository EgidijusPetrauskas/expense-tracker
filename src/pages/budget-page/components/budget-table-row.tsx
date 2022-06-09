import React from 'react';

import { TableRow, TableCell } from '@mui/material';
import DeleteButton from '../../../components/delete-button';
import { useRootDispatch } from '../../../store/hooks';
import { createBudgetRemoveExpenseAction } from '../../../store/features/budget/budget-action-creators';
import { Expense } from '../../../types/expense';

const styles = {
  title: {
    minWidth: 200,
    maxWidth: 250,
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

  const handleDelete = (expenseId: string) => {
    dispatch(createBudgetRemoveExpenseAction(expenseId));
  };

  return (
    <TableRow
      sx={(theme) => ({
        width: 1,
        height: 50,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: theme.palette.secondary.light,
      })}
    >
      <TableCell align="center" sx={{ ...styles.title }}>{title}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{category}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{`${price}€`}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{amount}</TableCell>
      <TableCell align="center" sx={{ ...styles.title, fontSize: 13 }}>{description}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}><DeleteButton hoverText="Delete Expense" deleteBy={id} handleDelete={handleDelete} /></TableCell>
    </TableRow>
  );
};

export default BudgetTableRow;
