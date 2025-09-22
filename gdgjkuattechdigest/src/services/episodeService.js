// src/services/episodeService.js
import api from './api';

const episodeService = {
  /**
   * Get all episodes with pagination
   * @param {number} skip - Number of episodes to skip
   * @param {number} limit - Maximum number of episodes to return
   * @returns {Promise} API response with episodes array
   */
  getAllEpisodes: async (skip = 0, limit = 20) => {
    try {
      const response = await api.get('/episodes/', {
        params: { skip, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch episodes: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Get detailed episode by episode number
   * @param {number} episodeNumber - The episode number to retrieve
   * @returns {Promise} API response with detailed episode data
   */
  getEpisodeByNumber: async (episodeNumber) => {
    try {
      const response = await api.get(`/episodes/${episodeNumber}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      throw new Error(`Failed to fetch episode: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Create a new episode (admin only)
   * @param {Object} episodeData - Episode data to create
   * @param {string} episodeData.title - Episode title
   * @param {string} episodeData.content - Episode content
   * @param {string} episodeData.image_url - Episode image URL
   * @param {number} episodeData.episode_number - Episode number
   * @returns {Promise} API response with created episode
   */
  createEpisode: async (episodeData) => {
    try {
      const response = await api.post('/episodes/', episodeData, {
        requiresAuth: true
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 422) {
        throw new Error('Invalid episode data provided');
      }
      throw new Error(`Failed to create episode: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Update an existing episode (admin only)
   * @param {number} episodeNumber - Episode number to update
   * @param {Object} updateData - Updated episode data
   * @param {string} updateData.title - Updated episode title
   * @param {string} updateData.content - Updated episode content
   * @param {string} updateData.image_url - Updated episode image URL
   * @returns {Promise} API response with updated episode
   */
  updateEpisode: async (episodeNumber, updateData) => {
    try {
      const response = await api.put(`/episodes/${episodeNumber}`, updateData, {
        requiresAuth: true
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid update data provided');
      }
      throw new Error(`Failed to update episode: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Delete an episode and all its comments (admin only)
   * @param {number} episodeNumber - Episode number to delete
   * @returns {Promise} API response with confirmation message
   */
  deleteEpisode: async (episodeNumber) => {
    try {
      const response = await api.delete(`/episodes/${episodeNumber}`, {
        requiresAuth: true
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      throw new Error(`Failed to delete episode: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Like an episode
   * @param {number} episodeNumber - Episode number to like
   * @returns {Promise} API response with updated like count
   */
  likeEpisode: async (episodeNumber) => {
    try {
      const response = await api.post(`/episodes/${episodeNumber}/like`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Episode not found');
      }
      throw new Error(`Failed to like episode: ${error.response?.data?.detail || error.message}`);
    }
  },

  /**
   * Upload an image for an episode (admin only)
   * @param {File} imageFile - Image file to upload
   * @returns {Promise} API response with image URL
   */
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post('/episodes/upload-image', formData, {
        requiresAuth: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.response?.data?.detail || error.message}`);
    }
  }
};

export default episodeService;
