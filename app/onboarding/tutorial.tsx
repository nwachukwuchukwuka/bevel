import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '../../components/onboarding/Logo';

export default function TutorialModalScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else router.replace('/(tabs)');
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const ProgressBar = () => (
        <View className="flex-row gap-2 px-10 pt-4 mb-4 justify-center" style={{ marginTop: (step === 0 ? insets.top || 10 : insets.top || 20) }}>
            {[0, 1, 2, 3, 4].map((i) => (
                <View
                    key={i}
                    className={`flex-1 h-1 rounded-full ${step === i ? 'bg-neutral-900' : 'bg-neutral-200'}`}
                />
            ))}
        </View>
    );

    // --- STEP 0: WELCOME ---
    if (step === 0) {
        return (
            <View className="flex-1 bg-[#F9FAFB]">
                <ProgressBar />
                <View className="flex-1 items-center justify-center px-8">
                    <View className="mb-6">
                        <Logo color="#1A1A1A" width={48} height={48} />
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-4 text-center">Welcome to Bevel</Text>
                    <Text className="text-[17px] text-gray-600 text-center leading-6 px-4 font-medium">
                        Here's what you should know to make the most of your experience.
                    </Text>
                </View>
                <View className="px-5 w-full" style={{ paddingBottom: insets.bottom || 20 }}>
                    <TouchableOpacity onPress={() => setStep(1)} className="w-full bg-[#1C1C1E] h-[58px] py-4 rounded-full items-center justify-center">
                        <Text className="text-white font-semibold text-[17px]">Get started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // --- STEPS 1-4: CONTENT ---
    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Dynamic Background Gradient */}
            <LinearGradient
                colors={
                    step === 1 ? ['#FFEDD5', '#FFF7ED', '#F9FAFB'] :
                        step === 2 ? ['#D1FAE5', '#ECFDF5', '#F9FAFB'] :
                            step === 3 ? ['#DBEAFE', '#EFF6FF', '#F9FAFB'] :
                                ['#F3F4F6', '#F9FAFB', '#F9FAFB']
                }
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
            />

            {/* Progress Bar */}
            <ProgressBar />

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {step === 1 && (
                    <View className="animate-fade-in pt-8">
                        {/* Header Graphic */}
                        <View className="items-end justify-center h-48 relative mb-8 pr-4">
                            <View className="w-48 h-48 rounded-full border-[20px] border-white/60 absolute -right-10" />
                            <View className="w-48 h-48 rounded-full border-[20px] border-orange-400 absolute -right-10 border-l-transparent border-b-transparent -rotate-12" />
                        </View>

                        <Text className="text-[28px] font-bold text-gray-900 mb-2">Strain</Text>
                        <Text className="text-[15px] font-bold text-gray-700 leading-6 mb-8">Strain is a continuous measurement of your cardio and muscular exertion throughout the day. It resets at midnight.</Text>

                        <Text className="text-[12px] font-bold text-gray-400 mb-2 ml-2">How Strain works</Text>
                        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 mb-6">
                            <View className="flex-row items-center gap-4 mb-6">
                                <View className="w-8 h-8 rounded-full border-4 border-gray-100 border-t-orange-400 rotate-45" />
                                <Text className="flex-1 text-[13px] text-gray-600 leading-5"><Text className="font-bold text-gray-900">Strain is logarithmic</Text> and will progressively get harder to increase.</Text>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <View className="w-8 h-8 rounded-full border-4 border-orange-500" />
                                <Text className="flex-1 text-[13px] text-gray-600 leading-5"><Text className="font-bold text-gray-900">Strain has no limit</Text> and can go over 100%.</Text>
                            </View>
                        </View>

                        <Text className="text-[12px] font-bold text-gray-400 mb-2 ml-2">How Strain is calculated</Text>
                        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100">
                            <View className="flex-row gap-4 mb-6">
                                <Ionicons name="walk" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Cardio exertion</Text><Text className="text-[13px] text-gray-500 leading-5">Movement and HR data associated with your cardio activities.</Text></View>
                            </View>
                            <View className="flex-row gap-4 mb-6">
                                <Ionicons name="barbell" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Muscular exertion</Text><Text className="text-[13px] text-gray-500 leading-5">Data associated strength training sessions (i.e. motion data, weights, reps, sets).</Text></View>
                            </View>
                            <View className="flex-row gap-4">
                                <Ionicons name="footsteps" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Passive strain</Text><Text className="text-[13px] text-gray-500 leading-5">HR data from activities that are not recorded (i.e. walking to the grocery store).</Text></View>
                            </View>
                        </View>
                    </View>
                )}

                {step === 2 && (
                    <View className="animate-fade-in pt-8">
                        <View className="items-end justify-center h-48 relative mb-8 pr-4">
                            <View className="w-48 h-48 rounded-full border-[20px] border-white/60 absolute -right-10" />
                            <View className="w-48 h-48 rounded-full border-[20px] border-green-400 absolute -right-10 border-l-transparent border-b-transparent rotate-45" />
                        </View>

                        <Text className="text-[28px] font-bold text-gray-900 mb-2">Recovery</Text>
                        <Text className="text-[15px] font-bold text-gray-700 leading-6 mb-8">Recovery reflects your body's readiness for physical activities. It is calculated once a day after waking up.</Text>

                        <Text className="text-[12px] font-bold text-gray-400 mb-2 ml-2">How to interpret Recovery</Text>
                        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 mb-6">
                            <View className="flex-row items-center gap-4 mb-6">
                                <View className="w-8 h-8 rounded-full border-4 border-green-500" />
                                <Text className="flex-1 text-[13px] text-gray-600 leading-5">A high Recovery means that you're ready to take on physical challenges.</Text>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <View className="w-8 h-8 rounded-full border-4 border-gray-100" />
                                <Text className="flex-1 text-[13px] text-gray-600 leading-5">A low Recovery indicates that you should take some rest.</Text>
                            </View>
                        </View>

                        <Text className="text-[12px] font-bold text-gray-400 mb-2 ml-2">How Recovery is calculated</Text>
                        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100">
                            <View className="flex-row gap-4">
                                <Ionicons name="pulse" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Heart Rate Variability</Text><Text className="text-[13px] text-gray-500 leading-5">HRV is an indicator of your autonomic nervous system. By default, Bevel's Recovery score pulls HRV samples from the deepest stages of your sleep cycle.</Text></View>
                            </View>
                        </View>
                    </View>
                )}

                {step === 3 && (
                    <View className="animate-fade-in pt-8">
                        <View className="items-end justify-center h-48 relative mb-8 pr-4">
                            <View className="w-48 h-48 rounded-full border-[20px] border-white/60 absolute -right-10" />
                            <View className="w-48 h-48 rounded-full border-[20px] border-blue-400 absolute -right-10 border-l-transparent border-b-transparent -rotate-45" />
                        </View>

                        <Text className="text-[28px] font-bold text-gray-900 mb-2">Sleep</Text>
                        <Text className="text-[15px] font-bold text-gray-700 leading-6 mb-8">Sleep is a measurement of your sleep quality from the previous night. It is based on the longest sleep session of the day.</Text>

                        <Text className="text-[12px] font-bold text-gray-400 mb-2 ml-2">How Sleep is calculated</Text>
                        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100">
                            <View className="flex-row gap-4 mb-6">
                                <Ionicons name="time" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Time Asleep</Text><Text className="text-[13px] text-gray-500 leading-5">The total duration of your sleep session excluding awake segments.</Text></View>
                            </View>
                            <View className="flex-row gap-4 mb-6">
                                <Ionicons name="moon" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Sleep Stages</Text><Text className="text-[13px] text-gray-500 leading-5">The distribution of Light, Deep, Core, and REM sleep.</Text></View>
                            </View>
                            <View className="flex-row gap-4 mb-6">
                                <Ionicons name="heart" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Heart Rate Dip</Text><Text className="text-[13px] text-gray-500 leading-5">The difference between your daytime heart rate and your nighttime heart rate.</Text></View>
                            </View>
                            <View className="flex-row gap-4">
                                <Ionicons name="sunny" size={20} color="#9CA3AF" />
                                <View className="flex-1"><Text className="text-[14px] font-bold text-gray-900 mb-1">Sleep Efficiency</Text><Text className="text-[13px] text-gray-500 leading-5">The percentage of time spent asleep vs. time in bed.</Text></View>
                            </View>
                        </View>
                    </View>
                )}

                {step === 4 && (
                    <View className="animate-fade-in pt-8">
                        <Text className="text-[14px] font-bold text-gray-500 mb-1">For best results</Text>
                        <Text className="text-[28px] font-bold text-gray-900 mb-10 leading-9">Before heading off to bed, make sure to...</Text>

                        <View className="gap-4">
                            <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text className="text-[40px] font-bold text-gray-100 absolute -top-4 -left-2 z-0">1</Text>
                                    <Text className="text-[16px] font-bold text-gray-900 z-10 pr-4 mt-2">Turn on sleep focus mode</Text>
                                </View>
                                {/* Watch Face UI Mock */}
                                <View className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-200 items-center justify-center relative">
                                    <View className="w-10 h-6 bg-teal-100 rounded-md items-center justify-center border border-teal-200">
                                        <Ionicons name="bed" size={14} color="#2DD4BF" />
                                    </View>
                                    <Text className="text-[6px] font-bold text-teal-400 mt-1">Sleep Focus</Text>
                                </View>
                            </View>

                            <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text className="text-[40px] font-bold text-gray-100 absolute -top-4 -left-2 z-0">2</Text>
                                    <Text className="text-[16px] font-bold text-gray-900 z-10 pr-4 mt-2">Turn off power saver mode on your watch</Text>
                                </View>
                                {/* Battery Mock */}
                                <View className="w-16 h-16 items-center justify-center opacity-50 relative overflow-hidden">
                                    <Ionicons name="battery-half" size={32} color="#FACC15" />
                                </View>
                            </View>

                            <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text className="text-[40px] font-bold text-gray-100 absolute -top-4 -left-2 z-0">3</Text>
                                    <Text className="text-[16px] font-bold text-gray-900 z-10 pr-4 mt-2">Wear your watch to sleep</Text>
                                </View>
                                {/* Sleep Dial Mock */}
                                <View className="w-16 h-16 items-center justify-center relative">
                                    <View className="w-12 h-12 rounded-full border-[3px] border-dashed border-gray-200 absolute" />
                                    <View className="w-12 h-12 rounded-full border-[3px] border-blue-400 border-l-transparent border-b-transparent -rotate-45 absolute opacity-40" />
                                    <Ionicons name="sunny" size={8} color="#FACC15" className="absolute bottom-2 right-2" />
                                </View>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>

            {/* Fixed Footer */}
            <View className="px-5 pt-4 bg-transparent flex-row items-center justify-between" style={{ paddingBottom: insets.bottom || 20 }}>
                <TouchableOpacity onPress={handleBack} className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm shadow-black/5 border border-gray-100">
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} className="bg-[#1C1C1E] h-[56px] px-8 rounded-full items-center justify-center flex-row gap-2">
                    <Text className="text-white font-semibold text-[16px]">{step === 4 ? 'Done' : 'Next'}</Text>
                    {step === 4 ? (
                        <Ionicons name="checkmark" size={18} color="white" />
                    ) : (
                        <Ionicons name="arrow-forward" size={18} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}