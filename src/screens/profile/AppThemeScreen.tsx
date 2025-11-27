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

type Props = NativeStackScreenProps<any, 'AppTheme'>;
type ThemeType = 'light' | 'dark' | 'auto';

export const AppThemeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('light');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectLight = () => {
    setSelectedTheme('light');
  };

  const handleSelectDark = () => {
    setSelectedTheme('dark');
  };

  const handleSelectAuto = () => {
    setSelectedTheme('auto');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('AppTheme', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Light theme option */}
          <TouchableOpacity
            style={styles.lightThemeButton}
            onPress={handleSelectLight}
            activeOpacity={1}
          />

          {/* Dark theme option */}
          <TouchableOpacity
            style={styles.darkThemeButton}
            onPress={handleSelectDark}
            activeOpacity={1}
          />

          {/* Auto theme option */}
          <TouchableOpacity
            style={styles.autoThemeButton}
            onPress={handleSelectAuto}
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
  lightThemeButton: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  darkThemeButton: {
    position: 'absolute',
    top: 270,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  autoThemeButton: {
    position: 'absolute',
    top: 360,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
