/**
 * Profile Screen - Account Settings
 * With profile picture editing and user data management
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ImageSourcePropType,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { userProfileService, UserProfile } from '../../services/UserProfileService';

type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Subscription: undefined;
  PersonalInfo: undefined;
  AccountSecurity: undefined;
  AppAppearance: undefined;
  DataAnalytics: undefined;
  MyBadges: undefined;
  DailyReminder: undefined;
  Preferences: undefined;
  Help: undefined;
  About: undefined;
};

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

// Figma-extracted icon assets
const icons = {
  logo: require('../../../assets/images/conversation-logo.png'),
  moreCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-more-circle.png'),
  ticketStar: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-ticket-star.png'),
  notification: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-notification.png'),
  setting: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
  shieldDone: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-shield-done.png'),
  star: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-star.png'),
  show: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-show.png'),
  chart: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-chart.png'),
  arrowRight: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-right-2.png'),
  profile: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-profile.png'),
  infoCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-info-circle.png'),
  question: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-info-square.png'),
  camera: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-camera.png'),
  close: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-close-square.png'),
};

// Menu item structure
interface MenuItem {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  route?: keyof ProfileStackParamList;
  onPress?: () => void;
}

// Primary menu items with Figma icons
const primaryMenuItems: MenuItem[] = [
  { id: '1', title: 'My Badges', icon: icons.ticketStar, route: 'MyBadges' },
  { id: '2', title: 'Daily Reminder', icon: icons.notification, route: 'DailyReminder' },
  { id: '3', title: 'Preferences', icon: icons.setting, route: 'Preferences' },
];

// Secondary menu items with Figma icons
const secondaryMenuItems: MenuItem[] = [
  { id: '4', title: 'Account & Security', icon: icons.shieldDone, route: 'AccountSecurity' },
  // { id: '5', title: 'App Appearance', icon: icons.show, route: 'AppAppearance' }, // Hidden for now
  { id: '6', title: 'Data & Analytics', icon: icons.chart, route: 'DataAnalytics' },
  { id: '7', title: 'Help & Support', icon: icons.question, route: 'Help' },
  { id: '8', title: 'About', icon: icons.infoCircle, route: 'About' },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Load profile on focus
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const userProfile = await userProfileService.getProfile();
      setProfile(userProfile);
      setEditFirstName(userProfile.firstName);
      setEditLastName(userProfile.lastName);
      setEditEmail(userProfile.email);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      navigation.navigate(item.route);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  const handleUpgrade = () => {
    navigation.navigate('Subscription');
  };

  const handleProfilePress = () => {
    setShowEditModal(true);
  };

  const handleMoreOptions = () => {
    Alert.alert(
      'Options',
      'Choose an action',
      [
        { text: 'Log Out', style: 'destructive', onPress: handleLogout },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await userProfileService.clearProfile();
            // Navigate to auth screen or reset navigation
          }
        },
      ]
    );
  };

  const handleSaveProfile = async () => {
    if (!editFirstName.trim()) {
      Alert.alert('Error', 'Please enter your first name');
      return;
    }

    setIsSaving(true);
    try {
      await userProfileService.updateProfile({
        firstName: editFirstName.trim(),
        lastName: editLastName.trim(),
        email: editEmail.trim(),
      });
      await loadProfile();
      setShowEditModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhoto = () => {
    setShowPhotoOptions(true);
  };

  const handlePickFromGallery = async () => {
    setShowPhotoOptions(false);
    const uri = await userProfileService.pickProfilePicture();
    if (uri) {
      await loadProfile();
    }
  };

  const handleTakePhoto = async () => {
    setShowPhotoOptions(false);
    const uri = await userProfileService.takeProfilePicture();
    if (uri) {
      await loadProfile();
    }
  };

  const handleRemovePhoto = async () => {
    setShowPhotoOptions(false);
    await userProfileService.removeProfilePicture();
    await loadProfile();
  };

  const getDisplayName = () => {
    if (profile?.firstName) {
      const parts = [profile.firstName, profile.lastName].filter(Boolean);
      return parts.join(' ');
    }
    return 'Set Up Your Profile';
  };

  const getDisplayEmail = () => {
    return profile?.email || 'Tap to add your details';
  };

  const getAvatarSource = () => {
    if (profile?.profilePicture) {
      return { uri: profile.profilePicture };
    }
    return null;
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { backgroundColor: colors.background.card }]}
      onPress={() => handleMenuPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <Image
          source={item.icon}
          style={[styles.menuIcon, { tintColor: '#9EB567' }]}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.menuTitle, { color: colors.text.primary }]}>
        {item.title}
      </Text>
      <Image
        source={icons.arrowRight}
        style={[styles.menuArrow, { tintColor: colors.text.tertiary }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9EB567" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={icons.logo}
              style={styles.headerLogoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Account
          </Text>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={handleMoreOptions}
          >
            <Image
              source={icons.moreCircle}
              style={[styles.moreIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Upgrade Banner */}
        <TouchableOpacity
          style={[styles.upgradeBanner, { backgroundColor: '#9EB567' }]}
          onPress={handleUpgrade}
          activeOpacity={0.9}
        >
          <View style={styles.upgradeIcon}>
            <Image
              source={icons.star}
              style={styles.crownIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.upgradeContent}>
            <Text style={styles.upgradeTitle}>Upgrade Plan Now!</Text>
            <Text style={styles.upgradeSubtitle}>
              Enjoy all the benefits and explore more possibilities
            </Text>
          </View>
        </TouchableOpacity>

        {/* User Profile Card */}
        <TouchableOpacity
          style={[styles.profileCard, { backgroundColor: colors.background.card }]}
          onPress={handleProfilePress}
          activeOpacity={0.8}
        >
          <View style={styles.avatarContainer}>
            {getAvatarSource() ? (
              <Image
                source={getAvatarSource()!}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: '#9EB567' }]}>
                <Image
                  source={icons.profile}
                  style={styles.avatarPlaceholderIcon}
                  resizeMode="contain"
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleChangePhoto}
            >
              <Image
                source={icons.camera}
                style={styles.cameraIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.text.primary }]}>
              {getDisplayName()}
            </Text>
            <Text style={[styles.userEmail, { color: colors.text.secondary }]}>
              {getDisplayEmail()}
            </Text>
          </View>
          <Image
            source={icons.arrowRight}
            style={[styles.profileArrow, { tintColor: colors.text.tertiary }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Primary Menu Section */}
        <View style={styles.menuSection}>
          {primaryMenuItems.map(renderMenuItem)}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border.light }]} />

        {/* Secondary Menu Section */}
        <View style={styles.menuSection}>
          {secondaryMenuItems.map(renderMenuItem)}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditModal(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background.primary }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={[styles.modalCancel, { color: colors.text.secondary }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <ActivityIndicator size="small" color="#9EB567" />
              ) : (
                <Text style={[styles.modalSave, { color: '#9EB567' }]}>Save</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Profile Picture */}
            <View style={styles.editAvatarSection}>
              <TouchableOpacity onPress={handleChangePhoto}>
                {getAvatarSource() ? (
                  <Image
                    source={getAvatarSource()!}
                    style={styles.editAvatar}
                  />
                ) : (
                  <View style={[styles.editAvatarPlaceholder, { backgroundColor: '#9EB567' }]}>
                    <Image
                      source={icons.profile}
                      style={styles.editAvatarIcon}
                      resizeMode="contain"
                    />
                  </View>
                )}
                <View style={styles.editCameraButton}>
                  <Image
                    source={icons.camera}
                    style={styles.editCameraIcon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <Text style={[styles.changePhotoText, { color: '#9EB567' }]}>
                Change Photo
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formSection}>
              <Text style={[styles.formLabel, { color: colors.text.secondary }]}>
                First Name
              </Text>
              <TextInput
                style={[styles.formInput, {
                  backgroundColor: colors.background.card,
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                }]}
                value={editFirstName}
                onChangeText={setEditFirstName}
                placeholder="Enter your first name"
                placeholderTextColor={colors.text.tertiary}
              />

              <Text style={[styles.formLabel, { color: colors.text.secondary }]}>
                Last Name
              </Text>
              <TextInput
                style={[styles.formInput, {
                  backgroundColor: colors.background.card,
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                }]}
                value={editLastName}
                onChangeText={setEditLastName}
                placeholder="Enter your last name"
                placeholderTextColor={colors.text.tertiary}
              />

              <Text style={[styles.formLabel, { color: colors.text.secondary }]}>
                Email
              </Text>
              <TextInput
                style={[styles.formInput, {
                  backgroundColor: colors.background.card,
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                }]}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Photo Options Modal */}
      <Modal
        visible={showPhotoOptions}
        animationType="fade"
        transparent
        onRequestClose={() => setShowPhotoOptions(false)}
      >
        <TouchableOpacity
          style={styles.photoOptionsOverlay}
          activeOpacity={1}
          onPress={() => setShowPhotoOptions(false)}
        >
          <View style={[styles.photoOptionsContainer, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.photoOptionsTitle, { color: colors.text.primary }]}>
              Profile Photo
            </Text>

            <TouchableOpacity
              style={styles.photoOption}
              onPress={handleTakePhoto}
            >
              <Text style={[styles.photoOptionText, { color: colors.text.primary }]}>
                Take Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoOption}
              onPress={handlePickFromGallery}
            >
              <Text style={[styles.photoOptionText, { color: colors.text.primary }]}>
                Choose from Library
              </Text>
            </TouchableOpacity>

            {profile?.profilePicture && (
              <TouchableOpacity
                style={styles.photoOption}
                onPress={handleRemovePhoto}
              >
                <Text style={[styles.photoOptionText, { color: '#FF4444' }]}>
                  Remove Photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.photoOption, styles.photoOptionCancel]}
              onPress={() => setShowPhotoOptions(false)}
            >
              <Text style={[styles.photoOptionText, { color: colors.text.secondary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    width: 44,
  },
  headerLogoImage: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  upgradeBanner: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  crownIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E0E0',
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9EB567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
  },
  profileArrow: {
    width: 20,
    height: 20,
  },
  menuSection: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  menuArrow: {
    width: 18,
    height: 18,
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalCancel: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  modalSave: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  editAvatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  editAvatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    width: 50,
    height: 50,
    tintColor: '#FFFFFF',
  },
  editCameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9EB567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editCameraIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  changePhotoText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  formSection: {
    gap: 4,
  },
  formLabel: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 12,
  },
  formInput: {
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  // Photo options modal
  photoOptionsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  photoOptionsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  photoOptionsTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  photoOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  photoOptionCancel: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
});

export default ProfileScreen;
