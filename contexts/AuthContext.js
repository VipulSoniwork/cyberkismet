import { createContext, useState, useContext, useEffect } from 'react';
import { saveUserData, getUserData, saveAuthToken, getAuthToken, clearAllData } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Load user data from storage on app start
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const storedUser = await getUserData();
        const storedToken = await getAuthToken();
        
        if (storedUser && storedToken) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    // Add a small delay to ensure proper initialization on Android
    setTimeout(() => {
      loadUserData();
    }, 300);
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just set a mock user
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: email,
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        age: 28,
        location: 'New York, NY',
        bio: 'Software developer who loves hiking and photography.',
        interests: ['hiking', 'photography', 'coding'],
      };
      
      // Save user data and token to storage
      await saveUserData(mockUser);
      await saveAuthToken('mock-token-123');
      
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: '1',
        name: name,
        email: email,
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        age: null,
        location: '',
        bio: '',
      };
      
      // Save user data and token to storage
      await saveUserData(newUser);
      await saveAuthToken('mock-token-123');
      
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear user data and token from storage
      await clearAllData();
      
      setUser(null);
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      // Save updated user data to storage
      await saveUserData(updatedUser);
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isInitialized,
        error,
        signIn,
        signUp,
        signOut,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 