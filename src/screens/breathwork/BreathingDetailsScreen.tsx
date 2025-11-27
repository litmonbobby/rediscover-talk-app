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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'BreathingDetails'>;

export const BreathingDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { breathing } = route.params || { breathing: {
    id: 'b1',
    title: '4-7-8 Breathing',
    duration: '19 sec',
    category: 'Sleep',
    emoji: '😴',
    type: 'breathing',
    isFavorite: false
  }};

  const [isFavorite, setIsFavorite] = useState(breathing?.isFavorite || false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite toggled:', !isFavorite);
  };

  const handleStart = () => {
    navigation.navigate('BreathingExercise', { breathing });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/63-light-breathing-details.png')}
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
          <Text style={styles.breathingEmoji}>{breathing.emoji}</Text>
          <Text style={styles.breathingTitle}>{breathing.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.categoryBadge}>{breathing.category}</Text>
            <Text style={styles.durationText}>• {breathing.duration}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this exercise</Text>
            <Text style={styles.descriptionText}>
              {breathing.title === '4-7-8 Breathing' && 'A powerful relaxation technique that helps you fall asleep faster. Breathe in for 4 counts, hold for 7, and exhale for 8. This natural sedative for the nervous system helps calm anxiety and promote deep sleep.'}
              {breathing.title === 'Box Breathing' && 'Also known as square breathing, this technique helps reduce stress and improve focus. Breathe in, hold, breathe out, and hold again - each for 4 counts. Used by Navy SEALs for stress management and mental clarity.'}
              {breathing.title === 'Calm Breathing' && 'Simple, gentle breathing to promote relaxation and reduce tension. Breathe naturally and deeply, focusing on extending your exhale. Perfect for quick stress relief anytime, anywhere.'}
              {!['4-7-8 Breathing', 'Box Breathing', 'Calm Breathing'].includes(breathing.title) && 'Experience calm and clarity through guided breathwork. These exercises help regulate your nervous system and promote mental well-being.'}
            </Text>
          </View>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitItem}>• Reduce stress and anxiety</Text>
              <Text style={styles.benefitItem}>• Lower heart rate and blood pressure</Text>
              <Text style={styles.benefitItem}>• Improve focus and concentration</Text>
              <Text style={styles.benefitItem}>• Promote better sleep quality</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.startButtonContainer}>
        <Button
          title="Start Exercise"
          onPress={handleStart}
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
  breathingEmoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 16,
  },
  breathingTitle: {
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
  startButtonContainer: {
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
