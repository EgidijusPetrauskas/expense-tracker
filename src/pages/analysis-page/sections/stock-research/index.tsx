import React, { useState } from 'react';

import {
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';

import axios from 'axios';
import StockChart from '../../components/stock-chart';
import {
  selectStocks, selectStocksError, selectStocksLoading, selectUser,
} from '../../../../store/selectors';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { createStocksFetchStockAction, createStocksDeleteStockAction } from '../../../../store/action-creators';
import { stocksClearErrorAction, createStocksSetErrorAction } from '../../../../store/features/stocks/stocks-action-creators';
import WindowButton from './window-button';
import SearchBar from './search-bar';

type WatchlistItem = {
  id: string,
  userId: string,
  stocks: string[]
};

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
};

const ResearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const user = useRootSelector(selectUser);
  const stocks = useRootSelector(selectStocks);
  const error = useRootSelector(selectStocksError);
  const loading = useRootSelector(selectStocksLoading);
  const dispatch = useRootDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const stocksSetStockAction = createStocksFetchStockAction(searchValue);
    dispatch(stocksSetStockAction);
    setSearchValue('');
  };

  const addToWatchlist = async (symbol: string) => {
    if (user === null) {
      dispatch(createStocksSetErrorAction);
      return;
    }

    const { data } = await axios.get<WatchlistItem[]>('http://localhost:5000/stock_watchlist');
    const userExists = data.map((item) => item.userId).includes(user.id);

    if (userExists) {
      const [watchlistItem] = data.filter((item: WatchlistItem) => item.userId === user.id);
      await axios.patch<WatchlistItem>(
        `http://localhost:5000/stock_watchlist/${user.id}`,
        { stocks: [...watchlistItem.stocks, symbol] },
      );
    } else {
      await axios.post<WatchlistItem>('http://localhost:5000/stock_watchlist', { userId: user.id, stocks: [symbol] });
    }
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
      <Box sx={{ height: 60 }}>
        {error
          ? (
            <Alert
              variant="filled"
              severity="error"
              onClose={clearError}
            >
              Something went wrong.. Try again.
            </Alert>
          )
          : (
            <SearchBar
              searchValue={searchValue}
              loading={loading}
              handleSubmit={handleSubmit}
              handleChange={setSearchValue}
            />
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
                  onClick={() => addToWatchlist(stock.symbol)}
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
