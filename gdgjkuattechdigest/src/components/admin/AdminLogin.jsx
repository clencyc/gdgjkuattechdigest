// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { authService } from '../../services';

const AdminLogin = ({ onLogin }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate token format
      if (!authService.validateTokenFormat(token)) {
        setError('Please enter a valid admin token');
        setLoading(false);
        return;
      }

      // Check if token matches the expected admin token
      const isValid = authService.login(token);
      
      if (isValid) {
        onLogin(token);
      } else {
        setError('Invalid admin token. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  // Quick login for development (hardcoded token)
  const handleQuickLogin = () => {
    const adminToken = 'gdg-jkuat-2024-admin-secure-key-xyz789ABC';
    setToken(adminToken);
    onLogin(adminToken);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}
          >
            <LockOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter your admin token to access the dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Admin Token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              margin="normal"
              required
              placeholder="Enter admin token"
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !token.trim()}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {/* Development quick login */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleQuickLogin}
              sx={{ mb: 2 }}
              disabled={loading}
            >
              Quick Login (Dev)
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              GDG JKUAT Tech Digest - Admin Panel
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminLogin;