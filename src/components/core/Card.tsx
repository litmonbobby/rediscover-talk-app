import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../constants';

export type CardVariant = 'content' | 'stat' | 'profile' | 'feature';

interface BaseCardProps {
  variant?: CardVariant;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

interface ContentCardProps extends BaseCardProps {
  variant: 'content';
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  footer?: React.ReactNode;
}

interface StatCardProps extends BaseCardProps {
  variant: 'stat';
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface ProfileCardProps extends BaseCardProps {
  variant: 'profile';
  name: string;
  avatar?: ImageSourcePropType;
  subtitle?: string;
  badge?: React.ReactNode;
}

interface FeatureCardProps extends BaseCardProps {
  variant: 'feature';
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient?: boolean;
}

export type CardProps = ContentCardProps | StatCardProps | ProfileCardProps | FeatureCardProps;

export const Card: React.FC<CardProps> = (props) => {
  const { variant = 'content', onPress, style } = props;

  const Container = onPress ? TouchableOpacity : View;

  const renderContent = () => {
    switch (variant) {
      case 'content':
        return renderContentCard(props as ContentCardProps);
      case 'stat':
        return renderStatCard(props as StatCardProps);
      case 'profile':
        return renderProfileCard(props as ProfileCardProps);
      case 'feature':
        return renderFeatureCard(props as FeatureCardProps);
      default:
        return props.children;
    }
  };

  return (
    <Container
      onPress={onPress}
      style={[styles.card, style]}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {renderContent()}
    </Container>
  );
};

const renderContentCard = (props: ContentCardProps) => (
  <>
    {props.image && (
      <Image source={props.image} style={styles.contentImage} resizeMode="cover" />
    )}
    <View style={styles.contentBody}>
      <Text style={styles.contentTitle}>{props.title}</Text>
      {props.description && (
        <Text style={styles.contentDescription}>{props.description}</Text>
      )}
      {props.footer && <View style={styles.contentFooter}>{props.footer}</View>}
    </View>
  </>
);

const renderStatCard = (props: StatCardProps) => (
  <View style={styles.statContainer}>
    <View style={styles.statHeader}>
      <Text style={styles.statLabel}>{props.label}</Text>
      {props.icon && <View style={styles.statIcon}>{props.icon}</View>}
    </View>
    <Text style={styles.statValue}>{props.value}</Text>
    {props.trendValue && (
      <View style={styles.trendContainer}>
        <Text style={[styles.trendText, styles[`trend${props.trend || 'neutral'}`]]}>
          {props.trend === 'up' && '↑ '}
          {props.trend === 'down' && '↓ '}
          {props.trendValue}
        </Text>
      </View>
    )}
  </View>
);

const renderProfileCard = (props: ProfileCardProps) => (
  <View style={styles.profileContainer}>
    {props.avatar && (
      <Image source={props.avatar} style={styles.profileAvatar} />
    )}
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{props.name}</Text>
      {props.subtitle && (
        <Text style={styles.profileSubtitle}>{props.subtitle}</Text>
      )}
    </View>
    {props.badge && <View style={styles.profileBadge}>{props.badge}</View>}
  </View>
);

const renderFeatureCard = (props: FeatureCardProps) => {
  const Content = (
    <View style={styles.featureContent}>
      <View style={styles.featureIcon}>{props.icon}</View>
      <Text style={styles.featureTitle}>{props.title}</Text>
      <Text style={styles.featureDescription}>{props.description}</Text>
    </View>
  );

  if (props.gradient) {
    return (
      <LinearGradient
        colors={colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featureGradient}
      >
        {Content}
      </LinearGradient>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Content Card
  contentImage: {
    width: '100%',
    height: 180,
  },
  contentBody: {
    padding: 16,
  },
  contentTitle: {
    ...typography.h3,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  contentDescription: {
    ...typography.body,
    color: colors.text.inverse,
    opacity: 0.7,
    marginBottom: 12,
  },
  contentFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },

  // Stat Card
  statContainer: {
    padding: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.inverse,
    opacity: 0.7,
    textTransform: 'uppercase',
  },
  statIcon: {
    width: 32,
    height: 32,
  },
  statValue: {
    ...typography.h1,
    color: colors.primary.DEFAULT,
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    ...typography.caption,
    fontWeight: '600',
  },
  trendup: {
    color: colors.success,
  },
  trenddown: {
    color: colors.error,
  },
  trendneutral: {
    color: colors.text.inverse,
    opacity: 0.7,
  },

  // Profile Card
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h3,
    color: colors.text.inverse,
    marginBottom: 4,
  },
  profileSubtitle: {
    ...typography.caption,
    color: colors.text.inverse,
    opacity: 0.7,
  },
  profileBadge: {
    marginLeft: 12,
  },

  // Feature Card
  featureContent: {
    padding: 24,
    alignItems: 'center',
  },
  featureGradient: {
    padding: 24,
    alignItems: 'center',
  },
  featureIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  featureTitle: {
    ...typography.h2,
    color: colors.text.inverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    ...typography.body,
    color: colors.text.inverse,
    opacity: 0.7,
    textAlign: 'center',
  },
});
