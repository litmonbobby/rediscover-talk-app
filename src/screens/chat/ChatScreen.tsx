/**
 * Chat Screen - Chat with Talia AI
 * Functional AI wellness companion with helpful responses
 */

import React, { useState, useRef, useCallback } from 'react';
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
  ActivityIndicator,
  ActionSheetIOS,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

type ChatStackParamList = {
  Chat: undefined;
  ChatHistory: undefined;
};

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'Chat'>;

// Figma-extracted assets
const assets = {
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
  moreCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-more-circle.png'),
  plus: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-plus.png'),
  voice: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-voice.png'),
  send: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-send.png'),
  aiAvatar: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-33-component-illustrations-set.png'),
};

// Message types
interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

// Quick reply suggestions - more wellness focused
const quickReplies = [
  { id: '1', text: 'Help me sleep better' },
  { id: '2', text: 'I need motivation' },
  { id: '3', text: 'Talk about my feelings' },
  { id: '4', text: 'Breathing exercise' },
  { id: '5', text: 'Reduce anxiety' },
];

// AI Response patterns for different topics
const getAIResponse = (userMessage: string): string => {
  const messageLower = userMessage.toLowerCase();

  // Sleep related
  if (messageLower.includes('sleep') || messageLower.includes('insomnia') || messageLower.includes('tired')) {
    const sleepResponses = [
      "I understand sleep can be challenging. Let's work on this together. Here are some techniques that can help:\n\n1. Try the 4-7-8 breathing technique before bed\n2. Keep your bedroom cool and dark\n3. Avoid screens 1 hour before sleep\n4. Try our Sleep Sounds in the app\n\nWould you like me to guide you through a relaxation exercise?",
      "Good sleep is essential for wellness. Have you tried establishing a consistent bedtime routine? Even 15 minutes of winding down can make a big difference. Our meditation section has some great sleep-focused sessions.",
      "Sleep troubles can be frustrating. Let's start with something simple - try a body scan meditation tonight. It helps release physical tension that might be keeping you awake. Would you like me to explain how to do it?",
    ];
    return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
  }

  // Anxiety and stress
  if (messageLower.includes('anxious') || messageLower.includes('anxiety') || messageLower.includes('stress') || messageLower.includes('worried') || messageLower.includes('panic')) {
    const anxietyResponses = [
      "I hear you, and it's okay to feel anxious sometimes. Let's try the 5-4-3-2-1 grounding technique:\n\n5 things you can see\n4 things you can touch\n3 things you can hear\n2 things you can smell\n1 thing you can taste\n\nThis helps bring you back to the present moment.",
      "Anxiety can feel overwhelming, but remember - this feeling will pass. Try placing your hand on your chest and taking 3 slow, deep breaths. Feel your heartbeat slow down. You're safe. What's on your mind?",
      "When anxiety strikes, your body's fight-or-flight response is activated. Let's calm it down together. Try our Breathwork section - the 4-7-8 breathing technique is especially helpful for anxiety relief.",
    ];
    return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
  }

  // Motivation
  if (messageLower.includes('motivation') || messageLower.includes('motivated') || messageLower.includes('lazy') || messageLower.includes('stuck')) {
    const motivationResponses = [
      "Finding motivation starts with small wins. What's one tiny thing you could do right now that would make you feel accomplished? It could be as simple as making your bed or drinking a glass of water. Small actions build momentum!",
      "Remember: motivation often follows action, not the other way around. Start with just 5 minutes of something - you might find yourself wanting to continue. What's something you've been putting off?",
      "You're already taking a positive step by reaching out! That shows self-awareness. Let's focus on one goal. What would make today feel like a success for you?",
    ];
    return motivationResponses[Math.floor(Math.random() * motivationResponses.length)];
  }

  // Feelings and emotions
  if (messageLower.includes('feeling') || messageLower.includes('feel') || messageLower.includes('sad') || messageLower.includes('down') || messageLower.includes('depressed') || messageLower.includes('lonely')) {
    const feelingsResponses = [
      "Thank you for sharing that with me. Your feelings are valid, and it takes courage to express them. Would you like to tell me more about what's been going on? I'm here to listen without judgment.",
      "It's important to acknowledge how you feel rather than push it away. Sometimes just naming our emotions can help us process them. What emotion are you experiencing most strongly right now?",
      "I'm sorry you're going through this. Remember, difficult feelings are temporary, even when they don't feel that way. Have you tried journaling? Writing down your thoughts can help create some distance from overwhelming emotions.",
    ];
    return feelingsResponses[Math.floor(Math.random() * feelingsResponses.length)];
  }

  // Breathing exercises
  if (messageLower.includes('breath') || messageLower.includes('breathing')) {
    return "Great choice! Breathing exercises are powerful tools for instant calm. Let's try box breathing:\n\n1. Breathe IN for 4 seconds\n2. HOLD for 4 seconds\n3. Breathe OUT for 4 seconds\n4. HOLD for 4 seconds\n\nRepeat this 4 times. Would you like to try it now? I can guide you through it.";
  }

  // Meditation
  if (messageLower.includes('meditat') || messageLower.includes('mindful') || messageLower.includes('calm')) {
    return "Meditation is a wonderful practice for mental wellness. Even 5 minutes can make a difference. I'd recommend starting with our 'Intro to Meditation' in the Meditation Library - it's perfect for beginners and experienced meditators alike. Would you like some tips for getting started?";
  }

  // Gratitude
  if (messageLower.includes('grateful') || messageLower.includes('gratitude') || messageLower.includes('thankful')) {
    return "Practicing gratitude can significantly improve your well-being! Try this: name 3 things you're grateful for right now. They can be simple - a warm cup of coffee, a comfortable chair, or a friend who cares. What comes to mind?";
  }

  // Journal
  if (messageLower.includes('journal') || messageLower.includes('write') || messageLower.includes('diary')) {
    return "Journaling is such a powerful tool for self-reflection! Our Smart Journal feature has guided prompts to help you explore your thoughts and feelings. You might try writing about:\n\n• How you're feeling right now\n• Something that challenged you today\n• A moment that brought you joy\n\nWould you like to start a journal entry?";
  }

  // Greetings
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey') || messageLower.match(/^hi$/)) {
    return "Hello! I'm Talia, your wellness companion. I'm here to support your mental health journey. Whether you need help with sleep, want to reduce stress, or just want someone to talk to - I'm here for you. How are you feeling today?";
  }

  // Thank you
  if (messageLower.includes('thank')) {
    return "You're very welcome! Remember, taking care of your mental health is one of the best things you can do for yourself. I'm always here when you need support. Is there anything else I can help you with?";
  }

  // Default responses
  const defaultResponses = [
    "I appreciate you sharing that with me. Tell me more about what's on your mind - I'm here to listen and help however I can.",
    "That's interesting. How does that make you feel? Understanding our emotions is the first step to wellness.",
    "I'm here for you. Would you like to explore this further, or would you prefer to try a quick wellness exercise like breathing or meditation?",
    "Thank you for opening up. Remember, every step you take toward self-awareness is progress. What would feel most helpful for you right now?",
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! I'm Talia, your AI wellness companion. I'm here to support you on your mental health journey - whether you need help with sleep, stress relief, motivation, or just want someone to talk to. How are you feeling today?",
    isAI: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    Alert.alert(
      'Search Chat',
      'Search through your conversation history',
      [{ text: 'OK' }]
    );
  };

  const handleMoreOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Clear Chat', 'Export Chat', 'Chat Settings'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            Alert.alert('Clear Chat', 'Are you sure you want to clear this conversation?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive', onPress: () => setMessages(initialMessages) },
            ]);
          } else if (buttonIndex === 2) {
            Alert.alert('Export', 'Chat exported successfully!');
          } else if (buttonIndex === 3) {
            Alert.alert('Settings', 'Chat settings coming soon!');
          }
        }
      );
    } else {
      Alert.alert('Options', 'Chat options coming soon!');
    }
  };

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      const userMessage = message.trim();
      const newMessage: Message = {
        id: Date.now().toString(),
        text: userMessage,
        isAI: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate AI thinking and response
      const thinkingTime = 1000 + Math.random() * 1500; // 1-2.5 seconds
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(userMessage),
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, thinkingTime);

      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [message]);

  const handleVoiceInput = () => {
    if (isRecording) {
      // Stop recording and "process" voice
      setIsRecording(false);
      // Simulate voice transcription
      const voiceMessages = [
        "I'm feeling a bit stressed today",
        "Can you help me with breathing exercises?",
        "I need some motivation",
        "Tell me about meditation",
        "I had trouble sleeping last night",
      ];
      const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
      setMessage(randomMessage);
    } else {
      // Start recording
      setIsRecording(true);
      // Auto-stop after 5 seconds for demo
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessages = [
          "I'm feeling a bit stressed today",
          "Can you help me with breathing exercises?",
          "I need some motivation",
          "Tell me about meditation",
          "I had trouble sleeping last night",
        ];
        const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
        setMessage(randomMessage);
      }, 3000);
    }
  };

  const handleAttachment = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancel',
            '🧘 Start Meditation',
            '📝 Open Journal',
            '🫁 Breathing Exercise',
            '😊 Log My Mood',
            '💤 Sleep Sounds',
          ],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Navigate to meditation
            const meditationMessage = "I'd like to start a meditation session";
            setMessage(meditationMessage);
            Alert.alert('Meditation', 'Opening meditation library...', [
              { text: 'OK', onPress: () => navigation.navigate('MeditationLibrary' as never) }
            ]);
          } else if (buttonIndex === 2) {
            Alert.alert('Journal', 'Opening smart journal...', [
              { text: 'OK', onPress: () => navigation.navigate('JournalEntry' as never) }
            ]);
          } else if (buttonIndex === 3) {
            Alert.alert('Breathwork', 'Opening breathing exercises...', [
              { text: 'OK', onPress: () => navigation.navigate('Breathwork' as never) }
            ]);
          } else if (buttonIndex === 4) {
            Alert.alert('Mood', 'Opening mood check-in...', [
              { text: 'OK', onPress: () => navigation.navigate('MoodCheckIn' as never) }
            ]);
          } else if (buttonIndex === 5) {
            Alert.alert('Sleep', 'Opening sleep sounds...', [
              { text: 'OK', onPress: () => navigation.navigate('SleepSounds' as never) }
            ]);
          }
        }
      );
    } else {
      // Android - show simple alert with options
      Alert.alert(
        'Quick Actions',
        'Choose an action:',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: '🧘 Meditation', onPress: () => navigation.navigate('MeditationLibrary' as never) },
          { text: '📝 Journal', onPress: () => navigation.navigate('JournalEntry' as never) },
          { text: '🫁 Breathwork', onPress: () => navigation.navigate('Breathwork' as never) },
        ]
      );
    }
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
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Talia</Text>
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
              Chat with Talia
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.text.secondary }]}>
              Your AI wellness companion is here to listen and support you 24/7
            </Text>
          </View>

          {/* Messages */}
          {messages.map(renderMessage)}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageRow, styles.aiMessageRow]}>
              <View style={styles.avatarContainer}>
                <Image source={assets.aiAvatar} style={styles.avatar} resizeMode="contain" />
              </View>
              <View style={[styles.typingBubble, { backgroundColor: colors.background.card }]}>
                <ActivityIndicator size="small" color="#9EB567" />
                <Text style={[styles.typingText, { color: colors.text.secondary }]}>
                  Talia is typing...
                </Text>
              </View>
            </View>
          )}
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
          <View style={[styles.inputWrapper, { backgroundColor: colors.background.secondary }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text.primary }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.text.tertiary}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
              onSubmitEditing={handleSendMessage}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.voiceButton,
              { backgroundColor: isRecording ? '#FF6B6B' : colors.background.secondary },
            ]}
            onPress={handleVoiceInput}
          >
            {isRecording ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Image
                source={assets.voice}
                style={[styles.voiceIcon, { tintColor: colors.text.secondary }]}
                resizeMode="contain"
              />
            )}
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
    maxWidth: width * 0.75,
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

  // Typing indicator
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    gap: 8,
  },
  typingText: {
    fontSize: 13,
    fontStyle: 'italic',
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
