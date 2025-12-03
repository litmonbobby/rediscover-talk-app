/**
 * Family Screen - Build Strong Family Bonds
 * Tips regenerate weekly, Activities/Games bi-weekly, Articles monthly
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

export type FamilyStackParamList = {
  Family: undefined;
  FamilyTips: undefined;
  FamilyArticles: undefined;
  FamilyActivities: undefined;
  FamilyGames: undefined;
  ArticleDetail: { article: Article };
  TipDetail: { tip: Tip };
  ActivityDetail: { activity: Activity };
  GameDetail: { game: Game };
};

type NavigationProp = NativeStackNavigationProp<FamilyStackParamList, 'Family'>;

// Figma-extracted assets
const assets = {
  logo: require('../../../assets/images/conversation-logo.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
};

// Icons
const HeartIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UsersIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2} />
    <Path
      d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GameIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 12h4M8 10v4M15 13h.01M18 11h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.152A4 4 0 0 0 17.32 5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LightbulbIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.725V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.275A7 7 0 0 0 12 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Data Types
export interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  fullContent: string;
}

export interface Activity {
  id: string;
  title: string;
  duration: string;
  participants: string;
  description: string;
  instructions: string[];
}

export interface Game {
  id: string;
  title: string;
  players: string;
  ageRange: string;
  description: string;
  howToPlay: string[];
}

export interface Article {
  id: string;
  title: string;
  readTime: string;
  category: string;
  preview: string;
  content: string;
}

// Full Content Database - Tips (regenerate weekly)
const allTips: Tip[] = [
  { id: '1', title: 'Daily Check-ins', description: 'Spend 10 minutes each day asking about each family member\'s day', category: 'Communication', fullContent: 'Set aside 10 minutes each evening to ask each family member about their day. Use open-ended questions like "What was the best part of your day?" This creates a safe space for sharing.' },
  { id: '2', title: 'Screen-Free Meals', description: 'Make mealtimes device-free for better conversations', category: 'Quality Time', fullContent: 'Designate all mealtimes as screen-free zones. Put phones in a basket and focus on meaningful conversations.' },
  { id: '3', title: 'Weekly Family Meetings', description: 'Schedule regular family meetings to discuss plans', category: 'Communication', fullContent: 'Hold a 30-minute family meeting once a week. Create an agenda that includes celebrations, concerns, and upcoming plans.' },
  { id: '4', title: 'Express Gratitude', description: 'Share one thing you\'re grateful for daily', category: 'Appreciation', fullContent: 'Make gratitude a daily habit. At dinner, have each person share one thing they appreciate about another family member.' },
  { id: '5', title: 'Create Traditions', description: 'Establish unique family traditions', category: 'Bonding', fullContent: 'Create special traditions unique to your family - movie nights, Sunday brunches, or monthly adventures.' },
  { id: '6', title: 'Active Listening', description: 'Practice listening without interrupting', category: 'Communication', fullContent: 'When a family member is speaking, give them your full attention. Put down devices and make eye contact.' },
  { id: '7', title: 'One-on-One Time', description: 'Spend individual time with each member', category: 'Quality Time', fullContent: 'Schedule regular one-on-one time with each family member. This could be a weekly coffee date or a shared hobby.' },
  { id: '8', title: 'Celebrate Small Wins', description: 'Acknowledge everyday achievements', category: 'Appreciation', fullContent: 'Don\'t wait for big milestones to celebrate. Acknowledge small achievements like good grades or acts of kindness.' },
  { id: '9', title: 'Family Game Night', description: 'Dedicate one night a week to games', category: 'Bonding', fullContent: 'Pick one night a week for family games. Rotate who chooses the game to keep everyone engaged.' },
  { id: '10', title: 'Share Family Stories', description: 'Tell stories about family history', category: 'Bonding', fullContent: 'Share stories about grandparents, family adventures, and how you met. These stories build identity and connection.' },
  { id: '11', title: 'Practice Patience', description: 'Take a breath before reacting', category: 'Communication', fullContent: 'When tensions rise, practice taking a deep breath before responding. Model calm communication for your children.' },
  { id: '12', title: 'Create a Family Motto', description: 'Develop a phrase that represents your values', category: 'Bonding', fullContent: 'Work together to create a family motto that reflects your shared values. Use it to guide decisions.' },
];

// Full Content Database - Activities (regenerate bi-weekly)
const allActivities: Activity[] = [
  { id: '1', title: 'Gratitude Circle', duration: '15 min', participants: '2-10', description: 'Share what you\'re grateful for', instructions: ['Gather everyone in a circle', 'Each person shares 3 things they\'re grateful for', 'Listen without interrupting', 'Go around twice for deeper sharing'] },
  { id: '2', title: 'Rose, Bud, Thorn', duration: '20 min', participants: '2-8', description: 'Share highs, lows, and hopes', instructions: ['Rose: Share something positive', 'Thorn: Share a challenge', 'Bud: Share something you\'re looking forward to', 'Everyone takes turns'] },
  { id: '3', title: 'Family Story Time', duration: '30 min', participants: '2-10', description: 'Read and discuss together', instructions: ['Choose a book everyone will enjoy', 'Take turns reading aloud', 'Pause to discuss interesting parts', 'Ask questions about the story'] },
  { id: '4', title: 'Dream Discussion', duration: '25 min', participants: '2-6', description: 'Share goals and dreams', instructions: ['Each person shares a dream or goal', 'Others ask supportive questions', 'Brainstorm how to achieve dreams', 'Offer encouragement'] },
  { id: '5', title: 'Memory Lane', duration: '20 min', participants: '2-10', description: 'Share favorite family memories', instructions: ['Each person shares a favorite memory', 'Describe what made it special', 'Others can add perspective', 'Look at photos if available'] },
  { id: '6', title: 'Appreciation Express', duration: '15 min', participants: '3-8', description: 'Express appreciation for each other', instructions: ['One person sits in the "hot seat"', 'Everyone shares what they appreciate', 'The person just listens', 'Rotate until everyone goes'] },
  { id: '7', title: 'Future Family Planning', duration: '30 min', participants: '2-8', description: 'Plan family adventures together', instructions: ['Brainstorm activities to do together', 'Everyone suggests ideas', 'Vote on favorites', 'Create a plan'] },
  { id: '8', title: 'Feelings Check-In', duration: '15 min', participants: '2-6', description: 'Share and validate emotions', instructions: ['Each person names their emotion', 'Share what\'s causing that feeling', 'Others listen and validate', 'Offer support if wanted'] },
  { id: '9', title: 'Compliment Chain', duration: '10 min', participants: '3-10', description: 'Give genuine compliments', instructions: ['Sit in a circle', 'One person compliments the next', 'Continue around the circle', 'End with group appreciation'] },
  { id: '10', title: 'Family Vision Board', duration: '45 min', participants: '2-8', description: 'Create a visual of family goals', instructions: ['Gather magazines and supplies', 'Cut out images representing goals', 'Arrange and glue to board', 'Display prominently'] },
];

// Full Content Database - Games (regenerate bi-weekly)
const allGames: Game[] = [
  { id: '1', title: 'Would You Rather', players: '2+', ageRange: 'All ages', description: 'Fun question game for everyone', howToPlay: ['One person asks a "Would you rather" question', 'Example: "Fly or be invisible?"', 'Everyone answers and explains', 'Take turns asking'] },
  { id: '2', title: 'Two Truths & A Lie', players: '3+', ageRange: '8+', description: 'Guess which statement is false', howToPlay: ['Share 3 statements about yourself', 'Two true, one is a lie', 'Others guess the lie', 'Reveal and rotate'] },
  { id: '3', title: 'Family Trivia', players: '2+', ageRange: 'All ages', description: 'Test family knowledge', howToPlay: ['Ask questions about family members', 'Example: "What\'s Mom\'s favorite food?"', 'Keep score if wanted', 'Learn new things!'] },
  { id: '4', title: 'Charades', players: '4+', ageRange: '6+', description: 'Act out words without speaking', howToPlay: ['Act out a word or phrase silently', 'Others try to guess', 'Use categories: movies, animals', 'No talking or pointing!'] },
  { id: '5', title: 'Story Building', players: '2+', ageRange: 'All ages', description: 'Create stories together', howToPlay: ['One person starts with one sentence', 'Next person adds a sentence', 'Keep going around', 'See where imagination takes you!'] },
  { id: '6', title: '20 Questions', players: '2+', ageRange: '6+', description: 'Guess what I\'m thinking of', howToPlay: ['One person thinks of something', 'Others ask yes/no questions', 'You get 20 questions', 'Whoever guesses goes next'] },
  { id: '7', title: 'This or That', players: '2+', ageRange: 'All ages', description: 'Quick preference choices', howToPlay: ['Ask a "this or that" question', 'Example: "Beach or mountains?"', 'Everyone answers quickly', 'Learn about preferences!'] },
  { id: '8', title: 'Alphabet Game', players: '2+', ageRange: '5+', description: 'Name things in a category A-Z', howToPlay: ['Choose a category', 'Name items starting with A, B, C...', 'Can\'t think? You\'re out', 'Last person wins!'] },
  { id: '9', title: 'Never Have I Ever', players: '3+', ageRange: '10+', description: 'Discover what others have done', howToPlay: ['Say "Never have I ever..."', 'Others who have done it raise hands', 'Share stories if comfortable', 'Keep it family-friendly!'] },
  { id: '10', title: 'Finish My Sentence', players: '2+', ageRange: 'All ages', description: 'Complete each other\'s thoughts', howToPlay: ['Start a sentence', 'Next person finishes it', 'Can be silly or serious', 'See how well you know each other!'] },
];

// Full Content Database - Articles (regenerate monthly)
const allArticles: Article[] = [
  {
    id: '1',
    title: 'Building Trust with Your Teen',
    readTime: '5 min',
    category: 'Parenting',
    preview: 'Trust is the foundation of any relationship with teenagers.',
    content: `Trust is built through consistent actions, not words. This fundamental truth becomes especially important during the teenage years when your child is developing their independence and identity.

Start by being reliable in small things. If you say you'll pick them up at 3 PM, be there at 3 PM. If you promise to attend their game, show up. These small acts of reliability accumulate into a foundation of trust that will support you both through more challenging times.

Listen without immediate judgment when your teen shares with you, even if what they're saying concerns you or you disagree. The moment you react with shock, anger, or disappointment, you close the door to future conversations. Instead, take a breath, thank them for sharing, and ask questions to understand their perspective better.

Respect their privacy while maintaining appropriate boundaries. Knock before entering their room. Don't read their messages unless you have genuine safety concerns. Show them that you trust them until they give you a reason not to. This respect teaches them to value both their own privacy and others'.

Share your own experiences and mistakes. Vulnerability builds connection. When appropriate, tell them about times you struggled, made mistakes, or felt uncertain. This shows them that imperfection is human and that they can come to you without fear of judgment.

Remember that trust takes time to build but can be damaged quickly. Be patient and consistent. When trust is broken, acknowledge it openly and work together to rebuild it. This process itself teaches valuable lessons about relationships and accountability.

Finally, keep your word about consequences too. If you've set a boundary and they cross it, follow through consistently. Inconsistent enforcement erodes trust just as much as broken promises do. Your teen needs to know that your words mean something.`
  },
  {
    id: '2',
    title: 'Quality Time vs Quantity Time',
    readTime: '4 min',
    category: 'Relationships',
    preview: 'Discover why quality matters more than quantity.',
    content: `Research consistently shows that focused, quality interactions have more impact on family relationships than simply being in the same room for extended periods.

Quality time means being fully present. Put away your phone. Turn off the TV. Make eye contact. Listen actively to what your family members are saying. When you give someone your complete attention, even for just fifteen minutes, they feel valued and loved in ways that hours of distracted presence cannot achieve.

It's about engaging in activities that everyone enjoys and that promote genuine connection. This doesn't mean expensive outings or elaborate plans. A walk around the block, cooking dinner together, or playing a quick card game can be profoundly meaningful when you're fully engaged.

Studies show that even 15 minutes of quality time daily can strengthen family bonds more than hours of distracted togetherness. Those fifteen minutes of genuine connection build emotional security that lasts throughout the day and beyond.

Create rituals that guarantee quality time. Maybe it's breakfast together every Saturday morning, or a bedtime routine where you talk about the day. These predictable moments of connection become anchors that family members look forward to and rely on.

Be intentional about reducing distractions during your quality time. Consider establishing device-free zones or times. When everyone agrees to disconnect from screens, you create space for the kind of spontaneous, meaningful conversations that deepen relationships.

Quality time also means being emotionally available, not just physically present. If you're stressed or preoccupied, acknowledge it honestly rather than going through the motions. It's better to say "I need twenty minutes to decompress, then I'm all yours" than to be there in body but absent in spirit.`
  },
  {
    id: '3',
    title: 'Managing Family Conflict',
    readTime: '6 min',
    category: 'Communication',
    preview: 'Learn healthy ways to address disagreements.',
    content: `Conflict is normal in every family and can actually be healthy when handled well. Disagreements offer opportunities for growth, deeper understanding, and stronger relationships—if we approach them constructively.

Start by acknowledging that everyone's feelings are valid, even when you disagree with their perspective or behavior. Saying "I understand you're frustrated" doesn't mean you're agreeing with everything they've done. It means you recognize their emotional experience as real and worthy of attention.

Use "I" statements instead of "you" accusations. Compare "I feel hurt when plans change without notice" to "You never tell me anything." The first invites dialogue; the second triggers defensiveness. Taking ownership of your feelings opens space for the other person to hear you without feeling attacked.

Know when to take breaks. If emotions are running high and productive conversation isn't possible, it's okay—even wise—to say "I need to calm down before we continue this conversation." Agree on a time to return to the discussion, and honor that commitment. Walking away without a plan to return can feel like abandonment.

Focus on the specific issue at hand rather than attacking the person's character. "The dishes weren't done" is addressable. "You're so lazy and irresponsible" is an attack that escalates conflict and damages relationships. Stick to behaviors and their impact rather than making sweeping judgments about who someone is.

Look for win-win solutions rather than trying to "win" the argument. In families, if someone wins and someone loses, the relationship often loses too. Approach conflicts as problems to solve together rather than battles to win. Ask "How can we handle this differently next time?" rather than demanding an apology or admission of fault.

Model healthy conflict resolution for your children—they're watching and learning. How you handle disagreements with your partner, with them, and with others teaches them how relationships work. They learn whether it's safe to disagree, how to express frustration, and how to repair after ruptures.

Finally, always repair after conflict. Apologize for your part, even if you weren't entirely wrong. Reconnect through small gestures of affection or kindness. Let family members know that disagreements don't diminish your love. This teaches that relationships can survive conflict and even grow stronger through it.`
  },
  {
    id: '4',
    title: 'Creating Family Traditions',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Explore meaningful traditions for your family.',
    content: `Traditions create a sense of belonging, security, and identity that children carry with them throughout their lives. They answer the fundamental question "Who are we as a family?" in concrete, memorable ways.

The best news is that traditions don't need to be elaborate or expensive. Simple rituals like Friday pizza night, Sunday morning pancakes, or annual birthday breakfast in bed create lasting memories and give family members something to anticipate and cherish.

Involve everyone in creating and choosing traditions. When children have input into family rituals, they feel ownership and are more likely to participate enthusiastically. Ask what activities they love, what foods feel special, what experiences they want to repeat. Their ideas might surprise you.

Be flexible and willing to evolve traditions as children grow. The traditions that delighted a five-year-old may embarrass a fifteen-year-old. Rather than forcing continuation, involve older kids in adapting rituals or creating new ones that fit their current stage. The principle of regular, meaningful connection matters more than any specific activity.

Consider traditions for different occasions: daily rituals like a special goodbye or bedtime routine; weekly traditions like game night or a special meal; annual celebrations around holidays, birthdays, or the first day of school. Layering traditions across different timeframes creates multiple touchpoints for connection.

Don't overlook the power of spontaneous traditions—things that happen once and are so loved they become expected. "Remember when we got donuts that rainy Saturday?" can become an annual rainy-day tradition if you let it.

The key is consistency and participation, not perfection. A tradition done imperfectly but joyfully is infinitely more valuable than an elaborate plan that stresses everyone out. Keep it simple, keep it fun, and watch the memories accumulate.`
  },
  {
    id: '5',
    title: 'Digital Wellness for Families',
    readTime: '5 min',
    category: 'Technology',
    preview: 'Navigate the digital age together.',
    content: `Technology is a powerful tool that can educate, connect, and entertain—but it requires thoughtful management to serve your family well rather than dominating it.

Start by examining your own habits. Children learn far more from what we do than what we say. If you're constantly checking your phone, scrolling during meals, or distracted by devices during family time, your children will absorb these behaviors as normal. Model the relationship with technology you want them to develop.

Create device-free zones and times as a family. Perhaps phones stay out of bedrooms overnight, or devices are put away during meals. Make these rules apply to everyone, including parents. This shows that boundaries around technology are about healthy living, not just controlling children.

Use parental controls appropriately, but recognize their limitations. No filter catches everything, and as children grow, they need to develop internal judgment rather than relying only on external restrictions. Gradually give more freedom as they demonstrate responsibility.

Teach digital citizenship actively. Discuss what makes content trustworthy, how to interact respectfully online, what to do when they encounter something disturbing, and how their digital footprint affects their future. These conversations are just as important as any safety talk about the physical world.

Have open, ongoing conversations about their online experiences without being invasive. Create an environment where they feel comfortable coming to you when something confusing or upsetting happens online. React calmly when they share—overreacting guarantees they won't share again.

Balance screen time with other activities: outdoor play, reading physical books, creative pursuits, and face-to-face interaction. The goal isn't eliminating technology but ensuring it doesn't crowd out other important experiences. Help children discover that while screens are enjoyable, so are many other things.

Remember that not all screen time is equal. Watching a documentary together, video chatting with grandparents, or creating digital art differs from passive scrolling or violent gaming. Consider quality and context, not just quantity.`
  },
  {
    id: '6',
    title: 'Supporting Children Through Change',
    readTime: '7 min',
    category: 'Parenting',
    preview: 'Help kids adapt during life transitions.',
    content: `Children thrive on routine and predictability, which is why major life changes—moves, divorce, new siblings, job changes, illness, or loss—can be particularly challenging for them. Understanding how to support them through transitions is an essential parenting skill.

When possible, give advance notice about upcoming changes. Children's sense of time differs from adults', so adjust how far ahead you tell them based on their age. A preschooler might do best with a few days' notice, while a teenager benefits from more time to process. Use calendars, countdowns, or visual aids to help younger children understand timing.

Maintain as much normalcy as possible during transitions. Keep bedtime routines, continue regular activities, and preserve connections with friends and extended family when you can. These constants provide security when other things are shifting. Even if you can't keep everything the same, identify what you can maintain.

Validate their feelings without dismissing concerns or rushing them through emotions. Statements like "I know this is hard" or "It's okay to feel sad and excited at the same time" acknowledge their experience. Avoid minimizing with phrases like "It's not a big deal" or "You'll get over it quickly." Their feelings are real, even if the situation seems manageable to you.

Be patient with regression in behavior. During stress, children often slide backward developmentally. A potty-trained child might have accidents; an independent teen might become clingy; a well-behaved child might act out. This is normal and temporary. Respond with compassion rather than punishment, while maintaining consistent boundaries.

Create new routines as quickly as possible. After a move, establish where things go and how days will flow. After adding a new family member, clarify what stays the same and what changes. Predictability reduces anxiety, so recreating structure helps children feel secure again.

Answer questions honestly and age-appropriately. Children often know more than we think, and uncertainty breeds anxiety. You don't need to share every detail, but be truthful about what's happening and what they can expect. It's okay to say "I don't know" when you genuinely don't, followed by "but I'll always take care of you."

Watch for signs that a child needs additional support: prolonged changes in sleep or appetite, withdrawal from activities they usually enjoy, persistent sadness or anxiety, or physical complaints with no medical cause. These may indicate they need more help processing the transition, possibly including professional support.

Most importantly, reassure them repeatedly of your constant love. Change threatens children's sense of security, and they need to know—through words and actions—that your love for them remains unchanged. Say it often: "No matter what changes, I will always love you and be here for you."`
  },
  {
    id: '7',
    title: 'The Power of Family Dinners',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Research shows family meals have profound benefits.',
    content: `The research is remarkably consistent: children who eat regular family dinners have better academic performance, higher self-esteem, healthier eating habits, and lower rates of substance abuse, depression, and eating disorders. Few interventions are as simple yet powerful as the family dinner.

It's not about elaborate meals or perfect table manners. A pizza on the living room floor counts just as much as a formal dining room dinner. The magic is in the gathering, the conversation, and the ritual of sharing food together.

The benefits come from the connection and communication that happen around the table. Children learn vocabulary by listening to adult conversation. They develop social skills by practicing turn-taking in discussions. They feel valued when asked about their day and listened to with interest.

Start where you are. If family dinners feel impossible given your current schedule, aim for three per week. Even that frequency shows significant benefits. Choose which nights are most realistic and protect them. Treat family dinner time as an important appointment that can't be easily canceled.

Make conversation the focus by eliminating distractions. Turn off the TV, put phones in another room, and be fully present with each other. If conversation doesn't flow naturally, try conversation starters: "What was the best part of your day?" "What made you laugh today?" "If you could have any superpower, what would it be?"

Involve children in the process. Even young children can help set the table, tear lettuce, or choose the menu. Older kids can help cook. This participation increases their investment in the meal and teaches valuable life skills. It also means more time together, not just the eating portion.

Don't use dinner time for lectures, criticism, or difficult conversations about grades or behavior. Keep the atmosphere pleasant so family members look forward to gathering. Save serious discussions for another time. The goal is to make family dinner a positive experience that everyone wants to repeat.`
  },
  {
    id: '8',
    title: 'Teaching Emotional Intelligence',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Help children understand emotions.',
    content: `Emotional intelligence—the ability to recognize, understand, and manage emotions in ourselves and others—predicts life success better than IQ. The good news is that unlike IQ, emotional intelligence can be actively taught and developed throughout childhood.

Start by naming emotions when you see them. "You seem frustrated that the blocks keep falling down." "I can see you're excited about the party." This builds emotional vocabulary and helps children recognize what they're feeling. Young children experience emotions intensely but often don't have words for them; labeling helps them make sense of their inner world.

Validate feelings before problem-solving. When a child is upset, resist the urge to immediately fix the situation or explain why they shouldn't feel that way. First, acknowledge: "That really hurt your feelings when she said that." Once they feel heard, they're more able to engage with solutions or different perspectives.

Teach that all emotions are acceptable, but not all behaviors are. Feeling angry is okay; hitting is not. Feeling jealous is natural; being cruel is not acceptable. This distinction helps children understand that emotions aren't good or bad—they're information. What matters is what we do with them.

Model emotional regulation yourself. Talk about your own feelings: "I'm feeling frustrated that I can't find my keys." Let them see you take deep breaths, step away to calm down, or choose your words carefully when upset. Your example teaches more than any lecture.

Develop a toolkit of regulation strategies together. Deep breathing, counting to ten, taking a break, physical movement, talking it out—different strategies work for different children and different situations. Practice these when calm so they're available when emotions run high.

Read books about feelings together. Stories provide safe ways to explore emotions, discuss characters' choices, and consider alternatives. Ask questions like "How do you think she felt when that happened?" and "What would you have done?"

Create a safe space for emotional expression in your home. When children know they won't be shamed, dismissed, or punished for their feelings, they're more likely to develop healthy emotional awareness. This doesn't mean tolerating destructive behavior, but it does mean welcoming the full range of human emotions.

Teach empathy by wondering aloud about others' feelings. "I wonder how Grandma felt when we couldn't visit." "How do you think your friend felt when that happened?" Help children consider perspectives beyond their own, which builds the foundation for healthy relationships throughout life.`
  },
  {
    id: '9',
    title: 'Sibling Relationships',
    readTime: '5 min',
    category: 'Relationships',
    preview: 'Foster positive bonds between siblings.',
    content: `Sibling relationships often become the longest relationships in our lives, lasting even longer than those with parents or spouses. Investing in healthy sibling bonds during childhood pays dividends for decades.

Avoid comparisons between children, even positive ones. "Why can't you be organized like your sister?" is obviously harmful, but even "Your brother is the artist in the family" can create resentment and box children into roles. Celebrate each child's unique strengths without comparing.

Don't always intervene in conflicts between siblings. When safety isn't at risk, stepping back allows children to develop negotiation and conflict resolution skills. You might say, "I trust you two to work this out" and only intervene if they can't. When you do step in, avoid always taking the younger child's side—this breeds resentment in older siblings.

Create opportunities for positive interactions between siblings. Assign collaborative projects, choose family games that require teamwork, or give them shared responsibilities. Positive shared experiences build connection and create happy memories together.

Protect each child's individual relationship with you. One-on-one time with each child reduces competition for your attention and helps each feel valued for who they are, not in relation to siblings. Even small amounts of individual time make a difference.

Teach siblings how to be good friends to each other. Model kindness, teach them to ask before borrowing, help them learn to apologize and forgive. These explicit lessons may feel unnecessary, but siblings often need guidance on treating each other with the same respect they'd show friends.

Understand that most sibling rivalry stems from competing for parental attention and resources. When you address the underlying needs—ensuring each child feels loved, valued, and secure—rivalry often decreases naturally.

Don't expect siblings to always like each other, but do expect them to treat each other with basic respect. It's okay to say, "You don't have to play together right now, but you do need to speak kindly" or "You can be annoyed, but you can't be cruel."

Remember that sibling relationships evolve. Children who fought constantly may become close as adults. Your job is to maintain connection and model healthy relationships, not to force feelings that may develop naturally over time.`
  },
  {
    id: '10',
    title: 'Self-Care for Parents',
    readTime: '5 min',
    category: 'Wellness',
    preview: 'You can\'t pour from an empty cup.',
    content: `Parental burnout is real, common, and often goes unacknowledged in a culture that glorifies parental self-sacrifice. But here's a truth that may feel counterintuitive: taking care of yourself isn't selfish—it's essential for taking care of your family.

When you're depleted, you have less patience, less creativity, and less joy to bring to parenting. You're more likely to snap, to disengage, to go through the motions rather than being truly present. Your children need you well, not just present.

Start by scheduling small pockets of time for yourself. Even fifteen minutes of something that restores you—reading, a walk, a bath, coffee in silence—makes a difference. Protect this time like any important appointment. It's not optional; it's maintenance.

Ask for help without guilt. Whether it's a partner, family member, friend, or paid help, accepting support doesn't mean you're failing. It means you're human. Trying to do everything yourself isn't noble; it's unsustainable.

Let go of perfection. The house doesn't need to be spotless. Meals don't need to be Instagram-worthy. Not every moment needs to be educational or enriching. Good enough is good enough. Perfectionism is exhausting and models unrealistic expectations for your children.

Connect with other parents. Parenting can be isolating, and talking with people who understand your challenges provides both practical support and emotional validation. Whether it's a playgroup, online community, or coffee with a friend who has kids, maintaining adult connections matters.

Physical health affects mental health. Sleep, exercise, and nutrition often fall to the bottom of the priority list when you're caring for others, but they directly impact your mood, energy, and resilience. Do what you can—a ten-minute walk counts, and going to bed a bit earlier helps.

Watch for signs of burnout or depression: persistent exhaustion, feeling detached from your children, loss of enjoyment in activities you usually like, or excessive irritability. These aren't character flaws; they're signals that you need more support. Seeking professional help is a sign of strength.

Remember: happy parents raise happy children. Your wellbeing isn't separate from your children's—it's foundational to it. When you take care of yourself, you're taking care of your whole family.`
  },
  {
    id: '11',
    title: 'Building Resilience in Children',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Help kids bounce back from challenges.',
    content: `Resilience—the ability to adapt well in the face of adversity, trauma, tragedy, or significant stress—is one of the most valuable traits we can help our children develop. And importantly, resilience can be taught and strengthened throughout childhood.

Let children face age-appropriate challenges rather than removing all obstacles from their path. When we solve every problem for them, they don't learn that they're capable of handling difficulty. A child who struggles with a puzzle and eventually solves it learns persistence. A child whose parent always does it for them learns dependence.

Resist the urge to fix everything immediately. When your child encounters a problem, ask "What do you think you could try?" before offering solutions. Guide them through problem-solving rather than solving problems for them. This builds confidence in their own abilities.

Teach that failure is information, not identity. When they fail at something, help them see what they can learn from the experience rather than letting them conclude they're incapable. "That didn't work. What could you try differently?" frames failure as a normal part of learning, not evidence of inadequacy.

Model optimism and perseverance yourself. Talk about challenges you face and how you're handling them. Let them see you struggle and keep going. Say things like "This is hard, but I'm going to keep trying" or "That didn't go well, but I learned something I can use next time."

Celebrate effort and process, not just outcomes. Praise the hard work and persistence, not just the A on the test or the win at the game. This teaches that effort matters and that they have control over something important, even when outcomes are uncertain.

Build a strong support network around your family. Children who know there are multiple adults who care about them are more resilient. Encourage relationships with grandparents, aunts and uncles, teachers, coaches, and family friends. These connections provide safety nets and diverse perspectives.

Help children find meaning in difficulties when possible. "This is really hard, and it's teaching you that you can do hard things." Without minimizing their pain, help them see that struggles can lead to growth. This doesn't mean pretending everything is fine—it means trusting in their ability to get through.

Take care of basic needs: adequate sleep, nutrition, physical activity, and emotional connection. These fundamentals build the biological and emotional foundation that resilience requires. A well-rested, well-loved child handles stress better than one who's already depleted.

Remember that building resilience doesn't mean preventing all pain or pretending hardship doesn't exist. It means equipping children with the skills, mindset, and support they need to face life's inevitable challenges. Resilient children become resilient adults who can navigate whatever comes their way.`
  },
  {
    id: '12',
    title: 'Effective Family Communication',
    readTime: '5 min',
    category: 'Communication',
    preview: 'Keys to talking and listening well.',
    content: `Good communication is the foundation of healthy families. It affects everything from daily logistics to emotional intimacy to conflict resolution. And like any skill, communication can be learned and improved with practice.

Practice active listening—fully focusing on the speaker rather than thinking about your response. Reflect back what you hear: "So you're saying that..." This ensures understanding and helps the speaker feel heard. Put away distractions when family members are talking to you.

Use "I feel" statements when discussing concerns. "I feel worried when you come home late without calling" is easier to hear than "You're so irresponsible." Taking ownership of your emotions invites dialogue rather than triggering defensiveness.

Relationship researcher John Gottman identifies four communication patterns that predict relationship failure: criticism (attacking character rather than behavior), contempt (mockery and disrespect), defensiveness (deflecting responsibility), and stonewalling (shutting down). Becoming aware of these patterns in yourself is the first step to changing them.

Create regular times for talking when everyone is relaxed and receptive. Family meetings, regular check-ins, or daily rituals like dinner conversation establish communication as a norm, not just something that happens during crises.

Be approachable so children feel safe sharing difficult things. This means responding calmly to news you don't like, thanking them for telling you even when it's hard to hear, and following through on commitments to handle information appropriately. Each calm response makes the next disclosure more likely.

Repair quickly after conflicts or communication breakdowns. Apologize for your part, acknowledge the other person's feelings, and reconnect. Don't let ruptures linger. The ability to repair is more important than avoiding all conflict.

Match your communication style to the situation and the person. Some family members need time to think before responding; others process verbally. Some prefer direct communication; others need gentler approaches. Adapt without losing authenticity.

Remember that nonverbal communication matters as much as words. Eye contact, tone of voice, facial expressions, and physical presence all convey messages. Make sure your nonverbal signals match what you're saying verbally.

Communication skills develop over time with practice and intention. Start where you are, pick one area to improve, and build from there. Every family can communicate better, and every improvement strengthens your relationships.`
  },
  {
    id: '13',
    title: 'Raising Grateful Children',
    readTime: '5 min',
    category: 'Values',
    preview: 'Cultivate appreciation and thankfulness in your family.',
    content: `Gratitude is more than good manners—it's a mindset that contributes to happiness, resilience, and stronger relationships. Research shows that grateful people are more satisfied with life, experience more positive emotions, and have better physical health. Teaching gratitude to children is one of the most valuable gifts we can give.

Model gratitude in your daily life. Children learn by watching, so let them hear you express appreciation regularly. Thank your partner for making dinner. Express gratitude for a beautiful day. Acknowledge when someone does something kind. Your example teaches them that noticing and appreciating good things is a normal part of life.

Create gratitude rituals as a family. At dinner, everyone shares one thing they're thankful for. Before bed, name three good things from the day. Keep a family gratitude journal where everyone contributes. These practices train the brain to notice positive aspects of life rather than focusing only on problems.

Help children recognize when others help them. Point out the effort behind gifts and kindnesses: "Your grandmother spent a long time making that for you" or "Notice how your teacher stayed late to help you with that project." Understanding the effort others invest deepens appreciation.

Encourage thank-you notes—not just for gifts but for experiences and kindnesses. Writing forces children to reflect on what they received and articulate why they appreciate it. This practice strengthens both the gratitude and the relationship with the giver.

Avoid over-indulgence. When children have everything they want immediately, they don't develop appreciation. Saying no sometimes, requiring them to save for special items, and not constantly buying treats helps them value what they have. Scarcity, in appropriate doses, cultivates gratitude.

Connect gratitude to giving back. Help children understand that appreciating what we have naturally leads to wanting to help others who have less. Volunteer as a family, donate unused toys, or find other ways to share your blessings. Generosity and gratitude reinforce each other.

Be patient—gratitude develops over time. A three-year-old saying "thank you" is practicing manners. A ten-year-old genuinely feeling grateful for their life represents deeper development. Keep planting seeds and trust that appreciation will grow.`
  },
  {
    id: '14',
    title: 'Navigating Parenting Differences',
    readTime: '6 min',
    category: 'Relationships',
    preview: 'When partners disagree on parenting approaches.',
    content: `Disagreeing with your partner about parenting is normal—you came from different families with different approaches, and you each have your own ideas about raising children. The goal isn't to agree on everything but to navigate differences in ways that don't harm your children or your relationship.

Present a united front to your children, even when you disagree privately. Children quickly learn to exploit parental disagreements, playing one parent against the other. When you consistently back each other up in the moment, then discuss differences privately, children experience security rather than confusion.

Choose your battles wisely. Not every parenting difference matters equally. Issues around safety, values, and emotional wellbeing deserve careful negotiation. Whether the kids have dessert before finishing vegetables might not be worth a fight. Ask yourself: will this matter in five years?

Discuss parenting philosophies during calm moments, not in the heat of conflict. Set aside time to talk about your visions for your children, your concerns, and your non-negotiables. Understanding each other's underlying values often reveals that you agree more than you thought.

Look for the wisdom in your partner's approach, even when it differs from yours. Maybe their strictness provides structure your permissiveness lacks. Perhaps their playfulness balances your focus on responsibility. Different approaches can complement each other rather than compete.

Compromise when possible. Maybe one parent handles homework while the other handles bedtime, each using their preferred approach. Or alternate who makes certain decisions. Finding ways to honor both perspectives reduces conflict and models flexible problem-solving for children.

Seek professional help if you're stuck. A family therapist can help you understand each other's perspectives, develop shared strategies, and communicate more effectively. There's no shame in getting support for one of life's most challenging jobs.

Remember that your relationship matters to your children. How you handle disagreements teaches them about conflict resolution, compromise, and respect. A healthy parental relationship provides security that benefits children even more than perfect agreement on every parenting decision.

Be willing to try your partner's way sometimes, genuinely giving it a chance. You might discover it works better than expected. And your willingness to try builds goodwill that makes your partner more open to your approaches too.`
  },
  {
    id: '15',
    title: 'Creating a Calm Home Environment',
    readTime: '5 min',
    category: 'Wellness',
    preview: 'Reduce stress and increase peace in your household.',
    content: `The atmosphere of your home affects every family member's wellbeing. A calm, peaceful environment supports emotional regulation, better sleep, improved focus, and stronger relationships. Creating this atmosphere requires intentional choices about space, routines, and interactions.

Start with physical environment. Clutter creates visual stress and makes it harder to find things, causing daily frustration. You don't need a minimalist home, but having systems for managing belongings reduces chaos. Involve children in maintaining order by making it easy—labeled bins, hooks at their height, clear expectations.

Manage noise levels intentionally. Constant background noise from TVs or devices keeps nervous systems activated. Create times of quiet, use indoor voices as a default, and consider white noise or soft music for some activities. Silence allows minds to rest and process.

Establish predictable routines. When children know what to expect, they feel secure and need less redirection. Morning routines, after-school routines, and bedtime routines provide structure that reduces daily battles. Post visual schedules for younger children.

Regulate your own energy. Children absorb parental stress and reflect it back amplified. When you're frantic, they become frantic. When you're calm, they calm more easily. Taking care of your own stress levels is one of the most effective ways to create a peaceful home.

Create transition rituals. Moving from one activity to another is often when conflict erupts. Five-minute warnings, transition songs, or predictable sequences smooth these shifts. "We always wash hands before dinner" is easier than negotiating each time.

Designate calm spaces. Having a cozy corner for reading, a spot for quiet play, or a place to decompress after school gives family members options for self-regulation. These don't need to be separate rooms—a corner with cushions and soft lighting works.

Limit overscheduling. When every evening involves rushing to activities, homework battles, and late bedtimes, calm becomes impossible. Build in downtime. Unscheduled hours aren't wasted—they're when children play creatively and families connect spontaneously.

End days well. A calm bedtime routine that includes connection—reading together, talking about the day, expressing love—helps children feel secure and sleep better. And when children sleep well, the next day starts better too.`
  },
  {
    id: '16',
    title: 'Fostering Independence in Children',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Help your children become capable and confident.',
    content: `The ultimate goal of parenting is to raise children who can thrive without us. This means gradually transferring responsibility and capability to them, even when it would be faster or easier to do things ourselves. Independence is built through practice, not just maturation.

Start early with age-appropriate tasks. Toddlers can put toys in bins. Preschoolers can dress themselves and help with simple chores. School-age children can make their own lunches and manage homework. Teenagers can do laundry, cook meals, and handle their own schedules. Each capability builds on previous ones.

Resist the urge to rescue. When you see your child struggling with a task, step back. Struggle is how learning happens. Offer encouragement—"I can see you're working hard on that"—but let them figure it out. The pride they feel in independent accomplishment far exceeds the relief of being rescued.

Allow natural consequences when safety isn't at risk. If they forget their lunch, they experience hunger. If they don't do homework, they face the teacher. These consequences teach more effectively than parental lectures and build the connection between choices and outcomes.

Teach skills explicitly rather than assuming children will figure things out. Show them how to fold clothes, load a dishwasher, manage money, or navigate social situations. Break complex tasks into steps. Practice together before expecting independent performance.

Give choices within limits. "Do you want to wear the red shirt or the blue one?" gives autonomy while maintaining boundaries. As children demonstrate good judgment, expand the choices available to them. This graduated freedom builds decision-making skills.

Let them fail safely. Failure is essential for growth, and childhood is the safest time to experience it. A failed project or lost game teaches resilience when stakes are low. Children who never fail become adults who can't handle setbacks.

Adjust expectations as they grow. The level of independence appropriate for a seven-year-old differs from what's right for a twelve-year-old. Regularly reassess what your child can handle and push gently beyond their comfort zone. Growth happens at the edge of capability.

Trust their competence. Children often rise to expectations. When you communicate—through words and actions—that you believe they're capable, they begin to believe it too. "I know you can handle this" is a powerful message that builds both independence and confidence.

Balance independence with connection. Fostering autonomy doesn't mean pushing children away. They still need your support, guidance, and love. Independence and attachment aren't opposites—securely attached children actually become more independent because they have a safe base from which to explore.`
  },
  {
    id: '17',
    title: 'Making Family Meetings Work',
    readTime: '4 min',
    category: 'Communication',
    preview: 'A practical guide to productive family discussions.',
    content: `Family meetings are powerful tools for improving communication, solving problems collaboratively, and giving everyone a voice. But they only work if implemented thoughtfully. Here's how to make them effective rather than dreaded.

Keep meetings short and regular. Weekly meetings of 15-30 minutes work better than occasional long ones. Consistency builds the habit and prevents issues from accumulating. Choose a time that works for everyone and protect it.

Create a predictable structure. Start with appreciations—each person shares something they appreciate about another family member. Then address any business—scheduling, chores, upcoming events. Finally, discuss any problems or concerns. End on a positive note.

Give everyone equal voice, regardless of age. Use a talking stick or other tool to ensure one person speaks at a time. Listen to children's ideas seriously, even if they seem impractical. Feeling heard matters more than getting everything they want.

Focus on solutions, not blame. When problems arise, ask "How can we solve this?" rather than "Who's at fault?" This forward-looking approach encourages creativity and cooperation rather than defensiveness.

Write things down. Keep a family meeting notebook with decisions, chore assignments, and plans. This prevents disputes about what was agreed and provides accountability.

Make some meetings fun. Occasionally use meeting time to plan a family adventure, play a game together, or share dreams and goals. Meetings shouldn't always be about problems and logistics.

Be patient with the process. First few meetings may feel awkward. Children might test limits or refuse to participate. Keep going anyway. Over time, family meetings become a valued ritual that strengthens connection and teaches democratic participation.

Follow through on decisions. If the family agrees to a rule or plan, implement it. Nothing undermines family meetings faster than decisions that get ignored. When follow-through isn't possible, explain why and renegotiate.`
  },
  {
    id: '18',
    title: 'Helping Children Make Friends',
    readTime: '5 min',
    category: 'Social Skills',
    preview: 'Support your child\'s social development and friendships.',
    content: `Friendships are crucial for children's emotional development, providing belonging, support, and opportunities to learn social skills. While we can't make friends for our children, we can create conditions that support their social success.

Provide opportunities for interaction. Children need time with peers to develop friendships. Arrange playdates, enroll in activities, visit playgrounds. Proximity and repeated contact are the foundations of childhood friendships.

Teach social skills explicitly. Many children don't naturally know how to join a game, share, take turns, or handle disagreements. Practice these skills at home through role play. Discuss social situations and problem-solve together.

Help them find their people. Not every child thrives in large group settings. Some connect better one-on-one or in small groups. Some need activity-based friendships. Pay attention to where your child seems most comfortable and seek those settings.

Don't over-manage. Let children navigate social dynamics when possible. They need practice handling minor conflicts and disappointments. Step in when safety is at risk or when they're clearly overwhelmed, but resist solving every social challenge.

Address bullying seriously. There's a difference between normal social friction and bullying. If your child is being targeted persistently, intervene. Work with school staff, teach assertiveness skills, and ensure your child knows you'll support them.

Model healthy friendships yourself. Let children see you nurturing adult friendships, handling disagreements respectfully, and prioritizing relationships. Your example shows them what friendship looks like.

Accept your child's social style. Some children have many friends; others prefer one or two close connections. Some are naturally outgoing; others are introverted. Rather than pushing them toward a different style, support who they are while ensuring they have some social connection.

Be patient with development. Social skills develop at different rates. A child who struggles at six might blossom at ten. Continue providing opportunities and support while trusting the process.

Create a welcoming home. When your home is a place where kids like to gather, you have more opportunity to observe your child's social interactions and subtly guide them. Make it easy for them to invite friends over.`
  },
  {
    id: '19',
    title: 'Managing Homework Without Battles',
    readTime: '5 min',
    category: 'Education',
    preview: 'Create a homework routine that works for your family.',
    content: `Homework doesn't have to mean nightly battles. With the right systems and mindset, homework time can be manageable—maybe even peaceful. The key is creating structures that promote independence while providing appropriate support.

Establish a consistent routine. Same time, same place, same expectations each day. When homework is just "what we do at 4:00," there's less negotiation required. The routine handles the decision-making so you don't have to fight about it daily.

Create a homework-friendly environment. A quiet, well-lit space with necessary supplies available reduces friction. Some children focus better at a desk; others do better at the kitchen table where a parent is nearby. Find what works for your child.

Start with a snack and break. Children need to decompress after school before diving into more work. A healthy snack and some physical activity or relaxation helps them approach homework with more energy and focus.

Be available but not hovering. Stay nearby to answer questions, but don't sit with them constantly. The goal is supporting independence, not doing homework together. If they need constant help, that's information for their teacher.

Help them break large assignments into steps. Executive function develops throughout childhood. Many children genuinely don't know how to approach a big project. Teaching them to plan backwards from the due date and tackle pieces daily builds lifelong skills.

Let natural consequences teach. If homework isn't done, the consequence should come from school, not from you piling on additional punishment. Your job is to provide time and space; their job is to do the work.

Communicate with teachers. If homework consistently takes much longer than expected, causes major stress, or seems beyond your child's capability, talk to the teacher. Adjustments may be possible, and teachers need feedback about how assignments are landing.

Keep perspective. Research on homework's effectiveness, especially in elementary school, is mixed. While supporting your child's education matters, homework shouldn't destroy family evenings or your relationship with your child. If it's causing serious conflict, step back and reassess.

Celebrate completion, not perfection. The goal is effort and growth, not flawless work. When homework is done, acknowledge it and move on to family time. Don't use homework as an opportunity for extra drilling unless your child wants that.`
  },
  {
    id: '20',
    title: 'Understanding Your Child\'s Temperament',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Work with your child\'s nature, not against it.',
    content: `Every child is born with a unique temperament—characteristic patterns of activity, emotion, and behavior that appear early and remain relatively stable. Understanding your child's temperament helps you parent more effectively by working with their nature rather than against it.

Researchers identify several temperament dimensions. Activity level varies from constantly moving to preferring quiet activities. Some children adapt quickly to new situations; others need time to warm up. Emotional intensity ranges from mild reactions to big feelings about everything. Sensory sensitivity affects how children respond to sounds, textures, lights, and tastes.

High-energy children need physical outlets. Expecting them to sit still for long periods sets everyone up for failure. Build movement into their day, choose active family activities, and accept that they may wiggle even during quieter moments. Channel their energy rather than constantly trying to suppress it.

Slow-to-warm-up children need preparation and patience. Give advance notice about new situations. Arrive early so they can adjust before things get busy. Stay nearby during transitions. Don't label them as shy—they're cautious, and that's a valid approach to the world.

Emotionally intense children feel everything deeply. They need help learning to regulate without being shamed for having big feelings. Teach calming strategies, create space for emotions, and remember that intensity often correlates with passion and creativity.

Sensory-sensitive children aren't being dramatic about scratchy tags or loud noises—they genuinely experience sensory input more intensely. Accommodate when possible, prepare them for sensory-rich environments, and avoid dismissing their discomfort.

Goodness of fit matters more than any particular temperament. When parenting approaches match a child's temperament, everyone thrives. A high-energy parent might need to adjust expectations for a quieter child, while a calm parent might need to add more activity for an energetic one.

Temperament isn't destiny. While core tendencies remain stable, children learn to manage their characteristics. A shy child can learn social skills; an impulsive child can learn self-control. Your job is helping them develop strategies that work with their nature.

Avoid comparing siblings. Different temperaments require different approaches. What worked beautifully with your first child might fail completely with your second. This isn't about playing favorites—it's about meeting each child's actual needs.

Accept who your child is. Sometimes we get children whose temperaments differ from what we expected or hoped for. The quiet child of athletic parents. The cautious child of adventurous ones. Accepting and celebrating who they actually are, rather than mourning who they aren't, is one of the greatest gifts we can give.`
  },
  {
    id: '21',
    title: 'Handling Tantrums with Grace',
    readTime: '5 min',
    category: 'Parenting',
    preview: 'Navigate meltdowns while building emotional skills.',
    content: `Tantrums are a normal part of childhood development, not evidence of bad parenting or a difficult child. Understanding why they happen and how to respond helps you navigate meltdowns while actually building your child's emotional regulation skills.

Tantrums occur because young children experience big emotions but lack the brain development and skills to manage them. The prefrontal cortex—responsible for emotional regulation—isn't fully developed until the mid-twenties. Expecting toddlers and young children to control intense feelings is expecting the impossible.

Stay calm yourself. This is the hardest and most important part. When you escalate, the tantrum intensifies. Take deep breaths. Remind yourself this is developmentally normal. Your calm presence helps regulate your child's nervous system even when they can't calm themselves.

Ensure safety first. If your child is hitting, kicking, or in danger of hurting themselves or others, calmly move them to a safe space or remove dangerous objects. Use minimal words and a gentle tone. Physical restraint should only be used to prevent harm.

Don't try to reason during the storm. Logic doesn't work when the emotional brain has taken over. Save explanations and problem-solving for after the tantrum passes. During the meltdown, your job is simply to be a calm, safe presence.

Offer connection without demands. Some children want to be held; others need space. Follow your child's cues. Saying "I'm here when you're ready" communicates safety without forcing interaction. Avoid punishment, threats, or lectures during the tantrum.

After the storm passes, reconnect first. A hug, kind words, or simply sitting together rebuilds the relationship. Then, if appropriate, briefly discuss what happened: "You were really upset about leaving the park." Help them name the emotion and, for older children, explore what might help next time.

Prevent when possible. Many tantrums stem from hunger, tiredness, overstimulation, or frustration. Regular meals, adequate sleep, and avoiding overwhelming situations reduce meltdown frequency. Giving warnings before transitions also helps.

Remember that tantrums decrease with development and skill-building. Each one you handle with patience teaches your child that emotions are manageable and that you're there for them even at their worst. These lessons last far longer than the tantrum itself.`
  },
  {
    id: '22',
    title: 'The Art of Family Storytelling',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Share your family history and create new narratives together.',
    content: `Family stories connect generations, transmit values, and help children understand who they are and where they come from. Research shows that children who know their family history have higher self-esteem and resilience. Storytelling is a gift that costs nothing but gives everything.

Share stories from your own childhood. Tell about adventures, mishaps, friendships, and lessons learned. Children love hearing that their parents were once kids too—that they made mistakes, felt scared, and figured things out. These stories build connection and perspective.

Tell stories about your child's early years. "When you were a baby..." stories are perpetually fascinating to children. How they got their name, funny things they did, family reactions to their arrival—these narratives help children feel valued and rooted.

Include extended family stories. Grandparents' tales, family immigration stories, how relatives met—these larger narratives place children in a continuing story bigger than themselves. They learn that they're part of something that came before and will continue after.

Create stories together. Make up bedtime tales featuring your child as the hero. Let children contribute plot twists. Collaborative storytelling builds creativity, language skills, and connection while creating private family lore that belongs only to you.

Use stories to discuss values. Rather than lecturing about honesty, tell about a time you were tempted to lie and what happened. Stories convey values more memorably than rules do. They stick because they engage emotion and imagination.

Preserve stories intentionally. Record grandparents telling family history. Write down funny things children say. Take photos and videos. Create family archives—physical or digital—that preserve your collective story for future generations.

Make storytelling a regular practice. Dinner tables, car rides, and bedtimes are natural storytelling opportunities. When "tell me a story" becomes a family refrain, you're building traditions that strengthen identity and connection across years and generations.`
  },
  {
    id: '23',
    title: 'Positive Discipline That Works',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Guide behavior while maintaining connection and respect.',
    content: `Discipline means teaching, not punishment. The goal isn't to make children suffer for mistakes but to help them develop the skills and judgment to make better choices. Positive discipline achieves this while maintaining the parent-child connection.

Focus on connection first. Children who feel connected want to cooperate. When behavior problems increase, often the underlying issue is disconnection. Before focusing on the behavior, ask: How's our relationship? Does my child feel understood and valued?

Set clear, consistent limits. Children need boundaries to feel safe. State expectations clearly: "We use gentle hands" rather than "Don't hit." Be consistent—unpredictable enforcement confuses children and undermines your authority. Follow through matters more than severity.

Use natural and logical consequences when possible. If they don't put away toys, toys get put somewhere they can't access them. If they're rough with a pet, they lose the privilege of unsupervised time with the pet. These consequences teach cause and effect better than arbitrary punishments.

Redirect rather than just prohibit. "You can't throw the ball inside, but you can roll it" gives an acceptable alternative. "You can't hit your brother, but you can hit this pillow if you're angry" acknowledges the feeling while setting limits on behavior.

Give choices within limits. "Do you want to put on pajamas before or after brushing teeth?" provides autonomy while ensuring the task gets done. Choices reduce power struggles and help children develop decision-making skills.

Validate feelings while limiting behavior. "I understand you're angry—AND hitting is not okay." The "and" matters—it acknowledges their emotion without excusing harmful behavior. Children can feel upset and still be expected to act appropriately.

Problem-solve together, especially with older children. "How can we make mornings go more smoothly?" invites collaboration and teaches skills. Solutions children help create are more likely to be followed than rules imposed from above.

Avoid punishment that shames or hurts. Time-outs used punitively, yelling, physical punishment, and humiliation damage the relationship without teaching better skills. They may produce short-term compliance but create long-term problems.

Take care of yourself. It's harder to discipline positively when you're depleted. Your patience reserves directly affect your ability to respond rather than react. Prioritizing your wellbeing improves your parenting.`
  },
  {
    id: '24',
    title: 'Building a Strong Marriage While Parenting',
    readTime: '5 min',
    category: 'Relationships',
    preview: 'Nurture your partnership even during the demanding parenting years.',
    content: `Children benefit enormously from parents who have a strong relationship. Yet parenting is demanding, and couples often put their relationship last. Intentionally nurturing your partnership isn't selfish—it's one of the best things you can do for your children.

Prioritize couple time. Date nights, even at home after kids are in bed, maintain connection. Regular time without children present allows you to remember you're partners, not just co-parents. This doesn't require elaborate plans—coffee together, a walk, or a late-night conversation counts.

Stay curious about each other. People change, and partners can drift into assuming they know everything about each other. Keep asking questions, sharing experiences, and learning about your partner's evolving thoughts and feelings. Interest maintains intimacy.

Be a team on parenting. Present united decisions to children. Discuss disagreements privately and work toward compromise. Back each other up even when you'd approach things differently. Parenting teamwork reduces conflict and models partnership for children.

Maintain physical affection. Hold hands, hug, kiss—in front of children. This isn't just good for your relationship; it shows children what loving partnership looks like. Physical affection also helps you feel connected even when exhausted.

Appreciate each other out loud. Notice what your partner contributes and say thank you. Parenting involves countless invisible tasks, and feeling unappreciated breeds resentment. Specific appreciation—"Thank you for handling bedtime while I finished that work"—validates effort.

Communicate about stress and needs. Parenting exhaustion can make partners reactive. When you're struggling, say so: "I'm at my limit today" is more helpful than snapping. Create space for each partner to share without immediately problem-solving.

Protect intimacy. Physical intimacy often decreases when parenting young children. Discuss this openly, make it a priority even when tired, and understand that intimacy looks different in different seasons. Feeling connected physically supports emotional connection.

Remember this season is temporary. The intensity of early parenting doesn't last forever. Keep investing in your relationship, knowing that one day children will launch and you'll still have each other. Couples who neglect their relationship while parenting often struggle when the nest empties.`
  },
  {
    id: '25',
    title: 'When Your Child Is Anxious',
    readTime: '6 min',
    category: 'Mental Health',
    preview: 'Recognize and support childhood anxiety effectively.',
    content: `Anxiety in children is common and often misunderstood. It might look like stomachaches, anger outbursts, avoidance, or clinginess. Understanding anxiety and responding supportively helps children develop coping skills rather than having anxiety take over their lives.

Recognize the signs. Beyond obvious nervousness, anxiety shows up as physical complaints (headaches, stomachaches), sleep difficulties, excessive worry about future events, perfectionism, meltdowns during transitions, avoidance of normal activities, or need for constant reassurance.

Validate without amplifying. "I can see you're worried about the test" acknowledges their experience. Avoid dismissing ("There's nothing to worry about") or amplifying ("That does sound scary!"). Validation helps; dwelling on fears doesn't.

Don't accommodate anxiety. When we help children avoid everything that makes them anxious, we reinforce the message that they can't cope. Gradual, supported exposure to feared situations builds confidence. The goal isn't eliminating anxiety but learning to manage it.

Teach coping strategies. Deep breathing, progressive muscle relaxation, grounding techniques (name five things you can see), and positive self-talk give children tools. Practice these when calm so they're available during anxiety spikes.

Model healthy anxiety management. Talk about your own worries and how you handle them: "I'm nervous about this presentation, so I'm going to prepare well and take some deep breaths before I start." Children learn by watching you cope.

Watch your own anxiety about their anxiety. When parents become anxious about children's anxiety, children sense it and become more anxious. Projecting calm confidence—even when you're concerned—helps children feel safe enough to face fears.

Create predictability. Anxious children do better with routines and advance notice of changes. Knowing what to expect reduces uncertainty that fuels anxiety. When changes are necessary, provide as much information and preparation as possible.

Know when to seek help. Some anxiety is normal; impairing anxiety needs professional support. If anxiety significantly interferes with school, friendships, family life, or activities, or if it's getting worse despite your efforts, consult a mental health professional. Effective treatments exist.

Be patient. Anxiety doesn't disappear overnight. Progress is often two steps forward, one step back. Celebrate small victories and maintain confidence in your child's ability to learn to manage their worries.`
  },
  {
    id: '26',
    title: 'Fostering Creativity at Home',
    readTime: '4 min',
    category: 'Development',
    preview: 'Nurture imagination and creative thinking in your children.',
    content: `Creativity isn't just for artists—it's a crucial skill for problem-solving, innovation, and finding joy in life. Children are naturally creative, and your home environment can either nurture or inadvertently suppress that creativity.

Provide open-ended materials. Art supplies without directions, building blocks, dress-up clothes, cardboard boxes, and natural materials invite creative exploration. These materials can become anything, unlike toys with predetermined uses.

Resist the urge to direct. When children are creating, avoid taking over or suggesting "better" ways. Your tree has a brown trunk; theirs might be purple. That's creativity, not error. Let their imagination lead without adult improvements.

Value process over product. Ask "Tell me about what you made" rather than "What is it?" Focus on the experience of creating rather than whether the result is recognizable or "good." This encourages experimentation without fear of failure.

Allow boredom. The urge to fill every moment with activities prevents the boredom that sparks creativity. When children complain of boredom, wait. Often they'll invent something interesting if given space and time without entertainment provided.

Encourage pretend play. Imaginative play develops creativity, empathy, and complex thinking. Join in sometimes, following your child's lead. Create spaces that invite pretending—a corner with pillows can be a fort, a boat, a castle.

Ask open-ended questions. "What do you think would happen if...?" "How many ways could we...?" "What else could this be?" Questions without single right answers stretch creative thinking.

Model creativity yourself. Let children see you trying new things, making art, solving problems creatively, and playing with ideas. Your example shows that creativity is valuable for adults too, not just something for children.

Limit screen time. Passive consumption doesn't develop creativity; active creation does. While some digital tools enable creativity, most screen time fills the mental space where creative ideas would otherwise grow.`
  },
  {
    id: '27',
    title: 'Grandparents and Extended Family',
    readTime: '5 min',
    category: 'Relationships',
    preview: 'Navigate and strengthen extended family relationships.',
    content: `Extended family relationships enrich children's lives, providing additional love, support, and perspective. But these relationships can also bring conflict. Navigating extended family dynamics thoughtfully benefits everyone, especially the children.

Recognize the value grandparents bring. Grandparents offer unconditional love, historical perspective, and different kinds of attention than busy parents provide. Children with close grandparent relationships often have higher self-esteem and better emotional regulation.

Set boundaries kindly but firmly. You're the parent, and major decisions are yours. When grandparents disagree with your parenting choices, acknowledge their perspective while maintaining your position: "I know you did it differently, and we've decided this approach works best for our family."

Choose your battles. Grandparents giving extra dessert or bending bedtime occasionally won't damage children. Save firm boundaries for issues that genuinely matter—safety, values, undermining parental authority, or harmful comments.

Communicate proactively. Don't wait for problems. Share your parenting approach, expectations for visits, and any sensitive topics to avoid. Clear communication prevents misunderstandings that breed resentment.

Facilitate relationships even at distance. Video calls, letters, recorded stories from grandparents, and photo sharing help maintain connection when family lives far away. Make effort to maintain these relationships despite geographic challenges.

Navigate difficult family members. Some extended family members may be toxic or harmful. Protecting your children from genuine harm takes priority over family harmony. It's okay to limit or eliminate contact when necessary, though this decision deserves careful consideration.

Include children in family stories. Extended family gatherings are opportunities to share family history, look at old photos, and help children understand their place in something larger. These stories build identity and connection.

Model respect even amid disagreement. How you talk about and interact with extended family teaches children about relationships. Even when frustrated, speaking respectfully models how to handle complex family dynamics they'll navigate throughout life.

Express gratitude. Acknowledge what extended family contributes—time, love, gifts, support. Gratitude strengthens relationships and helps family members feel valued rather than taken for granted.`
  },
  {
    id: '28',
    title: 'Teaching Kids About Money',
    readTime: '5 min',
    category: 'Life Skills',
    preview: 'Build financial literacy from an early age.',
    content: `Financial literacy is a crucial life skill rarely taught in schools. Parents have the opportunity—and responsibility—to raise money-smart children who can navigate financial decisions confidently as adults.

Start young with basic concepts. Even preschoolers can understand that money is exchanged for goods and that it's limited. Playing store, counting coins, and including them in simple purchases begins financial education naturally.

Give an allowance and let them manage it. Whether tied to chores or given freely, allowance provides hands-on money management experience. Let them make choices—including mistakes—with their own money. Buying something disappointing teaches more than lectures about wise spending.

Teach the three jars: save, spend, give. Having children divide money into saving, spending, and giving portions instills balanced money habits. They learn delayed gratification, charitable giving, and the satisfaction of reaching savings goals.

Be transparent about family finances appropriately. You don't need to share every detail, but helping children understand that families make choices about money—that saying yes to one thing means saying no to another—builds realistic understanding.

Let them earn money. Beyond allowance, opportunities to earn through extra tasks, entrepreneurial ventures, or jobs for others teaches the connection between effort and income. This understanding becomes crucial for adult financial success.

Discuss wants versus needs. Help children distinguish between things they need (food, shelter, clothing) and things they want (toys, treats, entertainment). This distinction supports wise financial decision-making.

Model healthy money habits. Children learn more from watching you than from what you teach explicitly. They notice how you talk about money, whether you save, how you handle financial stress, and what you prioritize spending on.

Introduce banking and compound interest. Opening a savings account makes saving concrete. Watching interest accumulate—even small amounts—demonstrates how money can grow over time. This understanding motivates saving.

Avoid shame around money. Whether your family has plenty or struggles, avoid framing money in shameful terms. Financial situations vary and change; what matters is learning skills to manage whatever resources one has.`
  },
  {
    id: '29',
    title: 'Dealing with Picky Eaters',
    readTime: '5 min',
    category: 'Health',
    preview: 'Navigate food challenges without mealtime battles.',
    content: `Picky eating is extremely common in childhood and usually resolves with time. However, daily food battles exhaust everyone and can create lasting negative associations with eating. A calm, strategic approach serves everyone better.

Understand why children are picky. Evolution programmed children to be cautious about new foods—it protected them from eating poisonous plants. Neophobia (fear of new foods) peaks between ages 2-6 and typically decreases after that.

Division of responsibility works. Parents decide what food is offered, when meals happen, and where eating occurs. Children decide whether to eat and how much. This framework reduces power struggles while ensuring nutritious options are available.

Serve new foods alongside accepted foods. Always include something on the plate your child will likely eat. This prevents hunger-driven meltdowns while exposing them to new options without pressure.

Require tasting, not eating. A "one bite rule" for new foods provides exposure without forcing large consumption. Research shows children need 10-15 exposures to a new food before accepting it. Keep offering without pressure.

Involve children in food preparation. Kids who help choose recipes, shop for ingredients, and cook are more likely to eat the results. Involvement creates ownership and curiosity about food.

Model adventurous eating. Children watch what you eat. When they see parents enjoying varied foods and trying new things, they're more likely to follow. Your example matters more than your instructions.

Avoid making separate meals. Becoming a short-order cook reinforces pickiness. Serve family meals and let children eat what they choose from what's offered. They won't starve; they'll eventually eat when hungry.

Don't use dessert as reward. "Eat your vegetables and you can have dessert" elevates dessert and demonizes vegetables. Serve small desserts as part of the meal occasionally, without connecting them to other food consumption.

Stay calm and patient. Pressure, bribes, and battles backfire, creating negative associations with food and eating. A relaxed approach, consistently applied over months and years, works better than intense short-term interventions.

Know when to seek help. Most picky eating is developmental. However, if your child eats fewer than 20 foods, gags frequently, loses weight, or has extreme anxiety around food, consult a pediatrician or feeding specialist.`
  },
  {
    id: '30',
    title: 'Single Parenting with Confidence',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Thrive as a solo parent while raising healthy children.',
    content: `Single parenting presents unique challenges, but millions of single parents successfully raise happy, healthy children. With intention and support, solo parenting can be rewarding for both you and your children.

Release guilt. Single parenting happens for many reasons, and guilt helps no one. Children need one present, loving parent more than two distracted or conflicting ones. Focus on being the best parent you can be rather than mourning a different family structure.

Build your village. No one parents well in isolation. Identify people who can provide practical help, emotional support, and additional adult relationships for your children. Family, friends, neighbors, faith communities, and parent groups all matter.

Establish routines. Structure provides security, especially during family transitions. Consistent meal times, bedtimes, and daily rhythms help children feel stable even when other aspects of life feel uncertain.

Take care of yourself. Single parents often neglect their own needs while managing everything alone. But depleted parents aren't effective parents. Guard time for rest, relationships, and activities that restore you. This isn't selfish; it's necessary.

Create one-on-one time with each child. When you're the only parent, children might compete for attention. Carving out individual time with each child ensures everyone feels valued and maintains unique connections.

Be age-appropriately honest about your situation. Children don't need every detail, but they deserve honest, simple explanations suitable to their age. Lies and evasions create confusion and undermine trust.

Maintain boundaries with the other parent when applicable. If you're co-parenting, keep conflict away from children. Use communication tools that reduce direct confrontation if needed. Children suffer most when caught between warring parents.

Watch for children taking on adult roles. Some children try to become the "man of the house" or caregiver for a grieving parent. While helping is good, children shouldn't carry adult emotional or practical burdens. Maintain appropriate parent-child roles.

Accept that you can't do everything. Comparing yourself to two-parent families is unfair and unhelpful. Some things won't get done. Some activities won't happen. That's okay. What matters most is love, presence, and basic needs being met.

Access available resources. Many organizations provide support specifically for single parents—financial assistance, respite care, support groups, and more. Seeking help is wise, not weak.`
  },
  {
    id: '31',
    title: 'Celebrating Effort Over Achievement',
    readTime: '4 min',
    category: 'Parenting',
    preview: 'Develop a growth mindset in your children.',
    content: `How we praise children shapes their relationship with challenge, failure, and growth. Research by psychologist Carol Dweck shows that praising effort rather than innate ability develops resilience and love of learning. This shift transforms how children approach everything.

Understand fixed versus growth mindsets. Children praised for being "smart" or "talented" often develop fixed mindsets—believing ability is innate and unchangeable. They may avoid challenges that risk revealing they're not actually smart. Children praised for effort develop growth mindsets—believing abilities develop through work.

Praise the process, not the outcome. Instead of "You're so smart!" try "You worked really hard on that!" Instead of "You're a natural artist," say "I notice you kept trying different approaches until you got the result you wanted." Process praise acknowledges what children control.

Be specific about what you're praising. Vague praise ("Good job!") provides little information. Specific praise ("You stayed focused even when that problem was frustrating") helps children understand exactly what behavior was effective and worth repeating.

Normalize struggle as part of learning. "This is supposed to be hard—that's how your brain grows" reframes difficulty positively. Children with growth mindsets see struggle as necessary for improvement rather than evidence of inadequacy.

Respond to failure constructively. When children fail, avoid both dismissing ("It doesn't matter") and catastrophizing. Instead, acknowledge disappointment, then explore what was learned: "That didn't work. What would you try differently?" Failure becomes data, not disaster.

Model growth mindset yourself. Let children hear you tackle challenges: "I don't know how to do this yet, but I'll figure it out." Share your own failures and what you learned from them. Your example teaches more than any explanation.

Watch your language about ability. Phrases like "Math isn't your thing" or "You're just not a reader" install limiting beliefs. Even well-meant labels like "the smart one" or "the athlete" create boxes that constrain growth. See children as developing, not fixed.

Celebrate improvement, not just excellence. A child who improves from a D to a B has achieved something significant—arguably more than a child who consistently gets A's without effort. Recognize growth, not just end results.`
  },
  {
    id: '32',
    title: 'Preparing Kids for Adolescence',
    readTime: '6 min',
    category: 'Development',
    preview: 'Help your child navigate the transition to the teenage years.',
    content: `The transition from childhood to adolescence brings dramatic changes—physical, emotional, social, and cognitive. Preparing children for this transition helps them navigate it with less fear and more confidence. Early conversations make later ones easier.

Start conversations before puberty begins. Children do better with changes they've been prepared for. Discuss bodily changes, emotional shifts, and social developments before they happen, so children aren't surprised or frightened. Books can help facilitate these discussions.

Normalize the changes. Puberty can feel embarrassing and isolating. Reassure children that everyone goes through this, that their experiences are normal, and that awkwardness is temporary. Your calm, matter-of-fact approach reduces shame.

Discuss emotional changes along with physical ones. The surge of hormones brings mood swings, intensity, and sometimes confusing feelings. Let children know this is normal and that big emotions will become more manageable as their brains develop.

Talk about friendship changes. Peer relationships intensify during adolescence, and friendships may shift. Prepare children for social dynamics including cliques, peer pressure, and the sometimes painful process of friends drifting apart.

Address identity development. Adolescence is when children seriously explore who they are—their values, interests, beliefs, and identity. Support exploration while maintaining connection. They need both freedom to individuate and security to return to.

Create space for questions. Make yourself approachable for whatever topics arise. If children sense judgment or discomfort, they'll seek information elsewhere. Even if questions catch you off guard, respond calmly and thank them for asking.

Discuss relationships and sexuality. Age-appropriate conversations about healthy relationships, consent, and sexuality should start before adolescence. These conversations are ongoing, not one-time talks. Your values should be clear, but so should accurate information.

Prepare for increased independence. Adolescents need gradually increasing autonomy. Begin loosening controls before the teenage years, letting children practice independence while stakes are still low. This transition is easier when it's gradual rather than sudden.

Stay connected through the transition. Adolescents may seem to push parents away, but they still need connection. Find ways to stay involved that respect their growing independence—driving them places, being interested in their interests, being available without hovering.

Remember your own adolescence. Connecting with your own teenage experiences builds empathy. The challenges haven't changed that much, even if the specifics have. Your children are walking a path you once walked.`
  },
  {
    id: '33',
    title: 'Creating Meaningful Family Rituals',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Design rituals that strengthen your family\'s unique bond.',
    content: `Beyond holiday traditions, daily and weekly rituals create the fabric of family life. These regular practices—morning routines, mealtime customs, bedtime rituals—provide security, strengthen bonds, and create the memories children carry into adulthood.

Start with what you're already doing. You likely have unintentional rituals—how you say goodbye in the morning, what happens on Sunday evenings, how birthdays are celebrated. Recognize these and be intentional about preserving what works.

Create connection rituals. A special handshake, a nightly question at dinner ("What made you laugh today?"), weekend pancake breakfast—these repeated moments of connection accumulate into deep bonds. Consistency matters more than creativity.

Mark transitions with rituals. First day of school photos, back-to-school dinner conversations about goals, end-of-school celebrations—rituals help children process transitions and mark time's passage meaningfully.

Include rituals for comfort. When children are sick, sad, or struggling, having predictable comforts helps. Maybe it's a special soup when sick, or a particular song when scared. These rituals provide security during difficult times.

Let rituals evolve. What works for toddlers won't work for teenagers. Be willing to adapt rituals as children grow, preserving the core while updating the form. Sometimes children can help redesign rituals that have outgrown them.

Keep rituals manageable. Elaborate rituals that stress everyone out defeat the purpose. The best rituals are simple enough to maintain consistently, even on busy days. A thirty-second bedtime ritual done nightly beats an elaborate routine done sporadically.

Document your rituals. Write down what your family does—you might forget otherwise. These records become treasured family archives and can be passed down to future generations.

Create reunion rituals. How you reconnect at the end of the day matters. Greeting each other warmly, sharing about the day, or having specific "coming home" activities helps families transition from apart to together.`
  },
  {
    id: '34',
    title: 'Supporting a Child with Learning Differences',
    readTime: '6 min',
    category: 'Education',
    preview: 'Help your child succeed with their unique learning style.',
    content: `Children learn differently, and some have learning differences like dyslexia, ADHD, or processing disorders that affect their educational experience. Understanding and supporting these differences helps children thrive despite—and sometimes because of—learning differently.

Get proper assessment. If you suspect a learning difference, seek professional evaluation. Understanding specifically what your child struggles with—and what they excel at—enables targeted support. Don't rely on informal labels or assumptions.

Focus on strengths, not just challenges. Children with learning differences often have significant strengths—creativity, big-picture thinking, verbal skills, mechanical ability. Nurturing strengths builds confidence that helps them face challenges.

Advocate in educational settings. Learn about special education law, available accommodations, and your rights as a parent. Attend school meetings prepared. Your child needs you to speak up for appropriate support.

Explain the difference to your child. Children know when they struggle. Without understanding, they often conclude they're stupid. Age-appropriate explanation—"Your brain learns to read differently, so we're finding methods that work for your brain"—provides clarity and hope.

Separate worth from performance. School struggles can devastate self-esteem. Make clear that difficulty with certain tasks says nothing about your child's value or potential. Many successful adults have learning differences.

Find the right support. Tutoring, therapy, accommodations, and technology can help, but not all support is equal. Seek professionals experienced with your child's specific differences. What helps one child may not help another.

Connect with others. Other parents navigating similar challenges offer practical wisdom and emotional support. Organizations focused on specific learning differences often provide resources and community.

Teach self-advocacy. As children grow, they need to understand and communicate their own needs. Help them practice explaining their learning difference and asking for help. Self-advocacy skills will serve them throughout life.

Maintain perspective. Many people with learning differences achieve tremendous success. Their different way of thinking can become an asset. Your child's path may not be typical, but it can absolutely be successful and fulfilling.

Take care of yourself. Parenting a child with additional needs is demanding. Seek support, take breaks, and address your own emotions about your child's challenges. You parent better when you're resourced.`
  },
  {
    id: '35',
    title: 'Raising Kind Children',
    readTime: '5 min',
    category: 'Values',
    preview: 'Cultivate compassion and empathy in your family.',
    content: `In a competitive world, raising kind children might seem secondary to raising successful ones. But research shows that kindness correlates with happiness, healthy relationships, and even professional success. Moreover, kind children make the world better for everyone.

Model kindness constantly. Children learn kindness by watching you. How you treat service workers, how you speak about others, how you respond to people in need—your example teaches more than any lecture about being nice.

Point out the impact of kindness. Help children notice how their kind acts affect others: "Did you see how happy Grandma was when you drew that picture for her?" Understanding impact motivates more kindness.

Expect kindness at home. Siblings often receive our worst behavior because home feels safe. While allowing normal conflict, require basic kindness among family members. "In this family, we speak kindly to each other" sets a standard.

Teach empathy explicitly. Ask "How do you think she felt when that happened?" Help children imagine others' experiences. Read books with diverse characters. Discuss news events with attention to human impact. Empathy can be developed.

Create opportunities to help others. Volunteer as a family. Encourage children to help neighbors. Include them in caring for elderly relatives or new parents in your community. Experiencing the satisfaction of helping reinforces kind behavior.

Discuss unkindness when you see it. Current events, books, and everyday observations provide opportunities to discuss cruelty and its impact. "Why do you think he did that? How do you think she felt?" develops moral reasoning.

Avoid over-praising kindness. Paradoxically, excessive reward for kindness can undermine intrinsic motivation. Acknowledge kind acts briefly—"That was thoughtful"—rather than making a big production that makes kindness seem performance-worthy.

Address unkind behavior seriously. When your child is unkind, don't excuse it. Help them understand the impact, make amends, and develop alternative responses. Unkindness has consequences.

Be patient with development. Young children are naturally egocentric; empathy develops over time. A four-year-old who doesn't share well isn't doomed to selfishness. Keep teaching and modeling, understanding that kindness grows gradually.`
  },
];

// Storage keys
const STORAGE_KEYS = {
  TIPS_DATE: 'family_tips_regenerate_date',
  TIPS_IDS: 'family_tips_current_ids',
  ACTIVITIES_DATE: 'family_activities_regenerate_date',
  ACTIVITIES_IDS: 'family_activities_current_ids',
  GAMES_DATE: 'family_games_regenerate_date',
  GAMES_IDS: 'family_games_current_ids',
  ARTICLES_DATE: 'family_articles_regenerate_date',
  ARTICLES_IDS: 'family_articles_current_ids',
};

// Helper functions
const getRandomItems = <T extends { id: string }>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const shouldRegenerate = (lastDate: string | null, intervalDays: number): boolean => {
  if (!lastDate) return true;
  const last = new Date(lastDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= intervalDays;
};

export const FamilyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  const [tips, setTips] = useState<Tip[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Load Tips (weekly - 7 days)
      const tipsDate = await AsyncStorage.getItem(STORAGE_KEYS.TIPS_DATE);
      const tipsIdsStr = await AsyncStorage.getItem(STORAGE_KEYS.TIPS_IDS);

      if (shouldRegenerate(tipsDate, 7) || !tipsIdsStr) {
        const newTips = getRandomItems(allTips, 5);
        setTips(newTips);
        await AsyncStorage.setItem(STORAGE_KEYS.TIPS_DATE, new Date().toISOString());
        await AsyncStorage.setItem(STORAGE_KEYS.TIPS_IDS, JSON.stringify(newTips.map(t => t.id)));
      } else {
        const ids = JSON.parse(tipsIdsStr);
        setTips(allTips.filter(t => ids.includes(t.id)));
      }

      // Load Activities (bi-weekly - 14 days)
      const activitiesDate = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES_DATE);
      const activitiesIdsStr = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES_IDS);

      if (shouldRegenerate(activitiesDate, 14) || !activitiesIdsStr) {
        const newActivities = getRandomItems(allActivities, 5);
        setActivities(newActivities);
        await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES_DATE, new Date().toISOString());
        await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES_IDS, JSON.stringify(newActivities.map(a => a.id)));
      } else {
        const ids = JSON.parse(activitiesIdsStr);
        setActivities(allActivities.filter(a => ids.includes(a.id)));
      }

      // Load Games (bi-weekly - 14 days)
      const gamesDate = await AsyncStorage.getItem(STORAGE_KEYS.GAMES_DATE);
      const gamesIdsStr = await AsyncStorage.getItem(STORAGE_KEYS.GAMES_IDS);

      if (shouldRegenerate(gamesDate, 14) || !gamesIdsStr) {
        const newGames = getRandomItems(allGames, 5);
        setGames(newGames);
        await AsyncStorage.setItem(STORAGE_KEYS.GAMES_DATE, new Date().toISOString());
        await AsyncStorage.setItem(STORAGE_KEYS.GAMES_IDS, JSON.stringify(newGames.map(g => g.id)));
      } else {
        const ids = JSON.parse(gamesIdsStr);
        setGames(allGames.filter(g => ids.includes(g.id)));
      }

      // Load Articles (monthly - 30 days)
      const articlesDate = await AsyncStorage.getItem(STORAGE_KEYS.ARTICLES_DATE);
      const articlesIdsStr = await AsyncStorage.getItem(STORAGE_KEYS.ARTICLES_IDS);

      if (shouldRegenerate(articlesDate, 30) || !articlesIdsStr) {
        const newArticles = getRandomItems(allArticles, 5);
        setArticles(newArticles);
        await AsyncStorage.setItem(STORAGE_KEYS.ARTICLES_DATE, new Date().toISOString());
        await AsyncStorage.setItem(STORAGE_KEYS.ARTICLES_IDS, JSON.stringify(newArticles.map(a => a.id)));
      } else {
        const ids = JSON.parse(articlesIdsStr);
        setArticles(allArticles.filter(a => ids.includes(a.id)));
      }
    } catch (error) {
      // Fallback to random selection if storage fails
      setTips(getRandomItems(allTips, 5));
      setActivities(getRandomItems(allActivities, 5));
      setGames(getRandomItems(allGames, 5));
      setArticles(getRandomItems(allArticles, 5));
    }
  };

  const handleViewAllTips = () => navigation.navigate('FamilyTips');
  const handleViewAllArticles = () => navigation.navigate('FamilyArticles');
  const handleViewAllActivities = () => navigation.navigate('FamilyActivities');
  const handleViewAllGames = () => navigation.navigate('FamilyGames');

  const handleTipPress = (tip: Tip) => navigation.navigate('TipDetail', { tip });
  const handleActivityPress = (activity: Activity) => navigation.navigate('ActivityDetail', { activity });
  const handleGamePress = (game: Game) => navigation.navigate('GameDetail', { game });
  const handleArticlePress = (article: Article) => navigation.navigate('ArticleDetail', { article });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={assets.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Family
          </Text>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              source={assets.search}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroCard, { backgroundColor: '#9EB567' }]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Build Stronger Bonds</Text>
            <Text style={styles.heroSubtitle}>
              Connect, communicate, and create lasting memories with your family
            </Text>
          </View>
          <View style={styles.heroIconContainer}>
            <UsersIcon size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Family Tips Section - Weekly */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Family Tips
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.tertiary }]}>
                New tips every week
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllTips}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {tips.map((tip) => (
              <TouchableOpacity
                key={tip.id}
                style={[styles.tipCard, { backgroundColor: colors.background.card }]}
                onPress={() => handleTipPress(tip)}
                activeOpacity={0.7}
              >
                <View style={[styles.tipIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
                  <LightbulbIcon size={20} color="#9EB567" />
                </View>
                <Text style={[styles.tipCategory, { color: '#9EB567' }]}>{tip.category}</Text>
                <Text style={[styles.tipTitle, { color: colors.text.primary }]} numberOfLines={2}>
                  {tip.title}
                </Text>
                <Text style={[styles.tipDescription, { color: colors.text.secondary }]} numberOfLines={2}>
                  {tip.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Family Activities Section - Bi-weekly */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Family Activities
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.tertiary }]}>
                New activities every 2 weeks
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllActivities}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[styles.activityCard, { backgroundColor: colors.background.card }]}
                onPress={() => handleActivityPress(activity)}
                activeOpacity={0.7}
              >
                <View style={[styles.activityIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
                  <HeartIcon size={24} color="#9EB567" />
                </View>
                <Text style={[styles.activityTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {activity.title}
                </Text>
                <View style={styles.activityMeta}>
                  <Text style={[styles.activityDuration, { color: colors.text.secondary }]}>
                    {activity.duration}
                  </Text>
                  <Text style={[styles.activityParticipants, { color: colors.text.tertiary }]}>
                    {activity.participants} people
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Family Games Section - Bi-weekly */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Family Games
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.tertiary }]}>
                New games every 2 weeks
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllGames}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {games.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { backgroundColor: colors.background.card }]}
                onPress={() => handleGamePress(game)}
                activeOpacity={0.7}
              >
                <View style={[styles.gameIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
                  <GameIcon size={24} color="#9EB567" />
                </View>
                <Text style={[styles.gameTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {game.title}
                </Text>
                <View style={styles.gameMeta}>
                  <Text style={[styles.gamePlayers, { color: colors.text.secondary }]}>
                    {game.players} players
                  </Text>
                  <Text style={[styles.gameAge, { color: colors.text.tertiary }]}>
                    {game.ageRange}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Family Articles Section - Monthly */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Family Articles
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.tertiary }]}>
                New articles every month
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllArticles}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={[styles.articleCard, { backgroundColor: colors.background.card }]}
              onPress={() => handleArticlePress(article)}
              activeOpacity={0.7}
            >
              <View style={[styles.articleIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
                <BookIcon size={20} color="#9EB567" />
              </View>
              <View style={styles.articleContent}>
                <Text style={[styles.articleTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {article.title}
                </Text>
                <View style={styles.articleMeta}>
                  <Text style={[styles.articleCategory, { color: '#9EB567' }]}>{article.category}</Text>
                  <Text style={[styles.articleReadTime, { color: colors.text.tertiary }]}>
                    {article.readTime} read
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    padding: 4,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Hero Card
  heroCard: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  heroIconContainer: {
    marginLeft: 16,
    opacity: 0.9,
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 2,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9EB567',
  },
  viewAllArrow: {
    fontSize: 14,
    color: '#9EB567',
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Tip Cards
  tipCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tipCategory: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  tipDescription: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Activity Cards
  activityCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  activityMeta: {
    alignItems: 'center',
    gap: 2,
  },
  activityDuration: {
    fontSize: 12,
    fontWeight: '500',
  },
  activityParticipants: {
    fontSize: 11,
  },

  // Game Cards
  gameCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gameIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  gameMeta: {
    alignItems: 'center',
    gap: 2,
  },
  gamePlayers: {
    fontSize: 12,
    fontWeight: '500',
  },
  gameAge: {
    fontSize: 11,
  },

  // Article Cards
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  articleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  articleReadTime: {
    fontSize: 12,
  },
});

export default FamilyScreen;
