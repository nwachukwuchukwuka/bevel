import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

export default function ProcessingFoodModal() {
    const router = useRouter();
    const [status, setStatus] = useState<'processing' | 'ready'>('processing');

    // Simulate API processing time
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('ready');
        }, 2500); // 2.5 seconds delay
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        router.back();
    };

    const handleGoToLog = () => {
        // Replace prevents going back to the processing screen
        router.replace('/log-food');
    };

    return (
        <View className="flex-1 bg-black/60 justify-end">
            {/* The Bottom Sheet Card */}
            <Animated.View
                entering={FadeIn.duration(500)}
                className="bg-[#F8F9FD] rounded-t-[32px] p-6 pb-12 min-h-[45%]"
            >
                {/* Drag Handle */}
                <View className="w-full items-center mb-8">
                    <View className="w-10 h-1 bg-gray-300 rounded-full" />
                </View>

                {status === 'processing' ? (
                    <Animated.View exiting={FadeOut} className="items-center justify-center flex-1 gap-6">
                        {/* Icon Placeholder */}
                        <View className="w-32 h-32 items-center justify-center relative">
                            <Ionicons name="scan-outline" size={80} color="#E5E7EB" />
                            <View className="absolute">
                                <Ionicons name="restaurant" size={40} color="#4B5563" />
                            </View>
                        </View>

                        <View className="items-center gap-2">
                            <Text className="text-xl font-bold text-gray-900">Processing your foods</Text>
                            <Text className="text-center text-gray-500 px-8 leading-5">
                                We'll notify you once your food items finish processing and are ready for review.
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleDismiss}
                            className="w-full bg-[#1A1A1A] py-4 rounded-full items-center mt-4"
                        >
                            <Text className="text-white font-bold">Done</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeIn.duration(400)} className="items-center justify-center flex-1 gap-6">
                        {/* Icon Placeholder */}
                        <View className="w-32 h-32 items-center justify-center bg-white rounded-3xl   mb-2">
                            <View className="items-start gap-3 w-full px-6 opacity-30">
                                <View className="w-full h-2 bg-blue-200 rounded-full" />
                                <View className="w-2/3 h-2 bg-blue-200 rounded-full" />
                                <View className="w-full h-2 bg-blue-200 rounded-full" />
                            </View>
                            <View className="absolute -bottom-2 -right-2 bg-white rounded-full p-2  ">
                                <Ionicons name="search" size={32} color="#D1D5DB" />
                            </View>
                        </View>

                        <View className="items-center gap-2">
                            <Text className="text-xl font-bold text-gray-900">Your foods are ready to review!</Text>
                            <Text className="text-center text-gray-500 px-8 leading-5">
                                Review and adjust your food items before adding them to your food log.
                            </Text>
                        </View>

                        <View className="w-full gap-3 mt-4">
                            <TouchableOpacity
                                onPress={handleGoToLog}
                                className="w-full bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg shadow-black/20"
                            >
                                <Text className="text-white font-bold">Go to food log</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleDismiss} className="py-3 items-center">
                                <Text className="text-gray-500 font-semibold">Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}