import React, { useEffect, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableRow,
  Box,
  TableCell,
} from '@mui/material';

import CustomTableRow from './components/table-element/custom-table-row';
import {
  useRootSelector,
  useRootDispatch,
} from '../../../../store/hooks';
import {
  selectWatchlist,
  selectWatchlistError,
  selectWatchlistLoading,
} from '../../../../store/features/watchlist/watchlist-selectors';
import {
  createSetWatchlistAction,
  watchlistRefreshAction,
  watchlistSetLoadingAction,
} from '../../../../store/features/watchlist/watchlist-action-creators';
import LoadingError from '../../components/loading-error';
import CustomBackDrop from '../../../../components/custom-backdrop';
import CustomTableHeader from './components/table-element/custom-table-headers';
import { SpiningHourglass } from './stock-watchlist-styles';

const headerValues = ['SYMBOL', 'EXCHANGE', 'CURRENCY', 'SECTOR', '52 WEEK HIGHT', '52 WEEK LOW', 'REMOVE'];

const WatchlistSection: React.FC = () => {
  const [reload, setReload] = useState(false);
  const watchlist = useRootSelector(selectWatchlist);
  const loading = useRootSelector(selectWatchlistLoading);
  const error = useRootSelector(selectWatchlistError);
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(createSetWatchlistAction());
  }, [reload]);

  const refresh = () => {
    dispatch(watchlistRefreshAction);
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  return (
    <Box sx={(theme) => ({
      width: 1,
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        overflow: 'scroll',
      },
    })}
    >
      <CustomBackDrop open={loading} handleClose={() => dispatch(watchlistSetLoadingAction)} />
      {error
        ? (
          <LoadingError variant="refresh" error={error} onClick={refresh} />
        )
        : (
          <Paper sx={{ width: 1, overflow: 'inherit' }}>
            <Table>
              <TableBody>
                <TableRow sx={(theme) => ({ background: theme.palette.secondary.main })}>
                  {headerValues.map((headerValue) => (
                    <CustomTableHeader key={headerValue} value={headerValue} />
                  ))}
                </TableRow>
                {watchlist.map((item) => (
                  <CustomTableRow key={item.symbol} data={item} />
                ))}
                {watchlist.length === 0 && (
                  <TableRow>
                    <TableCell sx={{ py: 1 }} align="center" colSpan={headerValues.length}>
                      <SpiningHourglass color="secondary" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
    </Box>
  );
};

export default WatchlistSection;
