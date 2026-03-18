import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Step = 'intro' | 'loading' | 'success';

export default function BuildExperienceScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState<Step>('intro');

    // Simulate the loading process
    useEffect(() => {
        if (step === 'loading') {
            const timer = setTimeout(() => {
                setStep('success');
            }, 3000); // 3 seconds fake loading
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Main Content Area */}
            <View className="flex-1 items-center justify-center px-8">

                {step === 'intro' && (
                    <View className="animate-fade-in">
                        <Text className="text-[24px] font-bold text-gray-900 text-center leading-8">
                            Now, let's build your{'\n'}personalized experience.
                        </Text>
                    </View>
                )}

                {step === 'loading' && (
                    <View className="items-center animate-fade-in">
                        <View className="w-16 h-16 rounded-full border-[6px] border-gray-200 items-center justify-center mb-6 relative">
                            {/* Native Activity Indicator scaled up slightly to match the thick ring style */}
                            <ActivityIndicator size="large" color="#D1D5DB" style={{ transform: [{ scale: 1.2 }] }} />
                        </View>
                        <Text className="text-[16px] font-bold text-gray-900 text-center mb-2">
                            Personalizing your experience...
                        </Text>
                        <Text className="text-[13px] text-gray-400 text-center leading-5">
                            This might take a few minutes.{'\n'}Please do not close the app
                        </Text>
                    </View>
                )}

                {step === 'success' && (
                    <View className="items-center animate-fade-in">
                        <View className="w-14 h-14 rounded-full bg-gray-200 border-4 border-white shadow-sm items-center justify-center mb-6">
                            <Ionicons name="checkmark" size={28} color="white" />
                        </View>
                        <Text className="text-[22px] font-bold text-gray-900 text-center leading-8">
                            You're all set now.{'\n'}Thank you for answering.
                        </Text>
                    </View>
                )}

            </View>

            {/* Bottom Actions Area */}
            <View
                className="px-5 w-full bg-[#F9FAFB]"
                style={{ paddingBottom: insets.bottom || 20 }}
            >
                {step === 'intro' && (
                    <TouchableOpacity
                        onPress={() => setStep('loading')}
                        className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center"
                    >
                        <Text className="text-white font-semibold text-[16px]">Continue</Text>
                    </TouchableOpacity>
                )}

                {step === 'success' && (
                    <View className="gap-4">
                        <TouchableOpacity
                            onPress={() => router.push('/onboarding/paywall')}
                            className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center"
                        >
                            <Text className="text-white font-semibold text-[16px]">Get started</Text>
                        </TouchableOpacity>
                        <Text className="text-center text-[10px] text-gray-400 leading-4 px-4">
                            Bevel is not a substitute for professional medical advice.{'\n'}Always consult your physician first.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}