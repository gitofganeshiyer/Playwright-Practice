/**
 * Test Configuration and Constants
 */

// Test credentials
export const TEST_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Test URLs
export const TEST_URLS = {
  loginPage: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  homePage: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
};

// Timeout constants (in milliseconds)
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  EXTRA_LONG: 15000,
};

// Error messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Invalid credentials',
  PAGE_NOT_LOADED: 'Page failed to load',
  ELEMENT_NOT_FOUND: 'Element not found',
  TIMEOUT: 'Operation timed out',
};

// Test data
export const TEST_DATA = {
  employeeSearchValue: 'admin',
};
