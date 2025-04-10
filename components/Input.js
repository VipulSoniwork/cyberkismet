import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  control,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  rules = {},
  defaultValue = '',
  className = '',
  isTextArea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-dark font-medium mb-1 text-sm">{label}</Text>
      )}
      
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View className={`relative flex-row items-center overflow-hidden ${error ? 'border-error' : isFocused ? 'border-primary' : 'border-gray'} border rounded-xl`}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                onFocus={() => setIsFocused(true)}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                keyboardType={keyboardType}
                className={`p-3 text-dark flex-1 ${isTextArea ? 'h-24' : ''}`}
                multiline={isTextArea}
                accessible={true}
                accessibilityLabel={label || placeholder}
                textAlignVertical={isTextArea ? 'top' : 'center'}
              />
              
              {secureTextEntry && (
                <TouchableOpacity 
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="px-3"
                  accessible={true}
                  accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
                  accessibilityRole="button"
                >
                  <Text className="text-primary">{isPasswordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {error && (
              <Text className="text-error text-xs mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default Input; 