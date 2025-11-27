import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Share,
  Text,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ArticleDetail'>;

const getArticleContent = (title: string): string => {
  const content: Record<string, string> = {
    'Understanding Anxiety: A Comprehensive Guide': `Anxiety is a natural human emotion that everyone experiences from time to time. However, when anxiety becomes overwhelming or persistent, it can significantly impact your quality of life.

What is Anxiety?

Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous.

Common Symptoms:
• Feeling nervous, restless, or tense
• Having a sense of impending danger, panic, or doom
• Increased heart rate
• Rapid breathing (hyperventilation)
• Sweating and trembling
• Feeling weak or tired
• Difficulty concentrating

Managing Anxiety:

1. Practice Deep Breathing
Take slow, deep breaths to activate your body's relaxation response. Try the 4-7-8 technique: breathe in for 4 counts, hold for 7, exhale for 8.

2. Regular Exercise
Physical activity helps reduce stress hormones and triggers the release of endorphins, your body's natural mood elevators.

3. Mindfulness and Meditation
Focus on the present moment rather than worrying about the future or dwelling on the past.

4. Connect with Others
Talk to friends, family, or a mental health professional about your feelings.

5. Limit Caffeine and Alcohol
Both substances can trigger or worsen anxiety symptoms.

When to Seek Help:

Consider professional help if anxiety is:
• Interfering with your work, relationships, or daily activities
• Causing you to avoid situations
• Leading to depression or substance abuse
• Accompanied by physical symptoms that concern you

Remember, seeking help is a sign of strength, not weakness. With proper support and treatment, anxiety is highly manageable.`,
    'The Power of Mindfulness Meditation': `Mindfulness meditation has been practiced for thousands of years, but modern science is now confirming what practitioners have known all along: it's a powerful tool for mental and physical well-being.

What is Mindfulness?

Mindfulness is the practice of purposely bringing one's attention to the present moment without judgment. It's about being fully aware of where we are and what we're doing, without being overly reactive or overwhelmed by what's going on around us.

Benefits of Mindfulness Meditation:

Mental Health:
• Reduces stress, anxiety, and depression
• Improves focus and concentration
• Enhances emotional regulation
• Increases self-awareness

Physical Health:
• Lowers blood pressure
• Improves sleep quality
• Reduces chronic pain
• Strengthens immune system

How to Practice:

1. Find a Quiet Space
Choose a comfortable, quiet place where you won't be disturbed.

2. Set a Time
Start with just 5-10 minutes daily. Consistency is more important than duration.

3. Focus on Your Breath
Pay attention to the sensation of breathing. Notice the air entering and leaving your nostrils.

4. Notice When Your Mind Wanders
It's natural for thoughts to arise. When you notice your mind wandering, gently bring your attention back to your breath.

5. Be Kind to Yourself
Don't judge yourself for having thoughts. Mindfulness is about observing, not controlling.

Getting Started:

Week 1: Practice 5 minutes daily
Week 2: Increase to 10 minutes
Week 3: Try 15 minutes
Week 4: Aim for 20 minutes

Remember, mindfulness is a skill that develops with practice. Be patient with yourself and celebrate small progress.`,
    'Building Healthy Sleep Habits': `Quality sleep is essential for physical health, mental well-being, and overall quality of life. Yet many people struggle to get the restful sleep they need.

Why Sleep Matters:

Sleep is when your body:
• Repairs tissues and builds muscle
• Consolidates memories and learning
• Regulates hormones that control hunger and metabolism
• Strengthens immune system function

The Cost of Poor Sleep:
• Increased risk of chronic diseases
• Impaired cognitive function
• Mood disturbances and irritability
• Weakened immune response
• Weight gain and metabolic issues

Creating Your Sleep Routine:

1. Consistent Sleep Schedule
Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.

2. Optimize Your Sleep Environment
• Keep your bedroom cool (60-67°F / 15-19°C)
• Use blackout curtains or an eye mask
• Reduce noise with earplugs or white noise
• Invest in a comfortable mattress and pillows

3. Wind-Down Ritual (60-90 minutes before bed)
• Dim the lights to signal your body it's time to sleep
• Avoid screens (blue light disrupts melatonin production)
• Try gentle yoga or stretching
• Practice relaxation techniques like deep breathing
• Take a warm bath or shower

4. Watch What You Consume
• Avoid caffeine after 2 PM
• Limit alcohol (it may help you fall asleep but disrupts sleep quality)
• Don't eat heavy meals within 2-3 hours of bedtime
• Stay hydrated, but limit fluids before bed

5. Manage Stress
• Keep a worry journal to offload anxious thoughts
• Practice meditation or progressive muscle relaxation
• Reserve the bed for sleep and intimacy only

What to Do If You Can't Sleep:

If you're awake for more than 20 minutes:
1. Get out of bed
2. Do a quiet, non-stimulating activity (read, listen to calm music)
3. Return to bed only when you feel sleepy

When to Seek Help:

Consult a healthcare provider if you:
• Regularly take more than 30 minutes to fall asleep
• Wake frequently during the night
• Experience excessive daytime sleepiness
• Snore loudly or gasp for air during sleep

Quality sleep is a pillar of good health. With consistent habits and the right environment, better sleep is within your reach.`,
  };

  return content[title] || article.excerpt;
};

export const ArticleDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const { article } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.excerpt}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('ArticleDetails', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={shareArticle}
          activeOpacity={0.7}
        >
          <Text style={styles.shareButtonText}>↗</Text>
        </TouchableOpacity>
      </View>

      {/* Article Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.articleEmoji}>{article.image}</Text>
        <Text style={styles.articleTitle}>{article.title}</Text>

        <View style={styles.articleMeta}>
          <Text style={styles.categoryBadge}>{article.category}</Text>
          <Text style={styles.readTimeText}>• {article.readTime}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.articleContent}>{getArticleContent(article.title)}</Text>
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
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  shareButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  shareButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  articleEmoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 36,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
});
