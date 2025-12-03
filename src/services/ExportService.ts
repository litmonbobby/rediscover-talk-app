/**
 * Export Service - Data Export Functionality
 *
 * Provides methods to export user data in various formats.
 * Uses expo-sharing and expo-file-system for file operations.
 */

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform, Alert } from 'react-native';
import { secureStorage } from './SecureStorageService';

// Types
export type ExportFormat = 'json' | 'csv';

export interface ExportOptions {
  format: ExportFormat;
  includeTimestamps: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ExportableData {
  moods: any[];
  journals: any[];
  meditations: any[];
  reminders: any[];
  exportDate: string;
  appVersion: string;
}

// Default export options
const defaultOptions: ExportOptions = {
  format: 'json',
  includeTimestamps: true,
};

class ExportService {
  private appVersion = '1.0.0';

  /**
   * Export all user data
   */
  async exportAllData(options: Partial<ExportOptions> = {}): Promise<boolean> {
    const opts = { ...defaultOptions, ...options };

    try {
      // Collect all data
      const data = await this.collectAllData();

      // Apply date range filter if specified
      if (opts.dateRange) {
        this.filterByDateRange(data, opts.dateRange);
      }

      // Format data based on selected format
      const formattedData = opts.format === 'json'
        ? this.formatAsJSON(data)
        : this.formatAsCSV(data);

      // Save and share file
      const fileName = `rediscover_talk_export_${this.getDateString()}.${opts.format}`;
      const success = await this.saveAndShare(formattedData, fileName, opts.format);

      return success;
    } catch (error) {
      console.error('[ExportService] Export failed:', error);
      Alert.alert('Export Failed', 'Unable to export your data. Please try again.');
      return false;
    }
  }

  /**
   * Export only mood data
   */
  async exportMoodData(options: Partial<ExportOptions> = {}): Promise<boolean> {
    const opts = { ...defaultOptions, ...options };

    try {
      const moods = await this.getMoodData();
      const data = { moods, exportDate: new Date().toISOString(), appVersion: this.appVersion };

      const formattedData = opts.format === 'json'
        ? JSON.stringify(data, null, 2)
        : this.moodsToCSV(moods);

      const fileName = `mood_history_${this.getDateString()}.${opts.format}`;
      return await this.saveAndShare(formattedData, fileName, opts.format);
    } catch (error) {
      console.error('[ExportService] Mood export failed:', error);
      return false;
    }
  }

  /**
   * Export only journal data
   */
  async exportJournalData(options: Partial<ExportOptions> = {}): Promise<boolean> {
    const opts = { ...defaultOptions, ...options };

    try {
      const journals = await this.getJournalData();
      const data = { journals, exportDate: new Date().toISOString(), appVersion: this.appVersion };

      const formattedData = opts.format === 'json'
        ? JSON.stringify(data, null, 2)
        : this.journalsToCSV(journals);

      const fileName = `journal_entries_${this.getDateString()}.${opts.format}`;
      return await this.saveAndShare(formattedData, fileName, opts.format);
    } catch (error) {
      console.error('[ExportService] Journal export failed:', error);
      return false;
    }
  }

  /**
   * Collect all user data from storage
   */
  private async collectAllData(): Promise<ExportableData> {
    const [moods, journals, meditations, reminders] = await Promise.all([
      this.getMoodData(),
      this.getJournalData(),
      this.getMeditationData(),
      this.getReminderData(),
    ]);

    return {
      moods,
      journals,
      meditations,
      reminders,
      exportDate: new Date().toISOString(),
      appVersion: this.appVersion,
    };
  }

  /**
   * Get mood data from secure storage
   */
  private async getMoodData(): Promise<any[]> {
    try {
      const moods = await secureStorage.getItem<any[]>('mood', 'entries');
      return moods || [];
    } catch (error) {
      console.warn('[ExportService] Could not get mood data:', error);
      return [];
    }
  }

  /**
   * Get journal data from secure storage
   */
  private async getJournalData(): Promise<any[]> {
    try {
      const journals = await secureStorage.getItem<any[]>('journal', 'entries');
      return journals || [];
    } catch (error) {
      console.warn('[ExportService] Could not get journal data:', error);
      return [];
    }
  }

  /**
   * Get meditation session data
   */
  private async getMeditationData(): Promise<any[]> {
    try {
      const meditations = await secureStorage.getItem<any[]>('meditation', 'sessions');
      return meditations || [];
    } catch (error) {
      console.warn('[ExportService] Could not get meditation data:', error);
      return [];
    }
  }

  /**
   * Get reminder data
   */
  private async getReminderData(): Promise<any[]> {
    try {
      const reminders = await secureStorage.getItem<any[]>('reminders', 'list');
      return reminders || [];
    } catch (error) {
      console.warn('[ExportService] Could not get reminder data:', error);
      return [];
    }
  }

  /**
   * Filter data by date range
   */
  private filterByDateRange(data: ExportableData, range: { start: Date; end: Date }): void {
    const startTime = range.start.getTime();
    const endTime = range.end.getTime();

    const filterByTimestamp = (items: any[]) =>
      items.filter(item => {
        const time = item.timestamp || new Date(item.date || item.createdAt).getTime();
        return time >= startTime && time <= endTime;
      });

    data.moods = filterByTimestamp(data.moods);
    data.journals = filterByTimestamp(data.journals);
    data.meditations = filterByTimestamp(data.meditations);
  }

