import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function BiometricsIntroScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 flex-col">

            <View className="flex-1 justify-center px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-[32px] p-8 items-center mb-8 relative overflow-hidden">

                    {/* Targeting Visuals */}
                    <View className="absolute inset-0 items-center justify-center">
                        <View className="w-64 h-64 border border-[#1E293B] rounded-full opacity-50" />
                        <View className="absolute w-48 h-48 border border-[#2D3748] rounded-full opacity-50" />
                        <View className="absolute w-32 h-32 border border-[#4DB9F2]/30 rounded-full opacity-50" />
                    </View>

                    <View className="w-24 h-24 bg-[#090D16] border border-[#4DB9F2] rounded-full items-center justify-center mb-8 z-10">
                        <Ionicons name="person" size={36} color="#4DB9F2" />
                    </View>

                    <Text className="text-3xl font-bold text-white mb-3 text-center z-10">
                        A bit about you
                    </Text>

                    <Text className="text-slate-400 text-center leading-6 font-medium z-10">
                        Now that we know what you want to improve on, help us tailor the experience for you.
                    </Text>
                </View>

                {/* Status Indicator */}
                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <Ionicons name="options-outline" size={20} color="#94A3B8" />
                        <Text className="text-sm font-semibold text-slate-300">Biometric calibration</Text>
                    </View>
                    <View className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748]">
                        <Text className="text-[10px] font-bold text-slate-400">Required</Text>
                    </View>
                </View>

            </View>

            <View className="mt-auto pt-4 ">
                <ContinueButton onPress={() => router.push('/onboarding/flow/health-access')} />
            </View>

        </View>
    );
}