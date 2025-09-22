// src/pages/Episodes.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Skeleton,
  IconButton
} from '@mui/material';
import {
  Search,
  ThumbUp,
  Comment,
  CalendarToday,
  ArrowForward,
  Favorite
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { episodeService } from '../services';
import Header from '../components/common/Header';

const EpisodeCardSkeleton = () => (
  <Card sx={{ height: '100%', borderRadius: 3 }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" height={32} width="90%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="80%" />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Box>
    </CardContent>
  </Card>
);

const FeaturedEpisodeCard = ({ episode, isMain = false }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isMain) {
    return (
      <Card 
        sx={{ 
          borderRadius: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
        onClick={() => navigate(`/episodes/${episode.episode_number}`)}
      >
        <Box sx={{ position: 'relative' }}>
          {episode.image_url ? (
            <CardMedia
              component="img"
              height="280"
              image={episode.image_url}
              alt={episode.title}
              sx={{ objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                height: 280,
                background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                fontWeight: 700
              }}
            >
              Episode {episode.episode_number}
            </Box>
          )}
          
          {/* Overlay with episode info */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              p: 3
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label="ANNOUNCEMENTS" 
                size="small"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                lineHeight: 1.2
              }}
            >
              {episode.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: 0.9, lineHeight: 1.4 }}
            >
              {episode.content ? episode.content.substring(0, 120) + '...' : ''}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        },
        height: '100%'
      }}
      onClick={() => navigate(`/episodes/${episode.episode_number}`)}
    >
      <Box sx={{ display: 'flex', height: 120 }}>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {episode.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {episode.content}
          </Typography>
        </Box>
        {episode.image_url && (
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, objectFit: 'cover' }}
            image={episode.image_url}
            alt={episode.title}
          />
        )}
      </Box>
    </Card>
  );
};

