import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  const password = watch('password');

  const handleRegister = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const success = await signUp(data.name, data.email, data.password);
      if (!success) {
        setError('Could not create account. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-6 justify-center">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-primary">Create Account</Text>
          <Text className="text-gray-500 text-center mt-2">Join our community and find your perfect match</Text>
        </View>
        
        {error ? (
          <View className="bg-red-100 p-3 rounded-xl mb-4">
            <Text className="text-error text-center">{error}</Text>
          </View>
        ) : null}
        
        <Input 
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter your full name"
          rules={{ 
            required: 'Name is required',
          }}
        />
        
        <Input 
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            }
          }}
        />
        
        <Input 
          name="password"
          control={control}
          label="Password"
          placeholder="Create a password"
          secureTextEntry
          rules={{ 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            }
          }}
        />
        
        <Input 
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          rules={{ 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          }}
        />
        
        <Button 
          title="Create Account" 
          onPress={handleSubmit(handleRegister)}
          loading={loading}
          fullWidth
          className="mt-4"
        />
        
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen; 