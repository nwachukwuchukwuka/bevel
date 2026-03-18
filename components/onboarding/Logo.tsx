import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LogoProps {
    width?: number;
    height?: number;
    color?: string;
}

export const Logo: React.FC<LogoProps> = ({ width = 64, height = 64, color = "black" }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
            {/* Top Part of the abstract 'B' */}
            <Path
                d="M10 18H32C42 18 42 30 32 30H14L10 18Z"
                fill={color}
            />

            {/* Bottom Part of the abstract 'B' */}
            <Path
                d="M10 34H34C46 34 46 50 34 50H10V34Z"
                fill={color}
            />
        </Svg>
    );
};
