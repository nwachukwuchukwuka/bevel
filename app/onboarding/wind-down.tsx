import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function WindDownScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#1e2029]">
            <LinearGradient colors={['#2c3e50', '#000000']} className="absolute w-full h-full opacity-80" />

            <OnboardingLayout showBack={false} darkTheme>
                <View className="flex-1 items-center justify-center">
                    {/* Mock Graphic */}
                    <View className="bg-white/10 p-6 rounded-3xl w-full mb-10 items-center">
                        <Text className="text-neutral-400 text-sm mb-1">Time to fall asleep</Text>
                        <Text className="text-white text-3xl font-bold mb-4">11 minutes</Text>

                        <View className="w-full h-1.5 bg-white/20 rounded-full mb-2 overflow-hidden">
                            <View className="w-1/2 h-full bg-indigo-400" />
                        </View>
                        <View className="flex-row justify-between w-full px-1">
                            <Text className="text-neutral-500 text-xs">Fast</Text>
                            <Text className="text-white text-xs font-bold">Normal</Text>
                            <Text className="text-neutral-500 text-xs">Late</Text>
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-white mb-4 text-center">Optimize your wind down</Text>
                    <Text className="text-center text-neutral-400 leading-6 px-4">
                        Track how your evening routines affect your sleep latency and learn what helps you fall asleep naturally.
                    </Text>
                </View>

                <View className="mb-4">
                    {/* Styled transparent button for dark mode look */}
                    <ContinueButton
                        label="Continue"
                        onPress={() => router.push('/onboarding/bedtime-reminders')}
                    />
                </View>
            </OnboardingLayout>
        </View>
    );
}