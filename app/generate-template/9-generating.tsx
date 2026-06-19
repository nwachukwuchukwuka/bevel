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
        <View className="flex-1 bg-[#090D16] items-center justify-center p-10">
            <Animated.View entering={FadeIn} exiting={FadeOut} className="items-center w-full">

                {/* Skeletons */}
                <View className="w-full gap-5 opacity-40 mb-12">
                    <View className="w-full h-[72px] bg-[#151E33] border border-[#1E2D4A] rounded-[20px] flex-row items-center px-4 gap-4">
                        <View className="w-10 h-10 bg-[#0F172A] border border-[#1E2D4A] rounded-[10px]" />
                        <View className="flex-1 h-3 bg-[#1E2D4A] rounded-full" />
                    </View>
                    <View className="w-full h-[100px] bg-[#151E33] border border-[#1E2D4A] rounded-[20px] flex-row items-center px-4 gap-4 relative overflow-hidden">
                        {/* Glow effect for active skeleton */}
                        <View className="absolute inset-0 bg-[#38BDF8] opacity-5" />
                        <View className="w-12 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[12px]" />
                        <View className="flex-1 gap-3">
                            <View className="w-3/4 h-3.5 bg-[#1E2D4A] rounded-full" />
                            <View className="w-1/2 h-2.5 bg-[#0F172A] rounded-full" />
                        </View>
                    </View>
                    <View className="w-full h-[72px] bg-[#151E33] border border-[#1E2D4A] rounded-[20px] flex-row items-center px-4 gap-4">
                        <View className="w-10 h-10 bg-[#0F172A] border border-[#1E2D4A] rounded-[10px]" />
                        <View className="flex-1 h-3 bg-[#1E2D4A] rounded-full" />
                    </View>
                </View>

                <Text className="text-[24px] font-bold text-[#F1F5F9] mb-3">Generating template</Text>
                <Text className="text-[#64748B] text-[14px] text-center px-6 leading-5 font-medium">Please wait while we put together the right workout plan for you.</Text>
            </Animated.View>
        </View>
    );
}