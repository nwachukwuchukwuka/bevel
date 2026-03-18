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

    // Find exercise in LIBRARY
    const exercise = LIBRARY.flatMap(section => section.items).find(item => item.id === id);

    // Fallback if not found (e.g. for custom exercises or if we want to handle missing id)
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
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>

                {/* Native Modal Drag Handle Mock */}
                <View className="w-full items-center pt-3 pb-2">
                    <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
                </View>

                {/* Header Info */}
                <View className="px-5 mb-4">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">{displayName}</Text>
                    <Text className="text-gray-400 font-medium">{displayType}</Text>
                </View>

                {/* Image Placeholder */}
                <View className="mx-5 h-56 bg-gray-50 rounded-2xl border border-gray-200 items-center justify-center mb-6">
                    {/* Simulated image graphic */}
                    <Ionicons name="body-outline" size={80} color="#D1D5DB" />
                    <View className="absolute bg-orange-500/20 w-12 h-12 rounded-lg mt-4" />
                </View>

                {/* Tabs */}
                <View className="flex-row mx-5 border-b border-gray-200 mb-6">
                    <TouchableOpacity
                        onPress={() => setActiveTab('About')}
                        className={`flex-1 items-center pb-3 ${activeTab === 'About' ? 'border-b-[3px] border-gray-900' : ''}`}
                    >
                        <Text className={`font-bold ${activeTab === 'About' ? 'text-gray-900' : 'text-gray-400'}`}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('Guide')}
                        className={`flex-1 items-center pb-3 ${activeTab === 'Guide' ? 'border-b-[3px] border-gray-900' : ''}`}
                    >
                        <Text className={`font-bold ${activeTab === 'Guide' ? 'text-gray-900' : 'text-gray-400'}`}>Guide</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

                    {/* --- ABOUT TAB CONTENT --- */}
                    {activeTab === 'About' && (
                        <View className="gap-5">
                            <View>
                                <Text className="text-gray-400 font-semibold text-xs mb-2">Equipment</Text>
                                <View className="flex-row items-center gap-2">
                                    <View className="bg-orange-100 p-1.5 rounded-md"><Ionicons name="desktop" size={16} color="#EA580C" /></View>
                                    <Text className="font-bold text-gray-900 text-[15px]">{displayType}</Text>
                                </View>
                            </View>

                            <View>
                                <Text className="text-gray-400 font-semibold text-xs mb-2">Primary muscles</Text>
                                <View className="bg-[#1A1A1A] self-start px-3 py-1.5 rounded-lg">
                                    <Text className="text-white font-bold text-[13px]">Abs</Text>
                                </View>
                            </View>

                            <View>
                                <Text className="text-gray-400 font-semibold text-xs mb-2">Secondary muscles</Text>
                                <View className="bg-white border border-gray-200 self-start px-3 py-1.5 rounded-lg shadow-sm">
                                    <Text className="text-gray-800 font-bold text-[13px]">Obliques</Text>
                                </View>
                            </View>

                            {/* Trigger for Bottom Sheet */}
                            <TouchableOpacity
                                onPress={() => howToLogRef.current?.present()}
                                className="mt-4 border border-dashed border-gray-300 rounded-xl py-3.5 flex-row justify-center items-center gap-2 bg-gray-50/50"
                            >
                                <Ionicons name="bulb-outline" size={16} color="#4B5563" />
                                <Text className="font-bold text-gray-700">How to log</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* --- GUIDE TAB CONTENT --- */}
                    {activeTab === 'Guide' && (
                        <View className="gap-4">
                            {GUIDE_STEPS.map((step, index) => (
                                <View key={index} className="flex-row items-start gap-4">
                                    <View className="w-6 h-6 rounded-full border border-gray-200 items-center justify-center mt-0.5">
                                        <Text className="text-gray-500 font-bold text-xs">{index + 1}</Text>
                                    </View>
                                    <Text className="flex-1 font-semibold text-gray-800 leading-6 text-[15px]">
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