import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  NOTIFICATIONS: 'notifications',
};

// Default user data for when storage fails
const DEFAULT_USER_DATA = null;
const DEFAULT_AUTH_TOKEN = null;

/**
 * Save data to AsyncStorage with retry
 * @param {string} key - The key to store the data under
 * @param {any} value - The data to store
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveData = async (key, value, retries = 2) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving data to AsyncStorage (${key}):`, error);
    if (retries > 0) {
      // Wait a bit and retry
      await new Promise(resolve => setTimeout(resolve, 200));
      return saveData(key, value, retries - 1);
    }
    return false;
  }
};

/**
 * Get data from AsyncStorage with retry
 * @param {string} key - The key to retrieve data from
 * @returns {Promise<any>} - The retrieved data or null if not found
 */
export const getData = async (key, retries = 2) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting data from AsyncStorage (${key}):`, error);
    if (retries > 0) {
      // Wait a bit and retry
      await new Promise(resolve => setTimeout(resolve, 200));
      return getData(key, retries - 1);
    }
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - The key to remove data from
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data from AsyncStorage:', error);
    return false;
  }
};

/**
 * Save user preferences
 * @param {Object} preferences - The user preferences to save
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveUserPreferences = async (preferences) => {
  return saveData(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

/**
 * Get user preferences
 * @returns {Promise<Object>} - The user preferences or null if not found
 */
export const getUserPreferences = async () => {
  return getData(STORAGE_KEYS.USER_PREFERENCES);
};

/**
 * Save user data
 * @param {Object} userData - The user data to save
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveUserData = async (userData) => {
  return saveData(STORAGE_KEYS.USER_DATA, userData);
};

/**
 * Get user data with fallback
 * @returns {Promise<Object>} - The user data or default if not found
 */
export const getUserData = async () => {
  try {
    const userData = await getData(STORAGE_KEYS.USER_DATA);
    return userData || DEFAULT_USER_DATA;
  } catch (error) {
    console.error('Error in getUserData:', error);
    return DEFAULT_USER_DATA;
  }
};

/**
 * Save auth token
 * @param {string} token - The auth token to save
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveAuthToken = async (token) => {
  return saveData(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Get auth token with fallback
 * @returns {Promise<string>} - The auth token or default if not found
 */
export const getAuthToken = async () => {
  try {
    const token = await getData(STORAGE_KEYS.AUTH_TOKEN);
    return token || DEFAULT_AUTH_TOKEN;
  } catch (error) {
    console.error('Error in getAuthToken:', error);
    return DEFAULT_AUTH_TOKEN;
  }
};

/**
 * Save theme preference
 * @param {string} theme - The theme to save ('light' or 'dark')
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveTheme = async (theme) => {
  return saveData(STORAGE_KEYS.THEME, theme);
};

/**
 * Get theme preference
 * @returns {Promise<string>} - The theme or 'light' if not found
 */
export const getTheme = async () => {
  const theme = await getData(STORAGE_KEYS.THEME);
  return theme || 'light';
};

/**
 * Save notification settings
 * @param {Object} settings - The notification settings to save
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const saveNotificationSettings = async (settings) => {
  return saveData(STORAGE_KEYS.NOTIFICATIONS, settings);
};

/**
 * Get notification settings
 * @returns {Promise<Object>} - The notification settings or default settings if not found
 */
export const getNotificationSettings = async () => {
  const settings = await getData(STORAGE_KEYS.NOTIFICATIONS);
  return settings || {
    matchNotifications: true,
    messageNotifications: true,
    emailNotifications: false,
  };
};

/**
 * Clear all data from AsyncStorage
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    // Try individual clear as fallback
    try {
      const keys = Object.values(STORAGE_KEYS);
      for (const key of keys) {
        await AsyncStorage.removeItem(key);
      }
      return true;
    } catch (innerError) {
      console.error('Error in individual clear:', innerError);
      return false;
    }
  }
};

export default {
  saveData,
  getData,
  removeData,
  saveUserPreferences,
  getUserPreferences,
  saveUserData,
  getUserData,
  saveAuthToken,
  getAuthToken,
  saveTheme,
  getTheme,
  saveNotificationSettings,
  getNotificationSettings,
  clearAllData,
}; 