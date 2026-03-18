import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function CheckInboxScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack>
            <View className="flex-1 items-center justify-center -mt-20">
                <View className="bg-neutral-100 p-6 rounded-3xl mb-8">
                    <Ionicons name="mail-open-outline" size={64} color="#525252" />
                </View>
                <Text className="text-2xl font-bold text-neutral-900 mb-2">Check your inbox!</Text>
                <Text className="text-center text-neutral-500 px-8 leading-6">
                    Please tap on the link we just sent to your email on this device.
                </Text>
            </View>

            <View className="mb-4">
                {/* Simulating "link clicked" by just letting user continue for now */}
                <ContinueButton
                    label="Resend Link (19)"
                    enabled={false}
                    onPress={() => { }}
                />
                {/* Hidden dev button to skip */}
                <Text onPress={() => router.push('/onboarding/privacy')} className="text-center text-neutral-300 mt-4">
                    (Dev: Skip verification)
                </Text>
            </View>
        </OnboardingLayout>
    );
}