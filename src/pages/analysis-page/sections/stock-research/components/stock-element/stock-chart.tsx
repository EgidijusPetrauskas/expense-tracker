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

import { Stock } from '../../../../../../store/features/stocks/types';

type StockChartProps = {
  chartData: Stock['chartData']
};

const StockChart: React.FC<StockChartProps> = ({ chartData }) => (
  <ResponsiveContainer width="100%" height={270}>
    <AreaChart data={chartData}>
      <Area dataKey="price" stroke="#2451b7" fill="transparent" />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        fontSize={12}
        tickFormatter={(str) => {
          const date = parseISO(str);
          return format(date, 'MMM, d');
        }}
        style={{ fontFamily: 'roboto' }}
      />
      <YAxis
        dataKey="price"
        axisLine={false}
        tickLine={false}
        fontSize={12}
        tickCount={10}
        tickFormatter={(number) => `$${number.toFixed(2)}`}
        style={{ fontFamily: 'roboto' }}
      />
      <Tooltip />
      <CartesianGrid opacity={0.1} vertical={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export default StockChart;
