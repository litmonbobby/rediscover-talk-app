import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'AccountSecurity'>;

export const AccountSecurityScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleTwoFactor = (value: boolean) => {
    setTwoFactorEnabled(value);
    if (value) {
      Alert.alert(
        'Two-Factor Authentication',
        'You will receive a verification code via SMS when signing in.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleToggleBiometric = (value: boolean) => {
    setBiometricEnabled(value);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    console.log('Changing password...');
    Alert.alert(
      'Success',
      'Your password has been changed successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowPasswordForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('AccountSecurity', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Security</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Security Settings</Text>
        <Text style={styles.subtitle}>
          Protect your account with these security features
        </Text>

        {/* Security Toggles */}
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>
                Add an extra layer of security to your account
              </Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleToggleTwoFactor}
              trackColor={{ false: '#E0E0E0', true: colors.primary.DEFAULT }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Biometric Login</Text>
              <Text style={styles.settingDescription}>
                Use Face ID or Touch ID to sign in
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleToggleBiometric}
              trackColor={{ false: '#E0E0E0', true: colors.primary.DEFAULT }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Change Password Section */}
        <View style={styles.passwordSection}>
          <TouchableOpacity
            style={styles.changePasswordToggle}
            onPress={() => setShowPasswordForm(!showPasswordForm)}
            activeOpacity={0.7}
          >
            <Text style={styles.changePasswordText}>
              {showPasswordForm ? '− ' : '+ '}Change Password
            </Text>
            <Text style={styles.lastChangedText}>
              Last changed: September 1, 2025
            </Text>
          </TouchableOpacity>

          {showPasswordForm && (
            <View style={styles.passwordForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>

              <TouchableOpacity
                style={styles.savePasswordButton}
                onPress={handleChangePassword}
                activeOpacity={0.7}
              >
                <Text style={styles.savePasswordButtonText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  passwordSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  changePasswordToggle: {
    marginBottom: 12,
  },
  changePasswordText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
    marginBottom: 4,
  },
  lastChangedText: {
    fontSize: 14,
    color: '#999',
  },
  passwordForm: {
    marginTop: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#F5F5F5',
  },
  savePasswordButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  savePasswordButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
