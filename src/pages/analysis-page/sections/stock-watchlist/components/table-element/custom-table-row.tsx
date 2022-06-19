import React from 'react';

import {
  TableRow, TableCell,
} from '@mui/material';

import { WatchlistItem } from '../../../../../../store/features/watchlist/types';
import { createRemoveFromWatchlistActionThunk } from '../../../../../../store/features/watchlist/watchlist-action-creators';
import { useRootDispatch } from '../../../../../../store/hooks';

import DeleteButton from '../../../../../../components/delete-button';

type CustomTableRowProps = {
  data: WatchlistItem,
};

const styles = {
  cell: {
    fontSize: 16,
    fontFamily: 'roboto',
  },
};

const CustomTableRow: React.FC<CustomTableRowProps> = ({ data }) => {
  const {
    symbol, exchange, currency, sector, high, low,
  } = data;
  const dispatch = useRootDispatch();

  const deleteItem = (itemSymbol: string) => {
    dispatch(createRemoveFromWatchlistActionThunk(itemSymbol));
  };

  return (
    <TableRow
      hover
      sx={(theme) => ({ transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.short }) })}
    >
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{symbol}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{exchange}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{currency}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{sector}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{`$${high}`}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">{`$${low}`}</TableCell>
      <TableCell color="secondary.dark" sx={{ ...styles.cell }} align="center">
        <DeleteButton hoverText="Remove From Watchlist" handleDelete={deleteItem} deleteBy={symbol} />
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
