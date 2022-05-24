import React from 'react';

import {
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  TextField,
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
      value={searchValue}
      disabled={loading}
      onChange={(e) => handleChange((e.target.value).toUpperCase())}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton type="submit" edge="end"><SearchIcon /></IconButton>
          </InputAdornment>
        ),
      }}
    />
    {loading && (
      <LinearProgress sx={{ height: 6, mt: 0.4 }} />
    )}
  </Paper>
);

export default SearchBar;
