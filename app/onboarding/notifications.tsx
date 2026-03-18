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
            <View className="flex-1 items-center pt-20">
                <Ionicons name="notifications" size={48} color="#94A3B8" />

                <Text className="text-2xl font-bold text-neutral-900 mt-6 mb-3 text-center px-10">
                    Let us help you with your goals
                </Text>
                <Text className="text-center text-neutral-500 leading-6 px-6 mb-10">
                    Get updates on your progress and reminders to track your goals and activities.
                </Text>

                {/* Mock Notification Graphic */}
                <View className="w-full px-6">
                    <View className="bg-white rounded-2xl shadow-sm p-4 border border-neutral-100">
                        <View className="flex-row justify-between mb-2">
                            <View className="flex-row items-center gap-2">
                                <View className="bg-neutral-900 w-5 h-5 rounded items-center justify-center">
                                    <Text className="text-white text-[10px] font-bold">B</Text>
                                </View>
                                <Text className="text-xs font-semibold text-neutral-700">Time to wind down</Text>
                            </View>
                            <Text className="text-xs text-neutral-400">3:51 PM</Text>
                        </View>
                        <View className="h-2 w-3/4 bg-neutral-100 rounded mb-2" />
                        <View className="h-2 w-1/2 bg-neutral-100 rounded" />
                    </View>
                </View>
            </View>

            <View className="mb-4">
                <ContinueButton label="Enable notifications" onPress={() => router.push('/onboarding/build-experience')} />
            </View>
        </OnboardingLayout>
    );
}