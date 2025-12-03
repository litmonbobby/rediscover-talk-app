import { lightColors, darkColors, typography, spacing, borderRadius, shadows, animations } from './index';
import { useThemeContext, ThemeMode } from './ThemeContext';

/**
 * Custom hook to get theme colors based on theme context
 * Supports manual theme switching (light/dark/system)
 */
export const useTheme = () => {
  const { effectiveTheme, themeMode, setThemeMode } = useThemeContext();
  const isDarkMode = effectiveTheme === 'dark';

  // Toggle between light and dark mode
  const toggleTheme = () => {
    if (themeMode === 'dark') {
      setThemeMode('light');
    } else {
      setThemeMode('dark');
    }
  };

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
    setThemeMode,
    toggleTheme,
  };
};

export default useTheme;
