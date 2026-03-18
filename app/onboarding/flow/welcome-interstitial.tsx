import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function WelcomeInterstitial() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <View className="flex-1 items-center justify-center -mt-20">
                <Text className="text-6xl mb-6">👋</Text>
                <Text className="text-2xl font-bold text-neutral-900 mb-2">Nice to meet you, Sam!</Text>
                <Text className="text-center text-neutral-500 px-4 leading-6">
                    Bevel is your health companion, helping you track fitness, nutrition, and sleep.
                </Text>
            </View>

            <View className="mb-2">
                <ContinueButton onPress={() => router.push('/onboarding/flow/health-focus')} />
            </View>
        </View>
    );
}