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

type Props = NativeStackScreenProps<any, 'AppAppearance'>;

export const AppAppearanceScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [isLocalDarkMode, setIsLocalDarkMode] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleThemeToggle = () => {
    setIsLocalDarkMode(!isLocalDarkMode);
  };

  const handleLanguage = () => {
    navigation.navigate('AppLanguage');
  };

  const handleTextSize = () => {
    console.log('Adjust text size');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('AppAppearance', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Dark mode toggle */}
          <TouchableOpacity
            style={styles.darkModeToggle}
            onPress={handleThemeToggle}
            activeOpacity={1}
          />

          {/* Language option */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={handleLanguage}
            activeOpacity={1}
          />

          {/* Text size option */}
          <TouchableOpacity
            style={styles.textSizeButton}
            onPress={handleTextSize}
            activeOpacity={1}
          />
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
  darkModeToggle: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  languageButton: {
    position: 'absolute',
    top: 270,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  textSizeButton: {
    position: 'absolute',
    top: 360,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
