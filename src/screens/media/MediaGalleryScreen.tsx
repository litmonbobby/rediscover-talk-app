import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - spacing.md * 4) / 2;

type MediaItem = {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio';
  category: string;
  duration?: string;
  emoji: string;
};

export const MediaGalleryScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const mediaItems: MediaItem[] = [
    { id: '1', title: 'Morning Meditation', type: 'audio', category: 'Meditation', duration: '10:00', emoji: '🎵' },
    { id: '2', title: 'Sunset Yoga', type: 'video', category: 'Wellness', duration: '15:00', emoji: '🎥' },
    { id: '3', title: 'Nature Sounds', type: 'audio', category: 'Sleep', duration: '30:00', emoji: '🎵' },
    { id: '4', title: 'Breathing Exercise', type: 'video', category: 'Breathwork', duration: '5:00', emoji: '🎥' },
    { id: '5', title: 'Mindfulness Guide', type: 'image', category: 'Mindfulness', emoji: '🖼️' },
    { id: '6', title: 'Sleep Stories', type: 'audio', category: 'Sleep', duration: '20:00', emoji: '🎵' },
    { id: '7', title: 'Calm Ocean', type: 'video', category: 'Nature', duration: '60:00', emoji: '🎥' },
    { id: '8', title: 'Affirmation Cards', type: 'image', category: 'Affirmations', emoji: '🖼️' },
  ];

  const categories = ['All', 'Meditation', 'Wellness', 'Sleep', 'Breathwork', 'Mindfulness', 'Nature', 'Affirmations'];

  const filteredItems = selectedCategory === 'All'
    ? mediaItems
    : mediaItems.filter(item => item.category === selectedCategory);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return colors.primary.lightBlue;
      case 'audio': return colors.accent.lime;
      case 'image': return colors.mood.good;
      default: return colors.primary.cobaltBlue;
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Media Gallery</Text>
          <Text style={styles.subtitle}>Wellness content library</Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          style={styles.categoriesScroll}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Media Grid */}
        <View style={styles.mediaGrid}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.mediaCard}
              activeOpacity={0.8}
            >
              <View style={[styles.mediaThumbnail, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
                <Text style={styles.mediaEmoji}>{item.emoji}</Text>
                {item.duration && (
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{item.duration}</Text>
                  </View>
                )}
              </View>
              <View style={styles.mediaInfo}>
                <Text style={styles.mediaTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.mediaMetaRow}>
                  <Text style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                    {item.type.toUpperCase()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  header: {
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.md,
    maxHeight: 50,
    marginBottom: spacing.md,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryChipActive: {
    backgroundColor: colors.accent.lime,
  },
  categoryChipText: {
    ...typography.body,
    color: colors.text.primary,
  },
  categoryChipTextActive: {
    ...typography.bodyBold,
    color: colors.primary.darkBlue,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  mediaCard: {
    width: itemWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mediaThumbnail: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mediaEmoji: {
    fontSize: 40,
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.sm,
  },
  durationText: {
    ...typography.caption,
    color: colors.text.primary,
    fontSize: 10,
  },
  mediaInfo: {
    padding: spacing.md,
  },
  mediaTitle: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    height: 40,
  },
  mediaMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    ...typography.caption,
    fontSize: 9,
    color: colors.primary.darkBlue,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.sm,
    fontWeight: 'bold',
  },
});
