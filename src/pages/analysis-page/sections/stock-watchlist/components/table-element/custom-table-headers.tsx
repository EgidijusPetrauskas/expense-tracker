import React from 'react';

import { TableCell } from '@mui/material';

type CustomTableHeaderProps = {
  value: string
};

const CustomTableHeader: React.FC<CustomTableHeaderProps> = ({ value }) => (
  <TableCell
    sx={(theme) => ({
      color: theme.palette.secondary.dark,
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: 1,
      [theme.breakpoints.down('md')]: {
        p: 1,
      },
    })}
    align="center"
    variant="head"
  >
    {value}
  </TableCell>
);

export default CustomTableHeader;
