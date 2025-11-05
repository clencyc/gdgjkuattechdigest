import React, { useState, useEffect } from 'react';
import gdgLogo from '../../assets/gdg-logo.png';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Avatar,
  Fade,
  Slide
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Episodes', path: '/episodes' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActivePage = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ 
      height: '100%',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: 'text.primary',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Drawer Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src={gdgLogo}
            alt="GDG JKUAT Logo"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            GDG JKUAT
          </Typography>
        </Box>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ color: 'text.primary' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {navItems.map((item, index) => (
          <Fade in={mobileOpen} timeout={300 + index * 100} key={item.label}>
            <ListItem 
              component={Link} 
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{ 
                textDecoration: 'none',
                color: 'inherit',
                mx: 1,
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActivePage(item.path) 
                  ? 'rgba(66, 133, 244, 0.2)' 
                  : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(66, 133, 244, 0.1)',
                  transform: 'translateX(8px)',
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  textAlign: 'left',
                  '& .MuiTypography-root': {
                    fontWeight: isActivePage(item.path) ? 'bold' : 'normal'
                  }
                }} 
              />
            </ListItem>
          </Fade>
        ))}
      </List>

      {/* Drawer Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <Typography variant="caption" sx={{ opacity: 0.6, color: 'text.secondary' }}>
          Tech Digest © 2024
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : '1px solid rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
          transition: 'all 0.3s ease',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
            : '0 2px 16px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: 56, sm: 64 }
          }}>
            {/* Left Section - Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 1, 
                  display: { md: 'none' },
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.5, sm: 1 },
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
              onClick={() => navigate('/')}
              >
                <Avatar
                  src={gdgLogo}
                  alt="GDG JKUAT Logo"
                  sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    display: { xs: 'flex', sm: 'flex' },
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'rotate(5deg)'
                    }
                  }}
                />
                <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.4rem' },
                    letterSpacing: '0.5px',
                    color: '#000000'
                  }}
                >
                  JKUATTECHDIGEST
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              gap: { md: 1, lg: 2 },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              p: 0.5,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: isActivePage(item.path) ? 'bold' : 500,
                    fontSize: { md: '0.9rem', lg: '1rem' },
                    px: { md: 2, lg: 3 },
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    backgroundColor: isActivePage(item.path) 
                      ? 'primary.main' 
                      : 'transparent',
                    color: isActivePage(item.path) 
                      ? 'white' 
                      : 'inherit',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isActivePage(item.path) 
                        ? 'primary.dark' 
                        : 'rgba(66, 133, 244, 0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    },
                    '&:active': {
                      transform: 'translateY(0)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right Section - Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <PersonIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        SlideProps={{
          direction: "right"
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { xs: 280, sm: 320 },
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;