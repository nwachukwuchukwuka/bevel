import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function ProcessingFoodModal() {
    const router = useRouter();
    const [status, setStatus] = useState<'processing' | 'ready'>('processing');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('ready');
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        router.back();
    };

    const handleGoToLog = () => {
        router.replace('/log-food');
    };

    return (
        <View className="flex-1 bg-[#090D16]/90 justify-center px-5">

            <Animated.View
                entering={FadeIn.duration(400)}
                className="bg-[#151E33] border border-[#1E293B] rounded-[32px] p-6 min-h-[360px] flex-col"
            >
                {status === 'processing' ? (
                    <Animated.View exiting={FadeOut.duration(300)} className="flex-1 items-center justify-center gap-8">

                        {/* Technical Processing Radar Graphic */}
                        <View className="w-32 h-32 relative items-center justify-center">
                            <View className="absolute inset-0 border-2 border-dashed border-[#4DB9F2] rounded-full opacity-30 animate-spin" />
                            <View className="absolute inset-4 border border-[#4DB9F2] rounded-full opacity-50" />
                            <View className="w-16 h-16 bg-[#1E293B] rounded-full border border-[#2D3748] items-center justify-center">
                                <Ionicons name="scan" size={28} color="#4DB9F2" />
                            </View>
                            <View className="absolute bottom-0 right-0 bg-[#090D16] border border-[#4DB9F2] px-2 py-1 rounded">
                                <Text className="text-[9px] font-bold text-[#4DB9F2]">ANALYZING</Text>
                            </View>
                        </View>

                        <View className="items-center w-full px-4">
                            <Text className="text-xl font-bold text-white mb-2 text-center">Processing visual data</Text>
                            <Text className="text-sm text-slate-400 text-center leading-6">
                                We'll notify you once your food items finish processing and are ready for review.
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleDismiss}
                            activeOpacity={0.7}
                            className="w-full mt-auto bg-[#1E293B] border border-[#2D3748] h-12 rounded-xl items-center justify-center"
                        >
                            <Text className="text-white font-bold text-sm">Cancel operation</Text>
                        </TouchableOpacity>

                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeIn.duration(400)} className="flex-1 items-center justify-center gap-8">

                        <View className="w-32 h-32 relative items-center justify-center">
                            <View className="absolute inset-0 border-2 border-[#10B981] rounded-full opacity-30" />
                            <View className="absolute inset-4 border border-[#10B981] rounded-full opacity-50" />
                            <View className="w-16 h-16 bg-emerald-950/40 rounded-full border border-emerald-500/50 items-center justify-center">
                                <Ionicons name="checkmark-done" size={28} color="#10B981" />
                            </View>
                            <View className="absolute bottom-0 right-0 bg-[#090D16] border border-[#10B981] px-2 py-1 rounded">
                                <Text className="text-[9px] font-bold text-[#10B981]">COMPLETE</Text>
                            </View>
                        </View>

                        <View className="items-center w-full px-4">
                            <Text className="text-xl font-bold text-white mb-2 text-center">Data ready for review</Text>
                            <Text className="text-sm text-slate-400 text-center leading-6">
                                Review and adjust your food items before adding them to your food log.
                            </Text>
                        </View>

                        <View className="w-full flex-col gap-3 mt-auto">
                            <TouchableOpacity
                                onPress={handleGoToLog}
                                activeOpacity={0.8}
                                className="w-full bg-[#10B981] border border-[#10B981] h-14 rounded-2xl items-center justify-center flex-row gap-2"
                            >
                                <Text className="text-[#090D16] font-bold text-base">Proceed to staging</Text>
                                <Ionicons name="arrow-forward" size={18} color="#090D16" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDismiss}
                                activeOpacity={0.7}
                                className="w-full h-12 rounded-xl items-center justify-center"
                            >
                                <Text className="text-slate-500 font-semibold text-sm">Dismiss</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                )}
            </Animated.View>

        </View>
    );
}