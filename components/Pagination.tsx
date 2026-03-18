import React from 'react';
import { View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

interface PaginationProps {
    data: any[];
    scrollX: SharedValue<number>;
    screenWidth: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, scrollX, screenWidth }) => {
    return (
        <View className="flex-row gap-2 justify-center items-center mb-6">
            {data.map((_, index) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                    const width = interpolate(
                        scrollX.value,
                        [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
                        [8, 8, 8], // Keeping size static as per UI, but opacity changes
                        Extrapolation.CLAMP
                    );

                    const opacity = interpolate(
                        scrollX.value,
                        [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
                        [0.3, 1, 0.3],
                        Extrapolation.CLAMP
                    );

                    return { width, opacity };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[animatedDotStyle]}
                        className="h-2 w-2 rounded-full bg-neutral-800"
                    />
                );
            })}
        </View>
    );
};

export default Pagination;