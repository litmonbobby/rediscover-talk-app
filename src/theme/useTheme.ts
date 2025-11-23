import { useColorScheme } from 'react-native';
import { lightColors, darkColors, typography, spacing, borderRadius, shadows, animations } from './index';

/**
 * Custom hook to get theme colors based on system color scheme
 * Automatically switches between light and dark mode
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return {
    colors: isDarkMode ? darkColors : lightColors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animations,
    isDarkMode,
  };
};

export default useTheme;
