import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
}) => {
  const buttonStyles = [
    styles.button,
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    variant === 'text' && styles.textVariantText,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.primary.DEFAULT} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && <Text style={textStyles}>{title}</Text>}
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={buttonStyles}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[buttonStyles, styles.secondary]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  if (variant === 'text') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[buttonStyles, styles.textVariant]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // Icon variant
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[buttonStyles, styles.iconButton]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    ...typography.button,
    color: colors.text.primary,
    textAlign: 'center',
  },

  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 14,
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  mediumText: {
    fontSize: 16,
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  largeText: {
    fontSize: 18,
  },

  // Variants
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  textVariant: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textVariantText: {
    color: colors.primary.DEFAULT,
  },
  iconButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});
