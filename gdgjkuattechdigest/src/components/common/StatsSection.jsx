import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Android,
  Web,
  Cloud
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components for better control
const StatsSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  }
}));

const StatsGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'stretch',
  
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing(4),
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  minHeight: '280px',
  border: '1px solid #f0f0f0',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #4285F4, #EA4335, #34A853, #FBBC04)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    transform: 'translateY(-8px)',
    
    '&::before': {
      transform: 'scaleX(1)',
    }
  },
  
  // Ensure equal width on desktop
  [theme.breakpoints.up('md')]: {
    flex: '1 1 0',
    maxWidth: 'calc(33.333% - 16px)',
    minWidth: '280px',
  },
  
  // Full width on mobile
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: 'rgba(66, 133, 244, 0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  }
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: theme.spacing(1),
  fontSize: '3rem',
  lineHeight: 1,
  background: 'linear-gradient(135deg, #4285F4, #EA4335)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  }
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#1a1a1a',
  marginBottom: theme.spacing(2),
  fontSize: '1.25rem',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
  }
}));

const StatDescription = styled(Typography)(({ theme }) => ({
  color: '#666666',
  lineHeight: 1.7,
  fontSize: '0.95rem',
  maxWidth: '90%',
  margin: '0 auto',
  
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  }
}));

const StatsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    {
      description: 'Became Google Developer Students Club in 2022 and have completed many projects and many workshops.',
      icon: <Android sx={{ fontSize: 40, color: '#4285F4' }} />,
      color: '#4285F4'
    },
    {
      description: 'Get ready for our exciting upcoming events. We\'ll host a variety of learning with fun activities.',
      icon: <Web sx={{ fontSize: 40, color: '#EA4335' }} />,
      color: '#EA4335'
    },
    {

      description: 'Join our community of talented students who are eager to learn and collaborate on new technologies.',
      icon: <Cloud sx={{ fontSize: 40, color: '#34A853' }} />,
      color: '#34A853'
    }
  ];

  return (
    <StatsSectionContainer>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Our Impact
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Building a stronger developer community at JKUAT through collaboration, learning, and innovation
          </Typography>
        </Box>

        {/* Stats Cards */}
        <StatsGrid className="stats-grid-container">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              elevation={1}
              className="stat-card"
            >
              <IconContainer
                sx={{
                  backgroundColor: `${stat.color}15`,
                }}
              >
                {stat.icon}
              </IconContainer>
              
              <StatNumber variant="h3">
                {stat.number}
              </StatNumber>
              
              <StatLabel variant="h6">
                {stat.label}
              </StatLabel>
              
              <StatDescription variant="body2">
                {stat.description}
              </StatDescription>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
      
      {/* CSS Override Styles */}
      <style jsx>{`
        @media (min-width: 900px) {
          .stats-grid-container {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            gap: 32px !important;
            justify-content: space-between !important;
          }
          
          .stat-card {
            flex: 1 1 0 !important;
            max-width: calc(33.333% - 22px) !important;
            min-width: 280px !important;
            width: auto !important;
          }
        }
        
        @media (max-width: 899px) {
          .stats-grid-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
          }
          
          .stat-card {
            width: 100% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
        }
        
        @media (min-width: 600px) and (max-width: 899px) {
          .stats-grid-container {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            gap: 24px !important;
            justify-content: center !important;
          }
        }
        
        /* Additional responsive tweaks */
        @media (min-width: 1200px) {
          .stats-grid-container {
            gap: 40px !important;
          }
          
          .stat-card {
            min-width: 320px !important;
          }
        }
      `}</style>
    </StatsSectionContainer>
  );
};

export default StatsSection;