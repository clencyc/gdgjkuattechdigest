import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  LinkedIn,
  Twitter,
  GitHub
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import EvaImage from '../../assets/leads/Eva.jpg'
import AnillaImage from '../../assets/leads/anilla.jpg'
import JudeImage from '../../assets/leads/jude.jpg'
import MosonikImage from '../../assets/leads/mosonik.jpg'
import FavorImage from '../../assets/leads/Favor.jpg'
import MuleraImage from '../../assets/leads/mulera.jpg'
import JeffImage from '../../assets/leads/jeff.jpg'
import WellsImage from '../../assets/leads/wells.jpg'
import NateImage from '../../assets/leads/Nate.jpg'
import JoanImage from '../../assets/leads/joan.jpg'
import PeachesImage from '../../assets/leads/peaches.jpg'


// Custom styled components for better control
const TeamSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  }
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(2, 6),
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 4),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2),
  }
}));

const SliderTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  willChange: 'transform',
  
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'flex-start',
  }
}));

const TeamCard = styled(Card)(({ theme }) => ({
  flex: '0 0 auto',
  width: '280px',
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  border: '2px solid #f0f0f0',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '340px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginRight: theme.spacing(3),
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #4285F4, #34A853, #EA4335, #FBBC05)',
  },
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(66, 133, 244, 0.2)',
    borderColor: '#e3f2fd',
  },
  
  [theme.breakpoints.down('lg')]: {
    width: '260px',
    marginRight: theme.spacing(2.5),
  },
  
  [theme.breakpoints.down('md')]: {
    width: '240px',
    marginRight: theme.spacing(2),
    padding: theme.spacing(2.5),
    minHeight: '320px',
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    marginRight: theme.spacing(1.5),
  }
}));

const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  margin: '0 auto 24px',
  backgroundColor: '#f5f5f5',
  border: '3px solid #ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  
  [theme.breakpoints.down('sm')]: {
    width: 80,
    height: 80,
    marginBottom: '20px',
  }
}));

const MemberName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#1a1a1a',
  marginBottom: theme.spacing(1),
  fontSize: '1.25rem',
  lineHeight: 1.2,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  }
}));

const MemberRole = styled(Typography)(({ theme }) => ({
  color: '#666666',
  marginBottom: theme.spacing(2),
  fontSize: '0.9rem',
  fontWeight: 500,
  lineHeight: 1.4,
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#f8f9fa',
  color: '#666666',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  
  '&.linkedin:hover': {
    backgroundColor: '#0077b5',
    color: 'white',
  },
  
  '&.twitter:hover': {
    backgroundColor: '#1da1f2',
    color: 'white',
  },
  
  '&.github:hover': {
    backgroundColor: '#333333',
    color: 'white',
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'white',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  zIndex: 2,
  width: '48px',
  height: '48px',
  
  '&:hover': {
    backgroundColor: '#f8f9fa',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  
  '&.prev': {
    left: '8px',
  },
  
  '&.next': {
    right: '8px',
  },
  
  [theme.breakpoints.down('md')]: {
    width: '40px',
    height: '40px',
    
    '&.prev': {
      left: '4px',
    },
    
    '&.next': {
      right: '4px',
    }
  }
}));

const SlideIndicators = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  gap: theme.spacing(1),
}));

const Indicator = styled(Box)(({ theme, active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? '#4285F4' : '#e0e0e0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: active ? '#4285F4' : '#bdbdbd',
    transform: 'scale(1.1)',
  }
}));

const TeamSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const teamMembers = [
    {
      name: 'Eva Muthoni',
      role: 'Cybersecurity Lead',
      image: EvaImage,
      linkedin: 'https://www.linkedin.com/in/eva-muthoni-a94355348/',
      twitter: '',
      github: 'https://github.com/teqeva'
    },
    {
      name: 'Olive Njoroge',
      role: 'Web Development Co-lead',
      image: '/api/placeholder/150/150',
      linkedin: 'https://www.linkedin.com/in/olive-njoroge/',
      twitter: '',
      github: 'https://github.com/Olive-Njoroge'
    },
    {
      name: 'Abigael Zawadi',
      role: 'Data Science Lead (Karen Campus)',
      image: '/api/placeholder/150/150',
      linkedin: 'https://www.linkedin.com/in/abigael-zawadi-b21b9124b',
      twitter: 'https://x.com/zawadi_Abby?t=HTdoycZoppabZVSFjDuoXQ&s=09',
      github: 'https://github.com/MissMukuru'
    },
    {
      name: 'Wells Stanley',
      role: 'Mobile Development Lead',
      image: WellsImage,
      linkedin: 'https://www.linkedin.com/in/wells-stanley',
      twitter: '',
      github: 'https://github.com/lw-wells'
    },
    {
      name: 'Geoffrey Owuor',
      role: 'Web Development Lead',
      image: JeffImage,
      linkedin: '',
      twitter: 'https://x.com/geoffowuor?t=fHYJavjiqAH9Qbvlr_L0-g&s=09',
      github: 'https://github.com/geoffowuor'
    },
    {
      name: 'Rhodah Mulera',
      role: 'Social Media Lead',
      image: MuleraImage,
      linkedin: 'https://www.linkedin.com/in/rhodah-mulera-83972a1bb/',
      twitter: 'https://x.com/mulera_123',
      github: 'https://github.com/Ro-wdy'
    },
    {
      name: 'Jude Hunja',
      role: 'Cloud Computing Lead',
      image: JudeImage,
      linkedin: 'https://www.linkedin.com/in/judehunja',
      twitter: 'https://x.com/JudeHunja',
      github: 'https://github.com/judhunja'
    },
    {
      name: 'Ivy Atieng',
      role: 'Data Science Lead',
      image: '/api/placeholder/150/150',
      linkedin: 'https://www.linkedin.com/in/ivy-atieng-a5a52b350/',
      twitter: 'https://x.com/vylee_ai',
      github: 'https://github.com/Atieng'
    },
    {
      name: 'Anilla Wambaki',
      role: 'Internet Of Things Lead',
      image: AnillaImage,
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Faith Mososnik',
      role: 'Women In Tech Lead',
      image: MosonikImage,
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Favor Nyambura',
      role: 'Blockchain & Web3 Lead',
      image: FavorImage,
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Nathaniel Sherry',
      role: 'Blockchain & Web3 Co-lead',
      image: NateImage,
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Joan Kinoti',
      role: 'AI/ML Lead',
      image: JoanImage,
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Ephraim Shikanga',
      role: 'AI/ML Co-lead',
      image: '/api/placeholder/150/150',
      linkedin: '',
      twitter: '',
      github: ''
    },
    {
      name: 'Peaches Njenga',
      role: 'UI/UX Lead',
      image: PeachesImage,
      linkedin: '',
      twitter: '',
      github: ''
    }
  ];

  // Responsive cards per view
  const getCardsPerView = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const cardsPerView = getCardsPerView();
  const maxSlides = Math.max(0, teamMembers.length - cardsPerView);

  // Calculate card width including margins
  const getCardWidth = () => {
    if (isMobile) return 220 + 12; // card width + margin
    if (isTablet) return 240 + 16; // card width + margin  
    return 280 + 24; // card width + margin
  };

  const cardWidth = getCardWidth();

  // Auto-scroll functionality
  useEffect(() => {
    if (teamMembers.length <= cardsPerView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= maxSlides) return 0;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [maxSlides, cardsPerView, teamMembers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= maxSlides) return 0;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) return maxSlides;
      return prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  const renderSocialLinks = (member) => (
    <SocialLinks>
      {member.linkedin && (
        <SocialButton
          className="linkedin"
          size="small"
          onClick={() => window.open(member.linkedin, '_blank')}
          aria-label={`${member.name} LinkedIn profile`}
        >
          <LinkedIn fontSize="small" />
        </SocialButton>
      )}
      {member.twitter && (
        <SocialButton
          className="twitter"
          size="small"
          onClick={() => window.open(member.twitter, '_blank')}
          aria-label={`${member.name} Twitter profile`}
        >
          <Twitter fontSize="small" />
        </SocialButton>
      )}
      {member.github && (
        <SocialButton
          className="github"
          size="small"
          onClick={() => window.open(member.github, '_blank')}
          aria-label={`${member.name} GitHub profile`}
        >
          <GitHub fontSize="small" />
        </SocialButton>
      )}
    </SocialLinks>
  );

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <TeamSectionContainer>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Meet The GDG Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Get to know the amazing people behind our community who make everything possible.
          </Typography>
        </Box>

        {/* Team Slider */}
        <SliderContainer>
          <SliderTrack
            sx={{
              transform: `translateX(-${currentSlide * cardWidth}px)`,
            }}
          >
            {teamMembers.map((member, index) => (
              <TeamCard key={`member-${index}`} elevation={2}>
                <MemberAvatar
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4285F4&color=ffffff&size=150`;
                  }}
                />
                
                <MemberName variant="h6">
                  {member.name}
                </MemberName>
                
                <MemberRole variant="body2">
                  {member.role}
                </MemberRole>
                
                {renderSocialLinks(member)}
              </TeamCard>
            ))}
          </SliderTrack>

          {/* Navigation Buttons */}
          {teamMembers.length > cardsPerView && (
            <>
              <NavigationButton
                className="prev"
                onClick={prevSlide}
                aria-label="Previous team members"
              >
                <ChevronLeft />
              </NavigationButton>

              <NavigationButton
                className="next"
                onClick={nextSlide}
                aria-label="Next team members"
              >
                <ChevronRight />
              </NavigationButton>
            </>
          )}
        </SliderContainer>

        {/* Slide Indicators */}
        {teamMembers.length > cardsPerView && (
          <SlideIndicators>
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <Indicator
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </SlideIndicators>
        )}
      </Container>
    </TeamSectionContainer>
  );
};

export default TeamSection;