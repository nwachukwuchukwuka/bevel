import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function BiometricsIntroScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center">
            <View className="items-center -mt-20">
                <Ionicons name="person-circle-outline" size={64} color="#CBD5E1" />
                <Text className="text-2xl font-bold text-neutral-900 mt-6 mb-3">A bit about you</Text>
                <Text className="text-center text-neutral-500 px-8 leading-6">
                    Now that we know what you want to improve on, help us tailor the experience for you.
                </Text>
            </View>

            <View className="absolute bottom-2 left-0 right-0">
                <ContinueButton onPress={() => router.push('/onboarding/flow/health-access')} />
            </View>
        </View>
    );
}