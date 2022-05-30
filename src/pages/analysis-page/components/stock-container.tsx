import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import WindowButton from '../sections/stock-research/window-button';
import { Stock } from '../../../store/features/stocks/types';
import { useRootDispatch } from '../../../store/hooks';
import StockChart from './stock-chart';
import { createAppendToWatchListAction } from '../../../store/features/watchlist/watchlist-action-creators';
import { createStocksDeleteStockAction } from '../../../store/features/stocks/stocks-action-creators';

type StockContainerProps = {
  stock: Stock
};

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

const StockContainer: React.FC<StockContainerProps> = ({ stock }) => {
  const dispatch = useRootDispatch();

  return (
    <Paper
      key={stock.id}
      sx={(theme) => ({
        ...researchStyles.col,
        gap: 1.2,
        width: 1,
        p: 2,
        background: theme.palette.myBlack.main,
      })}
    >
      <Box sx={{ ...researchStyles.aCenter, justifyContent: 'space-between' }}>
        <Typography
          color="error.dark"
          variant="h4"
          sx={{ ml: 2, fontFamily: 'roboto' }}
        >
          {stock.symbol}
        </Typography>
        <Box sx={{ ...researchStyles.aCenter, gap: 1 }}>
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
            color={researchStyles.chartBlue}
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
        sx={{
          ml: 2, fontSize: 24, fontFamily: 'roboto', color: researchStyles.chartBlue,
        }}
      >
        {`$${Number(stock.chartData[stock.chartData.length - 1].price).toFixed(2)}`}
      </Typography>
      <StockChart chartData={stock.chartData} />
    </Paper>
  );
};

export default StockContainer;
