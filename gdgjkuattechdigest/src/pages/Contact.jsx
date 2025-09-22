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
  CircularProgress
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  Twitter,
  LinkedIn,
  Send,
  People,
  Event,
  Code
} from '@mui/icons-material';

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
      content: 'gdgjkuat@gmail.com',
      link: 'mailto:gdgjkuat@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      content: 'JKUAT University, Juja, Kenya',
      link: 'https://maps.google.com',
      color: '#FBBC05'
    },
    {
      icon: <Phone />,
      title: 'Phone',
      content: '+254 700 000 000',
      link: 'tel:+254700000000',
      color: '#34A853'
    }
  ];

  const socialLinks = [
    {
      icon: <GitHub />,
      name: 'GitHub',
      link: 'https://github.com/gdgjkuat',
      color: '#333'
    },
    {
      icon: <Twitter />,
      name: 'Twitter',
      link: 'https://twitter.com/gdgjkuat',
      color: '#1DA1F2'
    },
    {
      icon: <LinkedIn />,
      name: 'LinkedIn',
      link: 'https://linkedin.com/company/gdgjkuat',
      color: '#0077B5'
    }
  ];

  const opportunities = [
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Join as Member',
      description: 'Become part of our vibrant community and access exclusive workshops, events, and networking opportunities.',
      color: '#4285F4'
    },
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: 'Speak at Events',
      description: 'Share your expertise with the community by speaking at our workshops, seminars, or tech talks.',
      color: '#EA4335'
    },
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: 'Mentor Others',
      description: 'Help fellow developers grow by mentoring in our projects or contributing to our learning resources.',
      color: '#34A853'
    }
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: '#4285F4',
          color: 'white',
          py: 8
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
                Get In Touch
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Ready to join our community or have questions? We'd love to hear from you! 
                Whether you're a student, professional, or just curious about technology, 
                there's a place for you in GDG JKUAT.
              </Typography>
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
                  <Email sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  Let's Connect
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
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
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Send us a Message
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      disabled={loading}
                      placeholder="Tell us how we can help you or what you'd like to get involved with..."
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
                        fontWeight: 600
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
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Contact Information
                </Typography>
                
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      '&:last-child': { mb: 0 }
                    }}
                  >
                    <Avatar sx={{ bgcolor: info.color, mr: 2, width: 40, height: 40 }}>
                      {info.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          cursor: 'pointer',
                          '&:hover': { color: info.color }
                        }}
                        onClick={() => window.open(info.link)}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>

              {/* Social Media */}
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Follow Us
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      startIcon={social.icon}
                      onClick={() => window.open(social.link)}
                      sx={{
                        justifyContent: 'flex-start',
                        color: social.color,
                        borderColor: social.color,
                        '&:hover': {
                          borderColor: social.color,
                          bgcolor: `${social.color}15`
                        }
                      }}
                    >
                      {social.name}
                    </Button>
                  ))}
                </Box>
              </Paper>

              {/* Quick Info */}
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#f8f9fa' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Info
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  • Weekly meetups every Friday at 4:00 PM
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  • Monthly workshops and hackathons
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Open to all JKUAT students and tech enthusiasts
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Opportunities Section */}
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
            Get Involved
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
            There are many ways to contribute and be part of our growing community.
          </Typography>
          
          <Grid container spacing={4}>
            {opportunities.map((opportunity, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: opportunity.color,
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {opportunity.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {opportunity.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6, mb: 3 }}
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
                        }
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