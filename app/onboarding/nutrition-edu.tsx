import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function NutritionEduScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Background Gradient */}
            <LinearGradient
                colors={['#F0F4FF', '#FFFFFF']}
                className="absolute w-full h-full"
            />

            <OnboardingLayout showBack={false}>
                <View className="flex-1 items-center justify-center">
                    {/* Mock visual for the burger scan */}
                    <View className="w-64 h-64 items-center justify-center relative mb-8">
                        {/* Scan corners */}
                        <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                        <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                        <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                        <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />

                        {/* Emoji Placeholder for Burger */}
                        <Text className="text-9xl">🍔</Text>

                        {/* Floating pill */}
                        <View className="absolute -top-6 right-0 bg-white p-2 rounded-xl shadow-sm flex-row items-center gap-2">
                            <Text className="text-2xl">🥗</Text>
                            <View>
                                <Text className="font-bold text-sm">Lettuce</Text>
                                <Text className="text-xs text-neutral-400">100g</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-neutral-900 mb-4 text-center">Improve eating habits</Text>
                    <Text className="text-center text-neutral-500 leading-6 px-4">
                        Log food effortlessly with AI and discover how your eating habits affect your energy, recovery, and sleep.
                    </Text>
                </View>

                <View className="mb-4">
                    <ContinueButton onPress={() => router.push('/onboarding/flow/secondary-focus')} />
                </View>
            </OnboardingLayout>
        </View>
    );
}