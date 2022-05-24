import React from 'react';

import { TableRow, TableCell, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type WatchListStock = {
  symbol: string,
  exchange: string,
  currency: string,
  sector: string,
  high: string,
  low: string,
};

type CustomTableRowProps = {
  data: WatchListStock,
};

const CustomTableRow: React.FC<CustomTableRowProps> = ({ data }) => (
  <TableRow hover>
    <TableCell align="center">{data.symbol}</TableCell>
    <TableCell align="center">{data.exchange}</TableCell>
    <TableCell align="center">{data.currency}</TableCell>
    <TableCell align="center">{data.sector}</TableCell>
    <TableCell align="center">{`$${data.high}`}</TableCell>
    <TableCell align="center">{`$${data.low}`}</TableCell>
    <TableCell align="center"><Tooltip title="Remove from Watchlist" arrow><DeleteIcon /></Tooltip></TableCell>
  </TableRow>
);

export default CustomTableRow;
