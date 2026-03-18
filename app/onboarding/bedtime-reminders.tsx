import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function BedtimeRemindersScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#1e2029]">
            <LinearGradient colors={['#2c3e50', '#000000']} className="absolute w-full h-full opacity-80" />

            <OnboardingLayout showBack={false} darkTheme>
                <View className="flex-1 items-center justify-center">

                    {/* Mock Notification Graphic */}
                    <View className="w-full bg-white/10 rounded-2xl p-4 mb-10 flex-row gap-3 items-center backdrop-blur-md">
                        <View className="w-10 h-10 rounded-lg bg-neutral-200 items-center justify-center">
                            <Ionicons name="moon" size={20} color="black" />
                        </View>
                        <View className="flex-1">
                            <View className="flex-row justify-between">
                                <Text className="text-white font-bold text-sm">Time to wind down</Text>
                                <Text className="text-neutral-400 text-xs">11:03 PM</Text>
                            </View>
                            <Text className="text-neutral-300 text-xs mt-1 leading-4">
                                Based on your sleep need, you should aim to wind down at 11:18 PM.
                            </Text>
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-white mb-4 text-center">Receive bedtime reminders</Text>
                    <Text className="text-center text-neutral-400 leading-6 px-4">
                        Bevel tracks your daily activities and sleep debt, then gently reminds you when it's time to unwind.
                    </Text>
                </View>

                <View className="mb-4">
                    <ContinueButton onPress={() => router.push('/onboarding/flow/secondary-fitness-focus')} />
                </View>
            </OnboardingLayout>
        </View>
    );
}