type ExpenseCategoryOptions =
  'Food and Necessities' |
  'Transport' |
  'Leisure and Entertainment' |
  'Health' |
  'Investment' |
  'Other';

export type ExpenseCategory = {
  id: string,
  title: ExpenseCategoryOptions,
};
