/**
 * Audio Assets Index
 * Central export for all audio files used in the app
 */

// Sleep Sounds - Ambient sounds for relaxation and sleep
export const sleepSounds = {
  rain: require('./sleep-sounds/rain.mp3'),
  wind: require('./sleep-sounds/wind.mp3'),
  thunder: require('./sleep-sounds/thunder.mp3'),
  fire: require('./sleep-sounds/fire.mp3'),
  river: require('./sleep-sounds/river.mp3'),
  ocean: require('./sleep-sounds/ocean.mp3'),
  melody: require('./sleep-sounds/melody.mp3'),
  dream: require('./sleep-sounds/dream.mp3'),
  forest: require('./sleep-sounds/forest.mp3'),
  planet: require('./sleep-sounds/planet.mp3'),
  mountains: require('./sleep-sounds/mountains.mp3'),
  whiteNoise: require('./sleep-sounds/white-noise.mp3'),
};

// Meditation Audio
export const meditationSounds = {
  introToMeditation: require('./meditations/intro-to-meditation.mp3'),
  gratitudeMeditation: require('./meditations/gratitude-meditation.mp3'),
};

// UI Notification Sounds
export const notificationSounds = {
  notification1: require('./ui/notification-1.mp3'),
  notification2: require('./ui/notification-2.mp3'),
  notification3: require('./ui/notification-3.mp3'),
  notification4: require('./ui/notification-4.mp3'),
};

// Sound type mapping for SleepSoundsScreen
export type SleepSoundType = keyof typeof sleepSounds;

// Meditation type mapping
export type MeditationType = keyof typeof meditationSounds;

// Get audio source by sound type
export const getSleepSoundSource = (type: SleepSoundType) => {
  return sleepSounds[type] || sleepSounds.rain;
};

// Get meditation audio source
export const getMeditationSource = (type: MeditationType) => {
  return meditationSounds[type] || meditationSounds.introToMeditation;
};

// Sound metadata for display
export const sleepSoundMetadata: Record<SleepSoundType, { name: string; isPremium: boolean }> = {
  rain: { name: 'Heavy Rain', isPremium: false },
  dream: { name: 'Dream', isPremium: false },
  wind: { name: 'Wind', isPremium: false },
  fire: { name: 'Fire', isPremium: false },
  thunder: { name: 'Thunder', isPremium: false },
  forest: { name: 'Forest', isPremium: true },
  river: { name: 'River', isPremium: true },
  melody: { name: 'Melody', isPremium: false },
  ocean: { name: 'Ocean', isPremium: true },
  mountains: { name: 'Mountains', isPremium: true },
  whiteNoise: { name: 'White Noise', isPremium: false },
  planet: { name: 'Planet', isPremium: true },
};

export default {
  sleepSounds,
  meditationSounds,
  notificationSounds,
  getSleepSoundSource,
  getMeditationSource,
  sleepSoundMetadata,
};
