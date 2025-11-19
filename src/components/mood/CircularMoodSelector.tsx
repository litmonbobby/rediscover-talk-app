import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '../../constants/theme';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface CircularMoodSelectorProps {
  moods: MoodOption[];
  selectedMood: string | null;
  onSelectMood: (moodId: string) => void;
}

export const CircularMoodSelector: React.FC<CircularMoodSelectorProps> = ({
  moods,
  selectedMood,
  onSelectMood,
}) => {
  return (
    <View style={styles.container}>
      {moods.map((mood) => {
        const isSelected = selectedMood === mood.id;
        return (
          <TouchableOpacity
            key={mood.id}
            style={styles.moodItem}
            onPress={() => onSelectMood(mood.id)}
            activeOpacity={0.7}
          >
            <View style={styles.circleContainer}>
              {/* Progress ring SVG */}
              <Svg width={80} height={80} style={styles.svg}>
                {/* Background circle */}
                <Circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke={theme.colors.border.light}
                  strokeWidth="4"
                  fill="none"
                />
                {/* Active circle */}
                {isSelected && (
                  <Circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke={mood.color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="226"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                )}
              </Svg>

              {/* Emoji in center */}
              <View style={[
                styles.emojiContainer,
                isSelected && { backgroundColor: mood.color + '15' }
              ]}>
                <Text style={styles.emoji}>{mood.emoji}</Text>
              </View>
            </View>

            {/* Label */}
            <Text style={[
              styles.label,
              isSelected && { color: mood.color, fontWeight: '600' }
            ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: theme.spacing[4],
  },
  moodItem: {
    alignItems: 'center',
    width: 80,
  },
  circleContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[2],
  },
  svg: {
    position: 'absolute',
  },
  emojiContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.secondary,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
