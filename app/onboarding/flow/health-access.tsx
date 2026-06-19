import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function HealthAccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 flex-col">

            <View className="flex-1 justify-center px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-[32px] p-8 items-center mb-8 relative overflow-hidden">


                    <View className="w-24 h-24 bg-[#090D16] border border-[#2D3748] rounded-2xl items-center justify-center mb-8 relative z-10">
                        <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border border-[#090D16]" />
                        <Ionicons name="heart" size={36} color="#EF4444" />
                    </View>

                    <Text className="text-3xl font-bold text-white mb-3 text-center  z-10">
                        Allow access to Health
                    </Text>

                    <Text className="text-slate-400 text-center leading-6 font-medium z-10">
                        Bevel needs your Health data to build activities, provide insights, and record workouts.
                    </Text>
                </View>

                {/* Secure Node Info Panel */}
                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-4">
                    <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                        <Ionicons name="lock-closed-outline" size={18} color="#10B981" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-[#10B981] mb-1">Encrypted integration</Text>
                        <Text className="text-xs text-slate-400 leading-5">All synchronizations are handled securely via system-level APIs.</Text>
                    </View>
                </View>

            </View>

            <View className="mt-auto pt-4">
                <ContinueButton
                    label="Connect to Health"
                    onPress={() => router.push('/onboarding/flow/birthday')}
                />
            </View>

        </View>
    );
}