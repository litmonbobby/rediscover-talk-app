/**
 * Conversation Logo Icon
 * Two faces with sound waves - represents dialogue and communication
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ConversationLogoProps {
  size?: number;
  color?: string;
}

export const ConversationLogo: React.FC<ConversationLogoProps> = ({
  size = 40,
  color = '#000000',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Left Face Profile */}
      <Path
        d="M20 25 C15 25, 10 35, 12 50 C14 65, 18 75, 25 80 C28 82, 30 78, 28 70 C26 60, 28 45, 35 40"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Sound Waves */}
      <Path
        d="M38 35 C45 45, 45 55, 38 65"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M45 30 C55 45, 55 55, 45 70"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />

      {/* Right Face Profile */}
      <Path
        d="M80 25 C85 25, 90 35, 88 50 C86 65, 82 75, 75 80 C72 82, 70 78, 72 70 C74 60, 72 45, 65 40"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />

      {/* Right Sound Waves */}
      <Path
        d="M62 35 C55 45, 55 55, 62 65"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M55 30 C45 45, 45 55, 55 70"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};

export default ConversationLogo;
