import React, { useState } from 'react';

import {
  Box,
  Alert,
  Typography, Paper,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
import AboutCard from '../../../../components/about-card';

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
            severity={String(successfullAdd).split(' ')[1] === 'added' ? 'success' : 'error'}
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
            {successfullAdd}
          </Alert>
        )}
      </Box>
      <Box sx={{
        width: 1, ...researchStyles.jCenter, flexWrap: 'wrap', gap: 3,
      }}
      >
        {stocks.length <= 0 && (
          <Paper
            elevation={16}
            sx={{
              width: 1,
              py: 10,
              px: {
                xs: 2,
              },
              background: 'inherit',
              color: 'primary.light',
            }}
          >
            <AboutCard text="Research and analyse the stocks in the market">
              <Typography variant="h5">Stock Research</Typography>
              <MoreHorizIcon sx={{ fontSize: 50 }} />
            </AboutCard>
          </Paper>
        )}
        {stocks.map((stock) => (<StockContainer key={stock.symbol} stock={stock} />))}
      </Box>
    </Box>
  );
};

export default ResearchSection;
