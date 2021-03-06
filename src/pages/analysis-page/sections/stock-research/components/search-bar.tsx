/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  searchValue: string,
  loading: boolean,
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  handleChange: (value: string) => void,
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue, loading, handleSubmit, handleChange,
}) => (
  <Paper
    elevation={10}
    component="form"
    autoComplete="off"
    onSubmit={handleSubmit}
    sx={(theme) => ({
      width: {
        xl: 1 / 3,
        lg: 1 / 3,
        md: 1 / 3,
        sm: 1,
        xs: 1,
      },
      background: loading ? 'none' : theme.palette.secondary.main,
      gap: 2,
      p: 1.1,
    })}
  >
    {loading
      ? (
        <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TextField
          label="Search stock symbol"
          color="primary"
          size="small"
          variant="outlined"
          value={searchValue}
          disabled={loading}
          onChange={(e) => handleChange((e.target.value).toUpperCase())}
          fullWidth
          inputProps={{
            maxLength: 4,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end"><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              width: 1,
            },
          })}
        />
      )}
  </Paper>
);

export default SearchBar;
