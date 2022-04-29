import React from 'react';
import IntroSection from './sections/intro-section/index';
import NavBar from '../../components/navbar/index';

const HomePage: React.FC = () => (
  <>
    <NavBar />
    <IntroSection />
  </>
);

export default HomePage;
