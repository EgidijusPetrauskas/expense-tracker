import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import {
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { BudgetChartDataType, budgetChartColors } from './pie-budget-chart';

type InfoTableProps = {
  data: BudgetChartDataType[],
  budget: number
};

const getColor = (name: string) => {
  const color = budgetChartColors.find((item) => item.name === name)?.color;

  if (color === undefined) return 'white';
  return color;
};

const InfoTable: React.FC<InfoTableProps> = ({ data, budget }) => {
  const [currentDate, setCurrentDate] = useState<string>('Year Month');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'yyyy MMMM'));
  }, []);

  const customGridItem = ({ name, value }: { name: string, value: number }) => (
    <Grid
      item
      key={name}
      xl={6}
      lg={6}
      md={6}
      sm={12}
      xs={12}
      sx={{ textAlign: 'center' }}
    >
      <Typography
        sx={{
          color: getColor(name),
          fontFamily: 'roboto',
          fontSize: 20,
        }}
      >
        {`${name}: ${value}€`}
      </Typography>
    </Grid>
  );

  return (
    <Paper
      elevation={16}
      sx={(theme) => ({
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        background: theme.palette.secondary.light,
        py: 4,
        px: 3,
      })}
    >
      <Typography
        sx={(theme) => ({
          color: theme.palette.primary.main,
          fontSize: 23,
          textAlign: 'center',
        })}
      >
        {`My budget for ${currentDate} - ${budget}€`}
      </Typography>
      <Grid container>
        {data.map((item) => customGridItem(item))}
      </Grid>
    </Paper>
  );
};

export default InfoTable;
