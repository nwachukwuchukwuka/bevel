import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function HealthAccessScreen() {
    const router = useRouter();

    return (
        <View className='flex-1 '>
            <View className="flex-1 items-center justify-center -mt-20">
                <View className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                    <Ionicons name="heart" size={40} color="#F43F5E" />
                </View>

                <Text className="text-2xl font-bold text-neutral-900 mb-3 text-center">Allow access to Health</Text>
                <Text className="text-center text-neutral-500 leading-6 px-8">
                    Bevel needs your Health data to build activities, provide insights, and record workouts.
                </Text>
            </View>

            <View className="mb-4">
                <ContinueButton label="Connect to Health" onPress={() => router.push('/onboarding/flow/birthday')} />
            </View>
        </View>
    );
}