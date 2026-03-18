import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function PrivacyScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack={false}>
            <View className="flex-1 items-center pt-10">
                <Ionicons name="lock-closed-outline" size={48} color="#9CA3AF" style={{ marginBottom: 24 }} />

                <Text className="text-2xl font-bold text-neutral-900 mb-4">Privacy by design</Text>
                <Text className="text-center text-neutral-500 leading-6 mb-10">
                    All health data is stored and processed locally. We never sell or share your information with third parties.
                </Text>

                <View className="w-full gap-3">
                    <PrivacyItem icon="document-text-outline" label="Terms of Service" />
                    <PrivacyItem icon="shield-checkmark-outline" label="Privacy Policy" />
                </View>
            </View>

            <View className="mb-4">
                <ContinueButton
                    label="Accept and continue"
                    onPress={() => router.push('/onboarding/flow/welcome')}
                />
                <Text className="text-center text-xs text-neutral-400 mt-4 px-4">
                    By tapping on "Accept and continue", you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>
        </OnboardingLayout>
    );
}

const PrivacyItem = ({ icon, label }: { icon: any, label: string }) => (
    <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
        <View className="w-10 items-center">
            <Ionicons name={icon} size={24} color="#9CA3AF" />
        </View>
        <Text className="text-neutral-700 font-medium text-base">{label}</Text>
    </TouchableOpacity>
);