import React from 'react';

import { Box } from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';

import { useSearchParams } from 'react-router-dom';
import StyledTextField from '../../components/custom-form/custom-form-styles';
import CustomForm from '../../components/custom-form';
import { Credentials } from '../../types/credentials';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createRegisterAction } from '../../store/features/auth/auth-action-creators';
import { selectAuthError } from '../../store/selectors';

type RegisterValues = Credentials & {
  repPassword: string
};

type SignInFormikConfig = FormikConfig<RegisterValues>;

const initialValues: RegisterValues = {
  username: '',
  password: '',
  repPassword: '',
};

const validationSchema: SchemaOf<RegisterValues> = Yup.object({
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
  repPassword: Yup.string()
    .required('This field is required')
    .min(5, 'Password is to short')
    .max(50, 'Password is to long')
    .matches(/[A-ZĄČĘĖĮŠŲŪŽ]/, 'Upper case letter required')
    .matches(/[a-ząčęėįšųūž]/, 'Lower case letter required')
    .matches(/\d/, 'Number is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const RegisterPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const error = Boolean(useRootSelector(selectAuthError));

  const [searchParams] = useSearchParams();

  const handleRegister: SignInFormikConfig['onSubmit'] = ({ username, password, repPassword }) => {
    const redirect = searchParams.get('redirect') ?? '/';
    const registerAction = createRegisterAction({ username, password, repPassword }, redirect);
    dispatch(registerAction);
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
  } = useFormik<RegisterValues>({
    initialValues,
    onSubmit: handleRegister,
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
        buttonText="Register"
        onSubmit={handleSubmit}
        isDisabled={!(dirty && isValid) || error}
      >
        <StyledTextField
          type="text"
          label="New Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username ? `${errors.username}` : null}
          disabled={error}
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
          disabled={error}
          fullWidth
        />
        <StyledTextField
          type="password"
          label="Repeat Password"
          name="repPassword"
          value={values.repPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.repPassword && Boolean(errors.repPassword)}
          helperText={touched.repPassword && errors.repPassword ? `${errors.repPassword}` : null}
          disabled={error}
          fullWidth
        />
      </CustomForm>
    </Box>
  );
};

export default RegisterPage;
