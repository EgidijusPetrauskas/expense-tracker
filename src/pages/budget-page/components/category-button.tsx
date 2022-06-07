import React from 'react';

import { Grid, Button } from '@mui/material';

type GridButtonProps = {
  btnText: string,
};

const CategoryButton: React.FC<GridButtonProps> = ({ btnText }) => {
  const active = false;
  return (
    <Grid
      item
      xl={4}
      lg={4}
      md={4}
      sm={4}
      xs={4}
      sx={{
        height: 48,
      }}
    >
      <Button
        variant="outlined"
        sx={(theme) => ({
          width: 1,
          height: 1,
          fontSize: 17,
          letterSpacing: 1.2,
          borderRadius: 0,
          color: active ? 'white' : 'primary.light',
          border: active ? 'none' : `1px solid ${theme.palette.primary.main}`,
          background: active ? theme.palette.secondary.main : 'none',
          transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.short }),
          '&:hover': {
            color: 'primary.main',
            border: `1px solid ${theme.palette.primary.light}`,
          },
        })}
      >
        {btnText}
      </Button>
    </Grid>
  );
};

export default CategoryButton;
