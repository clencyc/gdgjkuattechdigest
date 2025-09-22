// src/services/commentService.js
import api from './api';

const commentService = {
  /**
   * Add a comment to an episode
   * @param {number} episodeNumber - Episode number to comment on
   * @param {Object} commentData - Comment data
   * @param {string} commentData.comment_text - The comment text
   * @returns {Promise} API response with created comment
   */
  addComment: async (episodeNumber, commentData) => {
    try {
      const response = await api.post(`/episodes/${episodeNumber}/comments`, commentData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid comment data provided');
      }
      throw new Error(`Failed to add comment: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Delete a specific comment from an episode (admin only)
   * @param {number} episodeNumber - Episode number
   * @param {number} commentId - Comment ID to delete
   * @returns {Promise} API response with confirmation message
   */
  deleteComment: async (episodeNumber, commentId) => {
    try {
      const response = await api.delete(`/episodes/${episodeNumber}/comments/${commentId}`, {
        requiresAuth: true
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode or comment not found');
      }
      throw new Error(`Failed to delete comment: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Get comments for a specific episode (extracted from episode detail)
   * @param {number} episodeNumber - Episode number to get comments for
   * @returns {Promise} Array of comments
   */
  getComments: async (episodeNumber) => {
    try {
      const response = await api.get(`/episodes/${episodeNumber}`);
      return response.data.comments || [];
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      throw new Error(`Failed to fetch comments: ${error.response?.data?.detail || error.message}`);
    }
  }
};

export default commentService;
