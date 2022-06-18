/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import {
  Container,
  Box,
} from '@mui/material';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import './swiper.css';

const quotes = [
  '“Do not save what is left after spending, but spend what is left after saving.” - Warren Buffett',
  '“Never spend your money before you have it.” - Thomas Jefferson',
  '“A wise person should have money in their head, but not in their heart.” -Jonathan Swift',
  '“It is never too early to encourage long-term savings.” — Ron Lewis',
  '“Save one third, live on one-third, and give away one-third.” — Angelina Jolie',
];

const QuotesSection: React.FC = () => (
  <Container
    maxWidth={false}
    sx={(theme) => ({
      height: {
        xl: 400,
        lg: 400,
        md: 400,
        sm: 500,
        xs: 600,
      },
      background: theme.palette.myBlack.main,
      pb: {
        xl: 4,
        lg: 4,
        md: 4,
        sm: 6,
        xs: 3,
      },
    })}
  >
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {quotes.map((quote) => (
        <SwiperSlide key={quote}>
          <Box
            sx={{
              width: 1 / 2,
              fontSize: {
                xl: 40,
                lg: 40,
                md: 40,
                sm: 44,
                xs: 33,
              },
            }}
          >
            {quote}
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Container>
);

export default QuotesSection;
