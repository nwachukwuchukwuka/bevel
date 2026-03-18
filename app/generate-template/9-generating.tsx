import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function GeneratingScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => router.replace('/generate-template/10-result'), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center p-10">
            <Animated.View entering={FadeIn} exiting={FadeOut} className="items-center w-full">

                {/* Skeletons */}
                <View className="w-full gap-4 opacity-50 mb-10">
                    <View className="w-full h-16 bg-gray-100 rounded-2xl flex-row items-center px-4 gap-4">
                        <View className="w-8 h-8 bg-gray-200 rounded-full" />
                        <View className="flex-1 h-4 bg-gray-200 rounded-full" />
                    </View>
                    <View className="w-full h-20 bg-gray-100 rounded-2xl flex-row items-center px-4 gap-4 shadow-sm border border-gray-200">
                        <View className="w-10 h-10 bg-gray-200 rounded-full" />
                        <View className="flex-1 gap-2">
                            <View className="w-2/3 h-4 bg-gray-200 rounded-full" />
                            <View className="w-1/3 h-3 bg-gray-200 rounded-full" />
                        </View>
                    </View>
                    <View className="w-full h-16 bg-gray-100 rounded-2xl flex-row items-center px-4 gap-4">
                        <View className="w-8 h-8 bg-gray-200 rounded-full" />
                        <View className="flex-1 h-4 bg-gray-200 rounded-full" />
                    </View>
                </View>

                <Text className="text-xl font-bold text-gray-900 mb-2">Generating template</Text>
                <Text className="text-gray-500 text-center px-6">Please wait while we put together the right workout plan for you.</Text>
            </Animated.View>
        </View>
    );
}