/**
 * Clover Logo Component - 4-leaf clover made of hearts
 * Matches the Mindify/Rediscover Talk branding
 */

import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface CloverLogoProps {
  size?: number;
  color?: string;
}

export const CloverLogo: React.FC<CloverLogoProps> = ({
  size = 80,
  color = '#9EB567',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <G>
        {/* Top leaf (heart shape) */}
        <Path
          d="M50 10C50 10 35 0 25 10C15 20 15 35 25 45C35 55 50 45 50 45C50 45 65 55 75 45C85 35 85 20 75 10C65 0 50 10 50 10Z"
          fill={color}
        />
        {/* Right leaf (heart shape rotated) */}
        <Path
          d="M90 50C90 50 100 35 90 25C80 15 65 15 55 25C45 35 55 50 55 50C55 50 45 65 55 75C65 85 80 85 90 75C100 65 90 50 90 50Z"
          fill={color}
        />
        {/* Bottom leaf (heart shape) */}
        <Path
          d="M50 90C50 90 65 100 75 90C85 80 85 65 75 55C65 45 50 55 50 55C50 55 35 45 25 55C15 65 15 80 25 90C35 100 50 90 50 90Z"
          fill={color}
        />
        {/* Left leaf (heart shape rotated) */}
        <Path
          d="M10 50C10 50 0 65 10 75C20 85 35 85 45 75C55 65 45 50 45 50C45 50 55 35 45 25C35 15 20 15 10 25C0 35 10 50 10 50Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default CloverLogo;
