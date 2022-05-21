import React from 'react';

import { styled } from '@mui/material';

const StyledLogo = styled('img')(({ theme }) => ({
  borderRadius: '100%',
  border: `1.5px solid ${theme.palette.primary.main}`,
  transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.standard }),
}));

type LogoProps = {
  src: string,
  width: number,
  mode?: 'hover' | 'standart',
  active?: boolean
};

const Logo: React.FC<LogoProps> = ({
  src, width, mode, active,
}) => (
  <StyledLogo
    sx={(theme) => ({
      width,
      ':hover': mode === 'hover' ? { cursor: 'pointer', border: '1.5px solid transparent' } : {},
      border: active ? '1.5px solid transparent' : `1.5px solid ${theme.palette.primary.main}`,
    })}
    src={src}
    alt={src}
  />
);

export default Logo;
