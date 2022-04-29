import React from 'react';

import {
  AppBar, Toolbar, Box, Link,
} from '@mui/material';

const NavBar: React.FC = () => (
  <AppBar
    color="transparent"
    sx={{ alignItems: 'center' }}
  >
    <Toolbar
      sx={{
        width: 2 / 3,
        justifyContent: 'space-around',
      }}
    >
      <Box
        sx={{
          width: 1 / 5,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link color="secondary" href="/">Yas</Link>
        <Link color="secondary" href="/">Yas</Link>
      </Box>
      <Box>
        Logo
      </Box>
      <Box
        sx={{
          width: 1 / 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link color="secondary" href="/">Yas</Link>
        <Link color="secondary" href="/">Yas</Link>
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar;
