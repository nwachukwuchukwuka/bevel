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
            <View className="flex-1 pt-4 pb-4">

                {/* Repositioned Top Text Content for Stronger Hierarchy */}
                <View className="mb-10">
                    <Text className="text-3xl font-bold text-slate-100 mb-4">
                        Go the extra mile
                    </Text>
                    <Text className="text-[16px] text-slate-400 font-medium leading-7">
                        Level up your endurance with personalized data on cardio load, heart rate recovery, and training zones.
                    </Text>
                </View>

                {/* Hard-Structured "Telemetry" Dashboard replacing the abstract map */}
                <View className="flex-1 justify-center pb-10">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-6">

                        {/* Simulated Intensity Chart Container */}
                        <View className="bg-[#090D16] border border-[#2D3748] rounded-[16px] h-40 p-4 mb-4 justify-end relative overflow-hidden">
                            {/* Decorative Grid Lines */}
                            <View className="absolute inset-0 flex-row justify-between px-4 opacity-10">
                                <View className="w-px h-full bg-slate-100" />
                                <View className="w-px h-full bg-slate-100" />
                                <View className="w-px h-full bg-slate-100" />
                                <View className="w-px h-full bg-slate-100" />
                            </View>

                            {/* Simulated Workout Graph via Bar Chart */}
                            <View className="flex-row items-end justify-between w-full h-24 gap-1 z-10 px-2">
                                <View className="flex-1 h-[20%] bg-blue-500/60 rounded-t-sm" />
                                <View className="flex-1 h-[30%] bg-blue-500 rounded-t-sm" />
                                <View className="flex-1 h-[45%] bg-emerald-500/80 rounded-t-sm" />
                                <View className="flex-1 h-[60%] bg-emerald-500 rounded-t-sm" />
                                <View className="flex-1 h-[75%] bg-amber-500/90 rounded-t-sm" />
                                <View className="flex-1 h-[90%] bg-rose-500 rounded-t-sm" />
                                <View className="flex-1 h-[100%] bg-rose-500 shadow-sm rounded-t-sm border border-rose-400" />
                                <View className="flex-1 h-[80%] bg-rose-500/80 rounded-t-sm" />
                                <View className="flex-1 h-[65%] bg-amber-500 rounded-t-sm" />
                                <View className="flex-1 h-[50%] bg-emerald-500 rounded-t-sm" />
                                <View className="flex-1 h-[35%] bg-blue-500/80 rounded-t-sm" />
                            </View>
                        </View>

                        {/* Metric Readout Grid replacing the floating cards */}
                        <View className="flex-row gap-3">
                            <View className="bg-[#090D16] border border-rose-950/40 rounded-[16px] flex-1 py-4 items-center justify-center">
                                <View className="w-10 h-10 bg-rose-950/30 border border-rose-500/20 rounded-[10px] items-center justify-center mb-2">
                                    <Ionicons name="heart" size={18} color="#EF4444" />
                                </View>
                                <Text className="text-[13px] font-bold text-slate-300">HR</Text>
                            </View>

                            <View className="bg-[#090D16] border border-blue-950/40 rounded-[16px] flex-1 py-4 items-center justify-center">
                                <View className="w-10 h-10 bg-blue-950/30 border border-blue-500/20 rounded-[10px] items-center justify-center mb-2">
                                    <Ionicons name="speedometer" size={18} color="#4DB9F2" />
                                </View>
                                <Text className="text-[13px] font-bold text-slate-300">Pace</Text>
                            </View>

                            <View className="bg-[#090D16] border border-emerald-950/40 rounded-[16px] flex-1 py-4 items-center justify-center">
                                <View className="w-10 h-10 bg-emerald-950/30 border border-emerald-500/20 rounded-[10px] items-center justify-center mb-2">
                                    <Ionicons name="trending-up" size={18} color="#10B981" />
                                </View>
                                <Text className="text-[13px] font-bold text-slate-300">Elev</Text>
                            </View>
                        </View>

                    </View>
                </View>

                {/* Bottom Action Area */}
                <View className="mt-auto">
                    <ContinueButton onPress={() => router.push('/onboarding/flow/biometrics-intro')} />
                </View>
            </View>
        </OnboardingLayout>
    );
}