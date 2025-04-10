import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function TestApp() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4">
        <View className="bg-primary p-6 rounded-xl">
          <Text className="text-white text-lg font-bold">
            NativeWind Test
          </Text>
        </View>
        <Text className="text-dark mt-4">
          If you can see a pink box with white text, NativeWind is working!
        </Text>
      </View>
    </SafeAreaView>
  );
} 