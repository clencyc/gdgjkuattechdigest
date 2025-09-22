// src/components/admin/AdminEpisodeManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Fab
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  ThumbUp,
  Comment,
  Image as ImageIcon,
  Save,
  Cancel,
  Upload
} from '@mui/icons-material';
import { episodeService, imageService } from '../../services';

const EpisodeCard = ({ episode, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete Episode ${episode.episode_number}: "${episode.title}"? This action cannot be undone.`)) {
      setLoading(true);
      try {
        await onDelete(episode.episode_number);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {episode.image_url && (
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${episode.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          <Chip
            label={`Episode ${episode.episode_number}`}
            color="primary"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold'
            }}
          />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {episode.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {episode.content ? episode.content.substring(0, 150) + (episode.content.length > 150 ? '...' : '') : 'No content available'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<ThumbUp />}
            label={`${episode.like_count || 0} likes`}
            size="small"
            variant="outlined"
            color="success"
          />
          {episode.comments && (
            <Chip
              icon={<Comment />}
              label={`${episode.comments.length} comments`}
              size="small"
              variant="outlined"
              color="info"
            />
          )}
        </Box>
        
        <Typography variant="caption" color="text.secondary">
          Created: {new Date(episode.created_at).toLocaleDateString()}
          {episode.updated_at !== episode.created_at && (
            <><br />Updated: {new Date(episode.updated_at).toLocaleDateString()}</>
          )}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button
          size="small"
          startIcon={<Edit />}
          onClick={() => onEdit(episode)}
          disabled={loading}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<Delete />}
          color="error"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <CircularProgress size={16} /> : 'Delete'}
        </Button>
      </CardActions>
    </Card>
  );
};

const EpisodeDialog = ({ open, onClose, episode, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    episode_number: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (episode) {
      setFormData({
        title: episode.title || '',
        content: episode.content || '',
        image_url: episode.image_url || '',
        episode_number: episode.episode_number || ''
      });
      setImagePreview(episode.image_url || '');
    } else {
      setFormData({
        title: '',
        content: '',
        image_url: '',
        episode_number: ''
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [episode, open]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!imageService.isValidImageType(file)) {
        alert('Please select a valid image file (PNG, JPG, JPEG, GIF, WebP)');
        return;
      }
      if (!imageService.isValidFileSize(file, 5)) {
        alert('Image file size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const preview = imageService.createPreviewUrl(file);
      setImagePreview(preview);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    
    setUploading(true);
    try {
      const result = await imageService.uploadImage(imageFile);
      const imageUrl = result.url || result.image_url || result;
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      setImageFile(null);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!episode && !formData.episode_number) {
      alert('Please provide an episode number');
      return;
    }

    setSaving(true);
    try {
      if (imageFile && !formData.image_url.startsWith('http')) {
        // Upload image first if there's a new file and no URL set
        const result = await imageService.uploadImage(imageFile);
        formData.image_url = result.url || result.image_url || result;
      }

      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error.message || 'Failed to save episode');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {episode ? `Edit Episode ${episode.episode_number}` : 'Create New Episode'}
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Episode Title"
              value={formData.title}
              onChange={handleInputChange('title')}
              required
            />
          </Grid>
          
          {!episode && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Episode Number"
                type="number"
                value={formData.episode_number}
                onChange={handleInputChange('episode_number')}
                required
              />
            </Grid>
          )}
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={6}
              value={formData.content}
              onChange={handleInputChange('content')}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.image_url}
              onChange={handleInputChange('image_url')}
              placeholder="https://example.com/image.jpg"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2, border: '1px dashed', borderColor: 'divider' }}>
              <Typography variant="body2" gutterBottom>
                Or upload an image:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />}
                >
                  Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                
                {imageFile && (
                  <Button
                    variant="contained"
                    onClick={handleImageUpload}
                    disabled={uploading}
                    startIcon={uploading ? <CircularProgress size={16} /> : <ImageIcon />}
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                )}
              </Box>
              
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Preview:
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      backgroundImage: `url(${imagePreview})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 1,
                      mt: 1
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} /> : <Save />}
        >
          {saving ? 'Saving...' : 'Save Episode'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminEpisodeManager = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Wrap showSnackbar in useCallback to prevent unnecessary re-renders
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchEpisodes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await episodeService.getAllEpisodes(0, 100);
      const episodesData = Array.isArray(response) ? response : [];
      
      // Fetch detailed data for each episode to get comments
      const detailedEpisodes = await Promise.all(
        episodesData.map(async (episode) => {
          try {
            const detailed = await episodeService.getEpisodeByNumber(episode.episode_number);
            return detailed;
          } catch (error) {
            console.warn(`Failed to fetch details for episode ${episode.episode_number}:`, error);
            return episode;
          }
        })
      );
      
      setEpisodes(detailedEpisodes.sort((a, b) => b.episode_number - a.episode_number));
    } catch (error) {
      console.error('Error fetching episodes:', error);
      showSnackbar('Failed to load episodes', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  const handleCreateEpisode = () => {
    setEditingEpisode(null);
    setDialogOpen(true);
  };

  const handleEditEpisode = (episode) => {
    setEditingEpisode(episode);
    setDialogOpen(true);
  };

  const handleSaveEpisode = async (episodeData) => {
    if (editingEpisode) {
      // Update existing episode
      await episodeService.updateEpisode(editingEpisode.episode_number, {
        title: episodeData.title,
        content: episodeData.content,
        image_url: episodeData.image_url
      });
      showSnackbar('Episode updated successfully!');
    } else {
      // Create new episode
      await episodeService.createEpisode({
        title: episodeData.title,
        content: episodeData.content,
        image_url: episodeData.image_url,
        episode_number: parseInt(episodeData.episode_number)
      });
      showSnackbar('Episode created successfully!');
    }
    
    fetchEpisodes(); // Refresh the list
  };

  const handleDeleteEpisode = async (episodeNumber) => {
    try {
      await episodeService.deleteEpisode(episodeNumber);
      showSnackbar('Episode deleted successfully!');
      fetchEpisodes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting episode:', error);
      showSnackbar('Failed to delete episode', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Episode Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateEpisode}
        >
          Create Episode
        </Button>
      </Box>

      {episodes.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No episodes found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Get started by creating your first episode
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateEpisode}
          >
            Create First Episode
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {episodes.map((episode) => (
            <Grid item xs={12} sm={6} md={4} key={episode.id}>
              <EpisodeCard
                episode={episode}
                onEdit={handleEditEpisode}
                onDelete={handleDeleteEpisode}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button for mobile */}
      <Fab
        color="primary"
        aria-label="add episode"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' }
        }}
        onClick={handleCreateEpisode}
      >
        <Add />
      </Fab>

      {/* Episode Dialog */}
      <EpisodeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        episode={editingEpisode}
        onSave={handleSaveEpisode}
      />

      {/* Snackbar for notifications */}
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

export default AdminEpisodeManager;