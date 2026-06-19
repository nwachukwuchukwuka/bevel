import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function CheckInboxScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack>
            <View className="flex-1 pt-12 px-1">
                <View className="bg-[#151E33] border border-[#1E293B] rounded-[32px] p-8 items-center mb-8 relative overflow-hidden">

                    <View className="w-24 h-24 bg-[#090D16] border border-[#2D3748] rounded-2xl items-center justify-center mb-8 relative">
                        <View className="absolute top-2 right-2 w-3 h-3 bg-[#4DB9F2] rounded-full border-2 border-[#090D16]" />
                        <Ionicons name="mail-outline" size={36} color="#4DB9F2" />
                    </View>

                    <Text className="text-3xl font-bold text-white mb-3 text-center">
                        Check your inbox!
                    </Text>
                    <Text className="text-slate-400 text-center leading-6 font-medium">
                        Please tap on the link we just sent to your email on this device.
                    </Text>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-3">
                    <Ionicons name="information-circle" size={20} color="#F59E0B" />
                    <Text className="flex-1 text-xs text-slate-400 leading-5">
                        Awaiting validation link confirmation to establish secure connection.
                    </Text>
                </View>

            </View>

            <View className="mt-auto pt-4 ">
                <ContinueButton
                    label="Resend Link (19)"
                    enabled={false}
                    onPress={() => { }}
                />

                <TouchableOpacity
                    onPress={() => router.push('/onboarding/privacy')}
                    activeOpacity={0.7}
                    className="mt-6 py-2 items-center"
                >
                    <Text className="text-slate-600 text-sm font-semibold">
                        (Dev: Skip verification)
                    </Text>
                </TouchableOpacity>
            </View>
        </OnboardingLayout>
    );
}