/**
 * SleepScreen
 * Sleep sounds, music, and bedtime stories
 * Reference: Figma screen 93-light-sleep.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card } from '../../components';

interface SleepContent {
  id: string;
  title: string;
  type: 'sound' | 'music' | 'story';
  duration?: number; // in minutes, undefined for continuous
  category: string;
  description: string;
  icon: string;
  isPremium?: boolean;
}

const sleepContent: SleepContent[] = [
  // Sounds
  {
    id: '1',
    title: 'Ocean Waves',
    type: 'sound',
    category: 'Nature',
    description: 'Gentle ocean waves on a peaceful beach',
    icon: '🌊',
  },
  {
    id: '2',
    title: 'Rain & Thunder',
    type: 'sound',
    category: 'Weather',
    description: 'Distant thunder with calming rainfall',
    icon: '⛈️',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Forest Night',
    type: 'sound',
    category: 'Nature',
    description: 'Crickets and night sounds in a peaceful forest',
    icon: '🌲',
  },
  {
    id: '4',
    title: 'White Noise',
    type: 'sound',
    category: 'Ambient',
    description: 'Pure white noise for blocking distractions',
    icon: '📻',
  },
  // Music
  {
    id: '5',
    title: 'Piano Lullabies',
    type: 'music',
    duration: 45,
    category: 'Classical',
    description: 'Gentle piano melodies for deep sleep',
    icon: '🎹',
  },
  {
    id: '6',
    title: 'Ambient Dreams',
    type: 'music',
    duration: 60,
    category: 'Ambient',
    description: 'Ethereal soundscapes for relaxation',
    icon: '🎵',
    isPremium: true,
  },
  // Stories
  {
    id: '7',
    title: 'Moonlit Garden',
    type: 'story',
    duration: 20,
    category: 'Fantasy',
    description: 'A gentle journey through an enchanted garden',
    icon: '🌙',
  },
  {
    id: '8',
    title: 'The Sleepy Train',
    type: 'story',
    duration: 15,
    category: 'Adventure',
    description: 'A peaceful train ride through dreamland',
    icon: '🚂',
    isPremium: true,
  },
];

const categories = [
  { id: 'sounds', title: 'Sleep Sounds', icon: '🔊', color: '#8B5CF6' },
  { id: 'music', title: 'Sleep Music', icon: '🎵', color: '#EC4899' },
  { id: 'stories', title: 'Sleep Stories', icon: '📖', color: '#F59E0B' },
];

export function SleepScreen() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);

  const handleCategoryPress = (categoryId: string) => {
    // TODO: Navigate to category screen
    console.log('Category pressed:', categoryId);
  };

  const handleContentPress = (content: SleepContent) => {
    // TODO: Navigate to player
    console.log('Content pressed:', content.title);
  };

  const handleTimerPress = (minutes: number) => {
    setActiveTimer(activeTimer === minutes ? null : minutes);
    // TODO: Set sleep timer
  };

  const featuredContent = sleepContent.filter((c) => !c.isPremium).slice(0, 3);
  const sounds = sleepContent.filter((c) => c.type === 'sound');
  const music = sleepContent.filter((c) => c.type === 'music');
  const stories = sleepContent.filter((c) => c.type === 'story');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sleep</Text>
          <Text style={styles.subtitle}>
            Relax with soothing sounds, music, and bedtime stories
          </Text>
        </View>

        {/* Sleep Timer */}
        <Card style={styles.timerCard}>
          <Text style={styles.timerTitle}>Sleep Timer</Text>
          <Text style={styles.timerSubtitle}>
            Set a timer to automatically stop playback
          </Text>
          <View style={styles.timerOptions}>
            {[15, 30, 45, 60].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.timerButton,
                  activeTimer === minutes && styles.timerButtonActive,
                ]}
                onPress={() => handleTimerPress(minutes)}
              >
                <Text
                  style={[
                    styles.timerButtonText,
                    activeTimer === minutes && styles.timerButtonTextActive,
                  ]}
                >
                  {minutes} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Type</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.7}
              >
                <Card variant="elevated" style={styles.categoryCardInner}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${category.color}15` },
                    ]}
                  >
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryCount}>
                    {
                      sleepContent.filter((c) =>
                        category.id === 'sounds'
                          ? c.type === 'sound'
                          : category.id === 'music'
                          ? c.type === 'music'
                          : c.type === 'story'
                      ).length
                    }{' '}
                    items
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Tonight</Text>
          {featuredContent.map((content) => (
            <TouchableOpacity
              key={content.id}
              onPress={() => handleContentPress(content)}
              activeOpacity={0.7}
            >
              <Card variant="elevated" style={styles.contentCard}>
                <View style={styles.contentIcon}>
                  <Text style={styles.contentIconText}>{content.icon}</Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle}>{content.title}</Text>
                  <Text style={styles.contentDescription}>
                    {content.description}
                  </Text>
                  <View style={styles.contentMeta}>
                    <Text style={styles.metaText}>{content.category}</Text>
                    {content.duration && (
                      <>
                        <Text style={styles.metaDivider}>•</Text>
                        <Text style={styles.metaText}>{content.duration} min</Text>
                      </>
                    )}
                    {!content.duration && (
                      <>
                        <Text style={styles.metaDivider}>•</Text>
                        <Text style={styles.metaText}>Continuous</Text>
                      </>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Sounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Sounds</Text>
            <TouchableOpacity onPress={() => handleCategoryPress('sounds')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {sounds.slice(0, 4).map((sound) => (
              <TouchableOpacity
                key={sound.id}
                onPress={() => handleContentPress(sound)}
                activeOpacity={0.7}
              >
                <Card variant="elevated" style={styles.horizontalCard}>
                  {sound.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PRO</Text>
                    </View>
                  )}
                  <View style={styles.horizontalIcon}>
                    <Text style={styles.horizontalIconText}>{sound.icon}</Text>
                  </View>
                  <Text style={styles.horizontalTitle} numberOfLines={1}>
                    {sound.title}
                  </Text>
                  <Text style={styles.horizontalCategory}>{sound.category}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sleep Music */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sleep Music</Text>
            <TouchableOpacity onPress={() => handleCategoryPress('music')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {music.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleContentPress(item)}
              activeOpacity={0.7}
            >
              <Card variant="default" style={styles.listCard}>
                <View style={styles.listIcon}>
                  <Text style={styles.listIconText}>{item.icon}</Text>
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listDescription}>{item.description}</Text>
                </View>
                {item.isPremium && (
                  <View style={styles.premiumBadgeSmall}>
                    <Text style={styles.premiumTextSmall}>PRO</Text>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  timerCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary[50],
  },

  timerTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  timerSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  timerOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  timerButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.background.light,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
  },

  timerButtonActive: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderColor: theme.colors.primary.DEFAULT,
  },

  timerButtonText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  timerButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  categoriesSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  categoriesGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  categoryCard: {
    flex: 1,
  },

  categoryCardInner: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },

  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  categoryIconText: {
    fontSize: 28,
  },

  categoryTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },

  categoryCount: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  seeAllText: {
    ...theme.typography.body,
    color: theme.colors.primary.DEFAULT,
  },

  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },

  contentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  contentIconText: {
    fontSize: 28,
  },

  contentInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },

  contentTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  contentDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },

  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  metaDivider: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginHorizontal: 4,
  },

  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 2,
  },

  horizontalScroll: {
    gap: theme.spacing.sm,
  },

  horizontalCard: {
    width: 140,
    padding: theme.spacing.md,
    position: 'relative',
  },

  premiumBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
    zIndex: 1,
  },

  premiumText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontSize: 9,
  },

  horizontalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    alignSelf: 'center',
  },

  horizontalIconText: {
    fontSize: 36,
  },

  horizontalTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
    textAlign: 'center',
  },

  horizontalCategory: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },

  listIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  listIconText: {
    fontSize: 24,
  },

  listInfo: {
    flex: 1,
  },

  listTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  listDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  premiumBadgeSmall: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
  },

  premiumTextSmall: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontSize: 10,
  },
});
