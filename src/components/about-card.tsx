import React from 'react';

import { Container, Typography } from '@mui/material';

type AboutCardProps = {
  text: string
  link?: string
};

const AboutCard: React.FC<AboutCardProps> = ({ text, link, children }) => (
  <Container
    maxWidth={false}
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      minWidth: 220,
      maxWidth: 320,
      height: 1,
      border: `6px solid ${theme.palette.secondary.main}`,
      borderRadius: 3,
      p: 4,
      textAlign: 'center',
    })}
  >
    {children}
    <Typography
      sx={(theme) => ({
        color: theme.palette.primary.light,
        textAlign: 'center',
        fontSize: 20,
      })}
    >
      {text}
    </Typography>
    <Typography sx={{ color: 'blue' }}>
      {link}
    </Typography>
  </Container>

);

export default AboutCard;
