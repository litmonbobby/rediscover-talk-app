import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { colors, typography } from '../../constants';

interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: object;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.ui.disabled}
          {...textInputProps}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: '#FFFFFF',
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.inverse,
    paddingVertical: 14,
  },
  leftIcon: {
    marginRight: 12,
    width: 20,
    height: 20,
  },
  rightIcon: {
    marginLeft: 12,
    width: 20,
    height: 20,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
  helperText: {
    ...typography.caption,
    color: colors.text.inverse,
    opacity: 0.7,
    marginTop: 4,
  },
});
