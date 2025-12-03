/**
 * Account Security Screen - Security settings
 */

import React from 'react';
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

interface SecurityItem {
  id: string;
  title: string;
  value: string;
  action: string;
}

const securityItems: SecurityItem[] = [
  { id: '1', title: 'Email', value: 'user@example.com', action: 'Change' },
  { id: '2', title: 'Password', value: '••••••••', action: 'Update' },
  { id: '3', title: 'Two-Factor Auth', value: 'Disabled', action: 'Enable' },
  { id: '4', title: 'Face ID / Touch ID', value: 'Enabled', action: 'Manage' },
];

export const AccountSecurityScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Account & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {securityItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.securityCard, { backgroundColor: colors.background.card }]}
          >
            <View style={styles.securityInfo}>
              <Text style={[styles.securityTitle, { color: colors.text.primary }]}>
                {item.title}
              </Text>
              <Text style={[styles.securityValue, { color: colors.text.secondary }]}>
                {item.value}
              </Text>
            </View>
            <Text style={styles.actionText}>{item.action}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
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
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  securityInfo: { flex: 1 },
  securityTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  securityValue: { fontSize: 14 },
  actionText: { fontSize: 14, color: '#9EB567', fontWeight: '600' },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 30,
  },
  deleteText: { fontSize: 16, color: '#E53935', fontWeight: '500' },
});

export default AccountSecurityScreen;
