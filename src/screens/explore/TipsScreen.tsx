/**
 * Tips Screen - Weekly regenerating mental wellness tips
 * 40+ weeks of curated wellness advice with automatic weekly rotation
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  emoji: string;
}

interface WeeklyTips {
  week: number;
  theme: string;
  tips: Tip[];
}

// 40+ weeks of wellness tips organized by weekly themes
const allWeeklyTips: WeeklyTips[] = [
  // Week 1: Foundation of Wellness
  {
    week: 1,
    theme: 'Foundation of Wellness',
    tips: [
      { id: '1-1', title: 'Start Your Day Mindfully', content: 'Take 5 minutes each morning for deep breathing before checking your phone. This sets a calm tone for the day.', category: 'Morning Routine', emoji: '🌅' },
      { id: '1-2', title: 'Practice Gratitude', content: "Write down 3 things you're grateful for each day. This simple habit can shift your mindset towards positivity.", category: 'Daily Practice', emoji: '🙏' },
      { id: '1-3', title: 'Hydrate First Thing', content: 'Drink a glass of water when you wake up. Hydration affects mood, energy, and cognitive function.', category: 'Physical Health', emoji: '💧' },
      { id: '1-4', title: 'Set Daily Intentions', content: 'Before starting your day, set one clear intention. This gives your mind focus and purpose.', category: 'Mindset', emoji: '🎯' },
      { id: '1-5', title: 'Evening Wind-Down', content: 'Create a 30-minute pre-sleep routine without screens. This signals your body it\'s time to rest.', category: 'Sleep', emoji: '🌙' },
    ],
  },
  // Week 2: Movement & Energy
  {
    week: 2,
    theme: 'Movement & Energy',
    tips: [
      { id: '2-1', title: 'Take Movement Breaks', content: 'Every hour, stand up and move for 2-3 minutes. Stretch, walk, or do light exercises to reduce stress.', category: 'Physical Health', emoji: '🚶' },
      { id: '2-2', title: 'Morning Stretches', content: 'Spend 5 minutes stretching when you wake up. It improves circulation and reduces muscle tension.', category: 'Morning Routine', emoji: '🧘' },
      { id: '2-3', title: 'Walk in Nature', content: 'Spend at least 20 minutes outside in nature weekly. Green spaces reduce cortisol and improve mood.', category: 'Nature', emoji: '🌳' },
      { id: '2-4', title: 'Dance It Out', content: "Put on your favorite song and dance for 3 minutes. Movement releases endorphins and lifts your spirits.", category: 'Joy', emoji: '💃' },
      { id: '2-5', title: 'Gentle Evening Yoga', content: "Try 10 minutes of gentle yoga before bed. It calms the nervous system and prepares you for sleep.", category: 'Evening Routine', emoji: '🌸' },
    ],
  },
  // Week 3: Digital Wellness
  {
    week: 3,
    theme: 'Digital Wellness',
    tips: [
      { id: '3-1', title: 'Set Screen Boundaries', content: 'Create phone-free times, especially before bed. Blue light and notifications can disrupt sleep and increase anxiety.', category: 'Digital Wellness', emoji: '📱' },
      { id: '3-2', title: 'Notification Detox', content: 'Turn off non-essential notifications. Constant alerts fragment your attention and increase stress.', category: 'Digital Wellness', emoji: '🔕' },
      { id: '3-3', title: 'Social Media Audit', content: 'Unfollow accounts that make you feel bad. Curate your feed to include only positive, inspiring content.', category: 'Digital Wellness', emoji: '✨' },
      { id: '3-4', title: 'Tech-Free Meals', content: 'Eat at least one meal a day without any screens. Focus on the food and, if possible, conversation.', category: 'Mindful Eating', emoji: '🍽️' },
      { id: '3-5', title: 'Digital Sunset', content: 'Stop using screens 1 hour before bed. Use this time for reading, journaling, or relaxation.', category: 'Sleep', emoji: '📴' },
    ],
  },
  // Week 4: Connection & Relationships
  {
    week: 4,
    theme: 'Connection & Relationships',
    tips: [
      { id: '4-1', title: 'Connect with Others', content: 'Reach out to a friend or family member today. Social connections are vital for mental wellbeing.', category: 'Relationships', emoji: '💬' },
      { id: '4-2', title: 'Active Listening', content: 'In your next conversation, practice listening without planning your response. True listening deepens connections.', category: 'Communication', emoji: '👂' },
      { id: '4-3', title: 'Express Appreciation', content: 'Tell someone specific things you appreciate about them. Expressing gratitude strengthens relationships.', category: 'Relationships', emoji: '💝' },
      { id: '4-4', title: 'Schedule Quality Time', content: 'Block time for meaningful connections in your calendar. Relationships need intentional nurturing.', category: 'Relationships', emoji: '📅' },
      { id: '4-5', title: 'Reach Out First', content: "Don't wait for others to initiate. Send a thoughtful message to someone you haven't spoken to in a while.", category: 'Connection', emoji: '📨' },
    ],
  },
  // Week 5: Self-Compassion
  {
    week: 5,
    theme: 'Self-Compassion',
    tips: [
      { id: '5-1', title: 'Practice Self-Compassion', content: "Treat yourself with the same kindness you'd show a good friend. Negative self-talk only increases stress.", category: 'Self-Care', emoji: '💚' },
      { id: '5-2', title: 'Forgive Your Mistakes', content: 'Everyone makes mistakes. Instead of ruminating, ask "What can I learn from this?"', category: 'Growth', emoji: '🌱' },
      { id: '5-3', title: 'Positive Self-Talk', content: 'Notice when you\'re being harsh with yourself. Replace criticism with encouragement.', category: 'Mindset', emoji: '💭' },
      { id: '5-4', title: 'Self-Care Is Not Selfish', content: 'Taking care of yourself enables you to better care for others. Prioritize your wellbeing without guilt.', category: 'Self-Care', emoji: '🛁' },
      { id: '5-5', title: 'Celebrate Small Wins', content: 'Acknowledge your daily accomplishments, no matter how small. Progress is progress.', category: 'Recognition', emoji: '🎉' },
    ],
  },
  // Week 6: Stress Management
  {
    week: 6,
    theme: 'Stress Management',
    tips: [
      { id: '6-1', title: 'Box Breathing', content: 'Try 4-4-4-4 breathing: inhale 4 seconds, hold 4, exhale 4, hold 4. This activates your calm response.', category: 'Breathing', emoji: '🫁' },
      { id: '6-2', title: 'Identify Stress Triggers', content: 'Keep a stress journal to identify patterns. Awareness is the first step to managing stress better.', category: 'Awareness', emoji: '📝' },
      { id: '6-3', title: 'Progressive Muscle Relaxation', content: 'Tense and release each muscle group from toes to head. This releases physical tension from stress.', category: 'Relaxation', emoji: '💆' },
      { id: '6-4', title: 'Set Realistic Goals', content: 'Break big tasks into smaller steps. Overwhelming yourself increases anxiety.', category: 'Planning', emoji: '📋' },
      { id: '6-5', title: 'Say No Without Guilt', content: "It's okay to decline requests that overwhelm you. Protecting your energy is self-care.", category: 'Boundaries', emoji: '🚫' },
    ],
  },
  // Week 7: Mindful Living
  {
    week: 7,
    theme: 'Mindful Living',
    tips: [
      { id: '7-1', title: 'Single-Tasking', content: 'Focus on one thing at a time. Multitasking increases stress and reduces effectiveness.', category: 'Focus', emoji: '🎯' },
      { id: '7-2', title: 'Mindful Eating', content: 'Eat slowly and savor each bite. Notice textures, flavors, and how food makes you feel.', category: 'Mindful Eating', emoji: '🥗' },
      { id: '7-3', title: 'Present Moment Awareness', content: 'When you catch your mind wandering, gently bring attention back to now. The present is all we have.', category: 'Mindfulness', emoji: '🧘' },
      { id: '7-4', title: 'Mindful Walking', content: 'During a walk, notice your feet touching the ground, the air on your skin, the sounds around you.', category: 'Mindfulness', emoji: '👣' },
      { id: '7-5', title: '5-4-3-2-1 Grounding', content: 'Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste. This anchors you to the present.', category: 'Grounding', emoji: '🌍' },
    ],
  },
  // Week 8: Sleep Hygiene
  {
    week: 8,
    theme: 'Sleep Hygiene',
    tips: [
      { id: '8-1', title: 'Consistent Sleep Schedule', content: 'Go to bed and wake up at the same time daily, even weekends. Consistency regulates your body clock.', category: 'Sleep', emoji: '⏰' },
      { id: '8-2', title: 'Cool Bedroom Environment', content: 'Keep your bedroom between 60-67°F (15-19°C). Cool temperatures promote better sleep.', category: 'Sleep Environment', emoji: '❄️' },
      { id: '8-3', title: 'Limit Caffeine', content: 'Avoid caffeine after 2pm. It can stay in your system for 6+ hours and disrupt sleep.', category: 'Nutrition', emoji: '☕' },
      { id: '8-4', title: 'Create a Sleep Sanctuary', content: 'Keep your bedroom dark, quiet, and clutter-free. Your environment affects your sleep quality.', category: 'Sleep Environment', emoji: '🛏️' },
      { id: '8-5', title: 'Wind-Down Ritual', content: 'Create a relaxing pre-sleep routine: warm bath, light reading, gentle stretches, or meditation.', category: 'Evening Routine', emoji: '🌙' },
    ],
  },
  // Week 9: Emotional Intelligence
  {
    week: 9,
    theme: 'Emotional Intelligence',
    tips: [
      { id: '9-1', title: 'Name Your Emotions', content: 'When you feel something, name it specifically. "I feel anxious" is more helpful than "I feel bad."', category: 'Emotional Awareness', emoji: '🏷️' },
      { id: '9-2', title: 'Feel Without Judgment', content: "All emotions are valid. Don't judge yourself for feeling sad, angry, or anxious.", category: 'Self-Acceptance', emoji: '💗' },
      { id: '9-3', title: 'Emotion as Information', content: 'Emotions tell us something. Anger might signal a boundary violation. Sadness might indicate a loss or need.', category: 'Emotional Intelligence', emoji: '📊' },
      { id: '9-4', title: 'Pause Before Reacting', content: 'When triggered, pause and take a breath before responding. This space allows for a thoughtful response.', category: 'Self-Regulation', emoji: '⏸️' },
      { id: '9-5', title: 'Emotional Check-Ins', content: 'Set reminders to check in with yourself throughout the day. How are you really feeling?', category: 'Awareness', emoji: '🔔' },
    ],
  },
  // Week 10: Boundaries & Self-Protection
  {
    week: 10,
    theme: 'Boundaries & Self-Protection',
    tips: [
      { id: '10-1', title: 'Healthy Boundaries', content: 'Boundaries protect your energy. Saying no to others often means saying yes to yourself.', category: 'Boundaries', emoji: '🛡️' },
      { id: '10-2', title: 'Recognize Energy Drains', content: 'Notice what and who depletes your energy. Limit exposure to these drains when possible.', category: 'Energy Management', emoji: '🔋' },
      { id: '10-3', title: 'Protect Your Peace', content: 'You don\'t have to attend every argument you\'re invited to. Choose your battles wisely.', category: 'Peace', emoji: '☮️' },
      { id: '10-4', title: 'Limit News Consumption', content: 'Stay informed but set limits on news intake. Constant negative news increases anxiety.', category: 'Mental Health', emoji: '📰' },
      { id: '10-5', title: 'Create Safe Spaces', content: 'Identify physical spaces where you feel calm and safe. Visit them when you need to recharge.', category: 'Environment', emoji: '🏡' },
    ],
  },
  // Week 11: Nutrition & Mood
  {
    week: 11,
    theme: 'Nutrition & Mood',
    tips: [
      { id: '11-1', title: 'Gut-Brain Connection', content: 'Your gut produces 95% of serotonin. Eating whole foods supports both gut health and mood.', category: 'Nutrition', emoji: '🥬' },
      { id: '11-2', title: 'Omega-3 for Brain Health', content: 'Include fatty fish, walnuts, or flaxseeds in your diet. Omega-3s support brain function and mood.', category: 'Nutrition', emoji: '🐟' },
      { id: '11-3', title: 'Blood Sugar Balance', content: 'Avoid sugar spikes by eating protein with carbs. Stable blood sugar means stable mood.', category: 'Nutrition', emoji: '🍎' },
      { id: '11-4', title: 'Hydration and Mood', content: 'Even mild dehydration affects mood and cognition. Drink water throughout the day.', category: 'Hydration', emoji: '💧' },
      { id: '11-5', title: 'Mindful Food Choices', content: 'Before eating, ask: "Will this food nourish me?" Choose foods that support your wellbeing.', category: 'Mindful Eating', emoji: '🍽️' },
    ],
  },
  // Week 12: Creativity & Joy
  {
    week: 12,
    theme: 'Creativity & Joy',
    tips: [
      { id: '12-1', title: 'Creative Expression', content: 'Engage in a creative activity: draw, write, cook, garden. Creativity is therapeutic.', category: 'Creativity', emoji: '🎨' },
      { id: '12-2', title: 'Play More', content: "Adults need play too. Do something fun without any productive purpose—just for joy.", category: 'Joy', emoji: '🎮' },
      { id: '12-3', title: 'Try Something New', content: 'Novel experiences stimulate the brain and create positive emotions. Take a new route or try a new food.', category: 'Growth', emoji: '🆕' },
      { id: '12-4', title: 'Laughter is Medicine', content: 'Watch something funny, call a friend who makes you laugh. Laughter reduces stress hormones.', category: 'Joy', emoji: '😂' },
      { id: '12-5', title: 'Pursue a Hobby', content: 'Dedicate time weekly to a hobby you love. Hobbies provide flow states and satisfaction.', category: 'Hobbies', emoji: '🎸' },
    ],
  },
  // Week 13: Positive Psychology
  {
    week: 13,
    theme: 'Positive Psychology',
    tips: [
      { id: '13-1', title: 'Strengths Focus', content: 'Identify and use your top strengths daily. Using strengths increases happiness and engagement.', category: 'Strengths', emoji: '💪' },
      { id: '13-2', title: 'Savoring Moments', content: 'When something good happens, pause and really soak it in. Savoring amplifies positive emotions.', category: 'Mindfulness', emoji: '✨' },
      { id: '13-3', title: 'Acts of Kindness', content: 'Do something kind for someone today. Helping others boosts your own happiness.', category: 'Kindness', emoji: '💝' },
      { id: '13-4', title: 'Optimistic Thinking', content: "Challenge negative thoughts. Ask: Is this thought helpful? Is it even true?", category: 'Mindset', emoji: '🌈' },
      { id: '13-5', title: 'Meaningful Connections', content: 'Prioritize deep conversations over surface-level interactions. Quality over quantity in relationships.', category: 'Relationships', emoji: '💬' },
    ],
  },
  // Week 14: Anxiety Management
  {
    week: 14,
    theme: 'Anxiety Management',
    tips: [
      { id: '14-1', title: 'Worry Time', content: "Schedule 15 minutes for worrying. When worries arise outside this time, write them down and save them.", category: 'Anxiety', emoji: '📝' },
      { id: '14-2', title: 'Challenge Catastrophizing', content: "Ask yourself: What's the worst that could happen? How likely is it? Could I cope?", category: 'Cognitive', emoji: '🔍' },
      { id: '14-3', title: 'Grounding Techniques', content: 'Hold something cold or textured. Physical sensations anchor you to the present.', category: 'Grounding', emoji: '🧊' },
      { id: '14-4', title: 'Reduce Caffeine', content: 'Caffeine can mimic anxiety symptoms. If you\'re anxious, try reducing or eliminating it.', category: 'Lifestyle', emoji: '🍵' },
      { id: '14-5', title: 'Acceptance', content: "Sometimes anxiety is there. Fighting it often makes it worse. Accept it's present while knowing it will pass.", category: 'Acceptance', emoji: '🌊' },
    ],
  },
  // Week 15: Resilience Building
  {
    week: 15,
    theme: 'Resilience Building',
    tips: [
      { id: '15-1', title: 'Growth Mindset', content: 'View challenges as opportunities to grow. Difficulties build resilience when approached with curiosity.', category: 'Mindset', emoji: '🌱' },
      { id: '15-2', title: 'Learn from Setbacks', content: 'After a difficult situation, ask: What did I learn? How did I grow? What will I do differently?', category: 'Learning', emoji: '📚' },
      { id: '15-3', title: 'Build a Support Network', content: "You don't have to face challenges alone. Identify people you can reach out to during hard times.", category: 'Support', emoji: '🤝' },
      { id: '15-4', title: 'Future Self Perspective', content: 'Ask: "Will this matter in 5 years?" Most daily stressors won\'t. This perspective brings relief.', category: 'Perspective', emoji: '🔮' },
      { id: '15-5', title: 'Remember Past Resilience', content: 'You\'ve survived 100% of your worst days so far. Remind yourself of past challenges you\'ve overcome.', category: 'Resilience', emoji: '🏆' },
    ],
  },
  // Week 16: Work-Life Balance
  {
    week: 16,
    theme: 'Work-Life Balance',
    tips: [
      { id: '16-1', title: 'Define Work Hours', content: 'Set clear start and end times for work. Blur between work and life increases burnout.', category: 'Boundaries', emoji: '⏰' },
      { id: '16-2', title: 'Take Real Breaks', content: "A break means stepping away completely. Scrolling your phone isn't a real break.", category: 'Rest', emoji: '🌴' },
      { id: '16-3', title: 'Protect Personal Time', content: 'Schedule personal activities like you schedule meetings. Your wellbeing deserves calendar space.', category: 'Planning', emoji: '📅' },
      { id: '16-4', title: 'Create Transition Rituals', content: 'Have a ritual that marks the end of work: a walk, changing clothes, or a shutdown routine.', category: 'Rituals', emoji: '🚪' },
      { id: '16-5', title: 'Disconnect After Hours', content: 'Turn off work notifications after hours. Constant availability isn\'t sustainable.', category: 'Boundaries', emoji: '📴' },
    ],
  },
  // Week 17: Mindfulness Practices
  {
    week: 17,
    theme: 'Mindfulness Practices',
    tips: [
      { id: '17-1', title: 'Body Scan Meditation', content: 'Slowly scan attention through your body, noticing sensations without judgment. This builds body awareness.', category: 'Meditation', emoji: '🧘' },
      { id: '17-2', title: 'Mindful Breathing', content: 'Focus on your breath for 2 minutes. When your mind wanders, gently return attention to breathing.', category: 'Breathing', emoji: '🌬️' },
      { id: '17-3', title: 'Beginner\'s Mind', content: "Approach familiar things with curiosity, as if experiencing them for the first time.", category: 'Perspective', emoji: '👶' },
      { id: '17-4', title: 'Non-Judgmental Awareness', content: 'Notice thoughts and feelings without labeling them good or bad. Just observe.', category: 'Mindfulness', emoji: '👁️' },
      { id: '17-5', title: 'Loving-Kindness Meditation', content: 'Send wishes of wellbeing to yourself, loved ones, and eventually all beings. This builds compassion.', category: 'Compassion', emoji: '💗' },
    ],
  },
  // Week 18: Building Habits
  {
    week: 18,
    theme: 'Building Habits',
    tips: [
      { id: '18-1', title: 'Start Small', content: 'Begin with tiny habits. Want to meditate? Start with 1 minute. Small wins build momentum.', category: 'Habits', emoji: '🐣' },
      { id: '18-2', title: 'Habit Stacking', content: 'Attach a new habit to an existing one. "After I pour my coffee, I will meditate for 2 minutes."', category: 'Habits', emoji: '📚' },
      { id: '18-3', title: 'Environment Design', content: 'Make good habits easy and bad habits hard. Put your yoga mat out; hide the cookies.', category: 'Environment', emoji: '🏠' },
      { id: '18-4', title: 'Track Your Progress', content: "Don't break the chain. Tracking streaks motivates consistency.", category: 'Tracking', emoji: '📊' },
      { id: '18-5', title: 'Identity-Based Habits', content: "Focus on who you want to become. 'I am a person who exercises' is more powerful than 'I want to exercise.'", category: 'Identity', emoji: '🪞' },
    ],
  },
  // Week 19: Managing Difficult Emotions
  {
    week: 19,
    theme: 'Managing Difficult Emotions',
    tips: [
      { id: '19-1', title: 'RAIN Technique', content: 'Recognize the emotion, Allow it to be there, Investigate with kindness, Non-identify (it\'s temporary).', category: 'Emotional Regulation', emoji: '🌧️' },
      { id: '19-2', title: 'Emotion Surfing', content: 'Visualize emotions as waves that rise and fall. You can ride them out without drowning.', category: 'Coping', emoji: '🏄' },
      { id: '19-3', title: 'Healthy Outlets', content: 'Find healthy ways to release emotions: journaling, art, exercise, talking to someone.', category: 'Expression', emoji: '🎨' },
      { id: '19-4', title: 'Self-Soothing', content: 'Develop a toolkit of comforting activities: warm drinks, soft music, cozy blankets.', category: 'Self-Care', emoji: '🛋️' },
      { id: '19-5', title: 'Distress Tolerance', content: 'Sometimes we must tolerate discomfort. Use ice cubes, intense exercise, or cold water on your face.', category: 'Coping', emoji: '💎' },
    ],
  },
  // Week 20: Purpose & Meaning
  {
    week: 20,
    theme: 'Purpose & Meaning',
    tips: [
      { id: '20-1', title: 'Define Your Values', content: 'Identify your core values. Align your actions with these values for a more meaningful life.', category: 'Values', emoji: '🧭' },
      { id: '20-2', title: 'Contribution', content: 'Ask: How can I contribute today? Feeling useful increases sense of purpose.', category: 'Purpose', emoji: '🎁' },
      { id: '20-3', title: 'Legacy Thinking', content: 'Consider what you want to be remembered for. Let this guide your daily choices.', category: 'Purpose', emoji: '⭐' },
      { id: '20-4', title: 'Meaningful Goals', content: 'Set goals that excite you and align with your values, not just obligations.', category: 'Goals', emoji: '🎯' },
      { id: '20-5', title: 'Find Your Ikigai', content: 'Explore the intersection of what you love, what you\'re good at, what the world needs, and what you can be paid for.', category: 'Purpose', emoji: '🔮' },
    ],
  },
  // Week 21: Social Wellness
  {
    week: 21,
    theme: 'Social Wellness',
    tips: [
      { id: '21-1', title: 'Quality over Quantity', content: 'A few deep connections are more beneficial than many superficial ones. Invest in meaningful relationships.', category: 'Relationships', emoji: '💎' },
      { id: '21-2', title: 'Be Vulnerable', content: 'Sharing struggles creates deeper bonds. Vulnerability is strength, not weakness.', category: 'Connection', emoji: '💝' },
      { id: '21-3', title: 'Community Involvement', content: 'Join a group or community aligned with your interests. Belonging supports mental health.', category: 'Community', emoji: '👥' },
      { id: '21-4', title: 'Resolve Conflicts Healthily', content: 'Address issues directly but kindly. Unresolved conflicts drain mental energy.', category: 'Communication', emoji: '🤝' },
      { id: '21-5', title: 'Social Self-Care', content: 'Honor your social needs. Introverts need alone time; extroverts need connection. Both are valid.', category: 'Self-Awareness', emoji: '⚖️' },
    ],
  },
  // Week 22: Cognitive Wellness
  {
    week: 22,
    theme: 'Cognitive Wellness',
    tips: [
      { id: '22-1', title: 'Mental Stimulation', content: 'Challenge your brain with puzzles, learning, or new skills. Mental exercise builds cognitive reserve.', category: 'Brain Health', emoji: '🧩' },
      { id: '22-2', title: 'Reading for Wellbeing', content: 'Read for 20 minutes daily. It reduces stress, improves empathy, and stimulates the mind.', category: 'Learning', emoji: '📖' },
      { id: '22-3', title: 'Cognitive Reframing', content: 'When facing a challenge, ask: "What\'s another way to see this?" Different perspectives offer solutions.', category: 'Thinking', emoji: '🔄' },
      { id: '22-4', title: 'Reduce Decision Fatigue', content: 'Simplify routine decisions: meal prep, lay out clothes. Save mental energy for what matters.', category: 'Efficiency', emoji: '⚡' },
      { id: '22-5', title: 'Information Diet', content: 'Be selective about information you consume. Not all content deserves your mental bandwidth.', category: 'Focus', emoji: '📡' },
    ],
  },
  // Week 23: Body-Mind Connection
  {
    week: 23,
    theme: 'Body-Mind Connection',
    tips: [
      { id: '23-1', title: 'Listen to Your Body', content: 'Your body sends signals: fatigue, tension, butterflies. These are messages. Learn to listen.', category: 'Body Awareness', emoji: '👂' },
      { id: '23-2', title: 'Release Physical Tension', content: 'Emotions are stored in the body. Stretch, massage, or move to release physical manifestations of stress.', category: 'Physical Health', emoji: '💆' },
      { id: '23-3', title: 'Posture and Mood', content: 'Good posture affects mood. Sit tall, shoulders back. Your body language influences your feelings.', category: 'Posture', emoji: '🧍' },
      { id: '23-4', title: 'Breathwork for Regulation', content: 'Slow, deep breathing activates the parasympathetic nervous system, calming your entire being.', category: 'Breathing', emoji: '🌬️' },
      { id: '23-5', title: 'Rest When Needed', content: 'Tiredness isn\'t weakness. Rest is productive—it\'s when your body and mind heal.', category: 'Rest', emoji: '😴' },
    ],
  },
  // Week 24: Seasonal Wellness
  {
    week: 24,
    theme: 'Seasonal Wellness',
    tips: [
      { id: '24-1', title: 'Light Exposure', content: 'Get natural light, especially in the morning. Light affects mood, energy, and sleep.', category: 'Environment', emoji: '☀️' },
      { id: '24-2', title: 'Seasonal Eating', content: 'Eat seasonal, local foods when possible. They\'re fresher, tastier, and connect you to nature\'s rhythms.', category: 'Nutrition', emoji: '🍂' },
      { id: '24-3', title: 'Adapt Your Routine', content: 'Adjust your habits with the seasons. More indoor activities in winter, outdoor in summer.', category: 'Adaptability', emoji: '🔄' },
      { id: '24-4', title: 'Combat SAD', content: 'If darker months affect you, use a light therapy lamp, stay active, and maintain social connections.', category: 'Seasonal Affective', emoji: '💡' },
      { id: '24-5', title: 'Embrace the Season', content: 'Find joy in each season\'s unique offerings: cozy winter evenings, fresh spring air, summer sunshine, autumn colors.', category: 'Mindset', emoji: '🍁' },
    ],
  },
  // Week 25: Gratitude Deep Dive
  {
    week: 25,
    theme: 'Gratitude Deep Dive',
    tips: [
      { id: '25-1', title: 'Gratitude Letters', content: 'Write a letter to someone who positively impacted your life. Share it with them if you can.', category: 'Gratitude', emoji: '✉️' },
      { id: '25-2', title: 'Appreciate the Ordinary', content: "Notice the small blessings: hot coffee, a comfortable bed, clean water. We often overlook these gifts.", category: 'Appreciation', emoji: '☕' },
      { id: '25-3', title: 'Gratitude for Challenges', content: 'Can you find something to appreciate in a difficult situation? Growth, lessons, or resilience?', category: 'Perspective', emoji: '💪' },
      { id: '25-4', title: 'Evening Gratitude', content: 'Before sleep, think of 3 good things from your day. End on a positive note.', category: 'Evening Routine', emoji: '🌙' },
      { id: '25-5', title: 'Gratitude Walk', content: 'Take a walk focusing on things you\'re grateful for: nature, health, ability to move.', category: 'Mindfulness', emoji: '🚶' },
    ],
  },
  // Week 26: Setting Goals
  {
    week: 26,
    theme: 'Setting Goals',
    tips: [
      { id: '26-1', title: 'SMART Goals', content: 'Make goals Specific, Measurable, Achievable, Relevant, and Time-bound for better success.', category: 'Goals', emoji: '🎯' },
      { id: '26-2', title: 'Process over Outcome', content: 'Focus on the process (daily actions) rather than just the outcome. This is more sustainable.', category: 'Mindset', emoji: '🔄' },
      { id: '26-3', title: 'Visual Reminders', content: 'Keep your goals visible. A vision board or simple note reminds you of what you\'re working toward.', category: 'Motivation', emoji: '📌' },
      { id: '26-4', title: 'Accountability Partner', content: 'Share goals with someone who will check in on your progress. Accountability increases follow-through.', category: 'Support', emoji: '🤝' },
      { id: '26-5', title: 'Review and Adjust', content: 'Regularly review your goals. It\'s okay to adjust them as you learn and grow.', category: 'Reflection', emoji: '📝' },
    ],
  },
  // Week 27: Self-Discovery
  {
    week: 27,
    theme: 'Self-Discovery',
    tips: [
      { id: '27-1', title: 'Journaling Prompts', content: 'Use prompts like "What makes me come alive?" or "What do I need right now?" to explore yourself.', category: 'Journaling', emoji: '📔' },
      { id: '27-2', title: 'Personality Assessments', content: 'Tools like MBTI or Enneagram can offer insights. Use them as starting points, not boxes.', category: 'Self-Knowledge', emoji: '🔍' },
      { id: '27-3', title: 'Notice Patterns', content: 'What situations energize you? Drain you? Your patterns reveal your needs and preferences.', category: 'Awareness', emoji: '📊' },
      { id: '27-4', title: 'Try New Things', content: 'You discover yourself through experience. Try activities outside your comfort zone.', category: 'Exploration', emoji: '🆕' },
      { id: '27-5', title: 'Core Needs', content: 'Identify your core needs: connection, autonomy, achievement, security. Prioritize meeting these.', category: 'Needs', emoji: '❤️' },
    ],
  },
  // Week 28: Communication Skills
  {
    week: 28,
    theme: 'Communication Skills',
    tips: [
      { id: '28-1', title: 'I-Statements', content: 'Use "I feel..." instead of "You always...". This reduces defensiveness and improves communication.', category: 'Communication', emoji: '💬' },
      { id: '28-2', title: 'Ask Open Questions', content: 'Questions starting with "What" or "How" invite deeper conversation than yes/no questions.', category: 'Conversation', emoji: '❓' },
      { id: '28-3', title: 'Validate Others', content: 'Before giving advice, validate feelings: "That sounds really hard." People want to feel understood.', category: 'Empathy', emoji: '🤗' },
      { id: '28-4', title: 'Pause Before Responding', content: 'In difficult conversations, pause before responding. React less, respond more thoughtfully.', category: 'Self-Regulation', emoji: '⏸️' },
      { id: '28-5', title: 'Non-Verbal Communication', content: 'Your body language speaks volumes. Maintain eye contact, uncross arms, lean in to show engagement.', category: 'Body Language', emoji: '👀' },
    ],
  },
  // Week 29: Financial Wellness
  {
    week: 29,
    theme: 'Financial Wellness',
    tips: [
      { id: '29-1', title: 'Money and Stress', content: 'Financial stress affects mental health significantly. Even small steps toward financial health help.', category: 'Awareness', emoji: '💰' },
      { id: '29-2', title: 'Budget Basics', content: 'Knowing where your money goes reduces anxiety. Track spending for one month to gain awareness.', category: 'Planning', emoji: '📊' },
      { id: '29-3', title: 'Emergency Fund', content: 'Even a small emergency fund provides peace of mind. Start with $500, then build from there.', category: 'Security', emoji: '🏦' },
      { id: '29-4', title: 'Values-Based Spending', content: 'Spend on what aligns with your values. Cut what doesn\'t. This brings satisfaction, not deprivation.', category: 'Values', emoji: '🧭' },
      { id: '29-5', title: 'Enough Mindset', content: 'Practice contentment with what you have. The hedonic treadmill never ends; gratitude does.', category: 'Mindset', emoji: '✨' },
    ],
  },
  // Week 30: Overcoming Procrastination
  {
    week: 30,
    theme: 'Overcoming Procrastination',
    tips: [
      { id: '30-1', title: 'Understand the Root', content: 'Procrastination often stems from fear, perfectionism, or overwhelm—not laziness. What\'s underneath yours?', category: 'Awareness', emoji: '🔍' },
      { id: '30-2', title: 'Two-Minute Rule', content: 'If something takes less than 2 minutes, do it now. This prevents small tasks from piling up.', category: 'Productivity', emoji: '⏱️' },
      { id: '30-3', title: 'Eat the Frog', content: 'Do the most dreaded task first thing in the morning. Everything else feels easier after.', category: 'Productivity', emoji: '🐸' },
      { id: '30-4', title: 'Break It Down', content: 'Overwhelmed by a big task? Break it into tiny, manageable steps. Just focus on the first one.', category: 'Planning', emoji: '🔨' },
      { id: '30-5', title: 'Forgive Past Procrastination', content: 'Self-criticism makes procrastination worse. Forgive yourself and focus on what you can do now.', category: 'Self-Compassion', emoji: '💚' },
    ],
  },
  // Week 31: Dealing with Change
  {
    week: 31,
    theme: 'Dealing with Change',
    tips: [
      { id: '31-1', title: 'Change is Constant', content: 'The only constant is change. Accepting this truth reduces resistance and suffering.', category: 'Acceptance', emoji: '🔄' },
      { id: '31-2', title: 'Focus on Controllables', content: 'You can\'t control change, but you can control your response. Focus your energy there.', category: 'Control', emoji: '🎯' },
      { id: '31-3', title: 'Allow Grief', content: 'Even positive changes involve loss. Allow yourself to grieve what was while embracing what\'s coming.', category: 'Emotions', emoji: '💔' },
      { id: '31-4', title: 'Seek Support', content: 'You don\'t have to navigate change alone. Reach out to others who understand or can help.', category: 'Support', emoji: '🤝' },
      { id: '31-5', title: 'Find Opportunity', content: 'Ask: "What opportunity does this change present?" There\'s often growth hidden in disruption.', category: 'Growth', emoji: '🌱' },
    ],
  },
  // Week 32: Perfectionism
  {
    week: 32,
    theme: 'Perfectionism',
    tips: [
      { id: '32-1', title: 'Good Enough', content: 'Done is better than perfect. Perfectionism often prevents us from finishing or sharing our work.', category: 'Mindset', emoji: '✅' },
      { id: '32-2', title: 'Embrace Imperfection', content: 'Imperfection is human and beautiful. Japanese Wabi-sabi celebrates the beauty in imperfection.', category: 'Acceptance', emoji: '🎨' },
      { id: '32-3', title: 'Failure as Learning', content: 'Reframe failures as experiments. "I didn\'t fail, I just found what doesn\'t work."', category: 'Growth', emoji: '🔬' },
      { id: '32-4', title: 'Set B+ Goals', content: 'Aim for B+ work sometimes. The extra effort for A+ often isn\'t worth the cost.', category: 'Balance', emoji: '📝' },
      { id: '32-5', title: 'Perfectionism and Worth', content: 'Your worth isn\'t tied to your performance. You are valuable regardless of outcomes.', category: 'Self-Worth', emoji: '💎' },
    ],
  },
  // Week 33: Mindful Technology
  {
    week: 33,
    theme: 'Mindful Technology',
    tips: [
      { id: '33-1', title: 'Intentional Use', content: 'Before picking up your phone, ask: "What am I looking for?" Use technology with purpose.', category: 'Awareness', emoji: '📱' },
      { id: '33-2', title: 'App Audit', content: 'Remove apps that waste time or affect mood negatively. Your phone should serve you, not the opposite.', category: 'Digital Wellness', emoji: '🧹' },
      { id: '33-3', title: 'Grayscale Mode', content: 'Try grayscale mode on your phone. Colors trigger dopamine; grayscale reduces compulsive checking.', category: 'Hack', emoji: '⬛' },
      { id: '33-4', title: 'Phone-Free Morning', content: 'Don\'t check your phone for the first hour of your day. Protect your morning peace.', category: 'Morning Routine', emoji: '🌅' },
      { id: '33-5', title: 'Real Connection First', content: 'In social situations, be present with the people around you. Phones can wait.', category: 'Presence', emoji: '👥' },
    ],
  },
  // Week 34: Healing from the Past
  {
    week: 34,
    theme: 'Healing from the Past',
    tips: [
      { id: '34-1', title: 'Acknowledge Your Story', content: 'Your past experiences are valid. Acknowledging them is the first step to healing.', category: 'Healing', emoji: '📖' },
      { id: '34-2', title: 'You Are Not Your Past', content: 'Your past shaped you but doesn\'t define you. You can write new chapters.', category: 'Identity', emoji: '✏️' },
      { id: '34-3', title: 'Professional Support', content: 'Some wounds need professional help to heal. Seeking therapy is a sign of strength.', category: 'Support', emoji: '🏥' },
      { id: '34-4', title: 'Forgiveness Practice', content: 'Forgiveness is for you, not them. It releases you from carrying anger and hurt.', category: 'Forgiveness', emoji: '🕊️' },
      { id: '34-5', title: 'Reparenting Yourself', content: 'Give yourself what you needed but didn\'t receive. Comfort, validation, encouragement.', category: 'Self-Care', emoji: '💝' },
    ],
  },
  // Week 35: Energy Management
  {
    week: 35,
    theme: 'Energy Management',
    tips: [
      { id: '35-1', title: 'Know Your Peak Times', content: 'When are you most energetic? Schedule important tasks for these peak hours.', category: 'Productivity', emoji: '⚡' },
      { id: '35-2', title: 'Energy Givers vs Takers', content: 'Identify what energizes you (nature, music, certain people) vs. what drains you. Choose wisely.', category: 'Awareness', emoji: '🔋' },
      { id: '35-3', title: 'Strategic Rest', content: 'Rest before you\'re exhausted. Proactive rest prevents burnout better than reactive rest.', category: 'Rest', emoji: '🛌' },
      { id: '35-4', title: 'Batch Similar Tasks', content: 'Group similar tasks together. Context-switching drains energy.', category: 'Efficiency', emoji: '📦' },
      { id: '35-5', title: 'Energy Audit', content: 'Track your energy levels for a week. Notice patterns and adjust your lifestyle accordingly.', category: 'Tracking', emoji: '📊' },
    ],
  },
  // Week 36: Self-Expression
  {
    week: 36,
    theme: 'Self-Expression',
    tips: [
      { id: '36-1', title: 'Find Your Voice', content: 'Everyone has something unique to offer. What\'s yours? Share it with the world.', category: 'Authenticity', emoji: '🎤' },
      { id: '36-2', title: 'Creative Outlets', content: 'Expression doesn\'t have to be art. It could be cooking, gardening, or how you decorate your space.', category: 'Creativity', emoji: '🎨' },
      { id: '36-3', title: 'Write Without Rules', content: 'Free-write for 10 minutes. No editing, no judgment. Just let thoughts flow onto the page.', category: 'Writing', emoji: '✍️' },
      { id: '36-4', title: 'Express Emotions', content: 'Find healthy ways to express all emotions, including difficult ones. Suppression causes harm.', category: 'Emotional Health', emoji: '🎭' },
      { id: '36-5', title: 'Authentic Style', content: 'Dress in a way that feels like you. External expression can support internal identity.', category: 'Identity', emoji: '👗' },
    ],
  },
  // Week 37: Dealing with Criticism
  {
    week: 37,
    theme: 'Dealing with Criticism',
    tips: [
      { id: '37-1', title: 'Separate Feedback from Self', content: 'Criticism is about behavior or work, not your worth as a person. Separate the two.', category: 'Perspective', emoji: '🔍' },
      { id: '37-2', title: 'Consider the Source', content: 'Is this person qualified to give this feedback? Does their opinion actually matter?', category: 'Discernment', emoji: '🤔' },
      { id: '37-3', title: 'Find the Grain of Truth', content: 'Even harsh criticism may contain something useful. Look for what you can learn.', category: 'Growth', emoji: '💎' },
      { id: '37-4', title: 'Don\'t Internalize Unfair Criticism', content: 'Not all criticism is valid. Some says more about the critic than about you.', category: 'Boundaries', emoji: '🛡️' },
      { id: '37-5', title: 'Self-Validate', content: 'You don\'t need others to validate your worth or work. Practice self-validation.', category: 'Self-Worth', emoji: '💚' },
    ],
  },
  // Week 38: Cultivating Patience
  {
    week: 38,
    theme: 'Cultivating Patience',
    tips: [
      { id: '38-1', title: 'Trust the Process', content: 'Good things take time. Trust that you\'re making progress even when you can\'t see it.', category: 'Trust', emoji: '🌱' },
      { id: '38-2', title: 'Reframe Waiting', content: 'Instead of "waiting," think of it as "preparing." This time has purpose.', category: 'Mindset', emoji: '⏳' },
      { id: '38-3', title: 'Practice in Small Moments', content: 'Use small frustrations (traffic, lines) as patience training. These build the muscle.', category: 'Practice', emoji: '🚗' },
      { id: '38-4', title: 'Patience with Yourself', content: 'Growth isn\'t linear. Be patient with your own journey and setbacks.', category: 'Self-Compassion', emoji: '💝' },
      { id: '38-5', title: 'Long-term Thinking', content: 'Consider the long view. Most things that frustrate us today won\'t matter in a year.', category: 'Perspective', emoji: '🔭' },
    ],
  },
  // Week 39: Building Confidence
  {
    week: 39,
    theme: 'Building Confidence',
    tips: [
      { id: '39-1', title: 'Action Builds Confidence', content: 'Don\'t wait to feel confident before acting. Action creates confidence, not the other way around.', category: 'Action', emoji: '🚀' },
      { id: '39-2', title: 'Acknowledge Achievements', content: 'Keep a list of accomplishments. Review it when you doubt yourself.', category: 'Recognition', emoji: '🏆' },
      { id: '39-3', title: 'Prepare Well', content: 'Preparation reduces anxiety and builds confidence. Know your stuff before important events.', category: 'Preparation', emoji: '📚' },
      { id: '39-4', title: 'Power Poses', content: 'Research shows expansive postures can boost confidence. Stand tall before challenging situations.', category: 'Body Language', emoji: '💪' },
      { id: '39-5', title: 'Speak to Yourself Like a Friend', content: 'Replace self-criticism with encouragement. "You\'ve got this" instead of "You\'ll fail."', category: 'Self-Talk', emoji: '💬' },
    ],
  },
  // Week 40: Embracing Solitude
  {
    week: 40,
    theme: 'Embracing Solitude',
    tips: [
      { id: '40-1', title: 'Alone vs. Lonely', content: 'Solitude is chosen; loneliness is not. Learn to enjoy your own company.', category: 'Perspective', emoji: '🧘' },
      { id: '40-2', title: 'Solitude for Creativity', content: 'Some of our best ideas come in solitude. Give yourself quiet time to think.', category: 'Creativity', emoji: '💡' },
      { id: '40-3', title: 'Digital Solitude', content: 'True solitude means disconnecting from digital noise too. Try it occasionally.', category: 'Disconnection', emoji: '📴' },
      { id: '40-4', title: 'Solo Activities', content: 'Try activities alone: dining, movies, walks. It builds self-reliance and self-knowledge.', category: 'Independence', emoji: '🎬' },
      { id: '40-5', title: 'Recharge Time', content: 'Especially for introverts, solitude is essential for recharging. Honor this need.', category: 'Self-Care', emoji: '🔋' },
    ],
  },
  // Week 41: Mindful Relationships
  {
    week: 41,
    theme: 'Mindful Relationships',
    tips: [
      { id: '41-1', title: 'Choose Consciously', content: 'Be intentional about who you spend time with. Relationships should add to your life.', category: 'Choices', emoji: '🤝' },
      { id: '41-2', title: 'Give Without Keeping Score', content: 'Healthy relationships aren\'t transactional. Give freely without expecting immediate returns.', category: 'Generosity', emoji: '🎁' },
      { id: '41-3', title: 'Accept Imperfection', content: 'No relationship is perfect. Accept others\' flaws as you\'d want yours accepted.', category: 'Acceptance', emoji: '💝' },
      { id: '41-4', title: 'Regular Check-ins', content: 'Have regular meaningful conversations with loved ones about how things are going.', category: 'Communication', emoji: '💬' },
      { id: '41-5', title: 'Grow Together', content: 'Support each other\'s growth, even when it means change. Healthy relationships evolve.', category: 'Growth', emoji: '🌱' },
    ],
  },
  // Week 42: Living with Uncertainty
  {
    week: 42,
    theme: 'Living with Uncertainty',
    tips: [
      { id: '42-1', title: 'Embrace Not Knowing', content: 'Life is inherently uncertain. Accepting this reduces anxiety about the unknown.', category: 'Acceptance', emoji: '🌫️' },
      { id: '42-2', title: 'Focus on Today', content: 'The future is uncertain, but today is here. What can you do today?', category: 'Present Focus', emoji: '📅' },
      { id: '42-3', title: 'Flexible Planning', content: 'Make plans but hold them loosely. Be ready to adapt when circumstances change.', category: 'Adaptability', emoji: '🔄' },
      { id: '42-4', title: 'Trust Your Resilience', content: 'You\'ve handled unexpected situations before. Trust that you\'ll handle future ones too.', category: 'Confidence', emoji: '💪' },
      { id: '42-5', title: 'Find Stability Within', content: 'External circumstances change. Build inner stability through values, purpose, and self-knowledge.', category: 'Inner Peace', emoji: '⚓' },
    ],
  },
  // Week 43: Celebrating Yourself
  {
    week: 43,
    theme: 'Celebrating Yourself',
    tips: [
      { id: '43-1', title: 'Acknowledge Progress', content: 'Look how far you\'ve come. Celebrate your growth, not just achievements.', category: 'Recognition', emoji: '🎉' },
      { id: '43-2', title: 'Treat Yourself', content: 'You don\'t need a special occasion. Sometimes treat yourself just because.', category: 'Self-Care', emoji: '🍰' },
      { id: '43-3', title: 'Own Your Strengths', content: 'Knowing your strengths isn\'t arrogance. Own what you\'re good at without apology.', category: 'Confidence', emoji: '💪' },
      { id: '43-4', title: 'Self-Celebration Ritual', content: 'Create a personal ritual for celebrating wins: journaling, small rewards, or sharing with a friend.', category: 'Rituals', emoji: '🏆' },
      { id: '43-5', title: 'Comparison Detox', content: 'Celebrate your unique journey. Comparing to others steals joy from your accomplishments.', category: 'Mindset', emoji: '✨' },
    ],
  },
  // Week 44: Mind-Body Practices
  {
    week: 44,
    theme: 'Mind-Body Practices',
    tips: [
      { id: '44-1', title: 'Yoga for Mental Health', content: 'Yoga combines movement, breath, and mindfulness. Even 10 minutes benefits mental health.', category: 'Yoga', emoji: '🧘' },
      { id: '44-2', title: 'Tai Chi', content: 'This gentle martial art reduces stress and improves balance and focus. Consider trying it.', category: 'Movement', emoji: '🥋' },
      { id: '44-3', title: 'Qi Gong', content: 'These ancient Chinese exercises cultivate energy and calm. Many free videos are available online.', category: 'Energy', emoji: '⚡' },
      { id: '44-4', title: 'Somatic Practices', content: 'Trauma and stress are stored in the body. Somatic exercises help release them.', category: 'Healing', emoji: '💆' },
      { id: '44-5', title: 'Mindful Movement', content: 'Any movement can be mindful. Focus on sensations as you walk, swim, or exercise.', category: 'Mindfulness', emoji: '🏃' },
    ],
  },
  // Week 45: Rest & Recovery
  {
    week: 45,
    theme: 'Rest & Recovery',
    tips: [
      { id: '45-1', title: 'Rest is Productive', content: 'Rest isn\'t laziness—it\'s essential for productivity, creativity, and health.', category: 'Mindset', emoji: '🛋️' },
      { id: '45-2', title: 'Types of Rest', content: 'There are many types: physical, mental, emotional, social, creative. Which do you need most?', category: 'Awareness', emoji: '🔋' },
      { id: '45-3', title: 'Sacred Rest Time', content: 'Schedule rest like you schedule work. Protect this time fiercely.', category: 'Planning', emoji: '📅' },
      { id: '45-4', title: 'Guilt-Free Rest', content: 'Release guilt about resting. You deserve rest regardless of what you\'ve accomplished.', category: 'Self-Compassion', emoji: '💚' },
      { id: '45-5', title: 'Active Recovery', content: 'Rest can be active: gentle walks, stretching, hobbies. It\'s about doing things that restore you.', category: 'Recovery', emoji: '🌸' },
    ],
  },
  // Week 46: Letting Go
  {
    week: 46,
    theme: 'Letting Go',
    tips: [
      { id: '46-1', title: 'Let Go of Control', content: 'You can\'t control everything. Focus energy on what you can influence and release the rest.', category: 'Acceptance', emoji: '🎈' },
      { id: '46-2', title: 'Release Expectations', content: 'Expectations often lead to disappointment. Approach life with openness instead.', category: 'Mindset', emoji: '🌬️' },
      { id: '46-3', title: 'Let Go of Grudges', content: 'Holding grudges hurts you more than the other person. For your sake, consider releasing them.', category: 'Forgiveness', emoji: '🕊️' },
      { id: '46-4', title: 'Declutter Your Space', content: 'Physical clutter affects mental clarity. Let go of items that no longer serve you.', category: 'Environment', emoji: '🧹' },
      { id: '46-5', title: 'Let Go of "Should"', content: '"Should" creates guilt and pressure. Replace "I should" with "I choose to" or "I want to."', category: 'Language', emoji: '✨' },
    ],
  },
  // Week 47: Finding Joy
  {
    week: 47,
    theme: 'Finding Joy',
    tips: [
      { id: '47-1', title: 'Joy vs. Happiness', content: 'Happiness depends on circumstances; joy is a deeper contentment. Cultivate joy within.', category: 'Mindset', emoji: '☀️' },
      { id: '47-2', title: 'Notice Small Joys', content: 'Joy is often in small moments: sunlight, good food, laughter. Attune to these.', category: 'Awareness', emoji: '✨' },
      { id: '47-3', title: 'Create Joy Rituals', content: 'Build regular joyful practices into your life: morning coffee ritual, evening walk, weekly hobby.', category: 'Rituals', emoji: '🎉' },
      { id: '47-4', title: 'Share Joy', content: 'Joy multiplies when shared. Celebrate good news with others.', category: 'Connection', emoji: '💝' },
      { id: '47-5', title: 'Joy List', content: 'Create a list of things that bring you joy. Reference it when you need a boost.', category: 'Planning', emoji: '📝' },
    ],
  },
  // Week 48: Integration & Balance
  {
    week: 48,
    theme: 'Integration & Balance',
    tips: [
      { id: '48-1', title: 'Whole Life Balance', content: 'Balance isn\'t perfect equilibrium. It\'s attending to all important life areas over time.', category: 'Balance', emoji: '⚖️' },
      { id: '48-2', title: 'Integrate Wellness', content: 'Wellness isn\'t separate from life. Integrate healthy habits into your daily routines.', category: 'Integration', emoji: '🔄' },
      { id: '48-3', title: 'Review Your Priorities', content: 'Regularly check: Does how you spend your time reflect your true priorities?', category: 'Reflection', emoji: '🔍' },
      { id: '48-4', title: 'Seasons of Focus', content: 'Different seasons of life require different focus. Accept that balance shifts.', category: 'Acceptance', emoji: '🍂' },
      { id: '48-5', title: 'Sustainable Practices', content: 'Choose wellness practices you can maintain long-term. Consistency beats intensity.', category: 'Sustainability', emoji: '🌱' },
    ],
  },
  // Week 49: Reflection & Review
  {
    week: 49,
    theme: 'Reflection & Review',
    tips: [
      { id: '49-1', title: 'Weekly Review', content: 'Set aside time weekly to reflect: What worked? What didn\'t? What will I do differently?', category: 'Reflection', emoji: '📋' },
      { id: '49-2', title: 'Monthly Check-In', content: 'Once a month, review your goals and wellbeing. Are you on track? Need adjustments?', category: 'Review', emoji: '📅' },
      { id: '49-3', title: 'Celebrate Growth', content: 'Reflect on how you\'ve grown. Even small growth is significant.', category: 'Recognition', emoji: '🎉' },
      { id: '49-4', title: 'Learn from Challenges', content: 'Review difficult times. What did they teach you? How did you grow?', category: 'Learning', emoji: '📚' },
      { id: '49-5', title: 'Gratitude Reflection', content: 'Look back at what you\'re grateful for. Reflection deepens appreciation.', category: 'Gratitude', emoji: '🙏' },
    ],
  },
  // Week 50: Future Planning
  {
    week: 50,
    theme: 'Future Planning',
    tips: [
      { id: '50-1', title: 'Vision for Next Year', content: 'What do you want next year to look like? Dream big, then plan small steps.', category: 'Vision', emoji: '🔮' },
      { id: '50-2', title: 'Word of the Year', content: 'Choose a word to guide your coming year: growth, peace, adventure, connection.', category: 'Intention', emoji: '✨' },
      { id: '50-3', title: 'Wellness Goals', content: 'Set specific, achievable wellness goals for the coming months. Small, consistent steps.', category: 'Goals', emoji: '🎯' },
      { id: '50-4', title: 'Anticipate Challenges', content: 'What obstacles might you face? Plan strategies to overcome them.', category: 'Planning', emoji: '🛡️' },
      { id: '50-5', title: 'Build Support Systems', content: 'Who will support your wellness journey? Identify and engage your support network.', category: 'Support', emoji: '🤝' },
    ],
  },
  // Week 51: Gratitude Finale
  {
    week: 51,
    theme: 'Gratitude Finale',
    tips: [
      { id: '51-1', title: 'Year-End Gratitude', content: 'List everything you\'re grateful for from this year: people, experiences, growth, lessons.', category: 'Gratitude', emoji: '🙏' },
      { id: '51-2', title: 'Thank Those Who Helped', content: 'Reach out to people who supported you this year. Express your appreciation.', category: 'Connection', emoji: '💌' },
      { id: '51-3', title: 'Grateful for Yourself', content: 'Thank yourself for showing up, for trying, for growing. You did your best.', category: 'Self-Appreciation', emoji: '💚' },
      { id: '51-4', title: 'Grateful for Challenges', content: 'Even difficult times brought growth. Find gratitude in the lessons learned.', category: 'Perspective', emoji: '🌱' },
      { id: '51-5', title: 'Gratitude Carries Forward', content: 'Let the gratitude you\'ve cultivated carry into the new year and beyond.', category: 'Continuation', emoji: '⭐' },
    ],
  },
  // Week 52: New Beginnings
  {
    week: 52,
    theme: 'New Beginnings',
    tips: [
      { id: '52-1', title: 'Fresh Start Mindset', content: 'Every moment is an opportunity for a fresh start. You don\'t need January 1st to begin again.', category: 'Mindset', emoji: '🌅' },
      { id: '52-2', title: 'Release and Renew', content: 'Let go of what no longer serves you. Make space for new growth and possibilities.', category: 'Release', emoji: '🦋' },
      { id: '52-3', title: 'Commit to Yourself', content: 'Your biggest commitment should be to your own wellbeing. Everything else follows.', category: 'Commitment', emoji: '💪' },
      { id: '52-4', title: 'One Day at a Time', content: 'Don\'t overwhelm yourself with the whole year. Focus on today, this week, this moment.', category: 'Present Focus', emoji: '📅' },
      { id: '52-5', title: 'You\'ve Got This', content: 'You have everything you need within you. Trust yourself on this wellness journey.', category: 'Encouragement', emoji: '🌟' },
    ],
  },
];

// Calculate current week based on start of year
const getCurrentWeekNumber = (): number => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return weekNumber;
};

// Get the tips for the current week (cycles through 52 weeks)
const getWeeklyTips = (): WeeklyTips => {
  const currentWeek = getCurrentWeekNumber();
  const weekIndex = ((currentWeek - 1) % allWeeklyTips.length);
  return allWeeklyTips[weekIndex];
};

export const TipsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Get current week's tips
  const weeklyTips = useMemo(() => getWeeklyTips(), []);
  const currentWeekNumber = useMemo(() => getCurrentWeekNumber(), []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Wellness Tips</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Week Badge */}
        <View style={[styles.weekBadge, { backgroundColor: colors.primary.main }]}>
          <Text style={styles.weekBadgeText}>Week {currentWeekNumber}</Text>
        </View>

        {/* Theme Title */}
        <Text style={[styles.themeTitle, { color: colors.text.primary }]}>
          {weeklyTips.theme}
        </Text>

        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Simple practices for a healthier mind
        </Text>

        {weeklyTips.tips.map((tip) => (
          <View
            key={tip.id}
            style={[styles.tipCard, { backgroundColor: colors.background.card }]}
          >
            <View style={styles.tipHeader}>
              <Text style={styles.tipEmoji}>{tip.emoji}</Text>
              <View style={styles.tipMeta}>
                <Text style={[styles.tipTitle, { color: colors.text.primary }]}>
                  {tip.title}
                </Text>
                <Text style={styles.tipCategory}>{tip.category}</Text>
              </View>
            </View>
            <Text style={[styles.tipContent, { color: colors.text.secondary }]}>
              {tip.content}
            </Text>
          </View>
        ))}

        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: colors.text.tertiary }]}>
            💡 New tips every week • 52 weeks of wellness
          </Text>
          <Text style={[styles.footerSubtext, { color: colors.text.tertiary }]}>
            Come back next week for "{allWeeklyTips[(currentWeekNumber) % allWeeklyTips.length].theme}"
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  weekBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  weekBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  themeTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  tipMeta: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipCategory: {
    fontSize: 12,
    color: '#9EB567',
    fontWeight: '500',
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 21,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 13,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default TipsScreen;
