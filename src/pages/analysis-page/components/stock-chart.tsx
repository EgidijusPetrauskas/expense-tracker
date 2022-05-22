import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { parseISO, format } from 'date-fns';

import { Stock } from '../../../store/features/stocks-portfolio/types';

type StockChartProps = {
  chartData: Stock['chartData']
};

const StockChart: React.FC<StockChartProps> = ({ chartData }) => (
  <ResponsiveContainer width="100%" height={240}>
    <AreaChart data={chartData}>
      <Area dataKey="value" stroke="#2451b7" fill="transparent" />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tickCount={4}
        fontSize={10}
        tickFormatter={(str) => {
          const date = parseISO(str);
          return format(date, 'MMM, d');
        }}
      />
      <YAxis
        dataKey="value"
        axisLine={false}
        tickLine={false}
        fontSize={11}
        tickCount={4}
        tickFormatter={(number) => `$${number.toFixed(2)}`}
      />
      <Tooltip />
      <CartesianGrid opacity={0.1} vertical={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export default StockChart;
