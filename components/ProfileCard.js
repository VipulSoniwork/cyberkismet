import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileCard = ({
  user,
  onPress,
  matched = false,
  className = '',
}) => {
  const {
    name,
    age,
    location,
    bio,
    profilePicture,
  } = user;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-xl shadow-sm overflow-hidden mb-4 ${className}`}
      accessible={true}
      accessibilityLabel={`${name}'s profile`}
      accessibilityRole="button"
    >
      <View className="relative">
        <Image
          source={{ uri: profilePicture }}
          className="w-full h-72"
          resizeMode="cover"
          accessible={true}
          accessibilityLabel={`${name}'s profile picture`}
        />
        
        {matched && (
          <View className="absolute top-3 right-3 bg-primary rounded-full px-3 py-1">
            <Text className="text-white font-medium text-xs">Matched</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold text-dark">{name}, {age}</Text>
          <Text className="text-gray-500 text-sm">{location}</Text>
        </View>
        
        {bio && (
          <Text className="text-dark" numberOfLines={2}>{bio}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard; 