// src/pages/Contact.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  Instagram,
  LinkedIn,
  Send,
  People,
  Event,
  Code,
  Language
} from '@mui/icons-material';
import Header from '../components/common/Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showSnackbar('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      showSnackbar('Message sent successfully! We\'ll get back to you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email',
      content: 'gdgjkuatoncampus@gmail.com',
      link: 'mailto:gdgjkuatoncampus@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <Phone />,
      title: 'Phone',
      content: '+254 711 662 784',
      link: 'tel:+254711662784',
      color: '#34A853'
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      content: 'JKUAT University, Juja, Kenya',
      link: 'https://goo.gl/maps/jkuat',
      color: '#FBBC05'
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedIn />,
      name: 'LinkedIn',
      username: '@gdgjkuatt',
      link: 'https://www.linkedin.com/company/gdgjkuatt/',
      color: '#0077B5'
    },
    {
      icon: <Instagram />,
      name: 'Instagram',
      username: '@gdgjkuat',
      link: 'https://www.instagram.com/gdgjkuat',
      color: '#E4405F'
    },
    {
      icon: <Language />,
      name: 'Twitter/X',
      username: '@dscjkuat',
      link: 'https://x.com/dscjkuat',
      color: '#1DA1F2'
    }
  ];

  const opportunities = [
    {
      icon: <People sx={{ fontSize: 36 }} />,
      title: 'Join as Member',
      description: 'Become part of our vibrant community and access exclusive workshops, events, and networking opportunities with fellow developers.',
      color: '#4285F4'
    },
    {
      icon: <Event sx={{ fontSize: 36 }} />,
      title: 'Speak at Events',
      description: 'Share your expertise with the community by speaking at our workshops, seminars, or tech talks. Help others learn and grow.',
      color: '#EA4335'
    },
    {
      icon: <Code sx={{ fontSize: 36 }} />,
      title: 'Mentor Others',
      description: 'Guide fellow developers in their journey by mentoring in our projects or contributing to our learning resources and programs.',
      color: '#34A853'
    }
  ];

  return (
    <Box>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#4285F4',
          color: 'white',
          py: { xs: 6, md: 8 }
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
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1
                }}
              >
                Get In Touch
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  opacity: 0.95,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: 600
                }}
              >
                Ready to join our community or have questions? We'd love to hear from you! 
                Connect with GDG JKUAT and be part of something amazing.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'white',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: '#4285F4',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Email sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="h6" sx={{ color: '#1a1a1a', mb: 1, fontWeight: 600 }}>
                  Let's Connect
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  We respond within 24 hours
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid #e0e0e0'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  color: '#1a1a1a'
                }}
              >
                Send us a Message
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666666', 
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                Have a question, suggestion, or want to collaborate? Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      disabled={loading}
                      placeholder="Tell us how we can help you or what you'd like to get involved with..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                      sx={{
                        bgcolor: '#4285F4',
                        '&:hover': { bgcolor: '#3367d6' },
                        py: 1.5,
                        px: 4,
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none'
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Info Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Contact Information */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #e0e0e0'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    color: '#1a1a1a'
                  }}
                >
                  Contact Information
                </Typography>
                
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 3,
                      '&:last-child': { mb: 0 },
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#f8f9fa'
                      }
                    }}
                    onClick={() => window.open(info.link)}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: info.color, 
                        mr: 3, 
                        width: 44, 
                        height: 44,
                        mt: 0.5
                      }}
                    >
                      {info.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#666666',
                          fontWeight: 500,
                          mb: 0.5
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: '#1a1a1a',
                          '&:hover': { color: info.color }
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>

              {/* Social Media */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #e0e0e0'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    color: '#1a1a1a'
                  }}
                >
                  Follow Us
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {socialLinks.map((social, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: social.color,
                          boxShadow: `0 2px 8px ${social.color}20`
                        }
                      }}
                      onClick={() => window.open(social.link)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: social.color,
                            width: 36,
                            height: 36,
                            mr: 2
                          }}
                        >
                          {social.icon}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: '#1a1a1a'
                            }}
                          >
                            {social.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#666666'
                            }}
                          >
                            {social.username}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Paper>

              {/* Quick Info */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  bgcolor: '#f8f9fa',
                  borderRadius: 3,
                  border: '1px solid #e0e0e0'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 2
                  }}
                >
                  Community Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#555555', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#4285F4', mr: 2 }} />
                    Weekly meetups every Friday at 4:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555555', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#EA4335', mr: 2 }} />
                    Monthly workshops and hackathons
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555555', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#34A853', mr: 2 }} />
                    Open to all JKUAT students and tech enthusiasts
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Get Involved Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Get Involved
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666666',
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              There are many ways to contribute and be part of our growing community.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {opportunities.map((opportunity, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e0e0e0',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${opportunity.color}20`,
                      borderColor: opportunity.color
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: opportunity.color,
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3
                      }}
                    >
                      {opportunity.icon}
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ 
                        fontWeight: 700,
                        color: '#1a1a1a',
                        mb: 2
                      }}
                    >
                      {opportunity.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ 
                        color: '#666666',
                        lineHeight: 1.6, 
                        mb: 3 
                      }}
                    >
                      {opportunity.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: opportunity.color,
                        '&:hover': { 
                          bgcolor: opportunity.color,
                          filter: 'brightness(0.9)'
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;