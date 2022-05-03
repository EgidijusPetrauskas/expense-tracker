import { createTheme, Theme } from '@mui/material';

const theme: Theme = createTheme();

const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: '#66FCF10',
      dark: '#C5C6C7',
    },

    secondary: {
      main: '#45A29E',
      dark: '#1F2833',
    },

    myBlack: {
      main: '#0B0C10',
    },

    background: {
      default: '#0B0C10',
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
      [theme.breakpoints.down('md')]: {
        width: 1,
      },
    },
  },
});

export default customTheme;
