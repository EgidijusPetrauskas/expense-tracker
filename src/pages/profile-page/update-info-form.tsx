import React from 'react';

import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';

import CustomForm from '../../components/custom-form/index';
import StyledTextField from '../../components/custom-form/custom-form-styles';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { UserDetails } from '../../types';
import { selectUser } from '../../store/features/auth-and-user/auth-selectors';
import { createUpdateUserActionThunk } from '../../store/features/auth-and-user/user-action-creators';

type AdditionalInfoValues = UserDetails;

type AdditionalInfoFomikConfig = FormikConfig<AdditionalInfoValues>;

let initialValues: AdditionalInfoValues = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Min 3 symbols')
    .max(32, 'Max 32 symbols'),
  lastName: Yup.string()
    .min(2, 'Min 2 symbols')
    .max(32, 'Max 32 symbols'),
  email: Yup.string()
    .min(6, 'Min 6 symbols')
    .max(50, 'Max 50 symbols')
    .email('Enter a valid email'),
  age: Yup.string()
    .max(3, 'Max 3 symbols')
    .matches(/^\d*$/, 'Only numbers are allowed'),
});

const UpdateInfoForm: React.FC = () => {
  const user = useRootSelector(selectUser);
  const dispatch = useRootDispatch();

  if (user) {
    initialValues = {
      firstName: user.firstName === undefined ? '' : user.firstName,
      lastName: user.lastName === undefined ? '' : user.lastName,
      email: user.email === undefined ? '' : user.email,
      age: user.age === undefined ? '' : user.age,
    };
  }

  const handleSubmitInfo: AdditionalInfoFomikConfig['onSubmit'] = ({
    firstName, lastName, email, age,
  }) => {
    dispatch(createUpdateUserActionThunk({
      firstName, lastName, email, age,
    }));
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
  } = useFormik<AdditionalInfoValues>({
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
        Update Personal Info
      </Typography>
      <StyledTextField
        sx={{ width: 4 / 5 }}
        autoComplete="new-password"
        type="text"
        name="firstName"
        label="First Name"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.firstName && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
      />
      <StyledTextField
        sx={{ width: 4 / 5 }}
        autoComplete="new-password"
        type="text"
        name="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.lastName && Boolean(errors.lastName)}
        helperText={touched.lastName && errors.lastName}
      />
      <StyledTextField
        sx={{ width: 4 / 5 }}
        autoComplete="new-password"
        type="text"
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <StyledTextField
        sx={{ width: 4 / 5 }}
        autoComplete="new-password"
        type="text"
        name="age"
        label="Age"
        value={values.age}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.age && Boolean(errors.age)}
        helperText={touched.age && errors.age}
      />
    </CustomForm>
  );
};

export default UpdateInfoForm;
