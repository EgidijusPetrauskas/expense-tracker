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
      fontSize: {
        xl: 13,
        lg: 13,
        md: 12,
        sm: 13,
        xs: 13,
      },
      letterSpacing: 1,
      p: {
        xl: 0.7,
        lg: 0.7,
        md: 0.6,
        sm: 0.6,
        xs: 0.6,
      },
    }}
  >
    {btnText}
  </Button>
);

export default CustomButton;
