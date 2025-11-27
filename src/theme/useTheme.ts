import { lightColors, darkColors, typography, spacing, borderRadius, shadows, animations } from './index';
import { useThemeContext } from './ThemeContext';

/**
 * Custom hook to get theme colors based on theme context
 * Supports manual theme switching (light/dark/system)
 */
export const useTheme = () => {
  const { effectiveTheme, themeMode } = useThemeContext();
  const isDarkMode = effectiveTheme === 'dark';

  return {
    colors: isDarkMode ? darkColors : lightColors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animations,
    isDarkMode,
    themeMode,
    effectiveTheme,
  };
};

export default useTheme;
