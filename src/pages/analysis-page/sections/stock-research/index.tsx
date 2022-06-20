import React, { useState } from 'react';

import { Box } from '@mui/material';

import {
  selectStocks,
  selectStocksError,
  selectStocksLoading,
} from '../../../../store/selectors';
import { createStocksFetchStockActionThunk } from '../../../../store/action-creators';
import { stocksClearErrorAction } from '../../../../store/features/stocks/stocks-action-creators';
import { selectWatchlistSuccess } from '../../../../store/features/watchlist/watchlist-selectors';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';

import SearchBar from './components/search-bar';
import LoadingError from '../../components/loading-error';
import StockContainer from './components/stock-element/stock-container';
import SectionInfoCard from '../../components/section-info-card';
import SuccesfullAlert from './stock-research-styles';

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
    const stocksSetStockAction = createStocksFetchStockActionThunk(searchValue);
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
          <SuccesfullAlert
            elevation={16}
            variant="filled"
            severity={String(successfullAdd).split(' ')[1] === 'added' ? 'success' : 'error'}
          >
            {successfullAdd}
          </SuccesfullAlert>
        )}
      </Box>
      <Box sx={{
        width: 1, ...researchStyles.jCenter, flexWrap: 'wrap', gap: 3,
      }}
      >
        {stocks.length <= 0 && <SectionInfoCard title="Stock Reserch" text="Research and analyse the stocks in the market" />}
        {stocks.map((stock) => (<StockContainer key={stock.id} stock={stock} />))}
      </Box>
    </Box>
  );
};

export default ResearchSection;
