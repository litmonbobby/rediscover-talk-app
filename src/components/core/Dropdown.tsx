import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { colors, typography } from '../../constants';

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  selected?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: object;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  selected,
  onChange,
  disabled = false,
  error,
  helperText,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === selected);

  const handleSelect = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        style={[
          styles.dropdown,
          error && styles.dropdownError,
          disabled && styles.dropdownDisabled,
        ]}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectedText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value)}
                  style={[
                    styles.option,
                    item.value === selected && styles.optionSelected,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selected && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownError: {
    borderColor: colors.error,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  selectedText: {
    ...typography.body,
    color: colors.text.inverse,
    flex: 1,
  },
  placeholderText: {
    color: colors.ui.disabled,
  },
  arrow: {
    color: colors.text.inverse,
    fontSize: 12,
    marginLeft: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: 400,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  optionSelected: {
    backgroundColor: colors.primary[100],
  },
  optionText: {
    ...typography.body,
    color: colors.text.inverse,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  checkmark: {
    color: colors.primary.DEFAULT,
    fontSize: 18,
    marginLeft: 12,
  },
});
