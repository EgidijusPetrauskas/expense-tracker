import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#C5C6C7',
    },
  },

  mixins: {
    navbar: {
      width: 2 / 3,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      minHeight: 65,
      pt: 2,
    },
  },
});

export default theme;
