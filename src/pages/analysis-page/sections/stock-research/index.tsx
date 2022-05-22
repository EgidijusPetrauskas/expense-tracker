import React, { useState } from 'react';

import {
  Typography,
  Box,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import StockChart from '../../components/stock-chart';
import { selectStocks } from '../../../../store/selectors';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { createStocksFetchStockAction, createStocksDeleteStockAction } from '../../../../store/action-creators';

const ResearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const stocks = useRootSelector(selectStocks);
  const dispatch = useRootDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const stocksSetStockAction = createStocksFetchStockAction(searchValue);
    dispatch(stocksSetStockAction);
  };

  return (
    <Box sx={{
      width: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    }}
    >
      <Paper
        elevation={10}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={(theme) => ({
          background: theme.palette.secondary.main,
          gap: 2,
          p: 1.1,
        })}
      >
        <TextField
          label="Search stock symbol"
          color="primary"
          size="small"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end"><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          width: 1,
        }}
      >
        {stocks.map((stock) => (
          <Paper
            key={stock.id}
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
              width: 400,
              p: 2,
              background: theme.palette.myBlack.main,
            })}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
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
                sx={{
                  color: 'error.dark',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{ ml: 2, fontSize: 24, color: '#2451b7' }}
            >
              {`$${Number(stock.chartData[stock.chartData.length - 1].value).toFixed(2)}`}
            </Typography>
            <StockChart chartData={stock.chartData} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ResearchSection;
