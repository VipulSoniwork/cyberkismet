import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleLogin = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const success = await signIn(data.email, data.password);
      if (!success) {
        setError('Invalid email or password');
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
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-primary">Dating App</Text>
          <Text className="text-gray-500 text-center mt-2">Find your perfect match</Text>
        </View>
        
        {error ? (
          <View className="bg-red-100 p-3 rounded-xl mb-4">
            <Text className="text-error text-center">{error}</Text>
          </View>
        ) : null}
        
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
          placeholder="Enter your password"
          secureTextEntry
          rules={{ 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            }
          }}
        />
        
        <TouchableOpacity 
          onPress={() => {/* Handle forgot password */}}
          className="my-2"
        >
          <Text className="text-primary text-right">Forgot password?</Text>
        </TouchableOpacity>
        
        <Button 
          title="Sign In" 
          onPress={handleSubmit(handleLogin)}
          loading={loading}
          fullWidth
          className="mt-4"
        />
        
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen; 