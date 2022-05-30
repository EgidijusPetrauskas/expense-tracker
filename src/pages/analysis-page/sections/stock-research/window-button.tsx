import React from 'react';

import { Tooltip, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type WindowButtonProps = {
  variant: 'close' | 'add' | 'info',
  href?: string,
  color: string,
  hoverText: string,
  onClick?: () => void,
};

const WindowButton: React.FC<WindowButtonProps> = ({
  variant, href, color, hoverText, onClick,
}) => {
  if (variant === 'close') {
    return (
      <Tooltip title={hoverText} arrow>
        <CloseIcon
          onClick={onClick}
          sx={{
            color,
            '&:hover': { cursor: 'pointer' },
          }}
        />
      </Tooltip>
    );
  }

  if (variant === 'add') {
    return (
      <Tooltip title={hoverText} arrow>
        <AddIcon
          onClick={onClick}
          sx={{
            color,
            '&:hover': { cursor: 'pointer' },
          }}
        />
      </Tooltip>
    );
  }

  if (variant === 'info') {
    return (
      <Tooltip title={hoverText} arrow>
        <Link sx={{ display: 'flex', alignItems: 'center' }} href={href} target="_blank">
          <InfoOutlinedIcon
            sx={{
              color,
              '&:hover': { cursor: 'pointer' },
            }}
          />
        </Link>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={hoverText} arrow>
      <CloseIcon
        onClick={onClick}
        sx={{
          color,
          '&:hover': { cursor: 'pointer' },
        }}
      />
    </Tooltip>
  );
};

export default WindowButton;
