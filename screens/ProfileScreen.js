import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

const ProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params || {};

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-dark text-lg">Profile not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()}
          variant="primary"
          className="mt-4"
        />
      </View>
    );
  }

  const handleMatchRequest = () => {
    // In a real app, this would send a match request to the backend
    // For demo, we'll navigate to a match screen
    navigation.navigate('Match', { profile });
  };

  // Display a formatted list of interests
  const renderInterests = () => {
    if (!profile.interests || profile.interests.length === 0) {
      return null;
    }

    return (
      <View className="mb-6">
        <Text className="text-dark text-lg font-semibold mb-2">Interests</Text>
        <View className="flex-row flex-wrap">
          {profile.interests.map((interest, index) => (
            <View 
              key={interest.id || index} 
              className="bg-secondary rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-primary">{interest.label || interest}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          source={{ uri: profile.profilePicture }}
          className="w-full h-96"
          resizeMode="cover"
        />
        
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
          <Text className="text-white text-2xl font-semibold">
            {profile.name}, {profile.age}
          </Text>
          <Text className="text-white opacity-80">
            {profile.location}
          </Text>
        </View>
      </View>
      
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-dark text-lg font-semibold mb-2">About</Text>
          <Text className="text-dark">{profile.bio}</Text>
        </View>
        
        {profile.occupation && (
          <View className="mb-6">
            <Text className="text-dark text-lg font-semibold mb-2">Occupation</Text>
            <Text className="text-dark">{profile.occupation}</Text>
          </View>
        )}
        
        {profile.education && (
          <View className="mb-6">
            <Text className="text-dark text-lg font-semibold mb-2">Education</Text>
            <Text className="text-dark">{profile.education}</Text>
          </View>
        )}
        
        {renderInterests()}
        
        <Button
          title="Request Match"
          onPress={handleMatchRequest}
          fullWidth
          className="mt-4"
        />
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mt-4 items-center"
        >
          <Text className="text-gray-500">Back to Discover</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen; 