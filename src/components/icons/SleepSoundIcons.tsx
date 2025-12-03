/**
 * Sleep Sound Icons - Custom SVG icons matching Figma design
 * Used in Sleep Sounds screen for sound type indicators
 */
import React from 'react';
import Svg, { Path, Circle, G, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const defaultColor = '#9EB567';
const defaultSize = 32;

// Heavy Rain - Cloud with rain drops
export const RainIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.5 15C20.9 14.5 22 13.1 22 11.5C22 9.6 20.4 8 18.5 8C18.3 8 18.1 8 17.9 8.1C17.1 5.2 14.3 3 11 3C7.1 3 4 6.1 4 10C4 10.1 4 10.3 4 10.4C2.3 11 1 12.6 1 14.5C1 16.4 2.6 18 4.5 18H18.5C18.7 18 18.8 18 19 18"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 21L8 18"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12 21L12 18"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M16 21L16 18"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Dream - Moon with stars
export const DreamIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.03 12.42C2.39 17.57 6.76 21.76 11.99 21.99C15.68 22.15 18.98 20.43 20.96 17.72C21.78 16.61 21.34 15.87 19.97 16.12C19.3 16.24 18.61 16.29 17.89 16.26C12 16.06 7.18 11.03 7.33 5.14C7.38 3.84 7.68 2.61 8.19 1.49C8.67 0.5 8.07 -0.03 7.06 0.41C3.77 1.94 1.62 5.69 2.03 12.42Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 4L19 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M17 6L21 6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Wind - Flowing wind lines
export const WindIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 12H14.5C15.88 12 17 10.88 17 9.5C17 8.12 15.88 7 14.5 7C13.74 7 13.07 7.36 12.62 7.91"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 8H8.5C9.33 8 10 7.33 10 6.5C10 5.67 9.33 5 8.5 5C8 5 7.57 5.23 7.29 5.58"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 16H17.5C18.88 16 20 17.12 20 18.5C20 19.88 18.88 21 17.5 21C16.53 21 15.69 20.46 15.27 19.67"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Fire - Flame
export const FireIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C12 6 12 10 9 13C6 16 6 18.4183 6 19C6 20.6569 8.68629 22 12 22Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 22C13.6569 22 15 20.6569 15 19C15 17 12 15 12 15C12 15 9 17 9 19C9 20.6569 10.3431 22 12 22Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2V6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Thunder - Lightning bolt
export const ThunderIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L4.09 12.63C3.74 13.04 3.56 13.25 3.56 13.42C3.56 13.57 3.63 13.71 3.76 13.8C3.9 13.89 4.15 13.89 4.65 13.89H12L11 22L19.91 11.37C20.26 10.96 20.44 10.75 20.44 10.58C20.44 10.43 20.37 10.29 20.24 10.2C20.1 10.11 19.85 10.11 19.35 10.11H12L13 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Forest - Pine tree
export const ForestIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 12H7L4 18H10V22H14V18H20L17 12H20L12 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// River - Waves over line
export const RiverIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 6C4 6 4 8 6 8C8 8 8 6 10 6C12 6 12 8 14 8C16 8 16 6 18 6C20 6 20 8 22 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 12C4 12 4 14 6 14C8 14 8 12 10 12C12 12 12 14 14 14C16 14 16 12 18 12C20 12 20 14 22 14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 18C4 18 4 20 6 20C8 20 8 18 10 18C12 18 12 20 14 20C16 20 16 18 18 18C20 18 20 20 22 20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Melody - Music note
export const MelodyIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18V5L21 3V16"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="6"
      cy="18"
      r="3"
      stroke={color}
      strokeWidth={1.5}
    />
    <Circle
      cx="18"
      cy="16"
      r="3"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

// Ocean - Waves
export const OceanIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 10C4 10 4 13 7 13C10 13 10 10 13 10C16 10 16 13 19 13C22 13 22 10 22 10"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 16C4 16 4 19 7 19C10 19 10 16 13 16C16 16 16 19 19 19C22 19 22 16 22 16"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mountains
export const MountainIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 20L9 10L13 16L17 12L21 20H3Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="18"
      cy="6"
      r="2"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

// Sound Bars / Equalizer
export const SoundBarsIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 8V16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M8 6V18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 4V20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M16 6V18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M20 8V16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

// Planet
export const PlanetIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="7"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M4 12C4 12 7 8 12 8C17 8 20 12 20 12C20 12 17 16 12 16C7 16 4 12 4 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.5 5.5C4 4 2 4.5 2 6C2 8 5 10 8 11"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M18.5 18.5C20 20 22 19.5 22 18C22 16 19 14 16 13"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Crown icon for premium badge
export const CrownIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 17H20V19H4V17Z"
      fill={color}
    />
    <Path
      d="M3 7L6 12L12 6L18 12L21 7L20 17H4L3 7Z"
      fill={color}
    />
  </Svg>
);

// Export all icons
export const SleepSoundIcons = {
  rain: RainIcon,
  dream: DreamIcon,
  wind: WindIcon,
  fire: FireIcon,
  thunder: ThunderIcon,
  forest: ForestIcon,
  river: RiverIcon,
  melody: MelodyIcon,
  ocean: OceanIcon,
  mountain: MountainIcon,
  soundBars: SoundBarsIcon,
  planet: PlanetIcon,
  crown: CrownIcon,
};

export default SleepSoundIcons;
