import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import ProfileCard from '../components/ProfileCard';
import Button from '../components/Button';

// Mock data for profiles
const MOCK_PROFILES = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    location: 'New York',
    bio: 'Travel enthusiast and coffee lover. Looking for someone to share adventures with.',
    profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
    interests: ['Travel', 'Coffee', 'Photography'],
  },
  {
    id: '2',
    name: 'Michael',
    age: 32,
    location: 'Los Angeles',
    bio: 'Fitness trainer by day, chef by night. Love hiking and exploring new restaurants.',
    profilePicture: 'https://randomuser.me/api/portraits/men/86.jpg',
    interests: ['Fitness', 'Cooking', 'Hiking'],
  },
  {
    id: '3',
    name: 'Jessica',
    age: 26,
    location: 'Chicago',
    bio: 'Book nerd and dog lover. Looking for someone to have deep conversations with.',
    profilePicture: 'https://randomuser.me/api/portraits/women/56.jpg',
    interests: ['Reading', 'Dogs', 'Movies'],
  },
];

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfiles(MOCK_PROFILES);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProfiles();
    setRefreshing(false);
  };

  const handleViewProfile = (profile) => {
    navigation.navigate('Profile', { profile });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="pt-2 pb-4 px-4 border-b border-gray">
        <Text className="text-lg font-semibold text-dark">Welcome, {user?.name}</Text>
        <Text className="text-gray-500">Find your perfect match today</Text>
      </View>

      <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
        <Text className="text-base font-medium">Recommended for you</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          className="flex-row items-center"
        >
          <Text className="text-primary font-medium mr-1">Find People</Text>
          <View className="w-5 h-5 items-center justify-center">
            <Text className="text-primary">→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {loading && !refreshing ? (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500">Loading profiles...</Text>
          </View>
        ) : profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileCard
              key={profile.id}
              user={profile}
              onPress={() => handleViewProfile(profile)}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-dark text-lg mb-4">No profiles available</Text>
            <Button 
              title="Refresh" 
              onPress={handleRefresh} 
              variant="primary"
            />
          </View>
        )}
      </ScrollView>

      <View className="p-4 border-t border-gray">
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          className="pb-2"
        >
          <Text className="text-primary font-medium">Edit Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatList')}
          className="pb-2"
        >
          <Text className="text-primary font-medium">Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
        >
          <Text className="text-gray-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen; 