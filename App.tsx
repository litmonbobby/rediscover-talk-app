import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';

/**
 * Rediscover Talk - Mental Wellness App
 *
 * Built with complete Figma design system
 * 278 high-fidelity screen designs (139 light + 139 dark)
 */
export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}
