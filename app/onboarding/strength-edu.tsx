import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';

export default function StrengthEduScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#3E2723]">
            <StatusBar style="light" />
            <LinearGradient colors={['#4E342E', '#21110E']} className="absolute w-full h-full" />

            <View className="flex-1 items-center justify-center px-6">
                <View className="items-center mb-10">
                    {/* <Text className="text-[80px] font-bold text-white opacity-20 absolute top-0">RUN</Text> */}
                    {/* Visual Graphic Mock */}
                    <View className="w-32 h-32 items-center justify-center border-4 border-orange-500 rounded-full mb-4">
                        <Text className="text-4xl font-bold text-white">86%</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-white mb-3 text-center">Train smarter, not harder</Text>
                <Text className="text-center text-orange-100/70 leading-6">
                    Get personalized guidance on when to push and when to rest, so you stay consistent and avoid training.
                </Text>
            </View>

            <View className="px-6 mb-8">
                <ContinueButton
                    label="Continue"
                    // Using a custom style for the brown theme
                    onPress={() => router.push('/onboarding/flow/biometrics-intro')}
                />
            </View>
        </View>
    );
}