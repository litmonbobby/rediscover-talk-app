import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  preview: string;
  mood: string;
}

// Mock data - will be replaced with Supabase data
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2025-01-15',
    title: 'Grateful for today',
    preview: "Had a wonderful meditation session this morning. Feeling peaceful and centered...",
    mood: '😊',
  },
  {
    id: '2',
    date: '2025-01-14',
    title: 'Reflecting on progress',
    preview: "It's been two weeks since I started my mindfulness journey. I've noticed...",
    mood: '😄',
  },
  {
    id: '3',
    date: '2025-01-13',
    title: 'Dealing with stress',
    preview: "Work was challenging today, but the breathing exercises helped me stay calm...",
    mood: '😐',
  },
  {
    id: '4',
    date: '2025-01-12',
    title: 'Evening thoughts',
    preview: "Spent time with family tonight. Reminded me of what truly matters...",
    mood: '😊',
  },
];

export const JournalListScreen = ({ navigation }: any) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>My Journal</Text>
          <Text style={styles.subtitle}>Your thoughts and reflections</Text>
        </View>

        {/* New Entry Button */}
        <TouchableOpacity
          style={styles.newEntryButton}
          onPress={() => navigation.navigate('JournalEntry')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.newEntryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.newEntryIcon}>✏️</Text>
            <Text style={styles.newEntryText}>New Entry</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Journal Entries */}
        <View style={styles.entriesContainer}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {mockEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryCard}
              onPress={() => {
                // TODO: Navigate to entry detail
                console.log('View entry:', entry.id);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.entryHeader}>
                <View style={styles.entryMoodContainer}>
                  <Text style={styles.entryMood}>{entry.mood}</Text>
                </View>
                <View style={styles.entryHeaderText}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                </View>
              </View>
              <Text style={styles.entryPreview} numberOfLines={2}>
                {entry.preview}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {mockEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>No journal entries yet</Text>
            <Text style={styles.emptySubtitle}>
              Start writing to track your thoughts and feelings
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...typography.h2,
    color: colors.text.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  newEntryButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  newEntryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  newEntryIcon: {
    fontSize: 24,
  },
  newEntryText: {
    ...typography.h3,
    color: colors.primary.cobaltBlue,
  },
  entriesContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  entryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryMoodContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  entryMood: {
    fontSize: 24,
  },
  entryHeaderText: {
    flex: 1,
  },
  entryTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 2,
  },
  entryDate: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  entryPreview: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
