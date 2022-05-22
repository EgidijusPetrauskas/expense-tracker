import React, { useState } from 'react';

import {
  Container, Typography, Box, Button, TextField, Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import StockChart from './stock-chart';
import { selectStocks } from '../../store/selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createStocksFetchStockAction, createStocksDeleteStockAction } from '../../store/action-creators';

const StockPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const stocks = useRootSelector(selectStocks);
  const dispatch = useRootDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const stocksSetStockAction = createStocksFetchStockAction(searchValue);
    dispatch(stocksSetStockAction);
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      pt: 12,
    }}
    >
      <Typography
        color="primary"
        variant="h2"
        component="h1"
      >
        My Stock Portfolio
      </Typography>
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: 1 / 5,
          background: '#aec4c2',
          p: 1,
        }}
      >
        <TextField
          label="Stock Symbol"
          color="primary"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit" variant="contained">ADD</Button>
      </Paper>
      <Box
        sx={{
          display: 'flex', flexWrap: 'wrap', gap: 2, width: 1,
        }}
      >
        {stocks.map((stock) => (
          <Paper
            key={stock.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 350,
              p: 2,
              background: '#15191e',
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography
                color="error.dark"
                variant="h4"
                sx={{ ml: 2 }}
              >
                {stock.symbol}
              </Typography>
              <CloseIcon
                onClick={() => dispatch(createStocksDeleteStockAction(stock.id))}
                sx={{ color: 'error.dark', '&:hover': { cursor: 'pointer' } }}
              />
            </Box>
            <StockChart chartData={stock.chartData} />
          </Paper>
        ))}
      </Box>

    </Container>
  );
};

export default StockPage;
