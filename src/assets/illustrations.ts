/**
 * Illustrations Asset Mapping
 * Real Figma-extracted illustrations
 */

const ILLUSTRATIONS_PATH = '../figma-extracted/assets/components/illustrations';

// Individual illustrations (numbered)
export const illustrations = {
  illustration9: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-9-component-illustrations-set.png`),
  illustration10: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-10-component-illustrations-set.png`),
  illustration11: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-11-component-illustrations-set.png`),
  illustration12: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-12-component-illustrations-set.png`),
  illustration13: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-13-component-illustrations-set.png`),
  illustration14: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-14-component-illustrations-set.png`),
  illustration15: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-15-component-illustrations-set.png`),
  illustration16: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-16-component-illustrations-set.png`),
  illustration17: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-17-component-illustrations-set.png`),
  illustration18: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-18-component-illustrations-set.png`),
  illustration19: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-19-component-illustrations-set.png`),
  illustration20: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-20-component-illustrations-set.png`),
  illustration21: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-21-component-illustrations-set.png`),
  illustration22: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-22-component-illustrations-set.png`),
  illustration23: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-23-component-illustrations-set.png`),
  illustration24: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-24-component-illustrations-set.png`),
  illustration25: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-25-component-illustrations-set.png`),
  illustration26: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-26-component-illustrations-set.png`),
  illustration27: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-27-component-illustrations-set.png`),
  illustration28: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-28-component-illustrations-set.png`),
  illustration29: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-29-component-illustrations-set.png`),
  illustration30: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-30-component-illustrations-set.png`),
  illustration31: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-31-component-illustrations-set.png`),
  illustration32: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-32-component-illustrations-set.png`),
  illustration33: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-33-component-illustrations-set.png`),
  illustration34: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-34-component-illustrations-set.png`),
  illustration35: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-35-component-illustrations-set.png`),
  illustration36: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-36-component-illustrations-set.png`),
  illustration37: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-37-component-illustrations-set.png`),
  illustration38: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-38-component-illustrations-set.png`),
  illustration39: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-39-component-illustrations-set.png`),
  illustration40: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-40-component-illustrations-set.png`),
  illustration41: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-41-component-illustrations-set.png`),
  illustration42: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-42-component-illustrations-set.png`),
  illustration43: require(`${ILLUSTRATIONS_PATH}/illustration-illustration-43-component-illustrations-set.png`),
};

// Success illustrations
export const successIllustrations = {
  // Complete illustration set
  set: require(`${ILLUSTRATIONS_PATH}/elements-successful-illustrations.png`),
  // Individual success icons
  checkmark: require(`${ILLUSTRATIONS_PATH}/illustration-checkmark-component-successful-illustrations.png`),
  confetti: require(`${ILLUSTRATIONS_PATH}/illustration-dot-confetti-component-successful-illustrations.png`),
  iphone: require(`${ILLUSTRATIONS_PATH}/illustration-iphone-component-successful-illustrations.png`),
};

// Full illustration set preview
export const illustrationSet = require(`${ILLUSTRATIONS_PATH}/elements-illustrations-set.png`);

// Semantic illustration mapping for specific screens/features
export const featureIllustrations = {
  // Meditation & Mindfulness
  meditation: illustrations.illustration10,
  breathing: illustrations.illustration11,
  relaxation: illustrations.illustration12,

  // Sleep
  sleep: illustrations.illustration13,
  sleepSounds: illustrations.illustration14,
  dreams: illustrations.illustration15,

  // Journaling
  journal: illustrations.illustration16,
  writing: illustrations.illustration17,
  notes: illustrations.illustration18,

  // Mood & Emotions
  mood: illustrations.illustration19,
  feelings: illustrations.illustration20,
  emotions: illustrations.illustration21,

  // Goals & Progress
  goals: illustrations.illustration22,
  progress: illustrations.illustration23,
  achievements: illustrations.illustration24,

  // Family & Social
  family: illustrations.illustration25,
  conversation: illustrations.illustration26,
  connection: illustrations.illustration27,

  // Wellness
  wellness: illustrations.illustration28,
  health: illustrations.illustration29,
  selfCare: illustrations.illustration30,

  // Success states
  success: successIllustrations.checkmark,
  celebration: successIllustrations.confetti,
};

// Get illustration by number
export const getIllustration = (num: number) => {
  const key = `illustration${num}` as keyof typeof illustrations;
  return illustrations[key];
};
