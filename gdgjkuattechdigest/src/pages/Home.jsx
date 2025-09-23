// src/pages/Home.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Paper,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,

} from '@mui/material';
import {
  ArrowForward,
  Android,
  Web,
  Cloud,
  Psychology,
  LinkedIn,
  Twitter,
  GitHub,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  PlayArrow
} from '@mui/icons-material';
import Header from '../components/common/Header';
import HeroSection from '../components/common/HeroSection';
import StatsSection from '../components/common/StatsSection';
import EpisodesByTrack from '../components/common/EpisodesByTrack';
import OpportunitiesSection from '../components/common/OpportunitiesSection';
import TechnologiesSection from '../components/common/TechnologiesSection';
import TeamSection from '../components/common/TeamSection';
import FAQSection from '../components/common/FAQSection';
import Footer from '../components/common/Footer';




const Home = () => {
  return (
    <Box>
      <Header />
      <HeroSection />
      <StatsSection />
      <EpisodesByTrack />
      <OpportunitiesSection />
      <TechnologiesSection />
      <TeamSection />
      <FAQSection />
      <Footer />
    </Box>
  );
};

export default Home;