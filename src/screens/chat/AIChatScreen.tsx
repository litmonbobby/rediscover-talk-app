import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'AIChat'>;

export const AIChatScreen: React.FC<Props> = ({ navigation }) => {
  const [chatState, setChatState] = useState<'default' | 'typing' | 'generating'>('default');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMenu = () => {
    // Show menu options
    setChatState('default');
  };

  const getScreenImage = () => {
    switch (chatState) {
      case 'typing':
        return require('../../figma-extracted/assets/screens/light-theme/34-light-chat-with-mindy-type-message.png');
      case 'generating':
        return require('../../figma-extracted/assets/screens/light-theme/35-light-chat-with-mindy-generating-response.png');
      default:
        return require('../../figma-extracted/assets/screens/light-theme/33-light-chat-with-mindy.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={getScreenImage()}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Menu button - top right */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenu}
          activeOpacity={1}
        />

        {/* Message input area - bottom */}
        <TouchableOpacity
          style={styles.messageInput}
          onPress={() => setChatState('typing')}
          activeOpacity={1}
        />

        {/* Send button - bottom right */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => setChatState('generating')}
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
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  messageInput: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 80,
    height: 60,
    zIndex: 10,
  },
  sendButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
});
