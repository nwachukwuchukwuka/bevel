import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { Logo } from '../../../components/onboarding/Logo';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View className="flex-1">
            {/* Center Content */}
            <View className="flex-1 items-center justify-center">
                <View className="mb-8">
                    <Logo width={80} height={80} color="#1A1A1A" />
                </View>

                <Text className="text-2xl font-bold text-neutral-900 mb-2">
                    Welcome to Bevel
                </Text>

                <Text className="text-center text-neutral-500 px-10 leading-6 text-[15px]">
                    Before you begin, lets take a few minutes to learn more about you!
                </Text>
            </View>

            {/* Footer */}
            <View className="mb-2">
                <ContinueButton
                    label="Continue"
                    onPress={() => router.push('/onboarding/flow/name')}
                />
            </View>
        </View>
    );
}
