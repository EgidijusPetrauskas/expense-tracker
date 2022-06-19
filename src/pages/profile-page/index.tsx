import React, { useEffect } from 'react';

import { Container, Button, Box } from '@mui/material';

import {
  createSetUserDetailsActionThunk,
  createUserSetUpdateFormOpenAction,
} from '../../store/features/auth-and-user/user-action-creators';
import { selectUserUpdateFormOpen } from '../../store/features/auth-and-user/auth-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';

import PersonalInfoSection from './personal-info-section';
import UpdateInfoForm from './update-info-form';

const ProfilePage: React.FC = () => {
  const formOpen = useRootSelector(selectUserUpdateFormOpen);
  const dispatch = useRootDispatch();
  useEffect(() => {
    dispatch(createSetUserDetailsActionThunk());
  }, []);
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
            xl: 17.5,
            lg: 17.5,
            md: 17.5,
            sm: 13,
            xs: 14,
          },
          pb: 5,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: 2,
          },
        })}
      >
        <PersonalInfoSection>
          <Button
            variant="outlined"
            color={formOpen ? 'error' : 'primary'}
            onClick={() => dispatch(createUserSetUpdateFormOpenAction)}
            sx={{ fontSize: 16 }}
          >
            {formOpen ? 'Cancel' : 'Update'}
          </Button>
        </PersonalInfoSection>
        {formOpen && <UpdateInfoForm />}
      </Box>
    </Container>
  );
};

export default ProfilePage;
