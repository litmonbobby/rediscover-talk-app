import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'FAQ'>;

export const FAQScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleExpandQuestion = (questionId: string) => {
    console.log('Expand FAQ question:', questionId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('FAQ', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Search bar */}
          <View style={styles.searchBar} />

          {/* FAQ Categories and Questions */}
          <View style={styles.faqList}>
            <TouchableOpacity
              style={styles.faqItem}
              onPress={() => handleExpandQuestion('q1')}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.faqItem}
              onPress={() => handleExpandQuestion('q2')}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.faqItem}
              onPress={() => handleExpandQuestion('q3')}
              activeOpacity={1}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width,
    minHeight: height,
  },
  fullScreenImage: {
    width,
    height: height * 1.2,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    height: 50,
    zIndex: 10,
  },
  faqList: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  faqItem: {
    height: 70,
    marginBottom: 10,
  },
});
