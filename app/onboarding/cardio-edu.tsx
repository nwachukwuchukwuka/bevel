import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function CardioEduScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack>
            <View className="flex-1 items-center justify-center -mt-10">
                {/* Mock Map Card */}
                <View className="w-full h-64 bg-green-50 rounded-3xl overflow-hidden mb-8 relative border border-green-100 shadow-sm">
                    <View className="absolute top-10 left-10 w-24 h-24 border-4 border-purple-400 rounded-full opacity-50" />
                    <View className="absolute top-10 right-20 w-32 h-32 border-4 border-red-400 rounded-full opacity-30" />

                    <View className="absolute bottom-4 left-4 right-4 flex-row justify-between">
                        <View className="bg-white p-2 rounded-lg items-center w-16 shadow-sm">
                            <Ionicons name="heart" size={16} color="red" />
                            <Text className="text-xs font-bold mt-1">HR</Text>
                        </View>
                        <View className="bg-white p-2 rounded-lg items-center w-16 shadow-sm">
                            <Ionicons name="speedometer" size={16} color="black" />
                            <Text className="text-xs font-bold mt-1">Pace</Text>
                        </View>
                        <View className="bg-white p-2 rounded-lg items-center w-16 shadow-sm">
                            <Ionicons name="trending-up" size={16} color="black" />
                            <Text className="text-xs font-bold mt-1">Elev</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-neutral-900 mb-3 text-center">Go the extra mile</Text>
                <Text className="text-center text-neutral-500 leading-6 px-4">
                    Level up your endurance with personalized data on cardio load, heart rate recovery, and training zones.
                </Text>
            </View>

            <View className="mb-4">
                <ContinueButton onPress={() => router.push('/onboarding/strength-edu')} />
            </View>
        </OnboardingLayout>
    );
}