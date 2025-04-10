import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const MatchScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { profile } = route.params || {};

  if (!profile) {
    navigation.replace('Home');
    return null;
  }

  const handleStartChat = () => {
    // In a real app, this would open a chat
    // For now, let's just navigate back to home
    navigation.navigate('Home');
  };

  const handleDismiss = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-primary bg-opacity-95 items-center justify-center p-6">
      <View className="items-center">
        <Text className="text-white text-3xl font-bold mb-8">It's a Match!</Text>
        
        <View className="flex-row justify-center mb-10">
          <View className="items-center mr-4">
            <Image
              source={{ uri: user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg' }}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <Text className="text-white mt-2 font-semibold">{user?.name}</Text>
          </View>
          
          <View className="items-center ml-4">
            <Image
              source={{ uri: profile.profilePicture }}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <Text className="text-white mt-2 font-semibold">{profile.name}</Text>
          </View>
        </View>
        
        <Text className="text-white text-center mb-10">
          {user?.name} and {profile.name} have both expressed interest in each other. Now you can start chatting!
        </Text>
        
        <Button
          title="Send a Message"
          onPress={handleStartChat}
          variant="secondary"
          fullWidth
          className="mb-4"
        />
        
        <TouchableOpacity onPress={handleDismiss}>
          <Text className="text-white opacity-80">Keep Browsing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchScreen; 