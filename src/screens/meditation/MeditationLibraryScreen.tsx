import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'MeditationLibrary'>;

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  emoji: string;
}

const MEDITATIONS: Meditation[] = [
  { id: '1', title: 'Morning Calm', duration: '10 min', category: 'Morning', emoji: '🌅' },
  { id: '2', title: 'Stress Relief', duration: '15 min', category: 'Anxiety', emoji: '🧘' },
  { id: '3', title: 'Deep Sleep', duration: '20 min', category: 'Sleep', emoji: '😴' },
  { id: '4', title: 'Body Scan', duration: '12 min', category: 'Mindfulness', emoji: '🫁' },
  { id: '5', title: 'Gratitude Practice', duration: '8 min', category: 'Gratitude', emoji: '🙏' },
  { id: '6', title: 'Focus & Clarity', duration: '15 min', category: 'Focus', emoji: '🎯' },
];

export const MeditationLibraryScreen: React.FC<Props> = ({ navigation }) => {
  const handleMeditationPress = (meditation: Meditation) => {
    navigation.navigate('MeditationPlayer', { meditation });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderMeditationCard = ({ item }: { item: Meditation }) => (
    <TouchableOpacity
      style={styles.meditationCard}
      onPress={() => handleMeditationPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.meditationEmoji}>{item.emoji}</Text>
      <View style={styles.meditationInfo}>
        <Text style={styles.meditationTitle}>{item.title}</Text>
        <View style={styles.meditationMeta}>
          <Text style={styles.meditationCategory}>{item.category}</Text>
          <Text style={styles.meditationDuration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/54-light-explore-meditations.png')}
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
        <Text style={styles.headerTitle}>Meditation Library</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Meditation List */}
      <FlatList
        data={MEDITATIONS}
        renderItem={renderMeditationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  meditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  meditationEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  meditationInfo: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  meditationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meditationCategory: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  meditationDuration: {
    fontSize: 14,
    color: '#666',
  },
});
