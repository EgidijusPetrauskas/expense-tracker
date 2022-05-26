import React, { useState } from 'react';

import {
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';

import StockChart from '../../components/stock-chart';
import {
  selectStocks,
  selectStocksError,
  selectStocksLoading,
} from '../../../../store/selectors';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { createStocksFetchStockAction, createStocksDeleteStockAction } from '../../../../store/action-creators';
import { stocksClearErrorAction } from '../../../../store/features/stocks/stocks-action-creators';
import WindowButton from './window-button';
import SearchBar from './search-bar';
import { createAppendToWatchListAction } from '../../../../store/features/watchlist/watchlist-action-creators';
import { selectWatchlistSuccess } from '../../../../store/features/watchlist/watchlist-selectors';
import LoadingError from '../../components/loading-error';

const styles = {
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
    <Box sx={{
      width: 1,
      ...styles.aCenter,
      flexDirection: 'column',
      gap: 4,
    }}
    >
      <Box
        sx={{
          width: 1,
          height: 60,
          position: 'relative',
          ...styles.jCenter,
        }}
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
            sx={{
              ...styles.successAlert,
            }}
          >
            { typeof successfullAdd === 'boolean' ? 'Added to Your Watchlist!' : successfullAdd}
          </Alert>
        )}
      </Box>
      <Box sx={{
        width: 1, ...styles.jCenter, flexWrap: 'wrap', gap: 3,
      }}
      >
        {stocks.map((stock) => (
          <Paper
            key={stock.id}
            sx={(theme) => ({
              ...styles.col,
              gap: 1.2,
              width: 1,
              p: 2,
              background: theme.palette.myBlack.main,
            })}
          >
            <Box sx={{ ...styles.aCenter, justifyContent: 'space-between' }}>
              <Typography
                color="error.dark"
                variant="h4"
                sx={{ ml: 2 }}
              >
                {stock.symbol}
              </Typography>
              <Box sx={{ ...styles.aCenter, gap: 1 }}>
                <WindowButton
                  variant="info"
                  href={`https://finviz.com/quote.ashx?t=${stock.symbol}`}
                  color="primary.light"
                  hoverText="More Info"
                />
                <WindowButton
                  variant="add"
                  onClick={() => dispatch(createAppendToWatchListAction(stock.symbol))}
                  hoverText="Add To Watchlist"
                  color={styles.chartBlue}
                />
                <WindowButton
                  variant="close"
                  onClick={() => dispatch(createStocksDeleteStockAction(stock.id))}
                  color="error.dark"
                  hoverText="Close Window"
                />
              </Box>
            </Box>
            <Typography
              variant="h4"
              sx={{ ml: 2, fontSize: 24, color: styles.chartBlue }}
            >
              {`$${Number(stock.chartData[stock.chartData.length - 1].price).toFixed(2)}`}
            </Typography>
            <StockChart chartData={stock.chartData} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ResearchSection;
