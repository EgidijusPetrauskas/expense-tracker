import React, { useState, useEffect } from 'react';

import { Grid, Button } from '@mui/material';
import { useRootSelector, useRootDispatch } from '../../../store/hooks';
import { selectBudgetCurrentCategory } from '../../../store/features/budget/budget-selectors';
import { createBudgetSetCategoryAcion } from '../../../store/features/budget/budget-action-creators';

type GridButtonProps = {
  id: string,
  btnText: string,
  height?: number
};

const CategoryButton: React.FC<GridButtonProps> = ({ id, btnText, height }) => {
  const [active, setActive] = useState<boolean>(false);
  const currentCategory = useRootSelector(selectBudgetCurrentCategory);
  const dispatch = useRootDispatch();

  useEffect(() => {
    if (id === currentCategory) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [currentCategory]);

  const setCurrentCategory = (newCatId: string) => {
    dispatch(createBudgetSetCategoryAcion(newCatId));
  };

  return (
    <Grid
      item
      xl={4}
      lg={4}
      md={4}
      sm={4}
      xs={4}
      sx={{
        height: height || 48,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => setCurrentCategory(id)}
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
