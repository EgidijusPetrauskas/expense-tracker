import React from 'react';

import { Box } from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { useSearchParams } from 'react-router-dom';

import { Credentials } from '../../types';

import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createRegisterActionThunk } from '../../store/features/auth-and-user/auth-action-creators';
import { selectAuthError } from '../../store/selectors';

import AuthService from '../../services/auth-service';
import { StyledTextField } from '../../components/custom-form/custom-form-styles';
import CustomForm from '../../components/custom-form';

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
    .test(
      'usernameAvailabilityCheck',
      'Username is not valid',
      async (username, context) => {
        if (!username) return false;
        try {
          const usernameIsAvailable = await AuthService.checkUsernameAvailability(username);
          return usernameIsAvailable;
        } catch (error) {
          throw context.createError({
            message: error instanceof Error ? error.message : error as string,
          });
        }
      },
    )
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
    const registerAction = createRegisterActionThunk({ username, password, repPassword }, redirect);
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
      sx={(theme) => ({
        width: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 20,
        [theme.breakpoints.down('md')]: {
          py: 16,
        },
      })}
    >
      <CustomForm
        buttonText="Register"
        onSubmit={handleSubmit}
        isDisabled={!(dirty && isValid) || error}
        logo
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
