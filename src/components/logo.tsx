import React from 'react';

import { styled } from '@mui/material';

const StyledLogo = styled('img')(({ theme }) => ({
  borderRadius: '100%',
  border: `1px solid ${theme.palette.primary.main}`,
  background: 'white',
}));

type LogoProps = {
  src: string,
  width: number
};

const Logo: React.FC<LogoProps> = ({ src, width }) => (
  <StyledLogo sx={{ width }} src={src} alt={src} />
);

export default Logo;
