// src/pages/Home.jsx
import React, { useState } from 'react';
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
  useTheme,
  useMediaQuery
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

// Team Slider Section
const TeamSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe'
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
      github: 'https://github.com/janesmith'
    },
    {
      name: 'Mike Johnson',
      role: 'Backend Developer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson'
    },
    {
      name: 'Sarah Wilson',
      role: 'Frontend Developer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/sarahwilson',
      twitter: 'https://twitter.com/sarahwilson'
    },
    {
      name: 'David Brown',
      role: 'Data Scientist',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/davidbrown',
      github: 'https://github.com/davidbrown'
    },
    {
      name: 'Lisa Davis',
      role: 'Product Manager',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/lisadavis',
      twitter: 'https://twitter.com/lisadavis'
    },
    {
      name: 'Alex Chen',
      role: 'Mobile Developer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen'
    },
    {
      name: 'Emily Rodriguez',
      role: 'DevOps Engineer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez'
    },
    {
      name: 'James Taylor',
      role: 'Security Specialist',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/jamestaylor',
      twitter: 'https://twitter.com/jamestaylor'
    },
    {
      name: 'Anna Kim',
      role: 'QA Engineer',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/annakim',
      github: 'https://github.com/annakim'
    }
  ];

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentMembers = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return teamMembers.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          mb: 2,
          color: '#1a1a1a'
        }}
      >
        Meet The GDG Team
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          mb: 6,
          color: '#666666'
        }}
      >
        Get to know the amazing people behind our community.
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Grid container spacing={4} justifyContent="center">
          {getCurrentMembers().map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${currentSlide}-${index}`}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: '#4285F4',
                  color: 'white',
                  maxWidth: 300,
                  mx: 'auto'
                }}
              >
                <Avatar
                  src={member.image}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'white'
                  }}
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  {member.role}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {member.linkedin && (
                    <IconButton
                      size="small"
                      sx={{ color: 'white' }}
                      onClick={() => window.open(member.linkedin)}
                    >
                      <LinkedIn />
                    </IconButton>
                  )}
                  {member.twitter && (
                    <IconButton
                      size="small"
                      sx={{ color: 'white' }}
                      onClick={() => window.open(member.twitter)}
                    >
                      <Twitter />
                    </IconButton>
                  )}
                  {member.github && (
                    <IconButton
                      size="small"
                      sx={{ color: 'white' }}
                      onClick={() => window.open(member.github)}
                    >
                      <GitHub />
                    </IconButton>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Navigation Buttons */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <ChevronRight />
        </IconButton>

        {/* Slide Indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: index === currentSlide ? '#4285F4' : '#ccc',
                mx: 0.5,
                cursor: 'pointer'
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: 'Who can become a member?',
      answer: 'Any university student interested in developer technologies can join our community.'
    },
    {
      question: 'How frequently the events and workshops occur?',
      answer: 'We host events regularly - typically monthly workshops and seasonal major events.'
    },
    {
      question: 'How should I start attending a workshop?',
      answer: 'Simply register for upcoming events through our community channels or contact us directly.'
    },
    {
      question: 'Why should I pick up GDG if I have any questions?',
      answer: 'GDG provides mentorship, networking opportunities, and hands-on learning experiences with industry professionals.'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#fafafa', py: 8 }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
            color: '#1a1a1a'
          }}
        >
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0} sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f8f9fa' }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'white' }}>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#4285F4',
              '&:hover': { bgcolor: '#3367d6' }
            }}
          >
            View All FAQs
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

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
    </Box>
  );
};

export default Home;