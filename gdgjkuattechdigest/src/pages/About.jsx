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
  Button
} from '@mui/material';
import {
  Code,
  School,
  People,
  Business,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Code />,
      title: 'Technical Excellence',
      description: 'We focus on building high-quality software and sharing best practices with our community members.'
    },
    {
      icon: <School />,
      title: 'Continuous Learning',
      description: 'Learning never stops. We provide workshops, mentorship, and resources for skill development.'
    },
    {
      icon: <People />,
      title: 'Community First',
      description: 'Our strength lies in our diverse community of developers, designers, and technology enthusiasts.'
    },
    {
      icon: <Business />,
      title: 'Industry Connection',
      description: 'We bridge the gap between academic learning and real-world industry requirements.'
    }
  ];

  const activities = [
    {
      title: 'Technical Workshops',
      description: 'Hands-on sessions covering programming languages, frameworks, and development tools.'
    },
    {
      title: 'Guest Speakers',
      description: 'Industry professionals share insights about current trends and career opportunities.'
    },
    {
      title: 'Project Collaboration',
      description: 'Work on real projects with team members to build your portfolio and gain experience.'
    },
    {
      title: 'Networking Events',
      description: 'Connect with peers, alumni, and industry professionals in our regular meetups.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '50+', label: 'Events Hosted' },
    { number: '100+', label: 'Projects Completed' },
    { number: '5', label: 'Years Active' }
  ];

  return (
    <Box>
      <Header />
      
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: '#1976d2'
                }}
              >
                About GDG JKUAT
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: 600
                }}
              >
                Google Developer Group JKUAT is a student-led community focused on 
                technology education, skill development, and connecting students with 
                the broader tech ecosystem.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                endIcon={<ArrowForward />}
                sx={{ px: 4, py: 1.5 }}
              >
                Join Our Community
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={1}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: '#1976d2',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Code sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  GDG JKUAT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Building the next generation of developers
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#1976d2' }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}
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
      </Container>

      {/* Mission Section */}
      <Box sx={{ bgcolor: '#fafafa', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  mb: 3, 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7, 
                  color: 'text.secondary' 
                }}
              >
                To create an inclusive environment where JKUAT students can learn, 
                grow, and excel in technology. We provide practical learning 
                opportunities and connect students with industry professionals.
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7, 
                  color: 'text.secondary' 
                }}
              >
                Through workshops, projects, and mentorship programs, we prepare 
                our members for successful careers in the technology industry.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 4,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  What Sets Us Apart
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    • Student-Led Initiative
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Run by students, for students
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    • Practical Focus
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Hands-on projects and real-world applications
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    • Industry Connections
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Direct access to tech professionals and mentors
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            mb: 6
          }}
        >
          Our Core Values
        </Typography>
        
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 3,
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  height: '100%',
                  '&:hover': {
                    borderColor: '#1976d2',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#e3f2fd',
                    color: '#1976d2',
                    width: 56,
                    height: 56,
                    flexShrink: 0
                  }}
                >
                  {value.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
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
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* What We Do Section */}
      <Box sx={{ bgcolor: '#fafafa', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 6
            }}
          >
            What We Do
          </Typography>
          
          <Grid container spacing={4}>
            {activities.map((activity, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                key={index}
                sx={{
                  display: 'flex'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    flex: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 160,
                    '&:hover': { 
                      borderColor: '#1976d2',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.12)'
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.6,
                      flex: 1
                    }}
                  >
                    {activity.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            bgcolor: '#1976d2',
            color: 'white'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}
          >
            Join a community of passionate developers and start building 
            your future in technology today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                bgcolor: 'white',
                color: '#1976d2',
                '&:hover': { bgcolor: '#f5f5f5' },
                px: 4
              }}
            >
              Join Now
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
              View Episodes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;