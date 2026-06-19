import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function WelcomeInterstitial() {
    const router = useRouter();

    return (
        <View className="flex-1 flex-col">

            <View className="flex-1 justify-center px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-[32px] p-8 flex-col items-start mb-8 relative overflow-hidden">
                    <View className="w-16 h-16 bg-[#090D16] border border-[#2D3748] rounded-2xl items-center justify-center mb-8">
                        <Text className="text-3xl">👋</Text>
                    </View>

                    <Text className="text-3xl font-bold text-white mb-4 ">
                        Nice to meet you, Sam!
                    </Text>

                    <Text className="text-slate-400 leading-6 font-medium">
                        Bevel is your health companion, helping you track fitness, nutrition, and sleep.
                    </Text>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                    <Text className="text-xs font-semibold text-slate-400">Core parameters linked</Text>
                    <View className="bg-[#090D16] px-2 py-1 rounded-md border border-[#2D3748]">
                        <Text className="text-[10px] font-bold text-[#10B981]">Success</Text>
                    </View>
                </View>

            </View>

            <View className="mt-auto pt-4 ">
                <ContinueButton onPress={() => router.push('/onboarding/flow/health-focus')} />
            </View>

        </View>
    );
}