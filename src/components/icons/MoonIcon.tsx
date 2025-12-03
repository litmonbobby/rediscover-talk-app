/**
 * Moon Icon - Crescent moon for Sleep tab
 * Matches Figma menu bar design
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MoonIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const MoonIcon: React.FC<MoonIconProps> = ({
  size = 24,
  color = '#9E9E9E',
  filled = false,
}) => {
  if (filled) {
    // Filled version for active state
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2394 19.7987 15.4394C19.1787 15.5494 18.5487 15.5994 17.9187 15.5694C15.5887 15.4694 13.4787 14.3994 12.0087 12.7494C10.7087 11.2994 9.90873 9.40938 9.89873 7.36938C9.89873 6.22938 10.1187 5.12938 10.5687 4.08938C11.0087 3.07938 10.6987 2.54938 10.4787 2.32938C10.2487 2.09938 9.70873 1.77938 8.64873 2.21938C4.55873 3.93938 2.02873 8.03938 2.32873 12.4294C2.62873 16.5594 5.52873 20.0894 9.36873 21.4194C10.2887 21.7394 11.2587 21.9294 12.2587 21.9694C12.4187 21.9794 12.5787 21.9894 12.7387 21.9894C16.0887 21.9894 19.2287 20.4094 21.2087 17.7194C21.8787 16.7894 21.6987 16.1994 21.5287 15.9294Z"
          fill={color}
        />
      </Svg>
    );
  }

  // Outline version for inactive state
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C12.0001 16.06 7.18009 11.03 7.33009 5.14C7.38009 3.84 7.68009 2.61 8.19009 1.49C8.67009 0.500002 8.07009 -0.0299976 7.06009 0.410002C3.77009 1.94 1.62009 5.69 2.03009 12.42Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MoonIcon;
