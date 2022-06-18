import React from 'react';

import IntroSection from './sections/intro-section/index';
import AboutSection from './sections/about-section/index';
import QuotesSection from './sections/quotes-section/index';

const HomePage: React.FC = () => (
  <>
    <IntroSection />
    <AboutSection />
    <QuotesSection />
  </>
);

export default HomePage;
