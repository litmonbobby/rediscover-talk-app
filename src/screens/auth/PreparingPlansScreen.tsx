import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'PreparingPlans'>;

export const PreparingPlansScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    // Simulate preparation time
    const timer = setTimeout(() => {
      // Navigate to home screen after preparation
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/19-light-preparing-personalized-plans.png')}
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
    backgroundColor: '#FFFFFF',
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
