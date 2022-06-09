import React from 'react';

import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import { Typography, MenuItem } from '@mui/material';

import CustomForm from '../../../components/custom-form';
import StyledTextField from '../../../components/custom-form/custom-form-styles';
import { Expense, ExpenseCategory } from '../../../types';
import { useRootDispatch, useRootSelector } from '../../../store/hooks';
import { createBudgetAppendExpenseAction, createBudgetSetFormOpenAction } from '../../../store/features/budget/budget-action-creators';
import { selectBudgetFormOpen } from '../../../store/features/budget/budget-selectors';

type NewExpenseValues = Omit<Expense, 'id'>;

type AdditionalInfoFomikConfig = FormikConfig<NewExpenseValues>;

const initialValues: NewExpenseValues = {
  title: '',
  category: '',
  price: 0,
  amount: 0,
  description: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Min 2 symbols')
    .max(32, 'Max 32 symbols')
    .required('Title is rquired'),
  category: Yup.string()
    .required('Category is rquired'),
  price: Yup.number()
    .max(999999999, 'Max 999999999')
    .required('Price is rquired'),
  amount: Yup.number()
    .max(999999999, 'Max 999999999')
    .required('Amount is rquired'),
  description: Yup.string()
    .min(6, 'Min 6 symbols')
    .max(50, 'Max 50 symbols'),
});

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

const AddExpenseForm: React.FC = () => {
  const dispatch = useRootDispatch();
  const formOpen = useRootSelector(selectBudgetFormOpen);

  const handleSubmitInfo: AdditionalInfoFomikConfig['onSubmit'] = ({
    title,
    category,
    price,
    amount,
    description,
  }) => {
    dispatch(createBudgetAppendExpenseAction({
      id: v4(), title, category, price, amount, description,
    }));
    dispatch(createBudgetSetFormOpenAction(!formOpen));
  };

  const {
    values,
    touched,
    dirty,
    errors,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<NewExpenseValues>({
    initialValues,
    onSubmit: handleSubmitInfo,
    validationSchema,
  });

  return (
    <CustomForm
      fullWidth
      buttonText="Submit"
      onSubmit={handleSubmit}
      isDisabled={!(dirty && isValid)}
    >
      <Typography
        sx={{
          fontSize: 26,
          color: 'primary.light',
          textAlign: 'center',
        }}
      >
        Add New Expense
      </Typography>
      <StyledTextField
        sx={{ width: 2 / 5 }}
        autoComplete="off"
        type="text"
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />
      <StyledTextField
        sx={{ width: 2 / 5 }}
        autoComplete="off"
        name="category"
        label="Category"
        select
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.category && Boolean(errors.category)}
        helperText={touched.category && errors.category}
      >
        {categoryOptions.map((opt) => (
          <MenuItem
            key={opt.id}
            value={opt.id}
          >
            {opt.title}
          </MenuItem>
        ))}
      </StyledTextField>
      <StyledTextField
        sx={{ width: 2 / 5 }}
        autoComplete="off"
        type="number"
        name="price"
        label="Price"
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
      />
      <StyledTextField
        sx={{ width: 2 / 5 }}
        autoComplete="new-password"
        type="number"
        name="amount"
        label="Amount"
        value={values.amount}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.amount && Boolean(errors.amount)}
        helperText={touched.amount && errors.amount}
      />
      <StyledTextField
        sx={{ width: 2 / 5 }}
        autoComplete="off"
        type="text"
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
    </CustomForm>
  );
};

export default AddExpenseForm;
