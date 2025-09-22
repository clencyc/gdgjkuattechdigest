// src/components/episodes/EpisodeActions.jsx
import React, { useState } from 'react';
import { Edit, Trash2, Eye, Share2, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { episodeService, authService } from '../../services';

const EpisodeActions = ({ 
  episode, 
  onLikeUpdate, 
  onDelete, 
  showAdminActions = false,
  variant = 'default' // 'default', 'minimal', 'dropdown'
}) => {
  const navigate = useNavigate();
  const [isLiking, setIsLiking] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isAdmin = authService.isAdmin();

  const handleLike = async (e) => {
    e?.stopPropagation();
    if (isLiking) return;

    setIsLiking(true);
    try {
      const result = await episodeService.likeEpisode(episode.episode_number);
      if (onLikeUpdate) {
        onLikeUpdate(episode.episode_number, result.new_like_count);
      }
    } catch (error) {
      console.error('Failed to like episode:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleView = (e) => {
    e?.stopPropagation();
    navigate(`/episodes/${episode.episode_number}`);
  };

  const handleEdit = (e) => {
    e?.stopPropagation();
    navigate(`/admin/episodes/${episode.episode_number}/edit`);
  };

  const handleDelete = async (e) => {
    e?.stopPropagation();
    
    if (!window.confirm(`Are you sure you want to delete "${episode.title}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await episodeService.deleteEpisode(episode.episode_number);
      if (onDelete) {
        onDelete(episode.episode_number);
      }
    } catch (error) {
      console.error('Failed to delete episode:', error);
      alert('Failed to delete episode. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async (e) => {
    e?.stopPropagation();
    const url = `${window.location.origin}/episodes/${episode.episode_number}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: episode.title,
          text: episode.content?.substring(0, 100) + '...',
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        // You could show a toast notification here
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
    setShowDropdown(false);
  };

  // Minimal variant - just like and comment count
  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-1 transition-colors ${
            isLiking ? 'text-gray-400' : 'hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${isLiking ? 'animate-pulse' : ''}`}
            fill={episode.like_count > 0 ? 'currentColor' : 'none'}
          />
          <span>{episode.like_count || 0}</span>
        </button>
        
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{episode.comments?.length || 0}</span>
        </div>
      </div>
    );
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                <button
                  onClick={handleView}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-3" />
                  View Episode
                </button>
                
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:text-gray-400"
                >
                  <Heart className="w-4 h-4 mr-3" />
                  {isLiking ? 'Liking...' : `Like (${episode.like_count || 0})`}
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-3" />
                  Share Episode
                </button>

                {isAdmin && showAdminActions && (
                  <>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleEdit}
                      className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-3" />
                      Edit Episode
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:text-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      {isDeleting ? 'Deleting...' : 'Delete Episode'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default variant - full action buttons
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
            isLiking 
              ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart 
            className={`w-5 h-5 ${isLiking ? 'animate-pulse' : ''}`}
            fill={episode.like_count > 0 ? 'currentColor' : 'none'}
          />
          <span className="text-sm font-medium">{episode.like_count || 0}</span>
        </button>

        {/* Comments Count */}
        <div className="flex items-center space-x-2 text-gray-600">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{episode.comments?.length || 0}</span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        {/* View Button */}
        <button
          onClick={handleView}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Read More
        </button>

        {/* Admin Actions */}
        {isAdmin && showAdminActions && (
          <>
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:text-red-400 disabled:cursor-not-allowed"
              title="Delete"
            >
              <Trash2 className={`w-5 h-5 ${isDeleting ? 'animate-pulse' : ''}`} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodeActions;