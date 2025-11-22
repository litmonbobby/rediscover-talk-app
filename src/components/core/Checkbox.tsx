import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  containerStyle?: object;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => !disabled && onChange(!checked)}
        style={styles.checkboxContainer}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checkboxChecked,
            error && styles.checkboxError,
            disabled && styles.checkboxDisabled,
          ]}
        >
          {checked && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>

        {label && (
          <Text
            style={[
              styles.label,
              disabled && styles.labelDisabled,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.ui.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  checkboxError: {
    borderColor: colors.error,
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
