import { Ionicons } from '@expo/vector-icons';
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
        else router.back();
    };

    return (
        <View className="flex-1 bg-[#090D16]">

            <View className="px-5 py-4 pt-6 border-b border-[#1E293B] flex-row justify-between items-center bg-[#151E33]">
                <View>
                    <Text className="text-xl font-bold text-slate-100">Setup tutorial</Text>
                    <Text className="text-xs text-slate-400 mt-1">Sleep alarm configuration</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-5 justify-center">

                {step === 0 && (
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="w-16 h-16 bg-[#1E293B] rounded-2xl items-center justify-center border border-[#2D3748] mb-6">
                            <Ionicons name="alarm-outline" size={28} color="#4DB9F2" />
                        </View>

                        <Text className="text-2xl font-bold text-white mb-2">Alarm topologies</Text>
                        <Text className="text-sm text-slate-400 leading-6 mb-8">
                            Four types of sleep alarms to help you wake up at the right time.
                        </Text>

                        <View className="flex-col gap-4">
                            {[
                                { icon: 'wifi', title: 'Smart alarm', desc: 'Wake up during the lightest part of your sleep.' },
                                { icon: 'time-outline', title: 'Regular alarm', desc: 'Wake up at a specified time.' },
                                { icon: 'moon-outline', title: 'Sleep needed', desc: "Wake up after you've met your sleep needed." },
                                { icon: 'close-circle-outline', title: 'No alarm', desc: 'Track your time to fall asleep without any alarms.' }
                            ].map((item, idx) => (
                                <View key={idx} className="flex-row items-start gap-4 p-3 bg-[#090D16] border border-[#1E293B] rounded-xl">
                                    <Ionicons name={item.icon as any} size={18} color="#4DB9F2" />
                                    <View className="flex-1">
                                        <Text className="font-bold text-slate-200 text-sm mb-1">{item.title}</Text>
                                        <Text className="text-xs text-slate-500 leading-4">{item.desc}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {step === 1 && (
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 items-center">
                        <View className="bg-[#090D16] px-3 py-1.5 rounded-lg border border-[#1E293B] mb-8">
                            <Text className="text-xs font-bold text-[#4DB9F2]">Phase 1</Text>
                        </View>

                        <View className="w-48 h-56 bg-[#1E293B] rounded-[40px] border-[6px] border-[#2D3748] items-center justify-center mb-8 relative">
                            <View className="w-[160px] h-[190px] bg-[#090D16] rounded-[32px] p-4 items-center">
                                <View className="flex-row justify-between w-full mb-6">
                                    <Ionicons name="settings" size={12} color="#4DB9F2" />
                                    <Text className="text-white text-[10px] font-bold">3:42</Text>
                                </View>
                                <Ionicons name="moon" size={24} color="#4DB9F2" className="mb-2" />
                                <Text className="text-white font-bold text-sm mb-6">October 12</Text>
                                <View className="flex-row gap-3">
                                    <View className="w-10 h-10 rounded-full border border-emerald-500 items-center justify-center bg-[#151E33]"><Text className="text-emerald-400 text-xs font-bold">40</Text></View>
                                    <View className="w-10 h-10 rounded-full border border-blue-500 items-center justify-center bg-[#151E33]"><Text className="text-blue-400 text-xs font-bold">75</Text></View>
                                </View>
                            </View>
                        </View>

                        <Text className="text-2xl font-bold text-white mb-3 text-center">Open the watch app</Text>
                        <Text className="text-sm text-slate-400 text-center leading-6">
                            Open the Apple Watch app and swipe to the left to access the sleep alarm module.
                        </Text>
                    </View>
                )}

                {step === 2 && (
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 items-center">
                        <View className="bg-[#090D16] px-3 py-1.5 rounded-lg border border-[#1E293B] mb-8">
                            <Text className="text-xs font-bold text-[#4DB9F2]">Phase 2</Text>
                        </View>

                        <View className="flex-row items-center justify-center gap-3 mb-10 bg-[#090D16] p-6 rounded-2xl border border-[#1E293B] w-full">
                            <View className="w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#2D3748] items-center justify-center">
                                <Ionicons name="alarm-outline" size={24} color="#4DB9F2" className="mb-2" />
                                <View className="bg-[#4DB9F2]/20 px-2 py-0.5 rounded border border-[#4DB9F2]/30"><Text className="text-[#4DB9F2] text-[9px] font-bold">Start</Text></View>
                            </View>
                            <Ionicons name="arrow-forward" size={16} color="#4DB9F2" />
                            <View className="w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#2D3748] items-center justify-center">
                                <Ionicons name="bed-outline" size={24} color="#10B981" className="mb-2" />
                                <View className="bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20"><Text className="text-emerald-500 text-[9px] font-bold">Focus</Text></View>
                            </View>
                        </View>

                        <Text className="text-2xl font-bold text-white mb-3 text-center">Add shortcuts</Text>
                        <Text className="text-sm text-slate-400 text-center leading-6 mb-8">
                            Start your sleep alarm and activate Sleep Focus mode at the same time via system shortcuts.
                        </Text>

                        <TouchableOpacity activeOpacity={0.8} className="bg-[#1E293B] border border-[#4DB9F2] px-6 py-3.5 rounded-xl flex-row items-center gap-2">
                            <Ionicons name="layers-outline" size={18} color="#4DB9F2" />
                            <Text className="text-white font-bold text-sm">Add to Shortcuts</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>

            <View className="px-5 pb-8 pt-4 bg-[#090D16]">
                <View className="flex-row justify-center gap-2 mb-6">
                    {[0, 1, 2].map(i => (
                        <View
                            key={i}
                            className={`h-1.5 rounded-full ${step === i ? 'w-6 bg-[#4DB9F2]' : 'w-2 bg-[#1E293B]'}`}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    onPress={nextStep}
                    activeOpacity={0.8}
                    className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-base">
                        {step === 2 ? 'Complete configuration' : 'Next phase'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}