import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { colors, typography } from '../../constants';

interface NavBarProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  subtitle?: string;
  centerContent?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'gradient';
  containerStyle?: object;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  subtitle,
  centerContent,
  variant = 'default',
  containerStyle,
}) => {
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: statusBarHeight },
        variant === 'transparent' && styles.transparent,
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {leftIcon && (
            <TouchableOpacity
              onPress={onLeftPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          {centerContent || (
            <>
              {title && (
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary.DEFAULT,
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  transparent: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    fontSize: 18,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
