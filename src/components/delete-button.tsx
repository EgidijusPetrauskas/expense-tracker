import React from 'react';

import { Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteButtonProps = {
  hoverText: string,
  deleteBy: string,
  handleDelete: (deleteBy: DeleteButtonProps['deleteBy']) => void,
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ hoverText, deleteBy, handleDelete }) => (
  <Tooltip title={hoverText} arrow>
    <Button
      variant="contained"
      onClick={() => handleDelete(deleteBy)}
      sx={{
        minWidth: 21,
        minHeight: 21,
        borderRadius: 50,
        p: 1,
        background: 'primary.main',
      }}
    >
      <DeleteIcon
        sx={(theme) => ({
          color: theme.palette.secondary.dark,
        })}
      />
    </Button>
  </Tooltip>
);

export default DeleteButton;
