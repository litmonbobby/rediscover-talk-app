/**
 * Daily Reminder Screen - Notification settings
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

interface Reminder {
  id: string;
  title: string;
  time: string;
  enabled: boolean;
}

// Time options for picker
const TIME_OPTIONS = [
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
];

// Preset reminder suggestions
const REMINDER_PRESETS = [
  { title: 'Morning Check-in', icon: '🌅' },
  { title: 'Meditation Break', icon: '🧘' },
  { title: 'Gratitude Moment', icon: '🙏' },
  { title: 'Breathing Exercise', icon: '🫁' },
  { title: 'Journal Entry', icon: '📔' },
  { title: 'Stretch Break', icon: '🤸' },
  { title: 'Hydration Check', icon: '💧' },
  { title: 'Bedtime Wind-down', icon: '🌙' },
];

export const DailyReminderScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Morning Check-in', time: '8:00 AM', enabled: true },
    { id: '2', title: 'Afternoon Meditation', time: '12:30 PM', enabled: false },
    { id: '3', title: 'Evening Journal', time: '8:00 PM', enabled: true },
    { id: '4', title: 'Bedtime Wind-down', time: '10:00 PM', enabled: false },
  ]);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('8:00 AM');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const openAddModal = () => {
    setEditingReminder(null);
    setNewReminderTitle('');
    setSelectedTime('8:00 AM');
    setIsModalVisible(true);
  };

  const openEditModal = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setNewReminderTitle(reminder.title);
    setSelectedTime(reminder.time);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingReminder(null);
    setNewReminderTitle('');
    setShowTimePicker(false);
  };

  const saveReminder = () => {
    if (!newReminderTitle.trim()) {
      Alert.alert('Title Required', 'Please enter a title for your reminder.');
      return;
    }

    if (editingReminder) {
      // Update existing reminder
      setReminders(prev =>
        prev.map(r =>
          r.id === editingReminder.id
            ? { ...r, title: newReminderTitle.trim(), time: selectedTime }
            : r
        )
      );
    } else {
      // Add new reminder
      const newReminder: Reminder = {
        id: `reminder_${Date.now()}`,
        title: newReminderTitle.trim(),
        time: selectedTime,
        enabled: true,
      };
      setReminders(prev => [...prev, newReminder]);
    }

    closeModal();
  };

  const deleteReminder = (id: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setReminders(prev => prev.filter(r => r.id !== id));
          },
        },
      ]
    );
  };

  const selectPreset = (preset: { title: string; icon: string }) => {
    setNewReminderTitle(preset.title);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Daily Reminders</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          Set reminders to help you maintain healthy habits throughout the day.
        </Text>

        {reminders.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.background.card }]}>
            <Text style={styles.emptyEmoji}>🔔</Text>
            <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
              No reminders yet. Tap + to add your first reminder.
            </Text>
          </View>
        ) : (
          reminders.map((reminder) => (
            <TouchableOpacity
              key={reminder.id}
              style={[styles.reminderCard, { backgroundColor: colors.background.card }]}
              onPress={() => openEditModal(reminder)}
              onLongPress={() => deleteReminder(reminder.id)}
            >
              <View style={styles.reminderInfo}>
                <Text style={[styles.reminderTitle, { color: colors.text.primary }]}>
                  {reminder.title}
                </Text>
                <Text style={[styles.reminderTime, { color: colors.text.secondary }]}>
                  {reminder.time}
                </Text>
              </View>
              <Switch
                value={reminder.enabled}
                onValueChange={() => toggleReminder(reminder.id)}
                trackColor={{ false: '#E0E0E0', true: 'rgba(158,181,103,0.4)' }}
                thumbColor={reminder.enabled ? '#9EB567' : '#f4f3f4'}
              />
            </TouchableOpacity>
          ))
        )}

        <View style={[styles.tipCard, { backgroundColor: 'rgba(158,181,103,0.1)' }]}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={[styles.tipText, { color: colors.text.secondary }]}>
            Tap a reminder to edit it. Long press to delete.
          </Text>
        </View>
      </ScrollView>

      {/* Add/Edit Reminder Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={[styles.modalCancel, { color: colors.text.secondary }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                {editingReminder ? 'Edit Reminder' : 'New Reminder'}
              </Text>
              <TouchableOpacity onPress={saveReminder}>
                <Text style={styles.modalSave}>Save</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Title Input */}
              <Text style={[styles.inputLabel, { color: colors.text.secondary }]}>Title</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: colors.background.card,
                    color: colors.text.primary,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter reminder title"
                placeholderTextColor={colors.text.tertiary}
                value={newReminderTitle}
                onChangeText={setNewReminderTitle}
                autoFocus={true}
              />

              {/* Preset Suggestions */}
              {!editingReminder && (
                <>
                  <Text style={[styles.inputLabel, { color: colors.text.secondary, marginTop: 16 }]}>
                    Quick Suggestions
                  </Text>
                  <View style={styles.presetsGrid}>
                    {REMINDER_PRESETS.map((preset, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.presetChip,
                          {
                            backgroundColor:
                              newReminderTitle === preset.title
                                ? '#9EB567'
                                : colors.background.card,
                          },
                        ]}
                        onPress={() => selectPreset(preset)}
                      >
                        <Text style={styles.presetIcon}>{preset.icon}</Text>
                        <Text
                          style={[
                            styles.presetText,
                            {
                              color:
                                newReminderTitle === preset.title ? '#FFFFFF' : colors.text.primary,
                            },
                          ]}
                          numberOfLines={1}
                        >
                          {preset.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {/* Time Picker */}
              <Text style={[styles.inputLabel, { color: colors.text.secondary, marginTop: 16 }]}>
                Time
              </Text>
              <TouchableOpacity
                style={[
                  styles.timeSelector,
                  { backgroundColor: colors.background.card, borderColor: colors.border },
                ]}
                onPress={() => setShowTimePicker(!showTimePicker)}
              >
                <Text style={[styles.timeSelectorText, { color: colors.text.primary }]}>
                  {selectedTime}
                </Text>
                <Text style={[styles.timeSelectorArrow, { color: colors.text.tertiary }]}>
                  {showTimePicker ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <View style={[styles.timePickerGrid, { backgroundColor: colors.background.card }]}>
                  {TIME_OPTIONS.map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeOption,
                        selectedTime === time && styles.timeOptionSelected,
                      ]}
                      onPress={() => {
                        setSelectedTime(time);
                        setShowTimePicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.timeOptionText,
                          { color: selectedTime === time ? '#FFFFFF' : colors.text.primary },
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Delete Button (for edit mode) */}
              {editingReminder && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    closeModal();
                    deleteReminder(editingReminder.id);
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete Reminder</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: { width: 40 },
  backText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  addButton: { width: 40, alignItems: 'flex-end' },
  addText: { fontSize: 28, color: '#9EB567', fontWeight: '300' },
  content: { flex: 1, paddingHorizontal: 20 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  reminderTime: { fontSize: 14 },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  tipEmoji: { fontSize: 24, marginRight: 12 },
  tipText: { flex: 1, fontSize: 14, lineHeight: 20 },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderRadius: 16,
    marginBottom: 20,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 16, textAlign: 'center', lineHeight: 24 },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalCancel: { fontSize: 16 },
  modalTitle: { fontSize: 17, fontWeight: '600' },
  modalSave: { fontSize: 16, fontWeight: '600', color: '#9EB567' },
  modalBody: { paddingHorizontal: 20, paddingTop: 20 },

  // Input styles
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },

  // Preset suggestions
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  presetIcon: { fontSize: 16 },
  presetText: { fontSize: 14, fontWeight: '500' },

  // Time picker
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  timeSelectorText: { fontSize: 16, fontWeight: '500' },
  timeSelectorArrow: { fontSize: 12 },
  timePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  timeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeOptionSelected: {
    backgroundColor: '#9EB567',
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Delete button
  deleteButton: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(220,38,38,0.1)',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});

export default DailyReminderScreen;
