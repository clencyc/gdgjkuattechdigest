import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert
} from '@mui/material';
import {
  Android,
  Web,
  Cloud,
  Psychology,
  CalendarToday,
  Visibility,
  Favorite
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { episodeService } from '../../services';

// Simple date formatting function
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return new Date(dateString).toLocaleDateString();
  }
};

// Custom styled components for better control
const EpisodesSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafafa',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  }
}));

const TracksGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginBottom: theme.spacing(6),
  
  [theme.breakpoints.up('md')]: {
    justifyContent: 'space-between',
    gap: theme.spacing(3),
  }
}));

const TrackChip = styled(Chip)(({ theme, trackcolor }) => ({
  backgroundColor: trackcolor,
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
  height: '44px',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  
  '& .MuiChip-icon': { 
    color: 'white',
    fontSize: '1.2rem'
  },
  
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: '0.875rem',
    fontWeight: 600
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${trackcolor}40`,
    filter: 'brightness(1.1)'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    height: '40px',
    '& .MuiChip-label': {
      fontSize: '0.8rem',
    }
  },
  
  // Ensure consistent spacing in grid
  [theme.breakpoints.up('md')]: {
    flex: '1 1 calc(25% - 18px)',
    minWidth: '200px',
    justifyContent: 'center'
  },
  
  [theme.breakpoints.between('sm', 'md')]: {
    flex: '1 1 calc(50% - 12px)',
    minWidth: '180px'
  },
  
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 calc(50% - 8px)',
    minWidth: '140px'
  }
}));

const EpisodesGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  },
  
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(4),
  },
  
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(5),
  }
}));

const EpisodeCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  border: '1px solid #e0e0e0',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
    borderColor: '#d0d0d0'
  }
}));

const EpisodeImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  
  [theme.breakpoints.up('md')]: {
    height: '220px',
  }
}));

const EpisodeContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const EpisodeMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap'
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem'
}));

const EpisodesByTrack = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await episodeService.getAllEpisodes(0, 6);
        setEpisodes(response.slice(0, 6));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch episodes:', err);
        setError('Failed to load episodes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const tracks = [
    { name: 'Android Development', color: '#34A853', icon: <Android /> },
    { name: 'Web Development', color: '#4285F4', icon: <Web /> },
    { name: 'Cloud Computing', color: '#EA4335', icon: <Cloud /> },
    { name: 'Machine Learning', color: '#FBBC05', icon: <Psychology /> }
  ];

  const renderSkeletons = () => (
    <EpisodesGrid>
      {[...Array(6)].map((_, index) => (
        <Card key={index} sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={220} />
          <CardContent>
            <Skeleton variant="text" height={32} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} width="80%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="90%" />
            <Skeleton variant="text" height={20} width="70%" />
          </CardContent>
        </Card>
      ))}
    </EpisodesGrid>
  );

  return (
    <EpisodesSectionContainer>
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
            Episodes by Track
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Explore our tech episodes organized by different development tracks and technologies.
          </Typography>
        </Box>

        {/* Track Chips */}
        <TracksGrid className="tracks-grid">
          {tracks.map((track, index) => (
            <TrackChip
              key={index}
              icon={track.icon}
              label={track.name}
              trackcolor={track.color}
              className="track-chip"
            />
          ))}
        </TracksGrid>

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {/* Episodes Grid */}
        {loading ? renderSkeletons() : (
          <EpisodesGrid className="episodes-grid">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} elevation={2}>
                {episode.image_url && (
                  <EpisodeImage
                    component="img"
                    src={episode.image_url}
                    alt={episode.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                
                <EpisodeContent>
                  <EpisodeMeta>
                    <MetaItem>
                      <CalendarToday sx={{ fontSize: 16 }} />
                      <span>{formatDate(episode.created_at)}</span>
                    </MetaItem>
                    
                    <MetaItem>
                      <Favorite sx={{ fontSize: 16 }} />
                      <span>{episode.like_count || 0}</span>
                    </MetaItem>
                  </EpisodeMeta>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: '#1a1a1a',
                      lineHeight: 1.3,
                      mb: 2,
                      fontSize: { xs: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    Episode {episode.episode_number}: {episode.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      flex: 1,
                      fontSize: '0.9rem'
                    }}
                  >
                    {episode.content?.substring(0, 120)}...
                  </Typography>
                  
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                    <Link
                      to={`/episodes/${episode.episode_number}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Read More →
                      </Typography>
                    </Link>
                  </Box>
                </EpisodeContent>
              </EpisodeCard>
            ))}
          </EpisodesGrid>
        )}

        {/* No Episodes State */}
        {!loading && !error && episodes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No episodes available yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back soon for new content!
            </Typography>
          </Box>
        )}
      </Container>
      
      {/* CSS Override Styles */}
      <style jsx>{`
        @media (min-width: 900px) {
          .tracks-grid {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 24px !important;
            flex-wrap: nowrap !important;
          }
          
          .track-chip {
            flex: 1 1 calc(25% - 18px) !important;
            min-width: 200px !important;
            max-width: 250px !important;
          }
          
          .episodes-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 32px !important;
          }
        }
        
        @media (min-width: 600px) and (max-width: 899px) {
          .tracks-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 16px !important;
          }
          
          .track-chip {
            flex: 1 1 calc(50% - 8px) !important;
            min-width: 180px !important;
          }
          
          .episodes-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        
        @media (max-width: 599px) {
          .tracks-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 12px !important;
          }
          
          .track-chip {
            flex: 1 1 calc(50% - 6px) !important;
            min-width: 140px !important;
          }
          
          .episodes-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        
        /* Ensure cards have equal heights */
        .episodes-grid .MuiCard-root {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }
      `}</style>
    </EpisodesSectionContainer>
  );
};

export default EpisodesByTrack;