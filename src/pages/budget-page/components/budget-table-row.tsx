import React from 'react';

import { TableRow, TableCell } from '@mui/material';

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

type ExpenseType = {
  title: string,
  category: string,
  price: number,
  amount: number,
  description: string,
};

type BudgetTableRowProps = {
  data: ExpenseType
};

const BudgetTableRow: React.FC<BudgetTableRowProps> = ({ data }) => {
  const {
    title, category, price, amount, description,
  } = data;
  return (
    <TableRow
      sx={(theme) => ({
        width: 1,
        height: 50,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: theme.palette.secondary.light,
      })}
    >
      <TableCell align="center" sx={{ ...styles.title }}>{title}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{category}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{price}</TableCell>
      <TableCell align="center" sx={{ ...styles.title }}>{amount}</TableCell>
      <TableCell align="center" sx={{ ...styles.title, fontSize: 13 }}>{description}</TableCell>
    </TableRow>
  );
};

export default BudgetTableRow;
