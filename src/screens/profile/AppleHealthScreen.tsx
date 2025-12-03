/**
 * Apple Health Screen - HealthKit Integration Settings
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import {
  healthKitService,
  HealthKitDataType,
  HealthKitStats,
} from '../../services/HealthKitService';

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

// Health Icon
const HealthIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AppleHealthScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [dataTypes, setDataTypes] = useState<HealthKitDataType[]>([]);
  const [healthStats, setHealthStats] = useState<HealthKitStats | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    initializeHealthKit();
  }, []);

  const initializeHealthKit = async () => {
    setIsLoading(true);
    try {
      const available = healthKitService.checkAvailability();
      setIsAvailable(available);

      if (available) {
        await healthKitService.initialize();
        setDataTypes(healthKitService.getDataTypes());
        setIsConnected(healthKitService.isAuthorizedForAccess());

        if (healthKitService.isAuthorizedForAccess()) {
          const stats = await healthKitService.getHealthStats();
          setHealthStats(stats);
        }
      }
    } catch (error) {
      console.error('Failed to initialize HealthKit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const authorized = await healthKitService.requestAuthorization();
      if (authorized) {
        setIsConnected(true);
        const stats = await healthKitService.getHealthStats();
        setHealthStats(stats);
        Alert.alert(
          'Connected!',
          'Your Apple Health data is now linked. Toggle the data types you want to sync.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Permission Required',
          'Please allow access to Apple Health in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to Apple Health');
    }
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Apple Health',
      'This will stop syncing your health data. Your existing data in Apple Health will not be deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await healthKitService.disconnect();
            setIsConnected(false);
            setDataTypes(healthKitService.getDataTypes());
            setHealthStats(null);
          },
        },
      ]
    );
  };

  const handleToggleDataType = async (dataTypeId: string) => {
    const success = await healthKitService.toggleDataType(dataTypeId);
    if (success) {
      setDataTypes(healthKitService.getDataTypes());
    }
  };

  const formatLastSynced = (dateString: string | null): string => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (Platform.OS !== 'ios') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Apple Health</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.notAvailableContainer}>
          <Text style={styles.notAvailableEmoji}>🍎</Text>
          <Text style={[styles.notAvailableTitle, { color: colors.text.primary }]}>
            iOS Only Feature
          </Text>
          <Text style={[styles.notAvailableText, { color: colors.text.secondary }]}>
            Apple Health integration is only available on iOS devices.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Apple Health</Text>
        <View style={styles.backButton} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9EB567" />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Connection Status */}
          <View style={[styles.statusCard, { backgroundColor: colors.background.card }]}>
            <View style={styles.statusHeader}>
              <View style={[styles.statusIcon, { backgroundColor: isConnected ? 'rgba(158,181,103,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <HealthIcon size={28} color={isConnected ? '#9EB567' : colors.text.tertiary} />
              </View>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusTitle, { color: colors.text.primary }]}>
                  Apple Health
                </Text>
                <Text style={[styles.statusSubtitle, { color: isConnected ? '#9EB567' : colors.text.secondary }]}>
                  {isConnected ? 'Connected' : 'Not connected'}
                </Text>
              </View>
            </View>

            {isConnected ? (
              <TouchableOpacity
                style={[styles.disconnectButton]}
                onPress={handleDisconnect}
              >
                <Text style={styles.disconnectButtonText}>Disconnect</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.connectButton]}
                onPress={handleConnect}
              >
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Health Stats (if connected) */}
          {isConnected && healthStats && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
                Today's Summary
              </Text>
              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
                  <Text style={styles.statEmoji}>👟</Text>
                  <Text style={[styles.statValue, { color: colors.text.primary }]}>
                    {healthStats.steps.toLocaleString()}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Steps</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
                  <Text style={styles.statEmoji}>😴</Text>
                  <Text style={[styles.statValue, { color: colors.text.primary }]}>
                    {healthStats.sleepHours}h
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Sleep</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
                  <Text style={styles.statEmoji}>🧘</Text>
                  <Text style={[styles.statValue, { color: colors.text.primary }]}>
                    {healthStats.mindfulMinutes}m
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Mindful</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
                  <Text style={styles.statEmoji}>❤️</Text>
                  <Text style={[styles.statValue, { color: colors.text.primary }]}>
                    {healthStats.heartRateAvg}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Avg HR</Text>
                </View>
              </View>
            </View>
          )}

          {/* Data Types */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              Data Sync Settings
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.text.tertiary }]}>
              {isConnected
                ? 'Choose which health data to sync between Rediscover Talk and Apple Health.'
                : 'Connect to Apple Health to enable data syncing.'}
            </Text>

            {dataTypes.map((dataType) => (
              <View
                key={dataType.id}
                style={[styles.dataTypeCard, { backgroundColor: colors.background.card }]}
              >
                <View style={styles.dataTypeLeft}>
                  <Text style={styles.dataTypeEmoji}>{dataType.icon}</Text>
                  <View style={styles.dataTypeInfo}>
                    <Text style={[styles.dataTypeName, { color: colors.text.primary }]}>
                      {dataType.name}
                    </Text>
                    <Text style={[styles.dataTypeDescription, { color: colors.text.secondary }]}>
                      {dataType.description}
                    </Text>
                    {dataType.enabled && (
                      <Text style={[styles.lastSynced, { color: colors.text.tertiary }]}>
                        Last synced: {formatLastSynced(dataType.lastSynced)}
                      </Text>
                    )}
                  </View>
                </View>
                <Switch
                  value={dataType.enabled}
                  onValueChange={() => handleToggleDataType(dataType.id)}
                  disabled={!isConnected}
                  trackColor={{ false: '#E0E0E0', true: 'rgba(158,181,103,0.4)' }}
                  thumbColor={dataType.enabled ? '#9EB567' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>

          {/* Info Card */}
          <View style={[styles.infoCard, { backgroundColor: 'rgba(158,181,103,0.1)' }]}>
            <Text style={styles.infoEmoji}>🔒</Text>
            <Text style={[styles.infoText, { color: colors.text.secondary }]}>
              Your health data is stored securely on your device and synced with Apple Health.
              We never store your health data on our servers.
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 20 },

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { marginTop: 12, fontSize: 16 },

  // Not Available
  notAvailableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  notAvailableEmoji: { fontSize: 64, marginBottom: 20 },
  notAvailableTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  notAvailableText: { fontSize: 16, textAlign: 'center', lineHeight: 24 },

  // Status Card
  statusCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statusInfo: { flex: 1 },
  statusTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  statusSubtitle: { fontSize: 14 },
  connectButton: {
    backgroundColor: '#9EB567',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  disconnectButton: {
    backgroundColor: 'rgba(220,38,38,0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disconnectButtonText: { color: '#DC2626', fontSize: 16, fontWeight: '600' },

  // Section
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionDescription: { fontSize: 14, lineHeight: 20, marginBottom: 16 },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statEmoji: { fontSize: 24, marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 4 },

  // Data Type Card
  dataTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  dataTypeLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
  },
  dataTypeEmoji: { fontSize: 24, marginRight: 12, marginTop: 2 },
  dataTypeInfo: { flex: 1 },
  dataTypeName: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  dataTypeDescription: { fontSize: 13, lineHeight: 18 },
  lastSynced: { fontSize: 11, marginTop: 4 },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  infoEmoji: { fontSize: 20, marginRight: 12 },
  infoText: { flex: 1, fontSize: 13, lineHeight: 20 },
});

export default AppleHealthScreen;
