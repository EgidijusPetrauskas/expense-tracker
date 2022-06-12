import React, { useState, useEffect } from 'react';

import { Container, Button, Box } from '@mui/material';

import PersonalInfoSection from './personal-info-section';
import UpdateInfoForm from './update-info-form';
import { useRootDispatch } from '../../store/hooks';
import { createSetUserDetailsAction } from '../../store/features/auth/auth-action-creators';

const ProfilePage: React.FC = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const dispatch = useRootDispatch();
  useEffect(() => {
    dispatch(createSetUserDetailsAction());
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
            color={formOpen ? 'error' : 'primary'}
            onClick={() => setFormOpen(!formOpen)}
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
