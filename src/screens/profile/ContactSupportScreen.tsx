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

type Props = NativeStackScreenProps<any, 'ContactSupport'>;

export const ContactSupportScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = () => {
    console.log('Send support message');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('ContactSupport', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Contact form area */}
          <View style={styles.formArea} />

          {/* Send button */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
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
  formArea: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    height: height * 0.5,
    zIndex: 5,
  },
  sendButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
