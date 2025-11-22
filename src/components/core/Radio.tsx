import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants';

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioProps {
  options: RadioOption[];
  selected: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  error?: string;
  containerStyle?: object;
}

export const Radio: React.FC<RadioProps> = ({
  options,
  selected,
  onChange,
  disabled = false,
  error,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => !disabled && onChange(option.value)}
          style={styles.radioContainer}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.radio,
              error && styles.radioError,
              disabled && styles.radioDisabled,
            ]}
          >
            {selected === option.value && (
              <View style={styles.radioInner} />
            )}
          </View>

          <Text
            style={[
              styles.label,
              disabled && styles.labelDisabled,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.DEFAULT,
  },
  radioError: {
    borderColor: colors.error,
  },
  radioDisabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.body,
    color: colors.text.inverse,
    marginLeft: 12,
    flex: 1,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
    marginLeft: 36,
  },
});
