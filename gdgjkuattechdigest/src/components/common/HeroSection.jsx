import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward,
  Groups
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import heroImage from '../../assets/gdg-hero-image.png';

// Custom styled components to override Material-UI Grid behavior
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  overflow: 'hidden',
  minHeight: '600px',
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  }
}));

const HeroGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'center',
  
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(6),
    minHeight: '500px',
  }
}));

const TextSection = styled('div')(({ theme }) => ({
  flex: 1,
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(0, 2),
  order: 2,
  
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    paddingRight: theme.spacing(4),
    order: 1,
    maxWidth: '50%',
  }
}));

const ImageSection = styled('div')(({ theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  order: 1,
  
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    order: 2,
    maxWidth: '50%',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  height: '280px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[12]
  },
  
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
    height: '320px',
  },
  
  [theme.breakpoints.up('md')]: {
    maxWidth: '100%',
    height: '400px',
  }
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'stretch',
  
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
  }
}));

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <HeroGrid>
          <TextSection>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 2
              }}
            >
              {[
                { letter: 'G', color: '#4285F4' }, // Blue
                { letter: 'D', color: '#EA4335' }, // Red
                { letter: 'G', color: '#FBBC05' }, // Yellow
                { letter: ' ', color: 'transparent' }, // Space
                { letter: 'J', color: '#4285F4' }, // Blue
                { letter: 'K', color: '#34A853' }, // Green
                { letter: 'U', color: '#EA4335' }, // Red
                { letter: 'A', color: '#FBBC05' }, // Yellow
                { letter: 'T', color: '#4285F4' }  // Blue
              ].map((item, index) => (
                <Typography
                  key={index}
                  component="span"
                  sx={{
                    fontFamily: '"Product Sans", "Google Sans", "Roboto", sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    color: item.color,
                    mx: item.letter === ' ' ? 1 : 0,
                    letterSpacing: '-0.02em',
                    display: 'inline-block',
                    textShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      textShadow: '0px 2px 3px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  {item.letter}
                </Typography>
              ))}
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary', 
                lineHeight: 1.7, 
                mb: 4, 
                fontSize: { 
                  xs: '1rem', 
                  md: '1.125rem' 
                },
                maxWidth: { xs: '100%', md: '95%' }
              }}
            >
              Google Developer Groups JKUAT is a community of students passionate about Google technologies. 
              We learn, share, and build together through workshops, study jams, and projects focused on 
              mobile and web development, cloud technologies, AI/ML, and leadership skills.
            </Typography>
            
            <ButtonContainer>
              <Button
                variant="contained"
                size="large"
                href="https://gdg.community.dev/gdg-on-campus-jomo-kenyatta-university-of-agriculture-and-technology-juja-kenya/"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<Groups />}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  minWidth: { xs: 'auto', sm: '200px' },
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Join Our Community
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                href="/episodes"
                endIcon={<ArrowForward />}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  minWidth: { xs: 'auto', sm: '180px' },
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Explore Episodes
              </Button>
            </ButtonContainer>
          </TextSection>
          <ImageSection>
            <StyledPaper elevation={8}>
              <img
                src={heroImage}
                alt="GDG JKUAT Community"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              
              {/* Fallback content when image fails to load */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`
                }}
              >
                <Groups sx={{ fontSize: { xs: 50, md: 60 }, mb: 2, opacity: 0.7 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.8,
                    textAlign: 'center',
                    px: 2
                  }}
                >
                  GDG JKUAT Community
                </Typography>
              </Box>
              
              {/* Gradient overlay for visual depth */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                  pointerEvents: 'none'
                }}
              />
            </StyledPaper>
          </ImageSection>
        </HeroGrid>
      </Container>
      
      {/* Additional CSS to ensure proper layout */}
      <style jsx>{`
        @media (min-width: 900px) {
          .hero-grid-container {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 48px !important;
          }
          
          .text-section {
            flex: 1 1 50% !important;
            max-width: 50% !important;
            text-align: left !important;
          }
          
          .image-section {
            flex: 1 1 50% !important;
            max-width: 50% !important;
            display: flex !important;
            justify-content: flex-end !important;
          }
        }
        
        @media (max-width: 899px) {
          .hero-grid-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 32px !important;
          }
          
          .image-section {
            order: 1 !important;
          }
          
          .text-section {
            order: 2 !important;
            text-align: center !important;
          }
        }
      `}</style>
    </HeroContainer>
  );
};

export default HeroSection;