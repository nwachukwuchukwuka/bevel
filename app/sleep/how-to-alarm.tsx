import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HowToAlarmModal() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < 2) setStep(step + 1);
        else router.back(); // Dismiss modal on last step
    };

    return (
        <View className="flex-1 bg-[#181B28]">
            <LinearGradient
                colors={['#373F61', '#1D2235']}
                style={{
                    flex: 1,
                    paddingTop: insets.top,
                }}
            >


                {/* --- STEPS CONTENT --- */}
                <View className="flex-1 px-8 justify-center">

                    {step === 0 && (
                        <View className="animate-fade-in">

                            <Text className="text-[28px] font-bold text-white mb-2">Sleep Alarms</Text>
                            <Text className="text-[15px] text-gray-300 leading-6 mb-8">Four types of sleep alarms to help you wake up at the right time.</Text>

                            <View className="gap-6">
                                <View className="flex-row gap-4">
                                    <Ionicons name="wifi" size={20} color="#9CA3AF" />
                                    <View className="flex-1"><Text className="font-bold text-white mb-1">Smart alarm</Text><Text className="text-[13px] text-gray-400">Wake up during the lightest part of your sleep.</Text></View>
                                </View>
                                <View className="flex-row gap-4">
                                    <Ionicons name="alarm" size={20} color="#9CA3AF" />
                                    <View className="flex-1"><Text className="font-bold text-white mb-1">Regular alarm</Text><Text className="text-[13px] text-gray-400">Wake up at a specified time.</Text></View>
                                </View>
                                <View className="flex-row gap-4">
                                    <Ionicons name="moon" size={20} color="#9CA3AF" />
                                    <View className="flex-1"><Text className="font-bold text-white mb-1">Sleep needed</Text><Text className="text-[13px] text-gray-400">Wake up after you've met your sleep needed.</Text></View>
                                </View>
                                <View className="flex-row gap-4">
                                    <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                                    <View className="flex-1"><Text className="font-bold text-white mb-1">No alarm</Text><Text className="text-[13px] text-gray-400">Track your time to fall asleep without any alarms.</Text></View>
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 1 && (
                        <View className="animate-fade-in items-center">
                            <Text className="text-[13px] font-bold text-gray-400 mb-8">Sleep alarm: <Text className="text-white">Get started</Text></Text>

                            {/* Apple Watch Mock UI */}
                            <View className="w-48 h-56 bg-[#F3F4F6] rounded-[40px] border-4 border-gray-200 items-center justify-center shadow-lg mb-8">
                                <View className="w-[170px] h-[200px] bg-black rounded-[32px] p-3 items-center">
                                    <View className="flex-row justify-between w-full mb-4">
                                        <Ionicons name="settings" size={14} color="white" />
                                        <Text className="text-white text-[10px] font-bold">3:42</Text>
                                    </View>
                                    <Ionicons name="moon" size={24} color="white" className="mb-2" />
                                    <Text className="text-white font-bold mb-4">October 12</Text>
                                    {/* Fake complications */}
                                    <View className="flex-row gap-2">
                                        <View className="w-10 h-10 rounded-full border-2 border-green-500 items-center justify-center"><Text className="text-white text-[10px]">40</Text></View>
                                        <View className="w-10 h-10 rounded-full border-2 border-blue-500 items-center justify-center"><Text className="text-white text-[10px]">75</Text></View>
                                    </View>
                                </View>
                            </View>

                            <View className="bg-white/10 px-4 py-1.5 rounded-full mb-6"><Text className="text-[12px] font-bold text-white">Step 1</Text></View>
                            <Text className="text-[24px] font-bold text-white mb-2 text-center">Open the watch app</Text>
                            <Text className="text-[14px] text-gray-400 text-center leading-5 px-4">Open the Apple Watch app and swipe to the left to access the sleep alarm.</Text>
                        </View>
                    )}

                    {step === 2 && (
                        <View className="animate-fade-in items-center">
                            <Text className="text-[13px] font-bold text-gray-400 mb-8">Sleep alarm: <Text className="text-white">Get started</Text></Text>

                            {/* Apple Shortcuts Mock UI */}
                            <View className="flex-row items-center justify-center gap-2 mb-10 h-56">
                                <View className="w-24 h-24 bg-white/10 rounded-3xl border border-white/20 items-center justify-center">
                                    <Ionicons name="alarm" size={24} color="#818CF8" className="mb-2" />
                                    <View className="bg-blue-500/20 px-3 py-1 rounded-full"><Text className="text-blue-400 text-[8px] font-bold">Start</Text></View>
                                </View>
                                <Text className="text-gray-500 font-bold tracking-widest">. . .</Text>
                                <View className="w-24 h-24 bg-white/10 rounded-3xl border border-white/20 items-center justify-center">
                                    <Ionicons name="bed" size={24} color="#34D399" className="mb-2" />
                                    <Text className="text-emerald-400 text-[9px] font-bold">Sleep Focus</Text>
                                </View>
                            </View>

                            <Text className="text-[24px] font-bold text-white mb-2 text-center">Add shortcuts</Text>
                            <Text className="text-[14px] text-gray-400 text-center leading-5 px-4 mb-8">Start your sleep alarm and activate Sleep Focus mode at the same time.</Text>

                            <TouchableOpacity className="bg-[#1E293B] px-6 py-3 rounded-full flex-row items-center gap-2">
                                <Ionicons name="layers" size={16} color="#3B82F6" />
                                <Text className="text-white font-bold text-[14px]">Add to Shortcuts</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>

                {/* Footer Controls */}
                <View className="px-8 pb-10">
                    <View className="flex-row justify-center gap-2 mb-8">
                        {[0, 1, 2, 3].map(i => (
                            <View key={i} className={`w-1.5 h-1.5 rounded-full ${step === i ? 'bg-white' : 'bg-gray-600'}`} />
                        ))}
                    </View>
                    <TouchableOpacity
                        onPress={nextStep}
                        className="w-full bg-[#E5E7EB] h-[56px] rounded-full items-center justify-center"
                    >
                        <Text className="text-gray-900 font-bold text-[16px]">{step === 2 ? 'Done' : 'Continue'}</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    );
}