const LatestEpisodeItem = ({ episode }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <Box
      sx={{
        mb: 4,
        cursor: 'pointer',
        '&:hover .episode-title': {
          color: '#4285F4'
        }
      }}
      onClick={() => navigate(`/episodes/${episode.episode_number}`)}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          letterSpacing: '0.5px',
          mb: 1,
          display: 'block'
        }}
      >
        {formatDate(episode.created_at)}
      </Typography>
      
      <Typography
        className="episode-title"
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          lineHeight: 1.3,
          transition: 'color 0.2s ease',
          color: '#1a1a1a'
        }}
      >
        {episode.title}
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {episode.content}
      </Typography>

      {/* Episode stats */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ThumbUp sx={{ fontSize: 16, color: '#34A853' }} />
          <Typography variant="caption" color="text.secondary">
            {episode.like_count || 0}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Comment sx={{ fontSize: 16, color: '#EA4335' }} />
          <Typography variant="caption" color="text.secondary">
            {episode.comments?.length || 0}
          </Typography>
        </Box>
        <Chip
          label={`Episode ${episode.episode_number}`}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem', height: 20 }}
        />
      </Box>
    </Box>
  );
};

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await episodeService.getAllEpisodes(0, 50);
        const episodesData = Array.isArray(response) ? response : [];
        
        // Fetch detailed data for episodes to get comments
        const detailedEpisodes = await Promise.all(
          episodesData.map(async (episode) => {
            try {
              const detailed = await episodeService.getEpisodeByNumber(episode.episode_number);
              return detailed;
            } catch (error) {
              return episode;
            }
          })
        );
        
        // Sort episodes by episode number descending (newest first)
        const sortedEpisodes = detailedEpisodes.sort((a, b) => b.episode_number - a.episode_number);
        
        setEpisodes(sortedEpisodes);
      } catch (err) {
        console.error('Error fetching episodes:', err);
        setError('Failed to load episodes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Filter episodes for featured section
  const filteredFeaturedEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (episode.content && episode.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter episodes for latest blogs section
  const filteredLatestEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
    (episode.content && episode.content.toLowerCase().includes(blogSearchTerm.toLowerCase()))
  );

  // Auto-slide functionality
  useEffect(() => {
    if (filteredFeaturedEpisodes.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(filteredFeaturedEpisodes.length, 5));
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [filteredFeaturedEpisodes.length]);

  return (
    <Box sx={{ bgcolor: '#4285F4', minHeight: '100vh' }}>
      {/* Header Component */}
      <Header />
      
      {/* Header with search */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search all articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, maxWidth: 500 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  }
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4285F4',
                '&:hover': { bgcolor: '#3367d6' },
                px: 3,
                py: 1
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid 
          container 
          spacing={4}
          sx={{
            display: 'flex !important',
            flexDirection: { xs: 'column', md: 'row !important' },
            alignItems: 'flex-start',
            flexWrap: { xs: 'wrap', md: 'nowrap !important' },
            width: '100%',
            '& .MuiGrid-item': {
              display: 'flex',
              flexDirection: 'column'
            },
            '& > .MuiGrid-item:first-of-type': {
              flex: { xs: '1 1 100%', md: '1 1 66.67% !important' },
              maxWidth: { xs: '100%', md: '66.67% !important' },
              width: { xs: '100%', md: '66.67% !important' },
              minWidth: { md: '66.67% !important' }
            },
            '& > .MuiGrid-item:last-child': {
              flex: { xs: '1 1 100%', md: '1 1 33.33% !important' },
              maxWidth: { xs: '100%', md: '33.33% !important' },
              width: { xs: '100%', md: '33.33% !important' },
              minWidth: { md: '33.33% !important' }
            }
          }}
        >
          {/* Featured episodes - Left column */}
          <Grid 
            item 
            xs={12} 
            md={8} 
            sx={{ 
              display: 'flex !important',
              flexDirection: 'column !important',
              flex: { xs: '1 1 100%', md: '1 1 66.67% !important' },
              maxWidth: { xs: '100%', md: '66.67% !important' },
              width: { xs: '100%', md: '66.67% !important' },
              flexBasis: { xs: '100%', md: '66.67% !important' },
              minWidth: { md: '500px' },
              '@media (min-width: 900px)': {
                flex: '1 1 66.67% !important',
                maxWidth: '66.67% !important',
                width: '66.67% !important'
              }
            }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 3,
                bgcolor: 'white',
                height: 'fit-content',
                minHeight: 600,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: '#1a1a1a'
                }}
              >
                Featured episodes
              </Typography>

              {loading ? (
                <>
                  <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 3, mb: 3 }} />
                  <Grid container spacing={3}>
                    {Array(4).fill(null).map((_, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <>
                  {/* Auto-sliding main featured episode */}
                  {filteredFeaturedEpisodes.length > 0 && (
                    <Box sx={{ mb: 4, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 3
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            transform: `translateX(-${currentSlide * 100}%)`,
                            transition: 'transform 0.5s ease-in-out'
                          }}
                        >
                          {filteredFeaturedEpisodes.slice(0, 5).map((episode, index) => (
                            <Box key={episode.id} sx={{ minWidth: '100%', position: 'relative' }}>
                              <FeaturedEpisodeCard episode={episode} isMain={true} />
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Slide indicators */}
                      {filteredFeaturedEpisodes.length > 1 && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2
                          }}
                        >
                          {filteredFeaturedEpisodes.slice(0, 5).map((_, index) => (
                            <Box
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: index === currentSlide ? '#4285F4' : '#ccc',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Grid of smaller featured episodes */}
                  <Grid container spacing={3}>
                    {filteredFeaturedEpisodes.slice(5, 9).map((episode) => (
                      <Grid item xs={12} sm={6} key={episode.id}>
                        <FeaturedEpisodeCard episode={episode} />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Show more button */}
                  {filteredFeaturedEpisodes.length > 9 && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        variant="outlined"
                        endIcon={<ArrowForward />}
                        sx={{
                          borderColor: '#4285F4',
                          color: '#4285F4',
                          '&:hover': {
                            borderColor: '#4285F4',
                            bgcolor: 'rgba(66, 133, 244, 0.04)'
                          }
                        }}
                      >
                        Show more episodes
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Paper>
          </Grid>

          {/* Latest blogs - Right column */}
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{ 
              display: 'flex !important',
              flexDirection: 'column !important',
              flex: { xs: '1 1 100%', md: '1 1 33.33% !important' },
              maxWidth: { xs: '100%', md: '33.33% !important' },
              width: { xs: '100%', md: '33.33% !important' },
              flexBasis: { xs: '100%', md: '33.33% !important' },
              minWidth: { md: '300px' },
              '@media (min-width: 900px)': {
                flex: '1 1 33.33% !important',
                maxWidth: '33.33% !important',
                width: '33.33% !important'
              }
            }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 3,
                bgcolor: 'white',
                height: 'fit-content',
                position: { md: 'sticky' },
                top: { md: 20 },
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: '#1a1a1a'
                }}
              >
                Latest blogs
              </Typography>

              {loading ? (
                Array(5).fill(null).map((_, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Skeleton variant="text" width={100} height={16} />
                    <Skeleton variant="text" height={28} sx={{ my: 1 }} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} width="80%" />
                  </Box>
                ))
              ) : (
                <>
                  {/* Latest episodes list */}
                  {filteredLatestEpisodes.slice(0, 8).map((episode) => (
                    <LatestEpisodeItem key={episode.id} episode={episode} />
                  ))}

                  {/* Search box for blogs */}
                  <Box sx={{ mt: 4 }}>
                    <TextField
                      fullWidth
                      placeholder="Search blog"
                      value={blogSearchTerm}
                      onChange={(e) => setBlogSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: '#4285F4',
                                '&:hover': { bgcolor: '#3367d6' },
                                minWidth: 'auto',
                                px: 2
                              }}
                            >
                              Search
                            </Button>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e0e0e0'
                          }
                        }
                      }}
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Episodes;