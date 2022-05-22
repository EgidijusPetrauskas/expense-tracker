import React, { useState } from 'react';

import { Container, ToggleButtonGroup } from '@mui/material';

import { StyledButton } from './analysis-page-styles';
import AnalisisSection from './sections/analysis';
import InfoCard from './components/info-card';
import PortfolioSection from './sections/stock-portfolio/index';
import ResearchSection from './sections/stock-research/index';

const AnalysisPage: React.FC = () => {
  const [section, setSections] = useState<string | null>(null);

  const handleSections = (
    e: React.MouseEvent<HTMLElement>,
    updatedSection: string | null,
  ) => {
    setSections(updatedSection);
  };

  const sectionDisplay = (sectionSelect: string | null) => {
    switch (sectionSelect) {
      case 'analysis': {
        return <AnalisisSection />;
      }
      case 'portfolio': {
        return <PortfolioSection />;
      }
      case 'research': {
        return <ResearchSection />;
      }
      default: return <InfoCard />;
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 20,
      }}
    >
      <ToggleButtonGroup
        exclusive
        value={section}
        onChange={handleSections}
        sx={{
          width: 2 / 3,
          height: 50,
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <StyledButton value="analysis">Analysis</StyledButton>
        <StyledButton value="portfolio">Portfolio</StyledButton>
        <StyledButton value="research">Stock Research</StyledButton>
      </ToggleButtonGroup>
      {sectionDisplay(section)}
    </Container>
  );
};

export default AnalysisPage;
