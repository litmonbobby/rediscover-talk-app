import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'JournalEntry'>;

export const JournalEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!content.trim()) {
      return;
    }

    // TODO: Save to Supabase
    console.log('Saving journal entry:', {
      content,
      timestamp: new Date(),
    });

    // Navigate back
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          {/* Full-screen Figma design - Smart Journal Entry (blank) */}
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/78-light-answering-smart-journal-question-blank.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Close button area (top left) */}
          <TouchableOpacity
            style={styles.closeButtonArea}
            onPress={handleClose}
            activeOpacity={1}
          />

          {/* Interactive TextInput overlay - positioned over Figma design */}
          <View style={styles.inputOverlay}>
            <TextInput
              style={styles.textInput}
              placeholder="Start writing your thoughts..."
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {/* Save button area (bottom right) */}
          <TouchableOpacity
            style={[styles.saveButtonArea, !content.trim() && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!content.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  fullScreenImage: {
    width,
    height,
    position: 'absolute',
  },
  closeButtonArea: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  inputOverlay: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.08,
    right: width * 0.08,
    height: height * 0.50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    zIndex: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  saveButtonArea: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#C7F600',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    zIndex: 10,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#004BA7',
    fontSize: 16,
    fontWeight: '600',
  },
});
