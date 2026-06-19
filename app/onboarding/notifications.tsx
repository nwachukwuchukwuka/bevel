import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack={false}>
            <View className="flex-1 ">
                <View className="w-16 h-16 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center mb-8">
                    <Ionicons name="notifications" size={28} color="#4DB9F2" />
                </View>

                <View className="mb-10">
                    <Text className="text-3xl font-bold text-slate-100 mb-3">
                        Let us help you with your goals
                    </Text>
                    <Text className="text-base text-slate-400 font-medium">
                        Get updates on your progress and reminders to track your goals and activities.
                    </Text>
                </View>

                <View className="w-full bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center gap-3">
                            <View className="bg-[#090D16] border border-[#2D3748] w-8 h-8 rounded-lg items-center justify-center">
                                <Text className="text-[#4DB9F2] text-xs font-bold">B</Text>
                            </View>
                            <Text className="text-sm font-semibold text-slate-200">Time to wind down</Text>
                        </View>
                        <Text className="text-xs text-slate-500 font-medium">3:51 PM</Text>
                    </View>
                    <View className="h-2 w-3/4 bg-[#1E293B] rounded-full mb-3" />
                    <View className="h-2 w-1/2 bg-[#1E293B] rounded-full" />
                </View>
            </View>

            <View className="px-6 mb-8 mt-auto">
                <ContinueButton label="Enable notifications" onPress={() => router.push('/onboarding/build-experience')} />
            </View>
        </OnboardingLayout>
    );
}