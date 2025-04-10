import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { saveNotificationSettings, getNotificationSettings, saveTheme, getTheme } from '../utils/storage';

const SettingsScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Settings state
  const [notifications, setNotifications] = useState({
    matchNotifications: true,
    messageNotifications: true,
    emailNotifications: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load settings from storage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedNotifications = await getNotificationSettings();
        const storedTheme = await getTheme();
        
        if (storedNotifications) {
          setNotifications(storedNotifications);
        }
        
        if (storedTheme) {
          setDarkMode(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save notification settings when they change
  const handleNotificationChange = async (key, value) => {
    const updatedSettings = {
      ...notifications,
      [key]: value,
    };
    
    setNotifications(updatedSettings);
    await saveNotificationSettings(updatedSettings);
  };
  
  // Save theme when it changes
  const handleThemeChange = async (value) => {
    setDarkMode(value);
    await saveTheme(value ? 'dark' : 'light');
  };
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            // In a real app, this would call an API to delete the account
            Alert.alert('Account Deletion', 'This feature is not implemented in the demo.');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const renderSettingItem = (title, value, onValueChange) => (
    <View className="flex-row justify-between items-center py-3 border-b border-gray">
      <Text className="text-dark">{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E5E5', true: '#FFCCD5' }}
        thumbColor={value ? '#FF4D67' : '#f4f3f4'}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xl font-semibold text-dark mb-4">Settings</Text>
        
        <View className="bg-lightGray rounded-xl p-4 mb-6">
          <Text className="text-dark font-medium mb-2">Account</Text>
          <Text className="text-gray-500 mb-1">Name: {user?.name}</Text>
          <Text className="text-gray-500">Email: {user?.email}</Text>
        </View>
        
        <View className="mb-6">
          <Text className="text-dark font-medium mb-2">Preferences</Text>
          
          {renderSettingItem('Match Notifications', notifications.matchNotifications, 
            (value) => handleNotificationChange('matchNotifications', value))}
          
          {renderSettingItem('Message Notifications', notifications.messageNotifications, 
            (value) => handleNotificationChange('messageNotifications', value))}
          
          {renderSettingItem('Email Notifications', notifications.emailNotifications, 
            (value) => handleNotificationChange('emailNotifications', value))}
          
          {renderSettingItem('Dark Mode', darkMode, handleThemeChange)}
          {renderSettingItem('Location Services', locationEnabled, setLocationEnabled)}
          
          <TouchableOpacity 
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
            className="py-3 border-b border-gray"
          >
            <Text className="text-dark">Privacy Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
            className="py-3 border-b border-gray"
          >
            <Text className="text-dark">Match Preferences</Text>
          </TouchableOpacity>
        </View>
        
        <View className="mb-6">
          <Text className="text-dark font-medium mb-2">Help & Support</Text>
          
          <TouchableOpacity 
            className="py-3 border-b border-gray"
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
          >
            <Text className="text-dark">FAQs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-3 border-b border-gray"
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
          >
            <Text className="text-dark">Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-3 border-b border-gray"
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
          >
            <Text className="text-dark">Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-3 border-b border-gray"
            onPress={() => Alert.alert('Feature Coming Soon', 'This feature will be available in the next update.')}
          >
            <Text className="text-dark">Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          title="Log Out" 
          onPress={handleLogout}
          loading={loading}
          variant="outline"
          fullWidth
          className="mb-4"
        />
        
        <Button 
          title="Delete Account" 
          onPress={handleDeleteAccount}
          variant="danger"
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;