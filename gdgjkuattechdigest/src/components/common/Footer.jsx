// src/components/common/Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Instagram,
  Twitter,
  GitHub,
  School,
  Groups,
  Event
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Episodes', path: '/episodes' },
    { label: 'Technologies', path: '/technologies' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const resources = [
    { label: 'GDG JKUAT Website', url: 'https://gdg.community.dev/jomo-kenyatta-university-of-agriculture-and-technology/' },
    { label: 'Google Developers', url: 'https://developers.google.com' },
    { label: 'JKUAT Website', url: 'https://www.jkuat.ac.ke' },
    { label: 'Event Calendar', url: '#' }
  ];

  const contactInfo = [
    {
      icon: <Email sx={{ color: '#ffffff' }} />,
      text: 'gdgjkuatoncampus@gmail.com',
      link: 'mailto:gdgjkuatoncampus@gmail.com'
    },
    {
      icon: <Phone sx={{ color: '#ffffff' }} />,
      text: '+254 711 662 784',
      link: 'tel:+254711662784'
    },
    {
      icon: <LocationOn sx={{ color: '#ffffff' }} />,
      text: 'JKUAT University, Juja, Kenya',
      link: 'https://maps.google.com/?q=JKUAT+University+Juja+Kenya'
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/gdgjkuatt/',
      color: '#0077B5'
    },
    {
      icon: <Instagram />,
      label: 'Instagram',
      url: 'https://www.instagram.com/gdgjkuat',
      color: '#E4405F'
    },
    {
      icon: <Twitter />,
      label: 'Twitter',
      url: 'https://x.com/dscjkuat',
      color: '#1DA1F2'
    },
    {
      icon: <GitHub />,
      label: 'GitHub',
      url: 'https://github.com/gdgjkuat',
      color: '#333333'
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1565C0', // Clean blue background
        color: 'white',
        mt: 'auto',
        borderTop: '4px solid #0D47A1'
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: 4 }}>
          
          {/* Brand Section - Full width on mobile, half on tablet, third on desktop */}
          <Grid item xs={12} md={6} lg={4}>
            <Box className="flex flex-col space-y-4">
              {/* Logo and Brand */}
              <Box className="flex items-center space-x-3">
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    bgcolor: '#ffffff',
                    color: '#1565C0',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  GDG
                </Box>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#ffffff',
                    lineHeight: 1.2
                  }}
                >
                  GDG JKUAT Tech Digest
                </Typography>
              </Box>
              
              {/* Description */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#E3F2FD', 
                  lineHeight: 1.6,
                  maxWidth: { lg: '90%' }
                }}
              >
                Google Developer Group at Jomo Kenyatta University of Agriculture and Technology. 
                Empowering students through technology workshops, community events, and developer resources.
              </Typography>

              {/* Contact Info */}
              <Box className="flex flex-col space-y-3 mt-4">
                {contactInfo.map((contact, index) => (
                  <Box
                    key={index}
                    component="a"
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 no-underline hover:bg-blue-700 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      '&:hover': {
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Box className="flex-shrink-0">
                      {contact.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#E3F2FD' }}>
                      {contact.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Links Section - Side by side on larger screens */}
          <Grid item xs={12} md={6} lg={4}>
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
              
              {/* Quick Links */}
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3, 
                    color: '#ffffff',
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  Quick Links
                </Typography>
                <Box className="flex flex-col space-y-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.path}
                      variant="body2"
                      sx={{
                        color: '#E3F2FD',
                        textDecoration: 'none',
                        padding: '4px 0',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#ffffff',
                          textDecoration: 'underline',
                          paddingLeft: '8px'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Box>

              {/* Resources */}
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3, 
                    color: '#ffffff',
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  Resources
                </Typography>
                <Box className="flex flex-col space-y-2">
                  {resources.map((resource) => (
                    <Link
                      key={resource.label}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{
                        color: '#E3F2FD',
                        textDecoration: 'none',
                        padding: '4px 0',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#ffffff',
                          textDecoration: 'underline',
                          paddingLeft: '8px'
                        }
                      }}
                    >
                      {resource.label}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Connect Section */}
          <Grid item xs={12} lg={4}>
            <Box className="space-y-6">
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#ffffff',
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Connect With Us
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#E3F2FD', lineHeight: 1.6 }}>
                Follow us on social media for updates on events, workshops, and tech news.
              </Typography>

              {/* Social Links */}
              <Box className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      width: 44,
                      height: 44,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>

              {/* Community Features */}
              <Box className="space-y-3">
                <Box className="flex items-center space-x-3">
                  <Event sx={{ color: '#E3F2FD', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#E3F2FD' }}>
                    Weekly Friday Meetups
                  </Typography>
                </Box>
                <Box className="flex items-center space-x-3">
                  <Groups sx={{ color: '#E3F2FD', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#E3F2FD' }}>
                    500+ Active Members
                  </Typography>
                </Box>
                <Box className="flex items-center space-x-3">
                  <School sx={{ color: '#E3F2FD', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#E3F2FD' }}>
                    JKUAT Community
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 4 }} />

        {/* Bottom Bar */}
        <Box
          className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row justify-between items-center'}`}
        >
          <Typography variant="body2" sx={{ color: '#E3F2FD' }}>
            © {new Date().getFullYear()} GDG JKUAT Tech Digest. All rights reserved.
          </Typography>
          
          <Box className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row space-x-6'}`}>
            <Link
              href="/privacy"
              variant="body2"
              sx={{
                color: '#E3F2FD',
                textDecoration: 'none',
                '&:hover': { 
                  color: '#ffffff', 
                  textDecoration: 'underline' 
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              variant="body2"
              sx={{
                color: '#E3F2FD',
                textDecoration: 'none',
                '&:hover': { 
                  color: '#ffffff', 
                  textDecoration: 'underline' 
                }
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/code-of-conduct"
              variant="body2"
              sx={{
                color: '#E3F2FD',
                textDecoration: 'none',
                '&:hover': { 
                  color: '#ffffff', 
                  textDecoration: 'underline' 
                }
              }}
            >
              Code of Conduct
            </Link>
          </Box>
        </Box>

        {/* Google Branding */}
        <Box className="text-center mt-6">
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontStyle: 'italic',
              fontSize: '0.75rem'
            }}
          >
            GDG JKUAT is an independent group; our activities and opinions are not necessarily 
            endorsed or sponsored by Google LLC.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;