// src/pages/About.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material';
import {
  Code,
  School,
  People,
  Lightbulb,
  Launch,
  GitHub,
  Language,
  Android,
  Cloud,
  Web,
  EmojiEvents
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: 'Open Source',
      description: 'We believe in the power of open-source development and community collaboration.',
      color: '#4285F4'
    },
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Learning',
      description: 'Continuous learning and knowledge sharing are at the core of our mission.',
      color: '#EA4335'
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Community',
      description: 'Building a strong, inclusive community of developers and tech enthusiasts.',
      color: '#34A853'
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40 }} />,
      title: 'Innovation',
      description: 'Exploring cutting-edge technologies and pushing the boundaries of what\'s possible.',
      color: '#FBBC05'
    }
  ];

  const technologies = [
    { name: 'Android', icon: <Android />, color: '#34A853' },
    { name: 'Web Development', icon: <Web />, color: '#4285F4' },
    { name: 'Cloud Computing', icon: <Cloud />, color: '#EA4335' },
    { name: 'Machine Learning', icon: <EmojiEvents />, color: '#FBBC05' }
  ];

  const stats = [
    { number: '500+', label: 'Community Members', color: '#4285F4' },
    { number: '50+', label: 'Tech Events Hosted', color: '#EA4335' },
    { number: '100+', label: 'Projects Built', color: '#34A853' },
    { number: '5+', label: 'Years of Impact', color: '#FBBC05' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#4285F4',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                About GDG JKUAT
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Google Developer Group JKUAT is a community of passionate developers, 
                designers, and tech enthusiasts dedicated to learning, sharing knowledge, 
                and building innovative solutions that make a difference.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  bgcolor: '#EA4335',
                  '&:hover': { bgcolor: '#d33b2c' },
                  px: 4,
                  py: 1.5
                }}
                endIcon={<Launch />}
              >
                Join Our Community
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'white',
                    color: '#4285F4',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Code sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  GDG JKUAT
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Empowering developers through technology
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7, color: 'text.secondary' }}
            >
              To foster a vibrant community of developers and technology enthusiasts at JKUAT, 
              providing opportunities for learning, networking, and professional growth through 
              hands-on workshops, technical talks, and collaborative projects.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'text.secondary' }}
            >
              We bridge the gap between academic learning and industry practice, ensuring our 
              members are well-equipped with the latest technologies and development practices.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-4px)' }
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: stat.color, mb: 1 }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
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
            Our Core Values
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            The principles that guide everything we do in our community.
          </Typography>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: value.color,
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Technologies Section */}
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
          Technologies We Explore
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          From mobile app development to cloud computing, we cover the latest technologies 
          that are shaping the future of software development.
        </Typography>
        
        <Grid container spacing={3}>
          {technologies.map((tech, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    bgcolor: tech.color,
                    color: 'white',
                    '& .tech-icon': {
                      color: 'white'
                    }
                  }
                }}
              >
                <Box
                  className="tech-icon"
                  sx={{
                    color: tech.color,
                    mb: 2,
                    '& svg': { fontSize: 48 }
                  }}
                >
                  {tech.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                >
                  {tech.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* What We Do Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
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
            What We Do
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Avatar sx={{ bgcolor: '#4285F4', mb: 2 }}>
                  <School />
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Workshops & Training
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Regular hands-on workshops covering the latest technologies, frameworks, 
                  and development practices. From beginner to advanced levels.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Avatar sx={{ bgcolor: '#EA4335', mb: 2 }}>
                  <People />
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Community Events
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Networking events, tech talks, hackathons, and conferences that bring 
                  together developers, students, and industry professionals.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Avatar sx={{ bgcolor: '#34A853', mb: 2 }}>
                  <Code />
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Project Collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Collaborative projects that solve real-world problems while providing 
                  practical experience and portfolio building opportunities.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={4}
          sx={{
            p: 6,
            textAlign: 'center',
            bgcolor: '#34A853',
            color: 'white'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Ready to Join Our Community?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Connect with passionate developers, learn cutting-edge technologies, 
            and be part of exciting projects that make a real impact.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                bgcolor: 'white',
                color: '#34A853',
                '&:hover': { bgcolor: '#f5f5f5' },
                px: 4
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/episodes')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Read Our Episodes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;