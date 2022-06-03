import React from 'react';

import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';

import {
  Container, Typography, Button, Box,
} from '@mui/material';

import CustomForm from '../../components/custom-form/index';
import StyledTextField from '../../components/custom-form/custom-form-styles';
import { User } from '../../types/user';
import PersonalInfoSection from './personal-info-section';

type AdditionalInfoValues = Omit<User, 'id' | 'username'>;

type AdditionalInfoFomikConfig = FormikConfig<AdditionalInfoValues>;

const initialValues: AdditionalInfoValues = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'Min 3 symbols')
    .max(32, 'Max 32 symbols'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Min 2 symbols')
    .max(32, 'Max 32 symbols'),
  email: Yup.string()
    .required('Email is required')
    .min(6, 'Min 6 symbols')
    .max(50, 'Max 50 symbols')
    .email('Enter a valid email'),
  age: Yup.string()
    .required('Age is required')
    .max(3, 'Max 3 symbols')
    .matches(/^\d*$/, 'Only numbers are allowed'),
});

const ProfilePage: React.FC = () => {
  const handleSubmitInfo: AdditionalInfoFomikConfig['onSubmit'] = ({
    firstName, lastName, email, age,
  }) => {
    console.table({
      firstName, lastName, email, age,
    });
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
    <Container
      sx={{
        width: 1,
        height: 600,
        display: 'flex',
      }}
    >
      <Box
        sx={(theme) => ({
          width: 1,
          height: 1,
          display: 'flex',
          gap: 1,
          mt: {
            xl: 20,
            lg: 20,
            md: 20,
            sm: 13,
            xs: 14,
          },
          pb: 6,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: 2,
          },
        })}
      >
        <PersonalInfoSection>
          <Button
            variant="outlined"
            sx={{
              fontSize: 16,
              ':disabled': { color: 'secondary.main' },
            }}
          >
            Update
          </Button>
        </PersonalInfoSection>
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
            Add Personal Info
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
      </Box>
    </Container>
  );
};

export default ProfilePage;
