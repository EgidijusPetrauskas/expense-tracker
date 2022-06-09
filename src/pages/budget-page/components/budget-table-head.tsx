import React from 'react';

import { TableRow, TableCell } from '@mui/material';

const styles = {
  title: {
    minWidth: 200,
    maxWidth: 250,
    fontSize: 18,
    fontFamily: 'roboto',
    color: 'white',
    letterSpacing: 0.5,
    border: 'none',
  },
};

const BudgetTableHead: React.FC = () => (
  <TableRow
    sx={(theme) => ({
      width: 1,
      height: 50,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      background: theme.palette.secondary.main,
    })}
  >
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Title</TableCell>
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Category</TableCell>
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Price</TableCell>
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Amount</TableCell>
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Description</TableCell>
    <TableCell align="center" variant="head" sx={{ ...styles.title }}>Remove</TableCell>
  </TableRow>
);

export default BudgetTableHead;
