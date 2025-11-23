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

type Props = NativeStackScreenProps<any, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // Mood handlers
  const handleMoodAmazing = () => navigation.navigate('MoodCheckIn');
  const handleMoodGood = () => navigation.navigate('MoodCheckIn');
  const handleMoodOkay = () => navigation.navigate('MoodCheckIn');
  const handleMoodBad = () => navigation.navigate('MoodCheckIn');
  const handleMoodTerrible = () => navigation.navigate('MoodCheckIn');

  // Quick action handlers
  const handleChat = () => navigation.navigate('Chat');
  const handleMeditation = () => navigation.navigate('MeditationLibrary');
  const handleJournal = () => navigation.navigate('JournalList');
  const handleBreathe = () => navigation.navigate('Breathwork');
  const handleInsights = () => navigation.navigate('Insights');
  const handleAffirmations = () => navigation.navigate('Affirmations');

  const handleViewHistory = () => navigation.navigate('MoodHistory');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/27-light-home.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Invisible touchable areas for mood selector */}
        {/* Mood buttons positioned horizontally across screen */}
        <TouchableOpacity
          style={[styles.moodButtonArea, { left: width * 0.06 }]}
          onPress={handleMoodAmazing}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.moodButtonArea, { left: width * 0.24 }]}
          onPress={handleMoodGood}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.moodButtonArea, { left: width * 0.42 }]}
          onPress={handleMoodOkay}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.moodButtonArea, { left: width * 0.60 }]}
          onPress={handleMoodBad}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.moodButtonArea, { left: width * 0.78 }]}
          onPress={handleMoodTerrible}
          activeOpacity={1}
        />

        {/* View History link */}
        <TouchableOpacity
          style={styles.viewHistoryArea}
          onPress={handleViewHistory}
          activeOpacity={1}
        />

        {/* Quick Actions Grid (3x2) */}
        {/* Row 1 */}
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.52, left: width * 0.05 }]}
          onPress={handleChat}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.52, right: width * 0.05 }]}
          onPress={handleMeditation}
          activeOpacity={1}
        />

        {/* Row 2 */}
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.62, left: width * 0.05 }]}
          onPress={handleJournal}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.62, right: width * 0.05 }]}
          onPress={handleBreathe}
          activeOpacity={1}
        />

        {/* Row 3 */}
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.72, left: width * 0.05 }]}
          onPress={handleInsights}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.quickActionArea, { top: height * 0.72, right: width * 0.05 }]}
          onPress={handleAffirmations}
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
  moodButtonArea: {
    position: 'absolute',
    top: height * 0.28,
    width: 70,
    height: 90,
  },
  viewHistoryArea: {
    position: 'absolute',
    top: height * 0.39,
    right: width * 0.05,
    width: 120,
    height: 40,
  },
  quickActionArea: {
    position: 'absolute',
    width: width * 0.43,
    height: 90,
  },
});
