import React, { useState } from 'react';

import {
  Box,
  Alert,
} from '@mui/material';

import {
  selectStocks,
  selectStocksError,
  selectStocksLoading,
} from '../../../../store/selectors';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { createStocksFetchStockAction } from '../../../../store/action-creators';
import { stocksClearErrorAction } from '../../../../store/features/stocks/stocks-action-creators';
import { selectWatchlistSuccess } from '../../../../store/features/watchlist/watchlist-selectors';
import SearchBar from './components/search-bar';
import LoadingError from '../../components/loading-error';
import StockContainer from './components/stock-element/stock-container';

const researchStyles = {
  aCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  jCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  chartBlue: '#2451b7',
  successAlert: {
    height: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    fontSize: 15,
    letterSpacing: 0.7,
  },
};

const ResearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const stocks = useRootSelector(selectStocks);
  const error = useRootSelector(selectStocksError);
  const loading = useRootSelector(selectStocksLoading);
  const successfullAdd = useRootSelector(selectWatchlistSuccess);
  const dispatch = useRootDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const stocksSetStockAction = createStocksFetchStockAction(searchValue);
    dispatch(stocksSetStockAction);
    setSearchValue('');
  };

  const clearError = () => {
    dispatch(stocksClearErrorAction);
  };

  return (
    <Box sx={(theme) => ({
      width: 1,
      ...researchStyles.aCenter,
      flexDirection: 'column',
      gap: 4,
      pb: 6,
      [theme.breakpoints.down('sm')]: {
        py: 2,
      },
    })}
    >
      <Box
        sx={(theme) => ({
          width: 1,
          height: 60,
          position: 'relative',
          ...researchStyles.jCenter,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: 1,
          },
        })}
      >
        {error
          ? (
            <LoadingError variant="close" error={error} onClick={clearError} />
          )
          : (
            <SearchBar
              searchValue={searchValue}
              loading={loading}
              handleSubmit={handleSubmit}
              handleChange={setSearchValue}
            />
          )}
        {successfullAdd && (
          <Alert
            elevation={16}
            variant="filled"
            severity={typeof successfullAdd === 'boolean' ? 'success' : 'error'}
            sx={(theme) => ({
              ...researchStyles.successAlert,
              [theme.breakpoints.down('md')]: {
                width: 1,
                height: 35,
                position: 'static',
                py: 2,
              },
            })}
          >
            { typeof successfullAdd === 'boolean' ? 'Added to Your Watchlist!' : successfullAdd}
          </Alert>
        )}
      </Box>
      <Box sx={{
        width: 1, ...researchStyles.jCenter, flexWrap: 'wrap', gap: 3,
      }}
      >
        {stocks.map((stock) => (<StockContainer stock={stock} />))}
      </Box>
    </Box>
  );
};

export default ResearchSection;
