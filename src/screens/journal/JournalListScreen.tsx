import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, {
              backgroundColor: colors.background.secondary,
              borderRadius: borderRadius.lg
            }]}
          >
            <Text style={[styles.backIcon, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary
            }]}>
              ←
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary
          }]}>
            My Journal
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Your thoughts and reflections
          </Text>
        </Animated.View>

        {/* New Entry Button */}
        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <TouchableOpacity
            style={[styles.newEntryButton, {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.lg,
              ...shadows.md
            }]}
            onPress={() => navigation.navigate('JournalEntry')}
            activeOpacity={0.8}
          >
            <Text style={styles.newEntryIcon}>✏️</Text>
            <Text style={[styles.newEntryText, {
              color: colors.text.inverse,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}>
              New Entry
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Journal Entries */}
        <View style={styles.entriesContainer}>
          <Animated.Text
            entering={FadeInUp.delay(250).springify()}
            style={[styles.sectionTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}
          >
            Recent Entries
          </Animated.Text>
          {mockEntries.map((entry, index) => (
            <Animated.View
              key={entry.id}
              entering={FadeInUp.delay(300 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.entryCard, {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  borderRadius: borderRadius.lg,
                  ...shadows.sm
                }]}
                onPress={() => {
                  // TODO: Navigate to entry detail
                  console.log('View entry:', entry.id);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.entryHeader}>
                  <View style={[styles.entryMoodContainer, {
                    backgroundColor: colors.background.secondary,
                    borderRadius: borderRadius.lg
                  }]}>
                    <Text style={styles.entryMood}>{entry.mood}</Text>
                  </View>
                  <View style={styles.entryHeaderText}>
                    <Text style={[styles.entryTitle, {
                      color: colors.text.primary,
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: typography.fontWeight.semibold
                    }]}>
                      {entry.title}
                    </Text>
                    <Text style={[styles.entryDate, {
                      color: colors.text.tertiary,
                      fontFamily: typography.fontFamily.primary
                    }]}>
                      {formatDate(entry.date)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.entryPreview, {
                    color: colors.text.secondary,
                    fontFamily: typography.fontFamily.primary
                  }]}
                  numberOfLines={2}
                >
                  {entry.preview}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Empty State */}
        {mockEntries.length === 0 && (
          <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={[styles.emptyTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              No journal entries yet
            </Text>
            <Text style={[styles.emptySubtitle, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Start writing to track your thoughts and feelings
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  newEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  newEntryIcon: {
    fontSize: 24,
  },
  newEntryText: {
    fontSize: 18,
  },
  entriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  entryCard: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryMoodContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  entryMood: {
    fontSize: 24,
  },
  entryHeaderText: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  entryDate: {
    fontSize: 12,
  },
  entryPreview: {
    fontSize: 14,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
