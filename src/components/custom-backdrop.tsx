import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

type CustomBackDropProps = {
  open: boolean,
  handleClose?: () => void
};

const CustomBackDrop: React.FC<CustomBackDropProps> = ({ open, handleClose }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    onClick={handleClose}
    transitionDuration={{ appear: 200, exit: 200 }}
  >
    <CircularProgress color="primary" />
  </Backdrop>
);

export default CustomBackDrop;
