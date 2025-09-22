// src/pages/EpisodeDetail.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  TextField,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  IconButton,
  Skeleton
} from '@mui/material';
import {
  ThumbUp,
  Comment,
  Share,
  CalendarToday,
  ArrowBack,
  Send,
  Person
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { episodeService, commentService } from '../services';

const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card elevation={1} sx={{ mb: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#FBBC05', mr: 2, width: 32, height: 32 }}>
            <Person fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
              {comment.random_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(comment.created_at)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {comment.comment_text}
        </Typography>
      </CardContent>
    </Card>
  );
};

const EpisodeDetail = () => {
  const { episodeNumber } = useParams();
  const navigate = useNavigate();
  
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likingEpisode, setLikingEpisode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        setError('');
        const episodeData = await episodeService.getEpisodeByNumber(parseInt(episodeNumber));
        setEpisode(episodeData);
      } catch (err) {
        console.error('Error fetching episode:', err);
        setError(err.message || 'Failed to load episode. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (episodeNumber) {
      fetchEpisode();
    }
  }, [episodeNumber]);

  const handleLikeEpisode = async () => {
    if (!episode || likingEpisode) return;
    
    setLikingEpisode(true);
    try {
      const result = await episodeService.likeEpisode(episode.episode_number);
      setEpisode(prev => ({
        ...prev,
        like_count: result.new_like_count
      }));
      showSnackbar('Episode liked successfully!', 'success');
    } catch (err) {
      console.error('Error liking episode:', err);
      showSnackbar('Failed to like episode. Please try again.', 'error');
    } finally {
      setLikingEpisode(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || submittingComment) return;

    setSubmittingComment(true);
    try {
      const newComment = await commentService.addComment(episode.episode_number, {
        comment_text: commentText.trim()
      });
      
      setEpisode(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
      
      setCommentText('');
      showSnackbar('Comment added successfully!', 'success');
    } catch (err) {
      console.error('Error adding comment:', err);
      showSnackbar('Failed to add comment. Please try again.', 'error');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: `Check out this episode: ${episode.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSnackbar('Link copied to clipboard!', 'success');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box>
        {/* Header Skeleton */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 4 }}>
          <Container maxWidth="lg">
            <Skeleton variant="text" width={100} height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="70%" height={60} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={100} height={32} />
              <Skeleton variant="rounded" width={120} height={32} />
            </Box>
          </Container>
        </Box>

        {/* Content Skeleton */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 3 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom color="error">
            Episode Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/episodes')}
            sx={{ bgcolor: '#4285F4', '&:hover': { bgcolor: '#3367d6' } }}
          >
            Back to Episodes
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!episode) {
    return null;
  }

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 4 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/episodes')}
            sx={{ mb: 3, color: '#4285F4' }}
          >
            Back to Episodes
          </Button>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              lineHeight: 1.2
            }}
          >
            {episode.title}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={`Episode ${episode.episode_number}`}
              sx={{ bgcolor: '#4285F4', color: 'white', fontWeight: 600 }}
            />
            <Chip
              icon={<CalendarToday sx={{ fontSize: 16 }} />}
              label={formatDate(episode.created_at)}
              variant="outlined"
            />
            {episode.updated_at !== episode.created_at && (
              <Chip
                label={`Updated ${formatDate(episode.updated_at)}`}
                variant="outlined"
                color="secondary"
                size="small"
              />
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
            <Button
              variant="contained"
              startIcon={likingEpisode ? <CircularProgress size={16} color="inherit" /> : <ThumbUp />}
              onClick={handleLikeEpisode}
              disabled={likingEpisode}
              sx={{
                bgcolor: '#34A853',
                '&:hover': { bgcolor: '#2d8f47' },
                minWidth: 120
              }}
            >
              {episode.like_count || 0} Like{(episode.like_count || 0) !== 1 ? 's' : ''}
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Share />}
              onClick={handleShare}
              sx={{
                color: '#FBBC05',
                borderColor: '#FBBC05',
                '&:hover': {
                  borderColor: '#FBBC05',
                  bgcolor: 'rgba(251, 188, 5, 0.04)'
                }
              }}
            >
              Share
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Comment />}
              onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                color: '#EA4335',
                borderColor: '#EA4335',
                '&:hover': {
                  borderColor: '#EA4335',
                  bgcolor: 'rgba(234, 67, 53, 0.04)'
                }
              }}
            >
              {episode.comments?.length || 0} Comment{(episode.comments?.length || 0) !== 1 ? 's' : ''}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Episode Image */}
            {episode.image_url && (
              <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
                <Box
                  component="img"
                  src={episode.image_url}
                  alt={episode.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Paper>
            )}

            {/* Episode Content */}
            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  whiteSpace: 'pre-line'
                }}
              >
                {episode.content}
              </Typography>
            </Paper>

            {/* Comments Section */}
            <Paper elevation={2} sx={{ p: 4 }} id="comments-section">
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Comment sx={{ mr: 1, color: '#EA4335' }} />
                Comments ({episode.comments?.length || 0})
              </Typography>
              
              <Divider sx={{ my: 3 }} />

              {/* Add Comment Form */}
              <Box component="form" onSubmit={handleSubmitComment} sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your thoughts about this episode..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!commentText.trim() || submittingComment}
                    startIcon={submittingComment ? <CircularProgress size={16} color="inherit" /> : <Send />}
                    sx={{
                      bgcolor: '#4285F4',
                      '&:hover': { bgcolor: '#3367d6' },
                      minWidth: 120
                    }}
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </Button>
                </Box>
              </Box>

              {/* Comments List */}
              {episode.comments && episode.comments.length > 0 ? (
                <Box>
                  {episode.comments
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                </Box>
              ) : (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    bgcolor: '#f8f9fa',
                    border: '1px dashed #ddd'
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No comments yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Be the first to share your thoughts about this episode!
                  </Typography>
                </Paper>
              )}
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box sx={{ width: { md: 300 } }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Episode Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Episode Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {episode.episode_number}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Published Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(episode.created_at)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Engagement
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip
                      icon={<ThumbUp sx={{ fontSize: 16 }} />}
                      label={episode.like_count || 0}
                      size="small"
                      sx={{ bgcolor: '#34A853', color: 'white' }}
                    />
                    <Chip
                      icon={<Comment sx={{ fontSize: 16 }} />}
                      label={episode.comments?.length || 0}
                      size="small"
                      sx={{ bgcolor: '#EA4335', color: 'white' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

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

export default EpisodeDetail;