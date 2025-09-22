// src/components/episodes/EpisodeCard.jsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodeService } from '../../services';
import { formatDate } from '../../utils/dateUtils';

const EpisodeCard = ({ episode, onLikeUpdate }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(episode.like_count || 0);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiking) return;

    setIsLiking(true);
    try {
      const result = await episodeService.likeEpisode(episode.episode_number);
      setLikeCount(result.new_like_count);
      if (onLikeUpdate) {
        onLikeUpdate(episode.episode_number, result.new_like_count);
      }
    } catch (error) {
      console.error('Failed to like episode:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Episode Image */}
      {episode.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={episode.image_url}
            alt={episode.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Episode Number Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
            Episode {episode.episode_number}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(episode.created_at)}
          </span>
        </div>

        {/* Episode Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {episode.title}
        </h3>

        {/* Episode Content Preview */}
        {episode.content && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {episode.content.substring(0, 150)}...
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                isLiking 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${isLiking ? 'animate-pulse' : ''}`}
                fill={likeCount > 0 ? 'currentColor' : 'none'}
              />
              <span>{likeCount}</span>
            </button>

            {/* Comments Count */}
            <span className="flex items-center space-x-1 text-sm text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span>{episode.comments?.length || 0}</span>
            </span>
          </div>

          {/* Read More Link */}
          <Link
            to={`/episodes/${episode.episode_number}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read more
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;