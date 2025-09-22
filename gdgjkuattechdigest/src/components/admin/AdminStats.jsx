// src/components/admin/AdminStats.jsx
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Article,
  ThumbUp,
  Comment,
  TrendingUp,
  DateRange
} from '@mui/icons-material';
import { episodeService } from '../../services';

const StatCard = ({ title, value, icon, color = 'primary', subtitle }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const RecentEpisodesCard = ({ episodes }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <DateRange sx={{ mr: 1 }} />
          Recent Episodes
        </Typography>
        
        {episodes.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No episodes found
          </Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            {episodes.slice(0, 5).map((episode) => (
              <Box
                key={episode.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="medium" noWrap>
                    Episode {episode.episode_number}: {episode.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(episode.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    size="small"
                    label={`${episode.like_count} likes`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalEpisodes: 0,
    totalLikes: 0,
    totalComments: 0,
    avgLikesPerEpisode: 0
  });
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch all episodes to calculate stats
        const response = await episodeService.getAllEpisodes(0, 100); // Get more episodes for stats
        const episodesData = Array.isArray(response) ? response : [];
        
        // Calculate statistics
        const totalEpisodes = episodesData.length;
        const totalLikes = episodesData.reduce((sum, episode) => sum + (episode.like_count || 0), 0);
        
        // For comments, we'd need to fetch detailed episode data
        // For now, we'll estimate based on available data
        let totalComments = 0;
        try {
          // Fetch detailed data for first few episodes to estimate comments
          const detailedEpisodes = await Promise.all(
            episodesData.slice(0, 5).map(async (episode) => {
              try {
                const detailed = await episodeService.getEpisodeByNumber(episode.episode_number);
                return detailed.comments ? detailed.comments.length : 0;
              } catch (err) {
                return 0;
              }
            })
          );
          totalComments = detailedEpisodes.reduce((sum, count) => sum + count, 0);
        } catch (err) {
          console.warn('Could not fetch comment counts:', err);
        }

        const avgLikesPerEpisode = totalEpisodes > 0 ? Math.round(totalLikes / totalEpisodes * 10) / 10 : 0;

        setStats({
          totalEpisodes,
          totalLikes,
          totalComments,
          avgLikesPerEpisode
        });

        setEpisodes(episodesData);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Dashboard Statistics
      </Typography>

      <Grid container spacing={3}>
        {/* Main Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Episodes"
            value={stats.totalEpisodes}
            icon={<Article />}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Likes"
            value={stats.totalLikes}
            icon={<ThumbUp />}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Comments"
            value={stats.totalComments}
            icon={<Comment />}
            color="info"
            subtitle="From recent episodes"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Likes/Episode"
            value={stats.avgLikesPerEpisode}
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>

        {/* Recent Episodes */}
        <Grid item xs={12} md={8}>
          <RecentEpisodesCard episodes={episodes} />
        </Grid>

        {/* Quick Stats Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Overview
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Typography variant="body2" gutterBottom>
                    Most Liked Episode
                  </Typography>
                  {episodes.length > 0 ? (
                    <>
                      <Typography variant="body1" fontWeight="bold">
                        Episode {episodes.reduce((prev, current) => 
                          prev.like_count > current.like_count ? prev : current
                        ).episode_number}
                      </Typography>
                      <Typography variant="caption">
                        {episodes.reduce((prev, current) => 
                          prev.like_count > current.like_count ? prev : current
                        ).like_count} likes
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2">No data</Typography>
                  )}
                </Paper>

                <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                  <Typography variant="body2" gutterBottom>
                    Latest Episode
                  </Typography>
                  {episodes.length > 0 ? (
                    <>
                      <Typography variant="body1" fontWeight="bold">
                        Episode {episodes[0].episode_number}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(episodes[0].created_at).toLocaleDateString()}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2">No episodes</Typography>
                  )}
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminStats;