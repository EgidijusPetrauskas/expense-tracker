import React from 'react';
import { Button } from '@mui/material';

type CustomButtonProps = {
  onClick: () => void,
  btnText: string
};

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, btnText }) => (
  <Button
    variant="outlined"
    onClick={onClick}
    sx={{
      px: 1.4,
      fontSize: 13,
      letterSpacing: 1,
    }}
  >
    {btnText}
  </Button>
);

export default CustomButton;
