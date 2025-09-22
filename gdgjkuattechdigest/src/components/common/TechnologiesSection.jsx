import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import androidImage from '../../assets/android.png';
import webImage from '../../assets/web.png';
import cloudImage from '../../assets/cloud.png';
import aiImage from '../../assets/mi.png';


// Custom styled components for better control
const TechnologiesSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafafa',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  }
}));

const TechnologyRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(6),
    minHeight: '400px',
  },
  
  '&:last-child': {
    marginBottom: 0,
  }
}));

const ImageSection = styled('div')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),
  order: 1,
  
  [theme.breakpoints.up('md')]: {
    flex: '1 1 50%',
    maxWidth: '50%',
    marginBottom: 0,
  }
}));

const ContentSection = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(0, 2),
  order: 2,
  
  [theme.breakpoints.up('md')]: {
    flex: '1 1 50%',
    maxWidth: '50%',
    textAlign: 'left',
    padding: theme.spacing(0, 3),
  }
}));

const TechImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  
  [theme.breakpoints.up('sm')]: {
    height: '280px',
  },
  
  [theme.breakpoints.up('md')]: {
    height: '350px',
  },
  
  [theme.breakpoints.up('lg')]: {
    height: '380px',
  }
}));

const TechTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#1a1a1a',
  marginBottom: theme.spacing(2),
  fontSize: '1.75rem',
  lineHeight: 1.2,
  
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.25rem',
  }
}));

const TechDescription = styled(Typography)(({ theme }) => ({
  color: '#666666',
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
  fontSize: '1rem',
  
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem',
    marginBottom: theme.spacing(4),
  }
}));

const TechButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 3),
    fontSize: '0.9rem',
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(10),
  }
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  fontSize: '2.5rem',
  lineHeight: 1.2,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  }
}));

const TechnologiesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const technologies = [
    {
      title: 'Android Development',
      description: 'Every year, Google I/O gives us mobile developers something to release the apps that engage and delight our users in new ways, and this year is no different.',
      image: androidImage,
      color: '#34A853'
    },
    {
      title: 'Web Development',
      description: 'Learn modern web development technologies including React, Vue, Angular, and backend frameworks to build scalable web applications.',
      image: webImage,
      color: '#4285F4'
    },
    {
      title: 'Cloud Computing',
      description: 'Dive deep into cloud platforms like Google Cloud Platform, AWS, and Azure to build and deploy scalable applications.',
      image: cloudImage,
      color: '#EA4335'
    },
    {
      title: 'Machine Intelligence',
      description: 'Explore machine learning, artificial intelligence, and data science to build intelligent applications and solutions.',
      image: aiImage,
      color: '#FBBC05'
    }
  ];

  return (
    <TechnologiesSectionContainer>
      <Container maxWidth="lg">
        <SectionHeader>
          <HeaderTitle variant="h3" component="h2">
            Technologies We're Excited About
          </HeaderTitle>
        </SectionHeader>

        <div className="technologies-container">
          {technologies.map((tech, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <TechnologyRow 
                key={index} 
                className={`technology-row ${isEven ? 'image-left' : 'image-right'}`}
              >
                {/* Image Section */}
                <ImageSection className={`image-section ${isEven ? 'left-position' : 'right-position'}`}>
                  <TechImage
                    src={tech.image}
                    alt={tech.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/f0f0f0/666666?text=' + encodeURIComponent(tech.title);
                    }}
                  />
                </ImageSection>

                {/* Content Section */}
                <ContentSection className={`content-section ${isEven ? 'right-position' : 'left-position'}`}>
                  <TechTitle variant="h4" component="h3">
                    {tech.title}
                  </TechTitle>
                  
                  <TechDescription variant="body1">
                    {tech.description}
                  </TechDescription>
                  
                  <TechButton
                    variant="contained"
                    sx={{
                      backgroundColor: tech.color,
                      '&:hover': {
                        backgroundColor: tech.color,
                        opacity: 0.9
                      }
                    }}
                  >
                    Learn More
                  </TechButton>
                </ContentSection>
              </TechnologyRow>
            );
          })}
        </div>
      </Container>
      
      {/* CSS Override Styles */}
      <style jsx>{`
        @media (min-width: 900px) {
          .technologies-container {
            display: block !important;
          }
          
          .technology-row {
            display: flex !important;
            align-items: center !important;
            gap: 48px !important;
            margin-bottom: 80px !important;
            min-height: 400px !important;
          }
          
          .technology-row:last-child {
            margin-bottom: 0 !important;
          }
          
          .image-section {
            flex: 1 1 50% !important;
            max-width: 50% !important;
            margin-bottom: 0 !important;
          }
          
          .content-section {
            flex: 1 1 50% !important;
            max-width: 50% !important;
            text-align: left !important;
            padding: 0 24px !important;
          }
          
          /* FIRST TECHNOLOGY: Image Left, Text Right */
          .technology-row.image-left {
            flex-direction: row !important;
          }
          
          .technology-row.image-left .image-section.left-position {
            order: 1 !important;
          }
          
          .technology-row.image-left .content-section.right-position {
            order: 2 !important;
          }
          
          /* SECOND TECHNOLOGY: Text Left, Image Right */
          .technology-row.image-right {
            flex-direction: row !important;
          }
          
          .technology-row.image-right .content-section.left-position {
            order: 1 !important;
          }
          
          .technology-row.image-right .image-section.right-position {
            order: 2 !important;
          }
        }
        
        @media (min-width: 600px) and (max-width: 899px) {
          .technology-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 60px !important;
          }
          
          .image-section {
            width: 100% !important;
            max-width: 500px !important;
            margin-bottom: 32px !important;
            order: 1 !important;
          }
          
          .content-section {
            width: 100% !important;
            text-align: center !important;
            order: 2 !important;
            padding: 0 16px !important;
          }
        }
        
        @media (max-width: 599px) {
          .technology-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 48px !important;
          }
          
          .image-section {
            width: 100% !important;
            margin-bottom: 24px !important;
            order: 1 !important;
          }
          
          .content-section {
            width: 100% !important;
            text-align: center !important;
            order: 2 !important;
            padding: 0 8px !important;
          }
        }
        
        /* Remove any transition effects */
        .technology-row,
        .image-section,
        .content-section,
        .tech-image,
        .tech-button {
          transition: none !important;
        }
        
        /* Ensure proper image display */
        .tech-image {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          min-height: 250px !important;
          object-fit: cover !important;
        }
      `}</style>
    </TechnologiesSectionContainer>
  );
};

export default TechnologiesSection;