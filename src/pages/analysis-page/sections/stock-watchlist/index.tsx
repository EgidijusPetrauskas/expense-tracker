import React, { useEffect, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableRow,
  Box,
} from '@mui/material';

import CustomTableRow from './custom-table-row';
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
import CustomTableHeader from './custom-table-headers';

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
    <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
      <CustomBackDrop open={loading} handleClose={() => dispatch(watchlistSetLoadingAction)} />
      {error
        ? (
          <LoadingError variant="refresh" error={error} onClick={refresh} />
        )
        : (
          <Paper sx={{ width: 1 }}>
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
              </TableBody>
            </Table>
          </Paper>
        )}
    </Box>
  );
};

export default WatchlistSection;
