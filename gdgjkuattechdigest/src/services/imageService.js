// src/services/imageService.js
import episodeService from './episodeService';

const imageService = {
  /**
   * Upload and get image URL
   * @param {File} file - Image file to upload
   * @returns {Promise<string>} Image URL
   */
  uploadImage: async (file) => {
    try {
      // Validate file type
      if (!imageService.isValidImageType(file)) {
        throw new Error('Please select a valid image file (PNG, JPG, JPEG, GIF, WebP)');
      }

      // Validate file size (max 5MB)
      if (!imageService.isValidFileSize(file, 5)) {
        throw new Error('Image file size should be less than 5MB');
      }

      const result = await episodeService.uploadImage(file);
      return result.url || result.image_url; // Handle different response formats
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  },

  /**
   * Validate image file type
   * @param {File} file - File to validate
   * @returns {boolean} Whether file is valid image type
   */
  isValidImageType: (file) => {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  },

  /**
   * Validate file size
   * @param {File} file - File to validate
   * @param {number} maxSizeMB - Maximum size in MB
   * @returns {boolean} Whether file size is valid
   */
  isValidFileSize: (file, maxSizeMB) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  /**
   * Create preview URL for image file
   * @param {File} file - Image file
   * @returns {string} Preview URL
   */
  createPreviewUrl: (file) => {
    return URL.createObjectURL(file);
  },

  /**
   * Revoke preview URL to free memory
   * @param {string} url - Preview URL to revoke
   */
  revokePreviewUrl: (url) => {
    URL.revokeObjectURL(url);
  },

  /**
   * Compress image if needed (basic implementation)
   * @param {File} file - Image file to compress
   * @param {number} quality - Compression quality (0-1)
   * @returns {Promise<File>} Compressed image file
   */
  compressImage: async (file, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = imageService.createPreviewUrl(file);
    });
  }
};

export default imageService;
