// src/components/episodes/EpisodeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, ArrowLeft, Share2, Edit, Trash2 } from 'lucide-react';
import { episodeService, authService } from '../../services';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import { formatDate } from '../../utils/dateUtils';

const EpisodeDetail = () => {
  const { episodeNumber } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const isAdmin = authService.isAdmin();

  useEffect(() => {
    loadEpisode();
  }, [episodeNumber]);

  const loadEpisode = async () => {
    try {
      setLoading(true);
      const data = await episodeService.getEpisodeByNumber(parseInt(episodeNumber));
      setEpisode(data);
      setLikeCount(data.like_count || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const result = await episodeService.likeEpisode(parseInt(episodeNumber));
      setLikeCount(result.new_like_count);
    } catch (error) {
      console.error('Failed to like episode:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: episode.title,
          text: episode.content?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleEdit = () => {
    navigate(`/admin/episodes/${episodeNumber}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this episode? This action cannot be undone.')) {
      try {
        await episodeService.deleteEpisode(parseInt(episodeNumber));
        navigate('/episodes');
      } catch (error) {
        console.error('Failed to delete episode:', error);
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setEpisode(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
  };

  const handleCommentDeleted = (commentId) => {
    setEpisode(prev => ({
      ...prev,
      comments: prev.comments.filter(comment => comment.id !== commentId)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Episode</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/episodes')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Episodes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!episode) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/episodes')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Episodes
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                  Episode {episode.episode_number}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(episode.created_at)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {episode.title}
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {isAdmin && (
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
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Episode Image */}
          {episode.image_url && (
            <div className="mb-8">
              <img
                src={episode.image_url}
                alt={episode.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Episode Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              {episode.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Like and Comment Stats */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLiking 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart 
                    className={`w-6 h-6 ${isLiking ? 'animate-pulse' : ''}`}
                    fill={likeCount > 0 ? 'currentColor' : 'none'}
                  />
                  <span className="font-medium">{likeCount}</span>
                  <span className="text-sm">Like{likeCount !== 1 ? 's' : ''}</span>
                </button>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-medium">{episode.comments?.length || 0}</span>
                  <span className="text-sm">Comment{episode.comments?.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({episode.comments?.length || 0})
            </h3>
            
            <CommentForm
              episodeNumber={episode.episode_number}
              onCommentAdded={handleCommentAdded}
            />
            
            <CommentList
              comments={episode.comments || []}
              episodeNumber={episode.episode_number}
              onCommentDeleted={handleCommentDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;