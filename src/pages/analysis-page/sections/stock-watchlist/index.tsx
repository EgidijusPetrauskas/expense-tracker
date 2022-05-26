import React, { useEffect } from 'react';
import axios from 'axios';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import CustomTableRow from './custom-table-row';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { selectUser } from '../../../../store/selectors';
import { StocksWatchListItem } from '../../../../types/stock-watchlist-item';
import { createWatchlistItemFetchAction } from '../../../../store/features/watchlist/watchlist-action-creators';
import { selectWatchlist } from '../../../../store/features/watchlist/watchlist-selectors';

const headerValues = ['SYMBOL', 'EXCHANGE', 'CURRENCY', 'SECTOR', '52 WEEK HIGHT', '52 WEEK LOW', 'REMOVE'];

const WatchlistSection: React.FC = () => {
  const user = useRootSelector(selectUser);
  const dispatch = useRootDispatch();
  const watchlist = useRootSelector(selectWatchlist);

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

  // ================================== BLOGIS ↓↓↓↓↓↓

  const loadWatchlist = async () => {
    if (!user) {
      throw new Error('Reik padaryt i error');
    }
    const { data } = await axios.get<StocksWatchListItem>(`http://localhost:5000/stock_watchlist/${user.id}`);
    data.stocks.map((stock) => dispatch(createWatchlistItemFetchAction(stock)));
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  //= =================================
  return (
    <Paper sx={{ width: 1 }}>
      <Table>
        <TableBody>
          <TableRow sx={(theme) => ({ background: theme.palette.secondary.main })}>
            {headerValues.map((cellValue) => customHeaderCell(cellValue))}
          </TableRow>
          {watchlist.map((item) => (
            <CustomTableRow key={item.symbol} data={item} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WatchlistSection;
