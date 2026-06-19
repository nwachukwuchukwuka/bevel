import { LIBRARY } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HowToLogSheet } from './HowToLogSheet';

export default function ExerciseDetailsScreen() {
    const router = useRouter();
    const { id, name, type } = useLocalSearchParams<{ id: string, name: string, type: string }>();

    const exercise = LIBRARY.flatMap(section => section.items).find(item => item.id === id);

    const displayName = name || exercise?.name || "Exercise Details";
    const displayType = type || exercise?.type || "Standard";

    const [activeTab, setActiveTab] = useState<'About' | 'Guide'>('About');
    const howToLogRef = useRef<BottomSheetModal>(null);

    const GUIDE_STEPS = [
        "Adjust the seat and grip the handles firmly.",
        "Engage your core and crunch forward.",
        "Pause briefly at the bottom of the movement.",
        "Slowly return to the starting position.",
        "Repeat with control for desired reps."
    ];

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                <View className="w-full items-center pt-3 pb-6">
                    <View className="w-12 h-1.5 bg-[#2D3748] rounded-full" />
                </View>

                <View className="px-5 mb-6">
                    <Text className="text-3xl font-bold text-white mb-2">{displayName}</Text>
                    <Text className="text-slate-400 font-medium text-base">{displayType}</Text>
                </View>

                <View className="mx-5 h-64 bg-[#151E33] border border-[#1E293B] rounded-3xl items-center justify-center mb-8 relative overflow-hidden">
                    <View className="absolute left-[20%] w-[1px] h-full border-l border-dashed border-[#1E293B]" />
                    <View className="absolute right-[20%] w-[1px] h-full border-l border-dashed border-[#1E293B]" />
                    <View className="absolute top-[50%] w-full h-[1px] bg-[#1E293B]" />

                    <View className="w-24 h-24 rounded-2xl bg-[#1E293B] border border-[#2D3748] items-center justify-center z-10">
                        <Ionicons name="body-outline" size={48} color="#4DB9F2" />
                    </View>

                    <View className="absolute bottom-6 right-6 w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 items-center justify-center z-10" />
                </View>

                <View className="mx-5 bg-[#151E33] border border-[#1E293B] rounded-xl p-1.5 flex-row mb-6">
                    <TouchableOpacity
                        onPress={() => setActiveTab('About')}
                        className={`flex-1 items-center justify-center py-2.5 rounded-lg ${activeTab === 'About' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                    >
                        <Text className={`font-semibold ${activeTab === 'About' ? 'text-white' : 'text-slate-500'}`}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('Guide')}
                        className={`flex-1 items-center justify-center py-2.5 rounded-lg ${activeTab === 'Guide' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                    >
                        <Text className={`font-semibold ${activeTab === 'Guide' ? 'text-white' : 'text-slate-500'}`}>Guide</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

                    {activeTab === 'About' && (
                        <View className="gap-4">

                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row items-center justify-between">
                                <Text className="text-slate-400 font-medium text-sm">Equipment</Text>
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 items-center justify-center">
                                        <Ionicons name="desktop" size={14} color="#F59E0B" />
                                    </View>
                                    <Text className="font-semibold text-white text-base">{displayType}</Text>
                                </View>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 gap-6">
                                <View>
                                    <Text className="text-slate-400 font-medium text-sm mb-3">Primary muscles</Text>
                                    <View className="self-start px-4 py-2 rounded-xl bg-[#4DB9F2]/10 border border-[#4DB9F2]/30">
                                        <Text className="text-[#4DB9F2] font-semibold text-sm">Abs</Text>
                                    </View>
                                </View>

                                <View className="w-full h-[1px] bg-[#1E293B]" />

                                <View>
                                    <Text className="text-slate-400 font-medium text-sm mb-3">Secondary muscles</Text>
                                    <View className="self-start px-4 py-2 rounded-xl bg-[#1E293B] border border-[#2D3748]">
                                        <Text className="text-slate-300 font-medium text-sm">Obliques</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => howToLogRef.current?.present()}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center mt-2"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-10 h-10 rounded-xl bg-[#4DB9F2]/10 border border-[#4DB9F2]/30 items-center justify-center">
                                        <Ionicons name="bulb-outline" size={18} color="#4DB9F2" />
                                    </View>
                                    <Text className="font-semibold text-white text-base">How to log</Text>
                                </View>
                                <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {activeTab === 'Guide' && (
                        <View className="gap-3">
                            {GUIDE_STEPS.map((step, index) => (
                                <View key={index} className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row items-start gap-4">
                                    <View className="w-8 h-8 rounded-xl bg-[#1E293B] border border-[#2D3748] items-center justify-center mt-0.5">
                                        <Text className="text-[#4DB9F2] font-bold text-sm">{index + 1}</Text>
                                    </View>
                                    <Text className="flex-1 font-medium text-slate-300 leading-6 text-base">
                                        {step}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>

                <HowToLogSheet ref={howToLogRef} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}