  /**
   * Format data as JSON
   */
  private formatAsJSON(data: ExportableData): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Format data as CSV
   */
  private formatAsCSV(data: ExportableData): string {
    const sections: string[] = [];

    // Moods section
    if (data.moods.length > 0) {
      sections.push('=== MOOD HISTORY ===');
      sections.push(this.moodsToCSV(data.moods));
    }

    // Journals section
    if (data.journals.length > 0) {
      sections.push('\n=== JOURNAL ENTRIES ===');
      sections.push(this.journalsToCSV(data.journals));
    }

    // Meditations section
    if (data.meditations.length > 0) {
      sections.push('\n=== MEDITATION SESSIONS ===');
      sections.push(this.meditationsToCSV(data.meditations));
    }

    // Reminders section
    if (data.reminders.length > 0) {
      sections.push('\n=== REMINDERS ===');
      sections.push(this.remindersToCSV(data.reminders));
    }

    // Add metadata
    sections.unshift(`Export Date: ${data.exportDate}\nApp Version: ${data.appVersion}\n`);

    return sections.join('\n');
  }

  /**
   * Convert moods array to CSV
   */
  private moodsToCSV(moods: any[]): string {
    if (moods.length === 0) return 'No mood data';

    const headers = 'Date,Time,Mood Level,Mood Name,Reasons,Feelings,Notes';
    const rows = moods.map(mood => {
      const date = new Date(mood.timestamp || mood.date);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        mood.level,
        mood.name,
        (mood.reasons || []).join('; '),
        (mood.feelings || []).join('; '),
        `"${(mood.notes || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }

  /**
   * Convert journals array to CSV
   */
  private journalsToCSV(journals: any[]): string {
    if (journals.length === 0) return 'No journal data';

    const headers = 'Date,Time,Title,Mood,Content';
    const rows = journals.map(journal => {
      const date = new Date(journal.timestamp || journal.createdAt || journal.date);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        `"${(journal.title || 'Untitled').replace(/"/g, '""')}"`,
        journal.mood || '',
        `"${(journal.content || journal.entry || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }

  /**
   * Convert meditations array to CSV
   */
  private meditationsToCSV(meditations: any[]): string {
    if (meditations.length === 0) return 'No meditation data';

    const headers = 'Date,Time,Title,Duration (min),Completed';
    const rows = meditations.map(session => {
      const date = new Date(session.timestamp || session.date);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        `"${(session.title || session.name || 'Unknown').replace(/"/g, '""')}"`,
        session.duration || 0,
        session.completed ? 'Yes' : 'No',
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }

  /**
   * Convert reminders array to CSV
   */
  private remindersToCSV(reminders: any[]): string {
    if (reminders.length === 0) return 'No reminder data';

    const headers = 'Title,Time,Enabled';
    const rows = reminders.map(reminder => {
      return [
        `"${(reminder.title || '').replace(/"/g, '""')}"`,
        reminder.time || '',
        reminder.enabled ? 'Yes' : 'No',
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }

  /**
   * Save file and open share dialog
   */
  private async saveAndShare(content: string, fileName: string, format: ExportFormat): Promise<boolean> {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Write file
      await FileSystem.writeAsStringAsync(fileUri, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        const mimeType = format === 'json' ? 'application/json' : 'text/csv';
        await Sharing.shareAsync(fileUri, {
          mimeType,
          dialogTitle: 'Export Your Data',
          UTI: format === 'json' ? 'public.json' : 'public.comma-separated-values-text',
        });
        return true;
      } else {
        // Fallback for platforms where sharing is not available
        Alert.alert(
          'Export Complete',
          `Your data has been exported to:\n${fileName}\n\nThe file is saved in the app's document directory.`
        );
        return true;
      }
    } catch (error) {
      console.error('[ExportService] Save/Share failed:', error);
      throw error;
    }
  }

  /**
   * Get current date string for file naming
   */
  private getDateString(): string {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  }

  /**
   * Delete all user data
   */
  async deleteAllData(): Promise<boolean> {
    try {
      // Clear all categories
      await Promise.all([
        secureStorage.clearCategory('mood'),
        secureStorage.clearCategory('journal'),
        secureStorage.clearCategory('meditation'),
        secureStorage.clearCategory('reminders'),
      ]);

      console.log('[ExportService] All data deleted');
      return true;
    } catch (error) {
      console.error('[ExportService] Delete all data failed:', error);
      return false;
    }
  }

  /**
   * Get data summary for display
   */
  async getDataSummary(): Promise<{ moods: number; journals: number; meditations: number; reminders: number }> {
    const [moods, journals, meditations, reminders] = await Promise.all([
      this.getMoodData(),
      this.getJournalData(),
      this.getMeditationData(),
      this.getReminderData(),
    ]);

    return {
      moods: moods.length,
      journals: journals.length,
      meditations: meditations.length,
      reminders: reminders.length,
    };
  }
}

// Export singleton instance
export const exportService = new ExportService();
export default exportService;
