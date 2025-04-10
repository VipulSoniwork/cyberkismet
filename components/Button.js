import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}) => {
  const baseStyle = 'py-3 px-6 rounded-xl items-center justify-center';
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'border border-primary',
    text: '',
  };
  
  const textStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-dark font-semibold',
    outline: 'text-primary font-semibold',
    text: 'text-primary font-semibold',
  };

  const disabledStyle = disabled ? 'opacity-50' : '';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantStyles[variant]} ${disabledStyle} ${widthStyle} ${className}`}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#FF4D67'} />
      ) : (
        <Text className={`${textStyles[variant]} text-base`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button; 