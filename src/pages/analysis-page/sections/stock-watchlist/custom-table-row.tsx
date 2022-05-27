import React from 'react';

import {
  TableRow, TableCell, Tooltip, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { WatchlistItem } from '../../../../store/features/watchlist/types';
import { useRootDispatch } from '../../../../store/hooks';
import { createRemoveFromWatchlistAction } from '../../../../store/features/watchlist/watchlist-action-creators';

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
    dispatch(createRemoveFromWatchlistAction(itemSymbol));
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
        <Tooltip title="Remove from Watchlist" arrow>
          <Button
            variant="contained"
            onClick={() => deleteItem(symbol)}
            sx={{
              minWidth: 21,
              minHeight: 21,
              borderRadius: 50,
              p: 1,
              background: 'primary.main',
            }}
          >
            <DeleteIcon
              sx={(theme) => ({
                color: theme.palette.secondary.dark,
              })}
            />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
