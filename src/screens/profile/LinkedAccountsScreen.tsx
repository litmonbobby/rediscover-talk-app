/**
 * Linked Accounts Screen - Connected services
 */

import React, { useState } from 'react';
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

interface LinkedAccount {
  id: string;
  name: string;
  emoji: string;
  connected: boolean;
}

export const LinkedAccountsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [accounts, setAccounts] = useState<LinkedAccount[]>([
    { id: '1', name: 'Apple Health', emoji: '🍎', connected: true },
    { id: '2', name: 'Google Fit', emoji: '🏃', connected: false },
    { id: '3', name: 'Fitbit', emoji: '⌚', connected: false },
    { id: '4', name: 'Spotify', emoji: '🎵', connected: true },
  ]);

  const toggleConnection = (id: string) => {
    setAccounts(prev =>
      prev.map(a => (a.id === id ? { ...a, connected: !a.connected } : a))
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Linked Accounts</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          Connect your accounts to sync data and enhance your experience.
        </Text>

        {accounts.map((account) => (
          <View
            key={account.id}
            style={[styles.accountCard, { backgroundColor: colors.background.card }]}
          >
            <Text style={styles.accountEmoji}>{account.emoji}</Text>
            <Text style={[styles.accountName, { color: colors.text.primary }]}>
              {account.name}
            </Text>
            <TouchableOpacity
              style={[
                styles.connectButton,
                account.connected && styles.connectedButton,
              ]}
              onPress={() => toggleConnection(account.id)}
            >
              <Text
                style={[
                  styles.connectText,
                  account.connected && styles.connectedText,
                ]}
              >
                {account.connected ? 'Connected' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  accountEmoji: { fontSize: 28, marginRight: 12 },
  accountName: { flex: 1, fontSize: 16, fontWeight: '600' },
  connectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9EB567',
  },
  connectedButton: {
    backgroundColor: '#9EB567',
    borderColor: '#9EB567',
  },
  connectText: { fontSize: 13, fontWeight: '600', color: '#9EB567' },
  connectedText: { color: '#fff' },
});

export default LinkedAccountsScreen;
