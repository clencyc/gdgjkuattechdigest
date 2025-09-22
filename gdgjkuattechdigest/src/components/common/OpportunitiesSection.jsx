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
  PlayArrow
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components for better control
const OpportunitiesSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  position: 'relative',
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },

  // Subtle pattern background
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fafafa',
    backgroundImage: `
      radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)
    `,
    backgroundSize: '20px 20px',
    zIndex: 1,
  }
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

const OpportunitiesGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  marginTop: theme.spacing(6),
  
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(4),
  },
  
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(5),
  }
}));

const OpportunityCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  border: '1px solid #e3f2fd',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: '#4285F4',
    transform: 'scaleY(0)',
    transformOrigin: 'bottom',
    transition: 'transform 0.3s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(66, 133, 244, 0.15)',
    borderColor: '#bbdefb',
    
    '&::before': {
      transform: 'scaleY(1)',
    }
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  minWidth: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  backgroundColor: 'transparent',
  
  [theme.breakpoints.down('sm')]: {
    minWidth: '40px',
    height: '40px',
    marginRight: theme.spacing(1.5),
  }
}));

const OpportunityText = styled(Typography)(({ theme }) => ({
  color: '#424242',
  lineHeight: 1.7,
  fontSize: '1rem',
  fontWeight: 400,
  flex: 1,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
  },
  
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.1rem',
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: theme.spacing(2),
  fontSize: '2.5rem',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  }
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: '#666666',
  fontSize: '1.125rem',
  lineHeight: 1.6,
  maxWidth: '700px',
  margin: '0 auto',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  }
}));

const OpportunitiesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const opportunities = [
    'Build knowledge at the necessary Technologies you want to master',
    'Collaborate with the innovative technology',
    'Showcase the innovation to local and even global audiences',
    'Join the student leader community',
    'Build the original projects to level university and students',
    'Build community as learning basics skill until professional one',
    'Get access and mentorship from top developing engineers',
    'Grow skills with team development and professional development'
  ];

  return (
    <OpportunitiesSectionContainer>
      <ContentContainer maxWidth="lg">
        <SectionHeader>
          <HeaderTitle variant="h3" component="h2">
            Opportunities GDGs provide students with
          </HeaderTitle>
          <HeaderSubtitle variant="body1">
            Join our vibrant community and unlock endless possibilities for growth, learning, and innovation in technology
          </HeaderSubtitle>
        </SectionHeader>

        <OpportunitiesGrid className="opportunities-grid">
          {opportunities.map((opportunity, index) => (
            <OpportunityCard
              key={index}
              elevation={2}
              className="opportunity-card"
            >
              <IconContainer>
                <PlayArrow sx={{ fontSize: { xs: 20, sm: 24 }, color: '#4285F4' }} />
              </IconContainer>
              
              <OpportunityText variant="body1">
                {opportunity}
              </OpportunityText>
            </OpportunityCard>
          ))}
        </OpportunitiesGrid>
      </ContentContainer>
      
      {/* CSS Override Styles */}
      <style jsx>{`
        @media (min-width: 900px) {
          .opportunities-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
            align-items: stretch !important;
          }
          
          .opportunity-card {
            display: flex !important;
            align-items: flex-start !important;
            height: 100% !important;
            min-height: 120px !important;
          }
        }
        
        @media (min-width: 600px) and (max-width: 899px) {
          .opportunities-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
          
          .opportunity-card {
            min-height: 110px !important;
          }
        }
        
        @media (max-width: 599px) {
          .opportunities-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .opportunity-card {
            min-height: 100px !important;
          }
        }
        
        /* Staggered animation on load */
        .opportunity-card {
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .opportunity-card:nth-child(1) { animation-delay: 0.1s; }
        .opportunity-card:nth-child(2) { animation-delay: 0.2s; }
        .opportunity-card:nth-child(3) { animation-delay: 0.3s; }
        .opportunity-card:nth-child(4) { animation-delay: 0.4s; }
        .opportunity-card:nth-child(5) { animation-delay: 0.5s; }
        .opportunity-card:nth-child(6) { animation-delay: 0.6s; }
        .opportunity-card:nth-child(7) { animation-delay: 0.7s; }
        .opportunity-card:nth-child(8) { animation-delay: 0.8s; }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced hover effects */
        .opportunity-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 12px 35px rgba(66, 133, 244, 0.2) !important;
        }
        
        /* Icon pulse animation on hover */
        .opportunity-card:hover .MuiSvgIcon-root {
          animation: iconPulse 0.6s ease-in-out;
        }
        
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </OpportunitiesSectionContainer>
  );
};

export default OpportunitiesSection;