import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'AIChat'>;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hi! I'm Mindy, your AI wellness companion. I'm here to listen and support you. How are you feeling today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
  },
];

const AI_RESPONSES = [
  "Thank you for sharing that with me. It's completely normal to feel that way sometimes. Would you like to talk about what's been on your mind?",
  "I appreciate you opening up. Your feelings are valid, and it's important to acknowledge them. What do you think might help you feel better?",
  "That sounds challenging. Remember, it's okay to not be okay sometimes. Have you tried any of the meditation or breathing exercises in the app?",
  "I hear you. Taking care of your mental health is so important. Would you like me to suggest some activities that might help?",
  "It's great that you're being mindful of your emotions. Have you considered journaling about these feelings? It can be really helpful to process thoughts in writing.",
];

export const AIChatScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      {!item.isUser && (
        <View style={styles.aiAvatarContainer}>
          <Text style={styles.aiAvatar}>🤖</Text>
        </View>
      )}
      <View style={styles.messageContent}>
        <Text
          style={[
            styles.messageText,
            item.isUser ? styles.userText : styles.aiText,
          ]}
        >
          {item.text}
        </Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Mindy</Text>
            <Text style={styles.headerSubtitle}>AI Wellness Companion</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.aiAvatarContainer}>
              <Text style={styles.aiAvatar}>🤖</Text>
            </View>
            <View style={styles.typingBubble}>
              <ActivityIndicator size="small" color={colors.primary.DEFAULT} />
              <Text style={styles.typingText}>Mindy is typing...</Text>
            </View>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() === '' && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={inputText.trim() === ''}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>↗</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  aiAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary.DEFAULT + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiAvatar: {
    fontSize: 20,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    padding: 12,
    borderRadius: 16,
  },
  userText: {
    backgroundColor: colors.primary.DEFAULT,
    color: '#FFFFFF',
    borderBottomRightRadius: 4,
  },
  aiText: {
    backgroundColor: '#FFFFFF',
    color: '#333',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    marginLeft: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    maxWidth: '80%',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    fontSize: 16,
    color: '#333',
    maxHeight: 120,
    marginRight: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  sendButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
