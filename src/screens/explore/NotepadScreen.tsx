/**
 * NotepadScreen
 * Quick notes for thoughts and ideas
 * Reference: Figma screen 75-light-explore-notepad.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Button } from '../../components';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Morning Thoughts',
    content: 'Feeling grateful for the sunny weather today. Looking forward to my morning walk.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    color: '#FEF3C7',
  },
  {
    id: '2',
    title: 'Goals for This Week',
    content: '1. Complete meditation daily\n2. Journal 3x\n3. Try new breathing exercise\n4. Read wellness article',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    color: '#DBEAFE',
  },
  {
    id: '3',
    title: 'Affirmations',
    content: 'I am capable. I am strong. I am worthy of love and happiness.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    color: '#FCE7F3',
  },
];

export function NotepadScreen() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleNotePress = (note: Note) => {
    // TODO: Navigate to note detail/edit
    console.log('Note pressed:', note.title);
  };

  const handleAddNote = () => {
    if (newNoteTitle.trim() || newNoteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: newNoteTitle.trim() || 'Untitled Note',
        content: newNoteContent,
        createdAt: new Date(),
        updatedAt: new Date(),
        color: ['#FEF3C7', '#DBEAFE', '#FCE7F3', '#D1FAE5'][Math.floor(Math.random() * 4)],
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowAddNote(false);
      // TODO: Save to backend
    }
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notepad</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddNote(!showAddNote)}
        >
          <Text style={styles.addIcon}>{showAddNote ? '✕' : '+'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Add Note Form */}
        {showAddNote && (
          <Card style={styles.addNoteCard}>
            <TextInput
              style={styles.titleInput}
              placeholder="Note title (optional)"
              placeholderTextColor={theme.colors.text.tertiary}
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            <TextInput
              style={styles.contentInput}
              placeholder="Write your note here..."
              placeholderTextColor={theme.colors.text.tertiary}
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
              textAlignVertical="top"
              autoFocus
            />
            <View style={styles.addNoteActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => {
                  setShowAddNote(false);
                  setNewNoteTitle('');
                  setNewNoteContent('');
                }}
                style={styles.actionButton}
              />
              <Button
                title="Save Note"
                onPress={handleAddNote}
                style={styles.actionButton}
              />
            </View>
          </Card>
        )}

        {/* Info Card */}
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📔</Text>
            <Text style={styles.emptyTitle}>No Notes Yet</Text>
            <Text style={styles.emptyText}>
              Tap the + button to create your first note
            </Text>
          </View>
        ) : (
          <>
            {/* Notes Grid */}
            <View style={styles.notesGrid}>
              {notes.map((note) => (
                <TouchableOpacity
                  key={note.id}
                  onPress={() => handleNotePress(note)}
                  activeOpacity={0.7}
                  style={styles.noteCardWrapper}
                >
                  <Card
                    variant="elevated"
                    style={[
                      styles.noteCard,
                      { backgroundColor: note.color || theme.colors.background.secondary },
                    ]}
                  >
                    <Text style={styles.noteTitle} numberOfLines={1}>
                      {note.title}
                    </Text>
                    <Text style={styles.noteContent} numberOfLines={4}>
                      {note.content}
                    </Text>
                    <Text style={styles.noteDate}>{formatDate(note.updatedAt)}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>

            {/* Tips Card */}
            <Card style={styles.tipsCard}>
              <Text style={styles.tipsIcon}>💡</Text>
              <Text style={styles.tipsTitle}>Quick Tip</Text>
              <Text style={styles.tipsText}>
                Use notes to capture quick thoughts, ideas, or reminders. You can also
                use them to track progress on your wellness goals.
              </Text>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  addNoteCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },

  titleInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    marginBottom: theme.spacing.md,
  },

  contentInput: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    minHeight: 120,
    paddingVertical: theme.spacing.sm,
  },

  addNoteActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },

  actionButton: {
    flex: 1,
  },

  notesGrid: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  noteCardWrapper: {
    width: '48.5%',
  },

  noteCard: {
    padding: theme.spacing.md,
    minHeight: 140,
  },

  noteTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  noteContent: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    flex: 1,
    marginBottom: theme.spacing.xs,
    lineHeight: 18,
  },

  noteDate: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    fontSize: 11,
  },

  tipsCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.accent[50],
  },

  tipsIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },

  tipsTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  tipsText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.lg,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },

  emptyTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
