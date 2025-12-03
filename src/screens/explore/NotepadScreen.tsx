/**
 * Notepad Screen - Quick notes and thoughts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

interface Note {
  id: string;
  title: string;
  preview: string;
  date: string;
}

const mockNotes: Note[] = [
  { id: '1', title: 'Morning thoughts', preview: 'Today I feel grateful for...', date: 'Today' },
  { id: '2', title: 'Ideas', preview: 'Things I want to try this week', date: 'Yesterday' },
  { id: '3', title: 'Reflection', preview: 'What went well today...', date: 'Nov 29' },
];

export const NotepadScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [notes] = useState<Note[]>(mockNotes);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Notepad</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Note Input */}
        <View style={[styles.quickNote, { backgroundColor: colors.background.card }]}>
          <TextInput
            style={[styles.quickNoteInput, { color: colors.text.primary }]}
            placeholder="Quick note..."
            placeholderTextColor={colors.text.tertiary}
            multiline
          />
        </View>

        {/* Notes List */}
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>Recent Notes</Text>

        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            style={[styles.noteCard, { backgroundColor: colors.background.card }]}
            activeOpacity={0.7}
          >
            <View style={styles.noteHeader}>
              <Text style={[styles.noteTitle, { color: colors.text.primary }]}>{note.title}</Text>
              <Text style={[styles.noteDate, { color: colors.text.tertiary }]}>{note.date}</Text>
            </View>
            <Text
              style={[styles.notePreview, { color: colors.text.secondary }]}
              numberOfLines={2}
            >
              {note.preview}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  addText: {
    fontSize: 28,
    color: '#9EB567',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quickNote: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 100,
  },
  quickNoteInput: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  noteDate: {
    fontSize: 12,
  },
  notePreview: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NotepadScreen;
