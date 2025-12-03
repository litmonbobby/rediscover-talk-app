/**
 * Help Screen - Matches Figma design
 * FAQs and support options
 * Supports both light and dark themes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

// Back Arrow Icon
const BackArrowIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19L5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Chevron Down Icon
const ChevronDownIcon = ({ color = '#212121', rotated = false }: { color?: string; rotated?: boolean }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: [{ rotate: rotated ? '180deg' : '0deg' }] }}
  >
    <Path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Message Icon
const MessageIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mail Icon
const MailIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6L12 13L2 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Phone Icon
const PhoneIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4136 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I track my mood?',
    answer: 'You can track your mood by tapping on the mood check-in widget on the home screen. Select how you are feeling from the available options and optionally add a note about what influenced your mood.',
  },
  {
    id: 2,
    question: 'Can I use the app offline?',
    answer: 'Yes! Most features work offline including mood tracking, journaling, and meditation. Your data will sync automatically when you are back online.',
  },
  {
    id: 3,
    question: 'How do I cancel my subscription?',
    answer: 'To cancel your subscription, go to Profile > Subscription and tap on "Manage Subscription". You can also manage subscriptions through your device\'s app store settings.',
  },
  {
    id: 4,
    question: 'Is my data private?',
    answer: 'Absolutely! Your privacy is our top priority. All your personal data is encrypted and stored securely. We never share your information with third parties. You can learn more in our Privacy Policy.',
  },
  {
    id: 5,
    question: 'How do I change my notification settings?',
    answer: 'Go to Profile > Settings > Notifications to customize which notifications you receive and when. You can set up daily reminders, meditation prompts, and more.',
  },
  {
    id: 6,
    question: 'What is included in Premium?',
    answer: 'Premium includes unlimited access to all meditations, advanced mood analytics, personalized insights, exclusive content, and priority customer support.',
  },
];

export const HelpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        edges={['top', 'bottom']}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackArrowIcon color={colors.text.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            Help & Support
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact Options */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            Contact Us
          </Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity
              style={[
                styles.contactCard,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.primary.main + '20' },
                ]}
              >
                <MessageIcon color={colors.primary.main} />
              </View>
              <Text style={[styles.contactTitle, { color: colors.text.primary }]}>
                Live Chat
              </Text>
              <Text style={[styles.contactSubtitle, { color: colors.text.tertiary }]}>
                Available 24/7
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.contactCard,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.primary.main + '20' },
                ]}
              >
                <MailIcon color={colors.primary.main} />
              </View>
              <Text style={[styles.contactTitle, { color: colors.text.primary }]}>
                Email
              </Text>
              <Text style={[styles.contactSubtitle, { color: colors.text.tertiary }]}>
                support@app.com
              </Text>
            </TouchableOpacity>
          </View>

          {/* FAQs */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                marginTop: 24,
              },
            ]}
          >
            Frequently Asked Questions
          </Text>

          <View
            style={[
              styles.faqContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={faq.id}
                style={[
                  styles.faqItem,
                  index !== faqs.length - 1 && {
                    borderBottomColor: colors.border.light,
                    borderBottomWidth: 1,
                  },
                ]}
                onPress={() => toggleExpand(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text
                    style={[
                      styles.faqQuestion,
                      {
                        color: colors.text.primary,
                        fontFamily: typography.fontFamily.primary,
                      },
                    ]}
                  >
                    {faq.question}
                  </Text>
                  <ChevronDownIcon
                    color={colors.text.tertiary}
                    rotated={expandedId === faq.id}
                  />
                </View>
                {expandedId === faq.id && (
                  <Text style={[styles.faqAnswer, { color: colors.text.secondary }]}>
                    {faq.answer}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Still Need Help */}
          <View
            style={[
              styles.helpBanner,
              { backgroundColor: colors.primary.main + '10', borderColor: colors.primary.main + '30' },
            ]}
          >
            <Text
              style={[
                styles.helpTitle,
                { color: colors.primary.main, fontFamily: typography.fontFamily.primary },
              ]}
            >
              Still need help?
            </Text>
            <Text style={[styles.helpText, { color: colors.text.secondary }]}>
              Our support team is here to assist you. Reach out anytime!
            </Text>
            <TouchableOpacity
              style={[styles.helpButton, { backgroundColor: colors.primary.main }]}
            >
              <Text style={styles.helpButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
  },
  faqContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  faqItem: {
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  helpBanner: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  helpButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HelpScreen;
