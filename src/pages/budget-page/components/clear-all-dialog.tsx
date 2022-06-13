import React from 'react';

import {
  Dialog,
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useRootDispatch } from '../../../store/hooks';
import { createClearAllExpensesAction } from '../../../store/features/budget/budget-action-creators';

type CustomDialogProps = {
  open: boolean,
  onClose: () => void
};

const ClearAllDialog: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  const dispatch = useRootDispatch();

  const clearAll = () => {
    dispatch(createClearAllExpensesAction());
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
        display: 'flex', flexDirection: 'column', gap: 2, background: theme.palette.secondary.main, py: 2,
      })}
      >
        <Typography sx={(theme) => ({ fontSize: 22, textAlign: 'center', color: theme.palette.myBlack.main })}>Are you sure you want to clear all expenses?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="contained" color="error">CANCEL</Button>
          <Button onClick={clearAll} variant="contained" color="primary">YES</Button>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ClearAllDialog;
