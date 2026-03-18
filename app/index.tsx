import { useAuth } from '@/context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

export default function SplashScreen() {

  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);


  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // 1. Entrance Animation
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp)
    });

    // 2. Determine target and start exit animation after delay
    const targetRoute = isAuthenticated ? '/(tabs)' : '/onboarding';

    const timeout = setTimeout(() => {
      // Fade out and Zoom slightly
      scale.value = withTiming(1.05, { duration: 500 });
      opacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(router.replace)(targetRoute as any);
        }
      });
    }, 2000); // reduced slightly for snappier feel

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style="dark" />

      <Animated.View style={animatedStyle}>
        <Logo width={80} height={80} color="#1A1A1A" />
      </Animated.View>
    </View>
  );
}

// --- Logo Component ---
interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 64, height = 64, color = "black" }) => {
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