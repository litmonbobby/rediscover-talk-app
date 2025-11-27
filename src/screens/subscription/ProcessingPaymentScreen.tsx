import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ProcessingPayment'>;

export const ProcessingPaymentScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      navigation.replace('SubscriptionSuccess');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <View style={styles.content}>
        <Image
          source={getThemedScreenImage('ProcessingPayment', isDarkMode)}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
});
