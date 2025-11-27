import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/core/Button';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'MeditationDetails'>;

export const MeditationDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const { meditation } = route.params || { meditation: {
    id: '1',
    title: 'Morning Calm',
    duration: '10 min',
    category: 'Morning',
    emoji: '🌅',
    type: 'meditation',
    isFavorite: false
  }};

  const [isFavorite, setIsFavorite] = useState(meditation?.isFavorite || false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite toggled:', !isFavorite);
  };

  const handlePlay = () => {
    // Navigate to player with meditation data
    navigation.navigate('MeditationPlayer', { meditation });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage(
          isFavorite ? 'MeditationDetailsFavorite' : 'MeditationDetails',
          isDarkMode
        )}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
          activeOpacity={0.7}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.meditationEmoji}>{meditation.emoji}</Text>
          <Text style={styles.meditationTitle}>{meditation.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.categoryBadge}>{meditation.category}</Text>
            <Text style={styles.durationText}>• {meditation.duration}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this meditation</Text>
            <Text style={styles.descriptionText}>
              {meditation.title === 'Morning Calm' && 'Start your day with peace and clarity. This gentle meditation helps you set positive intentions and cultivate inner calm for the day ahead.'}
              {meditation.title === 'Stress Relief' && 'Release tension and anxiety with guided breathwork and body awareness. Perfect for moments when you need to reset and find balance.'}
              {meditation.title === 'Deep Sleep' && 'Prepare your mind and body for restful sleep. This evening meditation guides you into deep relaxation and peaceful slumber.'}
              {meditation.title === 'Body Scan' && 'Connect with your body through mindful awareness. This practice helps release physical tension and cultivate presence.'}
              {meditation.title === 'Gratitude Practice' && 'Cultivate appreciation and positive emotions. This meditation guides you through reflecting on what you\'re grateful for.'}
              {meditation.title === 'Focus & Clarity' && 'Sharpen your mental clarity and concentration. Ideal for before important tasks or when you need to clear mental fog.'}
              {!['Morning Calm', 'Stress Relief', 'Deep Sleep', 'Body Scan', 'Gratitude Practice', 'Focus & Clarity'].includes(meditation.title) && 'Experience peace and mindfulness through guided meditation. Find calm, clarity, and inner balance.'}
            </Text>
          </View>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitItem}>• Reduce stress and anxiety</Text>
              <Text style={styles.benefitItem}>• Improve focus and clarity</Text>
              <Text style={styles.benefitItem}>• Enhance emotional well-being</Text>
              <Text style={styles.benefitItem}>• Promote better sleep</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Play Button */}
      <View style={styles.playButtonContainer}>
        <Button
          title="Start Meditation"
          onPress={handlePlay}
          variant="primary"
          size="large"
          fullWidth
          icon="▶"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  favoriteIcon: {
    fontSize: 28,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  detailsContainer: {
    paddingHorizontal: 24,
  },
  meditationEmoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 16,
  },
  meditationTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  categoryBadge: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '20',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  durationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  playButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
