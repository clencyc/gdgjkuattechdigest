// src/components/episodes/FeaturedEpisode.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MessageCircle, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodeService } from '../../services';
import { formatDate } from '../../utils/dateUtils';
import EpisodeActions from './EpisodeActions';

const FeaturedEpisode = ({ episodeNumber, className = '' }) => {
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (episodeNumber) {
      loadEpisode();
    } else {
      loadLatestEpisode();
    }
  }, [episodeNumber ]);

  const loadEpisode = async () => {
    try {
      setLoading(true);
      const data = await episodeService.getEpisodeByNumber(episodeNumber);
      setEpisode(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLatestEpisode = async () => {
    try {
      setLoading(true);
      const episodes = await episodeService.getAllEpisodes(0, 1);
      if (episodes && episodes.length > 0) {
        const latestEpisode = await episodeService.getEpisodeByNumber(episodes[0].episode_number);
        setEpisode(latestEpisode);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (episodeNum, newLikeCount) => {
    if (episode && episode.episode_number === episodeNum) {
      setEpisode(prev => ({ ...prev, like_count: newLikeCount }));
    }
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden ${className}`}>
        <div className="p-8 md:p-12">
          <div className="animate-pulse">
            <div className="h-4 bg-blue-400 rounded w-24 mb-4"></div>
            <div className="h-8 bg-blue-400 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-blue-400 rounded w-full mb-2"></div>
            <div className="h-4 bg-blue-400 rounded w-2/3 mb-6"></div>
            <div className="h-10 bg-blue-400 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className={`bg-gray-100 rounded-2xl shadow-xl overflow-hidden ${className}`}>
        <div className="p-8 md:p-12 text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {error ? 'Error Loading Featured Episode' : 'No Episodes Available'}
          </h3>
          <p className="text-gray-500">
            {error || 'No episodes have been published yet.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
        {/* Content Section */}
        <div className="p-8 md:p-12 text-white">
          {/* Featured Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white mb-6">
            <Play className="w-4 h-4 mr-2" />
            Featured Episode
          </div>

          {/* Episode Meta */}
          <div className="flex items-center space-x-4 mb-4 text-blue-100">
            <span className="text-sm font-medium">
              Episode {episode.episode_number}
            </span>
            <span className="text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(episode.created_at)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {episode.title}
          </h2>

          {/* Content Preview */}
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            {episode.content?.substring(0, 200)}...
          </p>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" fill={episode.like_count > 0 ? 'currentColor' : 'none'} />
              <span className="font-medium">{episode.like_count || 0}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{episode.comments?.length || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/episodes/${episode.episode_number}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 group"
            >
              Read Full Episode
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="sm:ml-4">
              <EpisodeActions
                episode={episode}
                onLikeUpdate={handleLikeUpdate}
                variant="minimal"
              />
            </div>
          </div>
        </div>

        {/* Image Section */}
        {episode.image_url && (
          <div className="relative lg:h-full min-h-[300px]">
            <img
              src={episode.image_url}
              alt={episode.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-800/20"></div>
          </div>
        )}
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default FeaturedEpisode;