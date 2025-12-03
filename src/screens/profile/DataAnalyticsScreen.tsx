/**
 * Data Analytics Screen - Privacy and data settings
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
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import { exportService, ExportFormat } from '../../services/ExportService';

interface DataSummary {
  moods: number;
  journals: number;
  meditations: number;
  reminders: number;
}

export const DataAnalyticsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [settings, setSettings] = useState({
    analytics: true,
    crashReports: true,
    personalization: false,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);

  useEffect(() => {
    loadDataSummary();
  }, []);

  const loadDataSummary = async () => {
    try {
      const summary = await exportService.getDataSummary();
      setDataSummary(summary);
    } catch (error) {
      console.error('Failed to load data summary:', error);
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = async (format: ExportFormat) => {
    setShowExportModal(false);
    setIsExporting(true);

    try {
      const success = await exportService.exportAllData({ format });
      if (success) {
        Alert.alert(
          'Export Complete',
          `Your data has been exported successfully as ${format.toUpperCase()}.`
        );
      }
    } catch (error) {
      Alert.alert('Export Failed', 'Unable to export your data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              const success = await exportService.deleteAllData();
              if (success) {
                setDataSummary({ moods: 0, journals: 0, meditations: 0, reminders: 0 });
                Alert.alert('Data Deleted', 'All your data has been deleted.');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete data. Please try again.');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const dataItems = [
    {
      key: 'analytics' as const,
      title: 'Usage Analytics',
      description: 'Help us improve by sharing anonymous usage data',
    },
    {
      key: 'crashReports' as const,
      title: 'Crash Reports',
      description: 'Automatically send crash reports',
    },
    {
      key: 'personalization' as const,
      title: 'Personalization',
      description: 'Allow personalized recommendations',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Data & Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          Control how your data is used to improve your experience.
        </Text>

        {dataItems.map((item) => (
          <View
            key={item.key}
            style={[styles.settingCard, { backgroundColor: colors.background.card }]}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text.primary }]}>
                {item.title}
              </Text>
              <Text style={[styles.settingDescription, { color: colors.text.secondary }]}>
                {item.description}
              </Text>
            </View>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggleSetting(item.key)}
              trackColor={{ false: '#E0E0E0', true: 'rgba(158,181,103,0.4)' }}
              thumbColor={settings[item.key] ? '#9EB567' : '#f4f3f4'}
            />
          </View>
        ))}

        {/* Data Summary */}
        {dataSummary && (
          <View style={[styles.summaryCard, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.summaryTitle, { color: colors.text.primary }]}>
              Your Data Summary
            </Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryEmoji}>😊</Text>
                <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                  {dataSummary.moods}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                  Moods
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryEmoji}>📔</Text>
                <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                  {dataSummary.journals}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                  Journals
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryEmoji}>🧘</Text>
                <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                  {dataSummary.meditations}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                  Sessions
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryEmoji}>🔔</Text>
                <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                  {dataSummary.reminders}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                  Reminders
                </Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.exportButton, { backgroundColor: '#9EB567' }]}
          onPress={() => setShowExportModal(true)}
          disabled={isExporting}
        >
          {isExporting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.exportButtonText}>Export My Data</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAllData}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color="#E53935" />
          ) : (
            <Text style={styles.deleteText}>Delete All My Data</Text>
          )}
        </TouchableOpacity>

        {/* Export Format Info */}
        <View style={[styles.infoCard, { backgroundColor: 'rgba(158,181,103,0.1)' }]}>
          <Text style={styles.infoEmoji}>💡</Text>
          <Text style={[styles.infoText, { color: colors.text.secondary }]}>
            Export your data to keep a personal backup or transfer to another device.
            Your data is encrypted and stored locally on your device.
          </Text>
        </View>
      </ScrollView>

      {/* Export Format Modal */}
      <Modal
        visible={showExportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowExportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
              Export Format
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.text.secondary }]}>
              Choose how you'd like to export your data
            </Text>

            <TouchableOpacity
              style={[styles.formatOption, { backgroundColor: colors.background.card }]}
              onPress={() => handleExport('json')}
            >
              <View style={styles.formatInfo}>
                <Text style={[styles.formatTitle, { color: colors.text.primary }]}>JSON</Text>
                <Text style={[styles.formatDescription, { color: colors.text.secondary }]}>
                  Best for importing into other apps
                </Text>
              </View>
              <Text style={styles.formatIcon}>📄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.formatOption, { backgroundColor: colors.background.card }]}
              onPress={() => handleExport('csv')}
            >
              <View style={styles.formatInfo}>
                <Text style={[styles.formatTitle, { color: colors.text.primary }]}>CSV</Text>
                <Text style={[styles.formatDescription, { color: colors.text.secondary }]}>
                  Best for spreadsheets and analysis
                </Text>
              </View>
              <Text style={styles.formatIcon}>📊</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowExportModal(false)}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text.secondary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: { width: 40 },
  backText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 40 },
  content: { flex: 1, paddingHorizontal: 20 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingInfo: { flex: 1, marginRight: 16 },
  settingTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  settingDescription: { fontSize: 13 },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  exportButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  deleteText: { fontSize: 16, color: '#E53935', fontWeight: '500' },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  infoEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  formatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  formatInfo: {
    flex: 1,
  },
  formatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  formatDescription: {
    fontSize: 13,
  },
  formatIcon: {
    fontSize: 24,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DataAnalyticsScreen;
