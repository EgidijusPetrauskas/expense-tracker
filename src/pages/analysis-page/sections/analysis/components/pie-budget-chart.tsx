import React from 'react';

import { Typography, Paper } from '@mui/material';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { CalculatedExpense } from '../../../../../types';

import { selectBudgetChartIsSet } from '../../../../../store/features/budget/budget-selectors';
import { useRootDispatch, useRootSelector } from '../../../../../store/hooks';
import { budgetSetChartIsSetAction } from '../../../../../store/features/budget/budget-action-creators';

type PieBudgetChartProps = {
  data: CalculatedExpense[]
};

type RenderCustomizedLabelProps = {
  [key: string]: any
};

export const budgetChartColors = [
  { name: 'Food and Necessities', color: '#267278' },
  { name: 'Transport', color: '#65338D' },
  { name: 'Leisure and Entertainment', color: '#4770B3' },
  { name: 'Health', color: '#3B3689' },
  { name: 'Investment', color: '#50AED3' },
  { name: 'Other', color: '#9E9Ea2' },
];

const radian = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);

  return (
    <text x={x} y={y} fontFamily="roboto" fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <Paper
        sx={(theme) => ({
          background: theme.palette.secondary.light,
          p: 0.8,
        })}
      >
        <Typography
          sx={(theme) => ({
            color: theme.palette.primary.main,
          })}
        >
          {`${payload[0].name}: ${payload[0].value}€`}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const PieBudgetChart: React.FC<PieBudgetChartProps> = ({ data }) => {
  const chartIsSet = useRootSelector(selectBudgetChartIsSet);
  const dispatch = useRootDispatch();

  return (
    <ResponsiveContainer width="50%" height="75%" minWidth={250}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="90%"
          animationDuration={1400}
          isAnimationActive={!chartIsSet}
          onAnimationEnd={() => dispatch(budgetSetChartIsSetAction)}
        >
          {data.map((entry) => <Cell stroke="none" key={entry.name} fill={budgetChartColors.find((item) => item.name === entry.name)?.color} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieBudgetChart;
