import React, { useEffect } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import CustomTableRow from './custom-table-row';

const tempVal = {
  symbol: 'IBM',
  exchange: 'NYSE',
  currency: 'USD',
  sector: 'Technology',
  high: '400',
  low: '200',
};

const headerValues = ['SYMBOL', 'EXCHANGE', 'CURRENCY', 'SECTOR', '52 WEEK HIGHT', '52 WEEK LOW', 'REMOVE'];

const WatchlistSection: React.FC = () => {
  const customHeaderCell = (value: string) => (
    <TableCell
      sx={(theme) => ({
        color: theme.palette.secondary.dark,
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: 1,
      })}
      align="center"
      variant="head"
      key={value}
    >
      {value}
    </TableCell>
  );

  const fetchh = () => {
    const API_KEY = 'GA62GOU1YT7XJ0OP';

    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        const {
          Symbol, Exchange, Currency, Sector,
        } = data;
        const high = data['52WeekHigh'];
        const low = data['52WeekLow'];
        console.log({
          Symbol, Exchange, Currency, Sector, high, low,
        });
      });
  };

  useEffect(() => {
    fetchh();
  }, []);

  return (
    <Paper sx={{ width: 1 }}>
      <Table>
        <TableBody>
          <TableRow sx={(theme) => ({ background: theme.palette.secondary.main })}>
            {headerValues.map((cellValue) => customHeaderCell(cellValue))}
          </TableRow>
          <CustomTableRow data={tempVal} />
          <CustomTableRow data={tempVal} />
          <CustomTableRow data={tempVal} />
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WatchlistSection;
