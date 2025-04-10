import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, LogBox, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Suppress specific LogBox warnings that are known issues with dependencies
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  'NativeBase: The contrast ratio',
  'NativeWind',
  'Failed prop type',
  'Cannot update a component'
]);

const Stack = createNativeStackNavigator();

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <ActivityIndicator size="large" color="#ff4d67" />
    <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>Loading...</Text>
  </View>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ChatProvider>
            <NavigationContainer>
              <AppNavigator fallback={<LoadingScreen />} />
              <StatusBar style="auto" />
            </NavigationContainer>
          </ChatProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
