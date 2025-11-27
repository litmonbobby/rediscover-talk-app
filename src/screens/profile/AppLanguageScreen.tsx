import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<any, 'AppLanguage'>;

export const AppLanguageScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('AppLanguage', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Language options - scrollable list */}
          <View style={styles.languageList}>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('english')}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('spanish')}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('french')}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('german')}
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
  languageList: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  languageOption: {
    height: 60,
    marginBottom: 10,
  },
});
