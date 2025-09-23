// Modern FAQ Section
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  Chip
} from '@mui/material';
import {
  ExpandMore,
  HelpOutline,
  ArrowForward
} from '@mui/icons-material';

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: 'Who can become a member?',
      answer: 'Any university student interested in developer technologies can join our community. We welcome students from all disciplines and skill levels, whether you\'re just starting your tech journey or looking to expand your existing knowledge.',
      category: 'Membership'
    },
    {
      question: 'How frequently do events and workshops occur?',
      answer: 'We host events regularly throughout the academic year. Typically, we organize monthly workshops, bi-weekly study sessions, and seasonal major events like hackathons and tech conferences. Follow our social channels for the latest event announcements.',
      category: 'Events'
    },
    {
      question: 'How should I start attending a workshop?',
      answer: 'Getting started is simple! Register for upcoming events through our community channels, join our WhatsApp group, or contact us directly through our social media. Most of our workshops are free and open to all JKUAT students.',
      category: 'Getting Started'
    },
    {
      question: 'Why should I choose GDG JKUAT?',
      answer: 'GDG JKUAT provides mentorship, networking opportunities, and hands-on learning experiences with industry professionals. You\'ll gain practical skills, build meaningful projects, connect with like-minded peers, and access exclusive Google developer resources.',
      category: 'Benefits'
    },
    {
      question: 'What technologies do you focus on?',
      answer: 'We cover a wide range of technologies including Android development, web development (React, Node.js), cloud computing (Google Cloud Platform), machine learning, data science, UI/UX design, and blockchain technologies.',
      category: 'Technology'
    },
    {
      question: 'Do I need prior programming experience?',
      answer: 'Not at all! We welcome complete beginners. Our community is designed to support learners at every level. We offer beginner-friendly workshops and pair you with experienced mentors to guide your learning journey.',
      category: 'Getting Started'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Membership': '#4285F4',
      'Events': '#EA4335',
      'Getting Started': '#34A853',
      'Benefits': '#FBBC05',
      'Technology': '#9C27B0'
    };
    return colors[category] || '#4285F4';
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <HelpOutline sx={{ fontSize: 32, color: '#4285F4', mr: 1 }} />
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            Find answers to common questions about joining GDG JKUAT and participating in our community.
          </Typography>
        </Box>

        {/* FAQ Grid Layout */}
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#4285F4',
                  boxShadow: '0 2px 8px rgba(66, 133, 244, 0.1)'
                }
              }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                elevation={0}
                sx={{
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    minHeight: 64,
                    '&.Mui-expanded': {
                      minHeight: 64
                    }
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore 
                      sx={{ 
                        color: '#666666',
                        transition: 'transform 0.3s ease',
                        transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)'
                      }} 
                    />
                  }
                  sx={{
                    bgcolor: 'white',
                    px: 3,
                    py: 2,
                    '&:hover': { 
                      bgcolor: '#f8f9fa',
                    },
                    '&.Mui-expanded': {
                      bgcolor: '#f8f9fa',
                      borderBottom: '1px solid #e0e0e0'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Chip
                      label={faq.category}
                      size="small"
                      sx={{
                        bgcolor: getCategoryColor(faq.category),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        mr: 2,
                        minWidth: 'auto'
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        flex: 1
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails 
                  sx={{ 
                    bgcolor: 'white',
                    px: 3,
                    py: 3,
                    borderTop: 'none'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#555555',
                      lineHeight: 1.7,
                      fontSize: '1rem',
                      pl: 6 // Align with the category chip
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>

        {/* Bottom Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              bgcolor: 'white',
              borderRadius: 3,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                mb: 2
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              Can't find the answer you're looking for? Feel free to reach out to our community leaders.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: '#4285F4',
                  '&:hover': { bgcolor: '#3367d6' },
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Contact Us
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#4285F4',
                  color: '#4285F4',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#4285F4',
                    bgcolor: 'rgba(66, 133, 244, 0.04)'
                  }
                }}
              >
                View All FAQs
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;