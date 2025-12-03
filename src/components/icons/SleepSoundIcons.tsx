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

// Birds - Bird shape
export const BirdsIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M3 8L8 10L12 7L16 10L21 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 15C6 16.6569 8.68629 18 12 18C15.3137 18 18 16.6569 18 15"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M2 14L6 15L12 13L18 15L22 14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Crickets - Bug/cricket shape
export const CricketsIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={1.5} />
    <Path d="M12 8V4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M9 9L6 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M15 9L18 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M8 12H2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M22 12H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M9 15L6 18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M15 15L18 18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 16V20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

// Waterfall - Water dropping
export const WaterfallIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2V8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M8 4V10"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M16 4V10"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12 12C12 12 8 16 8 18C8 20.2091 9.79086 22 12 22C14.2091 22 16 20.2091 16 18C16 16 12 12 12 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Cafe - Coffee cup
export const CafeIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 8H18C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14H17"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 8H17V15C17 17.7614 14.7614 20 12 20H8C5.23858 20 3 17.7614 3 15V8Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 2V4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M10 2V4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M14 2V4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Train - Train/Railway
export const TrainIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 11V6C4 4.34315 5.34315 3 7 3H17C18.6569 3 20 4.34315 20 6V11"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 11V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V11H4Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="8" cy="15" r="1" fill={color} />
    <Circle cx="16" cy="15" r="1" fill={color} />
    <Path d="M6 22L8 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M18 22L16 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M9 7H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

// Fan - Spinning fan
export const FanIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth={1.5} />
    <Path
      d="M12 10C12 10 12 4 8 2C8 6 10 10 12 10Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 12C14 12 20 12 22 8C18 8 14 10 14 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 14C12 14 12 20 16 22C16 18 14 14 12 14Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 12C10 12 4 12 2 16C6 16 10 14 10 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Waves - Gentle ocean waves
export const WavesIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 7C3.5 7 4.5 9 6 9C7.5 9 8.5 7 10 7C11.5 7 12.5 9 14 9C15.5 9 16.5 7 18 7C19.5 7 20.5 9 22 9"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 12C3.5 12 4.5 14 6 14C7.5 14 8.5 12 10 12C11.5 12 12.5 14 14 14C15.5 14 16.5 12 18 12C19.5 12 20.5 14 22 14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 17C3.5 17 4.5 19 6 19C7.5 19 8.5 17 10 17C11.5 17 12.5 19 14 19C15.5 19 16.5 17 18 17C19.5 17 20.5 19 22 19"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Heartbeat - Heart with pulse
export const HeartbeatIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12H6L8 9L11 15L13 12H16"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Leaves - Falling leaves
export const LeavesIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 20C11 20 6 17 6 12C6 7 11 4 11 4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 4C13 4 18 7 18 12C18 17 13 20 13 20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 20V12"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12 12L8 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12 12L16 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// Bell - Wind chimes / bells
export const BellIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Snowflake - Winter/Snow
export const SnowflakeIcon: React.FC<IconProps> = ({ size = defaultSize, color = defaultColor }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2V22" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M4.93 4.93L19.07 19.07" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M19.07 4.93L4.93 19.07" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 2L9 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 2L15 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 22L9 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 22L15 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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
  birds: BirdsIcon,
  crickets: CricketsIcon,
  waterfall: WaterfallIcon,
  cafe: CafeIcon,
  train: TrainIcon,
  fan: FanIcon,
  waves: WavesIcon,
  heartbeat: HeartbeatIcon,
  leaves: LeavesIcon,
  bell: BellIcon,
  snowflake: SnowflakeIcon,
};

export default SleepSoundIcons;
