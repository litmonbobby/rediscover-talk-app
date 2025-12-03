/**
 * Notepad Screen - Quick notes and thoughts
 * Full CRUD functionality with persistence
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import {
  journalStorageService,
  Note,
  formatDate,
} from '../../services/JournalStorageService';

export const NotepadScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [quickNote, setQuickNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal state for editing notes
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Load notes from storage
  const loadNotes = useCallback(async () => {
    try {
      const allNotes = await journalStorageService.getAllNotes();
      setNotes(allNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh on screen focus
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }, [loadNotes]);

  // Save quick note
  const handleSaveQuickNote = async () => {
    const trimmedNote = quickNote.trim();
    if (!trimmedNote) {
      Alert.alert('Empty Note', 'Please write something before saving.');
      return;
    }

    try {
      // Create title from first line or first few words
      const lines = trimmedNote.split('\n');
      const firstLine = lines[0].slice(0, 50);
      const title = firstLine.length > 0 ? firstLine : 'Quick Note';

      await journalStorageService.saveNote({
        title: title,
        content: trimmedNote,
        isPinned: false,
      });

      setQuickNote('');
      await loadNotes();
    } catch (error) {
      console.error('Error saving quick note:', error);
      Alert.alert('Error', 'Failed to save note. Please try again.');
    }
  };

  // Open modal for new note
  const handleNewNote = () => {
    setEditingNote(null);
    setEditTitle('');
    setEditContent('');
    setModalVisible(true);
  };

  // Open modal for editing existing note
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setModalVisible(true);
  };

  // Save note (create or update)
  const handleSaveNote = async () => {
    const trimmedTitle = editTitle.trim();
    const trimmedContent = editContent.trim();

    if (!trimmedTitle && !trimmedContent) {
      Alert.alert('Empty Note', 'Please add a title or content.');
      return;
    }

    try {
      if (editingNote) {
        // Update existing note
        await journalStorageService.updateNote(editingNote.id, {
          title: trimmedTitle || 'Untitled',
          content: trimmedContent,
        });
      } else {
        // Create new note
        await journalStorageService.saveNote({
          title: trimmedTitle || 'Untitled',
          content: trimmedContent,
          isPinned: false,
        });
      }

      setModalVisible(false);
      setEditingNote(null);
      setEditTitle('');
      setEditContent('');
      await loadNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note. Please try again.');
    }
  };

  // Delete note with confirmation
  const handleDeleteNote = (note: Note) => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await journalStorageService.deleteNote(note.id);
              await loadNotes();
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Error', 'Failed to delete note.');
            }
          },
        },
      ]
    );
  };

  // Toggle pin status
  const handleTogglePin = async (note: Note) => {
    try {
      await journalStorageService.toggleNotePin(note.id);
      await loadNotes();
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  // Long press options
  const handleLongPress = (note: Note) => {
    Alert.alert(
      note.title,
      'What would you like to do?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: note.isPinned ? 'Unpin' : 'Pin to Top',
          onPress: () => handleTogglePin(note),
        },
        { text: 'Edit', onPress: () => handleEditNote(note) },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteNote(note),
        },
      ]
    );
  };

  // Close modal with confirmation if changes made
  const handleCloseModal = () => {
    if (editTitle.trim() || editContent.trim()) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              setModalVisible(false);
              setEditingNote(null);
              setEditTitle('');
              setEditContent('');
            },
          },
        ]
      );
    } else {
      setModalVisible(false);
      setEditingNote(null);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Notepad</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNewNote}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Note Input */}
        <View style={[styles.quickNote, { backgroundColor: colors.background.card }]}>
          <TextInput
            style={[styles.quickNoteInput, { color: colors.text.primary }]}
            placeholder="Jot down a quick thought..."
            placeholderTextColor={colors.text.tertiary}
            multiline
            value={quickNote}
            onChangeText={setQuickNote}
          />
          {quickNote.trim().length > 0 && (
            <TouchableOpacity
              style={styles.quickSaveButton}
              onPress={handleSaveQuickNote}
            >
              <Text style={styles.quickSaveText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={[styles.statsBar, { backgroundColor: colors.background.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text.primary }]}>
              {notes.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Notes
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border.light }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text.primary }]}>
              {notes.filter(n => n.isPinned).length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Pinned
            </Text>
          </View>
        </View>

        {/* Notes List */}
        {notes.length > 0 ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              Your Notes
            </Text>

            {notes.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={[styles.noteCard, { backgroundColor: colors.background.card }]}
                activeOpacity={0.7}
                onPress={() => handleEditNote(note)}
                onLongPress={() => handleLongPress(note)}
              >
                <View style={styles.noteHeader}>
                  <View style={styles.noteTitleRow}>
                    {note.isPinned && (
                      <Text style={styles.pinIcon}>📌</Text>
                    )}
                    <Text
                      style={[styles.noteTitle, { color: colors.text.primary }]}
                      numberOfLines={1}
                    >
                      {note.title}
                    </Text>
                  </View>
                  <Text style={[styles.noteDate, { color: colors.text.tertiary }]}>
                    {formatDate(note.updatedAt)}
                  </Text>
                </View>
                <Text
                  style={[styles.notePreview, { color: colors.text.secondary }]}
                  numberOfLines={2}
                >
                  {note.content}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          !isLoading && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyIcon]}>📝</Text>
              <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
                No notes yet
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
                Start capturing your thoughts using the quick note above or tap + to create a new note
              </Text>
            </View>
          )
        )}

        {/* Tip */}
        <View style={styles.tipContainer}>
          <Text style={[styles.tipText, { color: colors.text.tertiary }]}>
            Tip: Long press a note for more options
          </Text>
        </View>
      </ScrollView>

      {/* Edit/Create Note Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background.primary }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalKeyboard}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
                <Text style={[styles.modalCloseText, { color: colors.text.primary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                {editingNote ? 'Edit Note' : 'New Note'}
              </Text>
              <TouchableOpacity onPress={handleSaveNote} style={styles.modalSaveButton}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <TextInput
              style={[
                styles.modalTitleInput,
                { color: colors.text.primary, borderBottomColor: colors.border.light },
              ]}
              placeholder="Title"
              placeholderTextColor={colors.text.tertiary}
              value={editTitle}
              onChangeText={setEditTitle}
              maxLength={100}
            />

            {/* Content Input */}
            <TextInput
              style={[styles.modalContentInput, { color: colors.text.primary }]}
              placeholder="Write your note..."
              placeholderTextColor={colors.text.tertiary}
              value={editContent}
              onChangeText={setEditContent}
              multiline
              textAlignVertical="top"
            />

            {/* Delete button for existing notes */}
            {editingNote && (
              <TouchableOpacity
                style={styles.modalDeleteButton}
                onPress={() => {
                  setModalVisible(false);
                  handleDeleteNote(editingNote);
                }}
              >
                <Text style={styles.modalDeleteText}>Delete Note</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
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

  // Quick Note
  quickNote: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    minHeight: 100,
  },
  quickNoteInput: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    minHeight: 60,
  },
  quickSaveButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#9EB567',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
  },
  quickSaveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 20,
  },

  // Section
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Note Cards
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
  noteTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pinIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  noteDate: {
    fontSize: 12,
    marginLeft: 8,
  },
  notePreview: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Tip
  tipContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  tipText: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Modal
  modalContainer: {
    flex: 1,
  },
  modalKeyboard: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalCloseButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  modalCloseText: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  modalSaveButton: {
    backgroundColor: '#9EB567',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  modalTitleInput: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalContentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalDeleteButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  modalDeleteText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NotepadScreen;
