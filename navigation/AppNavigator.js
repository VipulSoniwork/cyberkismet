import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';

// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main app screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchScreen from '../screens/MatchScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

// Loading component
const DefaultLoading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <ActivityIndicator size="large" color="#ff4d67" />
    <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>Loading...</Text>
  </View>
);

const AuthStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
        headerTitleStyle: { 
          color: '#333',
          fontWeight: 'bold',
        },
        contentStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen} 
        options={{ 
          title: 'Complete Your Profile',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{ 
        headerShown: true,
        headerTitleStyle: { 
          color: '#333',
          fontWeight: 'bold',
        },
        contentStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Discover' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="Match" 
        component={MatchScreen} 
        options={{ title: 'Your Match!' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen} 
        options={{ title: 'Complete Your Profile' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={{ title: 'Messages' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={({ route }) => {
          const name = route?.params?.name ?? 'Chat';
          return {
            title: name,
            headerBackTitle: 'Messages',
          };
        }}
        
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Find People' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = ({ fallback = <DefaultLoading /> }) => {
  const { isAuthenticated, user, isInitialized, loading } = useAuth();
  
  // Check if profile needs to be completed
  const isProfileIncomplete = user && (
    !user.bio || 
    !user.age || 
    !user.location || 
    !user.interests || 
    user.interests.length === 0
  );
  
  console.log("Auth state:", { isAuthenticated, user, isInitialized, loading });

  // Show loading screen while initializing
  if (!isInitialized || loading) {
    return fallback;
  }

  // Determine which stack to show
  if (!isAuthenticated) {
    return <AuthStack />;
  } else if (isProfileIncomplete) {
    return <OnboardingStack />;
  } else {
    return <AppStack />;
  }
};

export default AppNavigator; 