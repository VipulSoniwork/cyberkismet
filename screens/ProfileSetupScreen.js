import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import InterestSelector from '../components/InterestSelector';
import * as ImagePicker from 'expo-image-picker';

const ProfileSetupScreen = ({ navigation, route }) => {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg');
  const [interests, setInterests] = useState(user?.interests || []);
  
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      name: user?.name || '',
      age: user?.age ? String(user.age) : '',
      location: user?.location || '',
      bio: user?.bio || '',
      occupation: user?.occupation || '',
      education: user?.education || '',
    }
  });
  
  // Request camera permissions
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

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmitProfile();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitProfile = async () => {
    setLoading(true);
    try {
      const formData = getValues();
      
      // Create updated user object
      const updatedUser = {
        ...user,
        ...formData,
        age: parseInt(formData.age),
        profilePicture: profileImage,
        interests: interests,
      };
      
      // Update user in context (and storage)
      await updateUser(updatedUser);
      
      Alert.alert(
        "Profile Updated",
        "Your profile has been set up successfully!",
        [{ text: "OK", onPress: () => navigation.navigate('Home') }]
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

  const renderStep1 = () => (
    <View>
      <Text className="text-xl font-semibold text-dark mb-4">Basic Information</Text>
      
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
        placeholder="City, State/Country"
        rules={{ required: 'Location is required' }}
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="text-xl font-semibold text-dark mb-4">About You</Text>
      
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
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text className="text-xl font-semibold text-dark mb-4">Profile Picture & Interests</Text>
      
      <View className="items-center mb-6">
        <TouchableOpacity 
          onPress={handleChangePhoto}
          className="relative"
        >
          <Image
            source={{ uri: profileImage }}
            className="w-32 h-32 rounded-full"
          />
          <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
            <Text className="text-white text-xs">Edit</Text>
          </View>
        </TouchableOpacity>
        
        <Text className="text-gray-500 mt-2">
          Tap to change your profile picture
        </Text>
      </View>
      
      <Text className="text-dark font-semibold mb-2">Select Your Interests</Text>
      <InterestSelector 
        selectedInterests={interests}
        onChange={setInterests}
        maxSelections={5}
      />
    </View>
  );

  const renderStepIndicator = () => (
    <View className="flex-row justify-between mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <View 
          key={stepNumber} 
          className="flex-1 items-center"
        >
          <View 
            className={`w-8 h-8 rounded-full ${
              stepNumber === step
                ? 'bg-primary'
                : stepNumber < step
                  ? 'bg-lightGray border border-primary'
                  : 'bg-lightGray'
            } items-center justify-center`}
          >
            <Text
              className={`${
                stepNumber === step ? 'text-white' : 'text-dark'
              }`}
            >
              {stepNumber}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {renderStepIndicator()}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        <View className="flex-row mt-8">
          {step > 1 && (
            <Button 
              title="Back" 
              onPress={handlePreviousStep}
              variant="outline"
              className="flex-1 mr-2"
            />
          )}
          
          <Button 
            title={step === 3 ? "Finish" : "Next"} 
            onPress={handleNextStep}
            loading={loading}
            className={`flex-1 ${step > 1 ? 'ml-2' : ''}`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSetupScreen; 