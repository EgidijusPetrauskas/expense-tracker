import React from 'react';

import {
  Dialog,
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useRootDispatch } from '../../../store/hooks';
import { createUserDeleteActionThunk } from '../../../store/features/auth-and-user/user-action-creators';

type CustomDialogProps = {
  open: boolean,
  onClose: () => void
};

const DeleteDialog: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  const dispatch = useRootDispatch();

  const deleteUser = () => {
    dispatch(createUserDeleteActionThunk);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={(theme) => ({
        background: theme.palette.secondary.light,
      })}
    >
      <Container sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: theme.palette.secondary.main,
        py: 2,
      })}
      >
        <Typography sx={(theme) => ({
          fontSize: 25,
          fontWeight: 500,
          fontFamily: 'roboto',
          textAlign: 'center',
          color: theme.palette.myBlack.main,
        })}
        >
          Are you sure you want to delete Your account?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="contained" color="error">CANCEL</Button>
          <Button onClick={deleteUser} variant="contained" color="primary">YES</Button>
        </Box>
      </Container>
    </Dialog>
  );
};

export default DeleteDialog;
