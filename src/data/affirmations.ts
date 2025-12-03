/**
 * Comprehensive Affirmations Data
 * Organized by category with 50+ unique affirmations
 */

export interface Affirmation {
  id: string;
  title: string;
  message: string;
  category: AffirmationCategory;
  author?: string;
}

export type AffirmationCategory =
  | 'self-worth'
  | 'confidence'
  | 'growth'
  | 'gratitude'
  | 'calm'
  | 'strength'
  | 'success'
  | 'love'
  | 'health'
  | 'morning'
  | 'evening';

export interface CategoryInfo {
  id: AffirmationCategory;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

// Category definitions
export const categories: CategoryInfo[] = [
  { id: 'self-worth', label: 'Self-Worth', emoji: '💎', color: '#9B59B6', description: 'Embrace your inherent value' },
  { id: 'confidence', label: 'Confidence', emoji: '💪', color: '#E74C3C', description: 'Build unshakeable self-belief' },
  { id: 'growth', label: 'Growth', emoji: '🌱', color: '#27AE60', description: 'Embrace continuous improvement' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏', color: '#F39C12', description: 'Appreciate life\'s blessings' },
  { id: 'calm', label: 'Calm', emoji: '🧘', color: '#3498DB', description: 'Find inner peace' },
  { id: 'strength', label: 'Strength', emoji: '🦁', color: '#E67E22', description: 'Discover your inner power' },
  { id: 'success', label: 'Success', emoji: '⭐', color: '#9EB567', description: 'Attract abundance' },
  { id: 'love', label: 'Love', emoji: '❤️', color: '#E91E63', description: 'Open your heart' },
  { id: 'health', label: 'Health', emoji: '🌿', color: '#00BCD4', description: 'Nurture mind and body' },
  { id: 'morning', label: 'Morning', emoji: '🌅', color: '#FF9800', description: 'Start your day right' },
  { id: 'evening', label: 'Evening', emoji: '🌙', color: '#673AB7', description: 'End your day peacefully' },
];

// Comprehensive affirmations data
export const affirmations: Affirmation[] = [
  // Self-Worth (10 affirmations)
  {
    id: 'sw1',
    title: 'I Am Worthy',
    message: 'I am worthy of love, happiness, and success. My worth is not determined by others or my achievements.',
    category: 'self-worth',
  },
  {
    id: 'sw2',
    title: 'I Embrace My Uniqueness',
    message: 'I embrace my unique qualities and celebrate what makes me different. There is only one me, and that is my superpower.',
    category: 'self-worth',
  },
  {
    id: 'sw3',
    title: 'I Deserve Good Things',
    message: 'I deserve all the good things that come my way. I am open to receiving abundance in all forms.',
    category: 'self-worth',
  },
  {
    id: 'sw4',
    title: 'I Am Enough',
    message: 'I am enough just as I am. I don\'t need to prove my worth to anyone, including myself.',
    category: 'self-worth',
  },
  {
    id: 'sw5',
    title: 'I Honor Myself',
    message: 'I honor my needs and set healthy boundaries. Taking care of myself is not selfish, it\'s necessary.',
    category: 'self-worth',
  },
  {
    id: 'sw6',
    title: 'I Am Complete',
    message: 'I am complete within myself. I don\'t need external validation to feel whole.',
    category: 'self-worth',
  },
  {
    id: 'sw7',
    title: 'I Respect Myself',
    message: 'I treat myself with the same kindness and respect I would give to a dear friend.',
    category: 'self-worth',
  },
  {
    id: 'sw8',
    title: 'I Am Valuable',
    message: 'My presence adds value to this world. I make a difference simply by being who I am.',
    category: 'self-worth',
  },
  {
    id: 'sw9',
    title: 'I Accept Myself',
    message: 'I fully accept myself, including my imperfections. They make me beautifully human.',
    category: 'self-worth',
  },
  {
    id: 'sw10',
    title: 'I Am Irreplaceable',
    message: 'No one can take my place. I bring something unique to every situation and relationship.',
    category: 'self-worth',
  },

  // Confidence (10 affirmations)
  {
    id: 'cf1',
    title: 'I Am Confident',
    message: 'I believe in myself and my abilities. I can achieve anything I set my mind to.',
    category: 'confidence',
  },
  {
    id: 'cf2',
    title: 'I Speak With Courage',
    message: 'I speak my truth with courage and confidence. My voice matters and deserves to be heard.',
    category: 'confidence',
  },
  {
    id: 'cf3',
    title: 'I Trust My Decisions',
    message: 'I trust myself to make good decisions. I have the wisdom to choose what\'s best for me.',
    category: 'confidence',
  },
  {
    id: 'cf4',
    title: 'I Face Challenges Head-On',
    message: 'I have the courage to face challenges head-on. Every obstacle is an opportunity to grow stronger.',
    category: 'confidence',
  },
  {
    id: 'cf5',
    title: 'I Am Capable',
    message: 'I am capable of achieving great things. My potential is limitless when I believe in myself.',
    category: 'confidence',
  },
  {
    id: 'cf6',
    title: 'I Own My Power',
    message: 'I own my power and use it wisely. I am the author of my own story.',
    category: 'confidence',
  },
  {
    id: 'cf7',
    title: 'I Welcome New Experiences',
    message: 'I welcome new experiences with an open heart. Stepping out of my comfort zone helps me grow.',
    category: 'confidence',
  },
  {
    id: 'cf8',
    title: 'I Am Unstoppable',
    message: 'When I set my mind to something, I am unstoppable. My determination knows no bounds.',
    category: 'confidence',
  },
  {
    id: 'cf9',
    title: 'I Stand Tall',
    message: 'I stand tall and proud of who I am. I carry myself with grace and confidence.',
    category: 'confidence',
  },
  {
    id: 'cf10',
    title: 'I Believe In My Dreams',
    message: 'I believe in my dreams and have the confidence to pursue them. Nothing can hold me back.',
    category: 'confidence',
  },

  // Growth (8 affirmations)
  {
    id: 'gr1',
    title: 'I Am Growing',
    message: 'Every day I am growing and becoming a better version of myself. Progress, not perfection.',
    category: 'growth',
  },
  {
    id: 'gr2',
    title: 'I Welcome Change',
    message: 'I welcome change as an opportunity for growth and new beginnings. Change is the only constant.',
    category: 'growth',
  },
  {
    id: 'gr3',
    title: 'I Learn From Everything',
    message: 'I learn valuable lessons from every experience, both positive and challenging.',
    category: 'growth',
  },
  {
    id: 'gr4',
    title: 'I Embrace Challenges',
    message: 'I embrace challenges as opportunities to learn and expand my capabilities.',
    category: 'growth',
  },
  {
    id: 'gr5',
    title: 'I Am Open To Learning',
    message: 'I am always open to learning new things. My mind is curious and eager to expand.',
    category: 'growth',
  },
  {
    id: 'gr6',
    title: 'I Release Old Patterns',
    message: 'I release old patterns that no longer serve me. I make room for new, positive habits.',
    category: 'growth',
  },
  {
    id: 'gr7',
    title: 'I Transform Setbacks',
    message: 'I transform setbacks into comebacks. Every failure is a stepping stone to success.',
    category: 'growth',
  },
  {
    id: 'gr8',
    title: 'I Am Evolving',
    message: 'I am constantly evolving into the person I am meant to be. My journey is unique and beautiful.',
    category: 'growth',
  },

  // Gratitude (8 affirmations)
  {
    id: 'gt1',
    title: 'I Am Grateful',
    message: 'I am grateful for all the blessings in my life, big and small. Gratitude fills my heart.',
    category: 'gratitude',
  },
  {
    id: 'gt2',
    title: 'I Appreciate Today',
    message: 'I appreciate this moment and find joy in the present. Today is a gift.',
    category: 'gratitude',
  },
  {
    id: 'gt3',
    title: 'I Notice Beauty',
    message: 'I notice and appreciate the beauty around me. Life is full of wonder.',
    category: 'gratitude',
  },
  {
    id: 'gt4',
    title: 'I Am Thankful',
    message: 'I am thankful for the people who love and support me. I am never alone.',
    category: 'gratitude',
  },
  {
    id: 'gt5',
    title: 'I Celebrate Small Wins',
    message: 'I celebrate small victories along the way. Every step forward is worth acknowledging.',
    category: 'gratitude',
  },
  {
    id: 'gt6',
    title: 'I Focus On Abundance',
    message: 'I focus on what I have, not what I lack. My life is rich with blessings.',
    category: 'gratitude',
  },
  {
    id: 'gt7',
    title: 'I Give Thanks Daily',
    message: 'I give thanks for this day and all the possibilities it holds.',
    category: 'gratitude',
  },
  {
    id: 'gt8',
    title: 'I Am Blessed',
    message: 'I am blessed beyond measure. Gratitude transforms my outlook on life.',
    category: 'gratitude',
  },

  // Calm (8 affirmations)
  {
    id: 'cm1',
    title: 'I Am At Peace',
    message: 'I am calm and at peace. I release all tension and embrace tranquility.',
    category: 'calm',
  },
  {
    id: 'cm2',
    title: 'I Breathe Deeply',
    message: 'With each breath, I become more relaxed and centered. Peace flows through me.',
    category: 'calm',
  },
  {
    id: 'cm3',
    title: 'I Let Go Of Worry',
    message: 'I let go of worry and trust that everything is working out for my highest good.',
    category: 'calm',
  },
  {
    id: 'cm4',
    title: 'I Find Stillness',
    message: 'I find stillness within myself, even in chaos. My inner peace is unshakeable.',
    category: 'calm',
  },
  {
    id: 'cm5',
    title: 'I Release Tension',
    message: 'I release tension from my body and mind. Relaxation comes naturally to me.',
    category: 'calm',
  },
  {
    id: 'cm6',
    title: 'I Am Centered',
    message: 'I am grounded and centered. I respond to life with calm clarity.',
    category: 'calm',
  },
  {
    id: 'cm7',
    title: 'I Choose Serenity',
    message: 'I choose serenity over stress. My peace of mind is a priority.',
    category: 'calm',
  },
  {
    id: 'cm8',
    title: 'I Flow With Life',
    message: 'I flow with life instead of fighting against it. Surrender brings peace.',
    category: 'calm',
  },

  // Strength (6 affirmations)
  {
    id: 'st1',
    title: 'I Am Strong',
    message: 'I am stronger than I know. I have overcome so much and will continue to rise.',
    category: 'strength',
  },
  {
    id: 'st2',
    title: 'I Am Resilient',
    message: 'I am resilient and bounce back from difficulties. Nothing can keep me down for long.',
    category: 'strength',
  },
  {
    id: 'st3',
    title: 'I Face My Fears',
    message: 'I face my fears with courage. I am braver than I believe.',
    category: 'strength',
  },
  {
    id: 'st4',
    title: 'I Am A Warrior',
    message: 'I am a warrior, not a worrier. I face life\'s battles with strength and grace.',
    category: 'strength',
  },
  {
    id: 'st5',
    title: 'I Overcome Obstacles',
    message: 'I overcome obstacles with determination. Every challenge makes me stronger.',
    category: 'strength',
  },
  {
    id: 'st6',
    title: 'I Have Inner Power',
    message: 'I have an inner power that nothing can diminish. I am my own hero.',
    category: 'strength',
  },

  // Success (6 affirmations)
  {
    id: 'su1',
    title: 'I Attract Success',
    message: 'I attract success and abundance into my life. Opportunities flow to me naturally.',
    category: 'success',
  },
  {
    id: 'su2',
    title: 'I Am Worthy Of Success',
    message: 'I am worthy of success and prosperity. I deserve to live an abundant life.',
    category: 'success',
  },
  {
    id: 'su3',
    title: 'I Create My Reality',
    message: 'I create my own reality through my thoughts and actions. My success is inevitable.',
    category: 'success',
  },
  {
    id: 'su4',
    title: 'I Am Prosperous',
    message: 'I am prosperous in all areas of my life. Abundance is my birthright.',
    category: 'success',
  },
  {
    id: 'su5',
    title: 'I Take Inspired Action',
    message: 'I take inspired action toward my goals every day. Success is a journey I enjoy.',
    category: 'success',
  },
  {
    id: 'su6',
    title: 'I Celebrate My Achievements',
    message: 'I celebrate my achievements and recognize my hard work. I am successful.',
    category: 'success',
  },

  // Love (6 affirmations)
  {
    id: 'lv1',
    title: 'I Am Loved',
    message: 'I am loved unconditionally. Love surrounds me in all directions.',
    category: 'love',
  },
  {
    id: 'lv2',
    title: 'I Give And Receive Love',
    message: 'I give and receive love freely. My heart is open and full.',
    category: 'love',
  },
  {
    id: 'lv3',
    title: 'I Love Myself',
    message: 'I love myself deeply and completely. Self-love is the foundation of my happiness.',
    category: 'love',
  },
  {
    id: 'lv4',
    title: 'I Attract Loving Relationships',
    message: 'I attract healthy, loving relationships into my life. I am magnetic to good people.',
    category: 'love',
  },
  {
    id: 'lv5',
    title: 'I Radiate Love',
    message: 'I radiate love and warmth to everyone I meet. Love is my natural state.',
    category: 'love',
  },
  {
    id: 'lv6',
    title: 'I Forgive With Love',
    message: 'I forgive myself and others with compassion. Forgiveness sets me free.',
    category: 'love',
  },

  // Health (5 affirmations)
  {
    id: 'hl1',
    title: 'I Am Healthy',
    message: 'I am healthy in mind, body, and spirit. Wellness flows through every cell of my being.',
    category: 'health',
  },
  {
    id: 'hl2',
    title: 'I Nurture My Body',
    message: 'I nurture my body with healthy choices. I am grateful for my body\'s strength and resilience.',
    category: 'health',
  },
  {
    id: 'hl3',
    title: 'I Prioritize Rest',
    message: 'I prioritize rest and recovery. Quality sleep renews my energy and vitality.',
    category: 'health',
  },
  {
    id: 'hl4',
    title: 'I Listen To My Body',
    message: 'I listen to what my body needs. I honor its wisdom and care for it with love.',
    category: 'health',
  },
  {
    id: 'hl5',
    title: 'I Radiate Vitality',
    message: 'I radiate health and vitality. My energy is abundant and positive.',
    category: 'health',
  },

  // Morning (5 affirmations)
  {
    id: 'mn1',
    title: 'Good Morning, Beautiful Day',
    message: 'Today is a new beginning full of possibilities. I welcome this day with open arms.',
    category: 'morning',
  },
  {
    id: 'mn2',
    title: 'I Wake Up Grateful',
    message: 'I wake up grateful for another day. Each morning is a fresh start.',
    category: 'morning',
  },
  {
    id: 'mn3',
    title: 'Today Will Be Amazing',
    message: 'Today will be an amazing day. I am ready for all the good things coming my way.',
    category: 'morning',
  },
  {
    id: 'mn4',
    title: 'I Am Energized',
    message: 'I am energized and ready to make today count. My enthusiasm is contagious.',
    category: 'morning',
  },
  {
    id: 'mn5',
    title: 'I Set Positive Intentions',
    message: 'I set positive intentions for this day. I choose joy, peace, and productivity.',
    category: 'morning',
  },

  // Evening (5 affirmations)
  {
    id: 'ev1',
    title: 'I End My Day In Peace',
    message: 'I end my day in peace, releasing all stress and worry. Rest comes easily to me.',
    category: 'evening',
  },
  {
    id: 'ev2',
    title: 'I Am Proud Of Today',
    message: 'I am proud of what I accomplished today, no matter how small. I did my best.',
    category: 'evening',
  },
  {
    id: 'ev3',
    title: 'I Release The Day',
    message: 'I release the events of today. Tomorrow is a new opportunity to begin again.',
    category: 'evening',
  },
  {
    id: 'ev4',
    title: 'I Sleep Peacefully',
    message: 'I drift into peaceful, restful sleep. My mind and body are calm.',
    category: 'evening',
  },
  {
    id: 'ev5',
    title: 'I Am Safe And Secure',
    message: 'I am safe, secure, and at ease. I surrender to restful sleep.',
    category: 'evening',
  },
];

// Helper functions
export const getAffirmationsByCategory = (category: AffirmationCategory): Affirmation[] => {
  return affirmations.filter(a => a.category === category);
};

export const getRandomAffirmation = (): Affirmation => {
  const index = Math.floor(Math.random() * affirmations.length);
  return affirmations[index];
};

export const getRandomAffirmationByCategory = (category: AffirmationCategory): Affirmation => {
  const categoryAffirmations = getAffirmationsByCategory(category);
  const index = Math.floor(Math.random() * categoryAffirmations.length);
  return categoryAffirmations[index];
};

export const getDailyAffirmation = (): Affirmation => {
  // Use date as seed for consistent daily affirmation
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % affirmations.length;
  return affirmations[index];
};

export const getMorningAffirmation = (): Affirmation => {
  const morningAffirmations = getAffirmationsByCategory('morning');
  const index = Math.floor(Math.random() * morningAffirmations.length);
  return morningAffirmations[index];
};

export const getEveningAffirmation = (): Affirmation => {
  const eveningAffirmations = getAffirmationsByCategory('evening');
  const index = Math.floor(Math.random() * eveningAffirmations.length);
  return eveningAffirmations[index];
};

export const getCategoryInfo = (categoryId: AffirmationCategory): CategoryInfo | undefined => {
  return categories.find(c => c.id === categoryId);
};

export default affirmations;
