import React from 'react';

import { Box } from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';

import StyledTextField from '../../components/custom-form/custom-form-styles';
import CustomForm from '../../components/custom-form';

export type SignInValues = {
  username: string,
  password: string
};

type SignInFormikConfig = FormikConfig<SignInValues>;

const initialValues: SignInValues = {
  username: '',
  password: '',
};

const validationSchema: SchemaOf<SignInValues> = Yup.object({
  username: Yup.string()
    .required('This field is required')
    .min(2, 'Username is to short')
    .max(20, 'Username is too long')
    .matches(/^[A-Za-z0-9_-]+$/, 'Only alphabets, dashes, and underscores are allowed'),
  password: Yup.string()
    .required('This field is required')
    .min(5, 'Password is to short')
    .max(50, 'Password is to long')
    .matches(/[A-ZĄČĘĖĮŠŲŪŽ]/, 'Upper case letter required')
    .matches(/[a-ząčęėįšųūž]/, 'Lower case letter required')
    .matches(/\d/, 'Number is required'),
});

const SignInPage: React.FC = () => {
  const handleSignIn: SignInFormikConfig['onSubmit'] = () => {
    console.log('Čia bus prisijungimo logiką kai bus serverio logika');
  };

  const {
    values,
    errors,
    touched,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = useFormik<SignInValues>({
    initialValues,
    onSubmit: handleSignIn,
    validationSchema,
  });

  return (
    <Box
      component="main"
      sx={{
        width: 1,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CustomForm
        buttonText="Sign In"
        onSubmit={handleSubmit}
        isDisabled={!(dirty && isValid)}
      >
        <StyledTextField
          type="text"
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username ? `${errors.username}` : null}
          fullWidth
        />
        <StyledTextField
          type="password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password ? `${errors.password}` : null}
          fullWidth
        />
      </CustomForm>
    </Box>
  );
};

export default SignInPage;
