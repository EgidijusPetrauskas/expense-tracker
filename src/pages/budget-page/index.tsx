import React from 'react';
import {
  Container,
  Grid,
  Table,
  TableBody,
} from '@mui/material';
import CategoryButton from './components/category-button';
import BudgetTableHead from './components/budget-table-head';
import BudgetTableRow from './components/budget-table-row';

const categoryButtons = [
  'Food and Necessities',
  'Transport',
  'Leisure and Entertainment',
  'Health',
  'Investment',
  'Other'];

const BudgetPage: React.FC = () => (
  <Container
    sx={{
      width: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 20,
    }}
  >
    <Grid container spacing={0.7}>
      {categoryButtons.map((btn) => (
        <CategoryButton key={btn} btnText={btn} />
      ))}
    </Grid>
    <Table>
      <TableBody>
        <BudgetTableHead />
        <BudgetTableRow data={{
          title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me and Lisa.',
        }}
        />
        <BudgetTableRow data={{
          title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me and Lisa.',
        }}
        />
        <BudgetTableRow data={{
          title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me and Lisa.',
        }}
        />
        <BudgetTableRow data={{
          title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me and Lisa.',
        }}
        />
        <BudgetTableRow data={{
          title: 'Lunch', category: 'Food and Necessities', price: 14.15, amount: 2, description: 'Burger king for me and Lisa.',
        }}
        />
      </TableBody>
    </Table>
  </Container>
);

export default BudgetPage;
