/**
 * Chat Screen - Chat with Mindy AI
 * Exact Figma Recreation with proper React Native components
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

type ChatStackParamList = {
  Chat: undefined;
  ChatHistory: undefined;
  Coach: undefined;
};

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'Chat'>;

// Figma-extracted assets
const assets = {
  // Header icons
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
  moreCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-more-circle.png'),

  // Input icons
  plus: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-plus.png'),
  voice: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-voice.png'),
  send: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-send.png'),

  // AI Avatar illustration
  aiAvatar: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-33-component-illustrations-set.png'),
};

// Message types
interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

// Quick reply suggestions
const quickReplies = [
  { id: '1', text: 'How can I manage stress?' },
  { id: '2', text: 'Help me sleep better' },
  { id: '3', text: 'I need motivation' },
  { id: '4', text: 'Talk about my feelings' },
];

// Mock conversation data
const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! I'm Mindy, your AI wellness companion. How are you feeling today?",
    isAI: true,
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: "I've been feeling a bit stressed lately with work.",
    isAI: false,
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    text: "I understand. Work stress can be really challenging. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's been causing the stress?",
    isAI: true,
    timestamp: '10:31 AM',
  },
];

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    console.log('Search chat');
  };

  const handleMoreOptions = () => {
    console.log('More options');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isAI: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's a great question. Let me think about how I can best help you with that...",
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiResponse]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 1000);

      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleVoiceInput = () => {
    console.log('Voice input');
  };

  const handleAttachment = () => {
    console.log('Attachment');
  };

  const handleQuickReply = (text: string) => {
    setMessage(text);
  };

  const renderMessage = (msg: Message) => (
    <View
      key={msg.id}
      style={[
        styles.messageRow,
        msg.isAI ? styles.aiMessageRow : styles.userMessageRow,
      ]}
    >
      {msg.isAI && (
        <View style={styles.avatarContainer}>
          <Image source={assets.aiAvatar} style={styles.avatar} resizeMode="contain" />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          msg.isAI
            ? [styles.aiMessageBubble, { backgroundColor: colors.background.card }]
            : styles.userMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: msg.isAI ? colors.text.primary : '#FFFFFF' },
          ]}
        >
          {msg.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            { color: msg.isAI ? colors.text.tertiary : 'rgba(255,255,255,0.7)' },
          ]}
        >
          {msg.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerAvatarContainer}>
            <Image source={assets.aiAvatar} style={styles.headerAvatar} resizeMode="contain" />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mindy</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              AI Wellness Companion
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearch}>
            <Image
              source={assets.search}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleMoreOptions}>
            <Image
              source={assets.moreCircle}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Image source={assets.aiAvatar} style={styles.welcomeAvatar} resizeMode="contain" />
            <Text style={[styles.welcomeTitle, { color: colors.text.primary }]}>
              Chat with Mindy
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.text.secondary }]}>
              Your AI wellness companion is here to listen and support you
            </Text>
          </View>

          {/* Messages */}
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Quick Replies */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRepliesContainer}
          style={styles.quickRepliesScroll}
        >
          {quickReplies.map((reply) => (
            <TouchableOpacity
              key={reply.id}
              style={[styles.quickReplyChip, { backgroundColor: colors.background.card }]}
              onPress={() => handleQuickReply(reply.text)}
              activeOpacity={0.7}
            >
              <Text style={[styles.quickReplyText, { color: colors.text.primary }]}>
                {reply.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={[styles.inputContainer, { backgroundColor: colors.background.primary }]}>
          <TouchableOpacity
            style={[styles.attachButton, { backgroundColor: colors.background.secondary }]}
            onPress={handleAttachment}
          >
            <Image
              source={assets.plus}
              style={[styles.attachIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={[styles.inputWrapper, { backgroundColor: colors.background.secondary }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text.primary }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.text.tertiary}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
            />
          </View>

          <TouchableOpacity
            style={[styles.voiceButton, { backgroundColor: colors.background.secondary }]}
            onPress={handleVoiceInput}
          >
            <Image
              source={assets.voice}
              style={[styles.voiceIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: message.trim() ? '#9EB567' : colors.background.secondary },
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={assets.send}
              style={[
                styles.sendIcon,
                { tintColor: message.trim() ? '#FFFFFF' : colors.text.tertiary },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerAvatarContainer: {
    position: 'relative',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6BCB77',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerInfo: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 22,
    height: 22,
  },

  // Messages
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Welcome Section
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  welcomeAvatar: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },

  // Message Rows
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  // Message Bubbles
  messageBubble: {
    maxWidth: width * 0.7,
    padding: 14,
    borderRadius: 16,
  },
  aiMessageBubble: {
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userMessageBubble: {
    backgroundColor: '#9EB567',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
    alignSelf: 'flex-end',
  },

  // Quick Replies
  quickRepliesScroll: {
    maxHeight: 48,
    marginBottom: 8,
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickReplyChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(158, 181, 103, 0.3)',
  },
  quickReplyText: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Input Area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachIcon: {
    width: 20,
    height: 20,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    paddingVertical: 10,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceIcon: {
    width: 20,
    height: 20,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});

export default ChatScreen;
