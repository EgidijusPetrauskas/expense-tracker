import React, { useEffect, useState } from 'react';

import { Container, Button, Box } from '@mui/material';

import {
  createSetUserDetailsActionThunk,
  userSetUpdateFormOpenAction,
} from '../../store/features/auth-and-user/user-action-creators';
import { selectUserUpdateFormOpen } from '../../store/features/auth-and-user/auth-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';

import PersonalInfoSection from './components/personal-info-section';
import UpdateInfoForm from './components/update-info-form';
import DeleteDialog from './components/delete-dialog';

const ProfilePage: React.FC = () => {
  const formOpen = useRootSelector(selectUserUpdateFormOpen);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color={formOpen ? 'error' : 'primary'}
              onClick={() => dispatch(userSetUpdateFormOpenAction)}
              sx={{ fontSize: 14 }}
            >
              {formOpen ? 'Cancel' : 'Update'}
            </Button>
            {!formOpen && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialogOpen(!deleteDialogOpen)}
              sx={{ fontSize: 14 }}
            >
              DELETE
            </Button>
            )}
            <DeleteDialog onClose={() => setDeleteDialogOpen(!deleteDialogOpen)} open={deleteDialogOpen} />
          </Box>
        </PersonalInfoSection>
        {formOpen && <UpdateInfoForm />}
      </Box>
    </Container>
  );
};

export default ProfilePage;
