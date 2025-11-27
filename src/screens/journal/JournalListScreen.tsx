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
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'JournalList'>;

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
];

export const JournalListScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleNewEntry = () => {
    navigation.navigate('JournalEntry');
  };

  const handleEntryPress = (entry: JournalEntry) => {
    // TODO: Navigate to entry detail/edit screen with entry data
    console.log('Entry pressed:', entry.title);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderJournalEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity
      style={styles.journalCard}
      onPress={() => handleEntryPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.moodEmoji}>{item.mood}</Text>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.previewText} numberOfLines={2}>
        {item.preview}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('ExploreSmartJournal', isDarkMode)}
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
        <Text style={styles.headerTitle}>Smart Journal</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Journal Entries List */}
      <FlatList
        data={mockEntries}
        renderItem={renderJournalEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating New Entry Button */}
      <TouchableOpacity
        style={styles.newEntryButton}
        onPress={handleNewEntry}
        activeOpacity={0.7}
      >
        <Text style={styles.newEntryButtonText}>+</Text>
      </TouchableOpacity>
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
  journalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodEmoji: {
    fontSize: 32,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  newEntryButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  newEntryButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
