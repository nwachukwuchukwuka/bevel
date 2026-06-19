import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function NutritionEduScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#090D16]">
            <OnboardingLayout showBack={false}>

                <View className="flex-1 justify-center px-1">

                    {/* Dark Minimalist Visual Override */}
                    <View className="w-full bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 items-center justify-center mb-10 relative overflow-hidden min-h-[300px]">

                        {/* Target Frame Graphics */}
                        <View className="absolute inset-0 m-6 border border-[#2D3748] border-dashed rounded-xl" />
                        <View className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#4DB9F2]" />
                        <View className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#4DB9F2]" />
                        <View className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#4DB9F2]" />
                        <View className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#4DB9F2]" />

                        <Ionicons name="scan" size={80} color="#4DB9F2" className="opacity-80" />

                        {/* Simulated Scanned Node */}
                        <View className="absolute top-10 right-4 bg-[#090D16] border border-[#4DB9F2] p-3 rounded-xl flex-row items-center gap-3">
                            <Ionicons name="leaf-outline" size={16} color="#10B981" />
                            <View>
                                <Text className="text-white font-bold text-xs">Lettuce</Text>
                                <Text className="text-slate-500 text-[10px] font-semibold">100g node</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-3xl font-bold text-white mb-4">Improve eating habits</Text>

                    <View className="bg-[#1E293B40] border border-[#1E293B] p-5 rounded-2xl">
                        <Text className="text-slate-300 leading-6 text-base font-medium">
                            Log food effortlessly with AI and discover how your eating habits affect your energy, recovery, and sleep.
                        </Text>
                    </View>

                </View>

                <View className="mt-auto pt-4 ">
                    <ContinueButton onPress={() => router.push('/onboarding/flow/secondary-focus')} />
                </View>

            </OnboardingLayout>
        </View>
    );
}