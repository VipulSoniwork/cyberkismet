import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import InterestSelector from '../components/InterestSelector';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg');
  const [interests, setInterests] = useState(user?.interests || []);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      age: user?.age ? String(user.age) : '',
      location: user?.location || '',
      bio: user?.bio || '',
      occupation: user?.occupation || '',
      education: user?.education || '',
    }
  });

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to make this work!",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const handleChangePhoto = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error selecting your photo. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data with new profile image if changed
      const updatedUser = {
        ...user,
        ...data,
        age: parseInt(data.age),
        profilePicture: profileImage,
        interests: interests
      };
      
      // In a real app, this would update the user profile in the backend
      // For now, we'll just update the local state
      updateUser(updatedUser);
      
      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error updating your profile. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="items-center mb-6">
          <TouchableOpacity 
            onPress={handleChangePhoto}
            className="relative"
          >
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
              <Text className="text-white text-xs">Edit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-semibold text-dark mb-4">Edit Your Profile</Text>
        
        <Input 
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter your full name"
          rules={{ required: 'Name is required' }}
        />
        
        <Input 
          name="age"
          control={control}
          label="Age"
          placeholder="Enter your age"
          keyboardType="numeric"
          rules={{ 
            required: 'Age is required',
            pattern: {
              value: /^\d+$/,
              message: 'Age must be a number',
            }
          }}
        />
        
        <Input 
          name="location"
          control={control}
          label="Location"
          placeholder="Enter your location"
          rules={{ required: 'Location is required' }}
        />
        
        <Input 
          name="occupation"
          control={control}
          label="Occupation"
          placeholder="What do you do?"
        />
        
        <Input 
          name="education"
          control={control}
          label="Education"
          placeholder="Your educational background"
        />
        
        <Input 
          name="bio"
          control={control}
          label="Bio"
          placeholder="Tell us about yourself"
          rules={{ required: 'Bio is required' }}
          isTextArea
        />
        
        <View className="mb-4">
          <Text className="text-dark font-semibold mb-2">Your Interests</Text>
          <Text className="text-gray-500 mb-2">
            Select up to 5 interests to show on your profile
          </Text>
          
          <InterestSelector 
            selectedInterests={interests}
            onChange={setInterests}
            maxSelections={5}
          />
        </View>
        
        <Button 
          title="Save Changes" 
          onPress={handleSubmit(handleUpdateProfile)}
          loading={loading}
          fullWidth
          className="mt-4"
        />
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mt-4 items-center"
        >
          <Text className="text-gray-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen; 