// This file ensures NativeWind styles are properly processed
import { StyleSheet } from 'react-native';

// Prevent StyleSheet from throwing errors for NativeWind's className props
const originalCreate = StyleSheet.create;
StyleSheet.create = function (styles) {
  return originalCreate(styles);
}; 