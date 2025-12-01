/**
 * Font Loading Hook
 * Loads Urbanist, Playfair Display, and Roboto font families
 * Used by the Mindify UI Kit design system
 */

import { useFonts as useExpoFonts } from 'expo-font';
import {
  Urbanist_100Thin,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
  Urbanist_100Thin_Italic,
  Urbanist_200ExtraLight_Italic,
  Urbanist_300Light_Italic,
  Urbanist_400Regular_Italic,
  Urbanist_500Medium_Italic,
  Urbanist_600SemiBold_Italic,
  Urbanist_700Bold_Italic,
  Urbanist_800ExtraBold_Italic,
  Urbanist_900Black_Italic,
} from '@expo-google-fonts/urbanist';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold_Italic,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold_Italic,
  PlayfairDisplay_900Black_Italic,
} from '@expo-google-fonts/playfair-display';
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  Roboto_100Thin_Italic,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_500Medium_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

/**
 * Custom hook to load all required fonts for the app
 * @returns [fontsLoaded: boolean, fontError: Error | null]
 */
export const useFonts = (): [boolean, Error | null] => {
  const [fontsLoaded, fontError] = useExpoFonts({
    // Urbanist - Primary font for UI text
    'Urbanist-Thin': Urbanist_100Thin,
    'Urbanist-ExtraLight': Urbanist_200ExtraLight,
    'Urbanist-Light': Urbanist_300Light,
    'Urbanist-Regular': Urbanist_400Regular,
    'Urbanist-Medium': Urbanist_500Medium,
    'Urbanist-SemiBold': Urbanist_600SemiBold,
    'Urbanist-Bold': Urbanist_700Bold,
    'Urbanist-ExtraBold': Urbanist_800ExtraBold,
    'Urbanist-Black': Urbanist_900Black,
    'Urbanist-ThinItalic': Urbanist_100Thin_Italic,
    'Urbanist-ExtraLightItalic': Urbanist_200ExtraLight_Italic,
    'Urbanist-LightItalic': Urbanist_300Light_Italic,
    'Urbanist-Italic': Urbanist_400Regular_Italic,
    'Urbanist-MediumItalic': Urbanist_500Medium_Italic,
    'Urbanist-SemiBoldItalic': Urbanist_600SemiBold_Italic,
    'Urbanist-BoldItalic': Urbanist_700Bold_Italic,
    'Urbanist-ExtraBoldItalic': Urbanist_800ExtraBold_Italic,
    'Urbanist-BlackItalic': Urbanist_900Black_Italic,

    // Playfair Display - Display font for headings
    'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
    'PlayfairDisplay-Medium': PlayfairDisplay_500Medium,
    'PlayfairDisplay-SemiBold': PlayfairDisplay_600SemiBold,
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'PlayfairDisplay-ExtraBold': PlayfairDisplay_800ExtraBold,
    'PlayfairDisplay-Black': PlayfairDisplay_900Black,
    'PlayfairDisplay-Italic': PlayfairDisplay_400Regular_Italic,
    'PlayfairDisplay-MediumItalic': PlayfairDisplay_500Medium_Italic,
    'PlayfairDisplay-SemiBoldItalic': PlayfairDisplay_600SemiBold_Italic,
    'PlayfairDisplay-BoldItalic': PlayfairDisplay_700Bold_Italic,
    'PlayfairDisplay-ExtraBoldItalic': PlayfairDisplay_800ExtraBold_Italic,
    'PlayfairDisplay-BlackItalic': PlayfairDisplay_900Black_Italic,

    // Roboto - System/secondary font
    'Roboto-Thin': Roboto_100Thin,
    'Roboto-Light': Roboto_300Light,
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
    'Roboto-Black': Roboto_900Black,
    'Roboto-ThinItalic': Roboto_100Thin_Italic,
    'Roboto-LightItalic': Roboto_300Light_Italic,
    'Roboto-Italic': Roboto_400Regular_Italic,
    'Roboto-MediumItalic': Roboto_500Medium_Italic,
    'Roboto-BoldItalic': Roboto_700Bold_Italic,
    'Roboto-BlackItalic': Roboto_900Black_Italic,
  });

  return [fontsLoaded, fontError];
};

/**
 * Font family names for use in StyleSheet
 * Match Figma design system naming
 */
export const FontFamily = {
  // Urbanist variants
  urbanist: {
    thin: 'Urbanist-Thin',
    extraLight: 'Urbanist-ExtraLight',
    light: 'Urbanist-Light',
    regular: 'Urbanist-Regular',
    medium: 'Urbanist-Medium',
    semiBold: 'Urbanist-SemiBold',
    bold: 'Urbanist-Bold',
    extraBold: 'Urbanist-ExtraBold',
    black: 'Urbanist-Black',
    // Italic variants
    thinItalic: 'Urbanist-ThinItalic',
    extraLightItalic: 'Urbanist-ExtraLightItalic',
    lightItalic: 'Urbanist-LightItalic',
    italic: 'Urbanist-Italic',
    mediumItalic: 'Urbanist-MediumItalic',
    semiBoldItalic: 'Urbanist-SemiBoldItalic',
    boldItalic: 'Urbanist-BoldItalic',
    extraBoldItalic: 'Urbanist-ExtraBoldItalic',
    blackItalic: 'Urbanist-BlackItalic',
  },
  // Playfair Display variants
  playfair: {
    regular: 'PlayfairDisplay-Regular',
    medium: 'PlayfairDisplay-Medium',
    semiBold: 'PlayfairDisplay-SemiBold',
    bold: 'PlayfairDisplay-Bold',
    extraBold: 'PlayfairDisplay-ExtraBold',
    black: 'PlayfairDisplay-Black',
    // Italic variants
    italic: 'PlayfairDisplay-Italic',
    mediumItalic: 'PlayfairDisplay-MediumItalic',
    semiBoldItalic: 'PlayfairDisplay-SemiBoldItalic',
    boldItalic: 'PlayfairDisplay-BoldItalic',
    extraBoldItalic: 'PlayfairDisplay-ExtraBoldItalic',
    blackItalic: 'PlayfairDisplay-BlackItalic',
  },
  // Roboto variants
  roboto: {
    thin: 'Roboto-Thin',
    light: 'Roboto-Light',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    black: 'Roboto-Black',
    // Italic variants
    thinItalic: 'Roboto-ThinItalic',
    lightItalic: 'Roboto-LightItalic',
    italic: 'Roboto-Italic',
    mediumItalic: 'Roboto-MediumItalic',
    boldItalic: 'Roboto-BoldItalic',
    blackItalic: 'Roboto-BlackItalic',
  },
} as const;

export type FontFamilyType = typeof FontFamily;
export default useFonts;
