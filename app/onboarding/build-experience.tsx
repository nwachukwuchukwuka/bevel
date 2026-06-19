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

    useEffect(() => {
        if (step === 'loading') {
            const timer = setTimeout(() => {
                setStep('success');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <View className="flex-1 bg-[#090D16]">
            <View className="flex-1 px-8 justify-center">

                {step === 'intro' && (
                    <View>
                        <View className="w-16 h-16 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center mb-8">
                            <Ionicons name="build" size={28} color="#4DB9F2" />
                        </View>
                        <Text className="text-3xl font-bold text-slate-100">
                            Now, let's build your personalized experience.
                        </Text>
                    </View>
                )}

                {step === 'loading' && (
                    <View className="items-center">
                        <View className="w-24 h-24 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center mb-8">
                            <ActivityIndicator size="large" color="#4DB9F2" />
                        </View>
                        <Text className="text-3xl font-bold text-slate-100 text-center mb-3">
                            Personalizing your experience...
                        </Text>
                        <Text className="text-base text-slate-400 text-center font-medium">
                            This might take a few minutes. Please do not close the app
                        </Text>
                    </View>
                )}

                {step === 'success' && (
                    <View className="items-center">
                        <View className="w-24 h-24 bg-[#4DB9F2]/10 border border-[#4DB9F2]/30 rounded-2xl items-center justify-center mb-8">
                            <Ionicons name="checkmark" size={40} color="#4DB9F2" />
                        </View>
                        <Text className="text-3xl font-bold text-slate-100 text-center mb-3">
                            You're all set now.
                        </Text>
                        <Text className="text-base text-slate-400 text-center font-medium">
                            Thank you for answering.
                        </Text>
                    </View>
                )}

            </View>

            <View
                className="px-6 w-full"
                style={{ paddingBottom: insets.bottom || 32 }}
            >
                {step === 'intro' && (
                    <TouchableOpacity
                        onPress={() => setStep('loading')}
                        className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center"
                    >
                        <Text className="text-[#090D16] font-bold text-lg">Continue</Text>
                    </TouchableOpacity>
                )}

                {step === 'success' && (
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push('/onboarding/paywall')}
                            className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center mb-4"
                        >
                            <Text className="text-[#090D16] font-bold text-lg">Get started</Text>
                        </TouchableOpacity>
                        <Text className="text-center text-xs font-medium text-slate-500 px-4">
                            Bevel is not a substitute for professional medical advice. Always consult your physician first.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}