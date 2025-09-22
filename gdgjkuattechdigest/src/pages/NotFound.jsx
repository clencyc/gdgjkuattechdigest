// src/pages/NotFound.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar
} from '@mui/material';
import {
  Home,
  ArrowBack,
  Search,
  Code,
  BugReport
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: <Home />,
      title: 'Go Home',
      description: 'Return to the main page',
      action: () => navigate('/'),
      color: '#4285F4'
    },
    {
      icon: <Search />,
      title: 'Browse Episodes',
      description: 'Explore our tech episodes',
      action: () => navigate('/episodes'),
      color: '#34A853'
    },
    {
      icon: <Code />,
      title: 'About Us',
      description: 'Learn about GDG JKUAT',
      action: () => navigate('/about'),
      color: '#EA4335'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f8f9fa'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          {/* 404 Visual */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '6rem', md: '12rem' },
                fontWeight: 700,
                color: '#4285F4',
                lineHeight: 1,
                mb: 2
              }}
            >
              404
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: '#EA4335',
                  width: 80,
                  height: 80,
                  animation: 'bounce 2s infinite'
                }}
              >
                <BugReport sx={{ fontSize: 40 }} />
              </Avatar>
            </Box>
          </Box>

          {/* Error Message */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2.5rem' }
            }}
          >
            Oops! Page Not Found
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, even the best developers encounter 404s!
          </Typography>

          {/* Quick Actions */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => window.history.back()}
              sx={{
                bgcolor: '#4285F4',
                '&:hover': { bgcolor: '#3367d6' },
                px: 3,
                py: 1
              }}
            >
              Go Back
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{
                color: '#34A853',
                borderColor: '#34A853',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: '#34A853',
                  bgcolor: 'rgba(52, 168, 83, 0.04)'
                }
              }}
            >
              Home Page
            </Button>
          </Box>

          {/* Suggestions */}
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Where would you like to go?
            </Typography>
            
            <Grid container spacing={3}>
              {suggestions.map((suggestion, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                        bgcolor: suggestion.color,
                        color: 'white',
                        '& .suggestion-icon': {
                          color: 'white'
                        }
                      }
                    }}
                    onClick={suggestion.action}
                  >
                    <Avatar
                      className="suggestion-icon"
                      sx={{
                        bgcolor: suggestion.color,
                        mx: 'auto',
                        mb: 2,
                        width: 48,
                        height: 48
                      }}
                    >
                      {suggestion.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {suggestion.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8 }}
                    >
                      {suggestion.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Fun Tech Fact */}
          <Box sx={{ mt: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: '#FBBC05',
                color: 'white',
                maxWidth: 500,
                mx: 'auto'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💡 Did you know?
              </Typography>
              <Typography variant="body1">
                The HTTP 404 "Not Found" status code was named after room 404 at CERN, 
                where the original web servers were located. When a file couldn't be found, 
                they'd joke that it was "in room 404"!
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -20px, 0);
            }
            70% {
              transform: translate3d(0, -10px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;