import React from 'react';

import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Typography, MenuItem, Dialog } from '@mui/material';

import CustomForm from '../../../components/custom-form';
import StyledTextField from '../../../components/custom-form/custom-form-styles';
import { Expense, ExpenseCategory } from '../../../types';
import { useRootDispatch, useRootSelector } from '../../../store/hooks';
import { createBudgetAppendExpenseAction, createBudgetSetFormOpenAction } from '../../../store/features/budget/budget-action-creators';
import { selectBudgetFormOpen, selectBudgetCategories } from '../../../store/features/budget/budget-selectors';

type NewExpenseValues = Omit<Expense, 'id'>;

type AdditionalInfoFomikConfig = FormikConfig<NewExpenseValues>;

type AddExpenseFormProps = {
  openForm: boolean,
  closeForm: () => void
};

const styles = {
  textFieldExtraStyles: {
    width: {
      xl: 4 / 5,
      lg: 4 / 5,
      md: 4 / 5,
      sm: 4 / 5,
      xs: 1,
    },
  },
};

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
    .max(20, 'Max 20 symbols')
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
    .min(3, 'Min 3 symbols')
    .max(30, 'Max 30 symbols'),
});

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ openForm, closeForm }) => {
  const dispatch = useRootDispatch();
  const formOpen = useRootSelector(selectBudgetFormOpen);
  const categories = useRootSelector<ExpenseCategory[]>(selectBudgetCategories);

  const handleSubmitInfo: AdditionalInfoFomikConfig['onSubmit'] = ({
    title,
    category,
    price,
    amount,
    description,
  }) => {
    dispatch(createBudgetAppendExpenseAction({
      title, category, price, amount, description,
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
    <Dialog
      open={openForm}
      onClose={closeForm}
      fullWidth
    >

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
          sx={{ ...styles.textFieldExtraStyles }}
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
          sx={{ ...styles.textFieldExtraStyles }}
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
          {categories.map((opt) => (
            <MenuItem
              key={opt.id}
              value={opt.id}
            >
              {opt.title}
            </MenuItem>
          ))}
        </StyledTextField>
        <StyledTextField
          sx={{ ...styles.textFieldExtraStyles }}
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
          sx={{ ...styles.textFieldExtraStyles }}
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
          sx={{ ...styles.textFieldExtraStyles }}
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
    </Dialog>
  );
};

export default AddExpenseForm;
