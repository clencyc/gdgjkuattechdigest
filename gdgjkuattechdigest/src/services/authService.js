// Use import.meta.env for Vite
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

const authService = {
  /**
   * Check if user is authenticated as admin
   * @returns {boolean} Whether user has admin privileges
   */
  isAdmin: () => {
    return !!ADMIN_TOKEN;
  },

  /**
   * Get admin token
   * @returns {string|null} Admin token or null
   */
  getAdminToken: () => {
    return ADMIN_TOKEN || null;
  },

  /**
   * Simulate admin login (since it's token-based)
   * @param {string} token - Admin token to verify
   * @returns {boolean} Whether token is valid
   */
  login: (token) => {
    return token === ADMIN_TOKEN;
  },

  /**
   * Logout admin user
   */
  logout: () => {
    // Since auth is token-based, we could clear any stored state
    // This is mainly for UI state management
    return true;
  },

  /**
   * Validate admin token format
   * @param {string} token - Token to validate
   * @returns {boolean} Whether token has valid format
   */
  validateTokenFormat: (token) => {
    return typeof token === 'string' && token.length > 0;
  }
};

export default authService;