import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  const handleNewEntry = () => {
    navigation.navigate('JournalEntry');
  };

  const handleEntryPress = (entry: JournalEntry) => {
    // TODO: Navigate to entry detail/edit screen
    console.log('Entry pressed:', entry.title);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Smart Journal List */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/77-light-explore-smart-journal.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* New entry button (floating action button) */}
        <TouchableOpacity
          style={styles.newEntryButtonArea}
          onPress={handleNewEntry}
          activeOpacity={1}
        />

        {/* Journal entry cards - clickable areas */}
        {/* Entry 1 */}
        <TouchableOpacity
          style={[styles.journalEntryArea, { top: height * 0.22 }]}
          onPress={() => handleEntryPress(mockEntries[0])}
          activeOpacity={1}
        />

        {/* Entry 2 */}
        <TouchableOpacity
          style={[styles.journalEntryArea, { top: height * 0.35 }]}
          onPress={() => handleEntryPress(mockEntries[1])}
          activeOpacity={1}
        />

        {/* Entry 3 */}
        <TouchableOpacity
          style={[styles.journalEntryArea, { top: height * 0.48 }]}
          onPress={() => handleEntryPress(mockEntries[2])}
          activeOpacity={1}
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
  content: {
    flex: 1,
  },
  fullScreenImage: {
    width,
    height,
    position: 'absolute',
  },
  backButtonArea: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  newEntryButtonArea: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    zIndex: 10,
  },
  journalEntryArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 110,
  },
});
