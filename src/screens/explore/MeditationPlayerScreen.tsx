/**
 * MeditationPlayerScreen
 * Audio player for meditation sessions
 * Reference: Figma screen 44-light-explore-meditation-player.png
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';

interface MeditationPlayerProps {
  meditation: {
    id: string;
    title: string;
    instructor?: string;
    duration: number;
    audioUrl: string;
  };
}

export function MeditationPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(600); // 10 minutes in seconds

  // Sample meditation data
  const meditation = {
    id: '1',
    title: 'Morning Mindfulness',
    instructor: 'Sarah Johnson',
    duration: 10,
    audioUrl: 'morning-mindfulness.mp3',
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 15));
    // TODO: Implement actual audio seeking
  };

  const handleForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 15));
    // TODO: Implement actual audio seeking
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Artwork */}
        <View style={styles.artworkContainer}>
          <View style={styles.artwork}>
            <Text style={styles.artworkIcon}>🧘</Text>
          </View>
        </View>

        {/* Track Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{meditation.title}</Text>
          {meditation.instructor && (
            <Text style={styles.trackArtist}>{meditation.instructor}</Text>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
            <Text style={styles.controlIcon}>⏪</Text>
            <Text style={styles.controlLabel}>15s</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={handleForward}>
            <Text style={styles.controlIcon}>⏩</Text>
            <Text style={styles.controlLabel}>15s</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Controls */}
        <View style={styles.additionalControls}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconButtonText}>🔀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconButtonText}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconButtonText}>💤</Text>
          </TouchableOpacity>
        </View>

        {/* Session Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Session Duration</Text>
            <Text style={styles.statValue}>{meditation.duration} min</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Time Remaining</Text>
            <Text style={styles.statValue}>
              {formatTime(duration - currentTime)}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },

  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },

  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },

  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
  },

  artworkContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
  },

  artwork: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  artworkIcon: {
    fontSize: 120,
  },

  trackInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },

  trackTitle: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },

  trackArtist: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  progressContainer: {
    marginBottom: theme.spacing.xl,
  },

  progressBar: {
    height: 4,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 2,
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },

  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary.DEFAULT,
    borderRadius: 2,
  },

  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary.DEFAULT,
    marginLeft: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  timeText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },

  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlIcon: {
    fontSize: 20,
  },

  controlLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    fontSize: 10,
    marginTop: 2,
  },

  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary.DEFAULT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  playIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    marginLeft: 3,
  },

  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconButtonText: {
    fontSize: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },

  statValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border.DEFAULT,
    marginHorizontal: theme.spacing.md,
  },
});
