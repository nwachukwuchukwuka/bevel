import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TriState = 'none' | 'yes' | 'no';

export default function DefaultEntriesScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State for the tri-state toggles
    const [states, setStates] = useState<Record<string, TriState>>({
        device: 'none',
        reading: 'none',
        sexual: 'none',
        lowCarbs: 'none',
        lateMeal: 'none',
        sugar: 'none',
    });

    const setToggle = (key: string, val: TriState) => {
        setStates(prev => ({ ...prev, [key]: val }));
    };

    // Helper component for the tri-state toggle
    const TriToggle = ({ stateKey }: { stateKey: string }) => {
        const val = states[stateKey];
        return (
            <View className="flex-row bg-gray-50 rounded-xl p-1 border border-gray-100">
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'no')}
                    className={`w-10 h-8 items-center justify-center rounded-lg ${val === 'no' ? 'bg-red-400 shadow-sm' : ''}`}
                >
                    <Ionicons name="close" size={18} color={val === 'no' ? 'white' : '#D1D5DB'} />
                </TouchableOpacity>
                <View className="w-[1px] h-full bg-gray-200" />
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'none')}
                    className={`w-10 h-8 items-center justify-center rounded-lg ${val === 'none' ? 'bg-white shadow-sm' : ''}`}
                >
                    <View className="w-3 h-0.5 bg-gray-300" />
                </TouchableOpacity>
                <View className="w-[1px] h-full bg-gray-200" />
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'yes')}
                    className={`w-10 h-8 items-center justify-center rounded-lg ${val === 'yes' ? 'bg-blue-400 shadow-sm' : ''}`}
                >
                    <Ionicons name="checkmark" size={18} color={val === 'yes' ? 'white' : '#D1D5DB'} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Set default entries</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-[18px] font-bold text-gray-900 mb-1">Default entries</Text>
                <Text className="text-[14px] text-gray-500 leading-5 mb-6">Each day, the Journal will start out with the default states set below.</Text>

                <View className="gap-3 pb-24">

                    {/* Number Links */}
                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">🍷</Text><Text className="text-[15px] font-bold text-gray-900">Alcohol</Text></View>
                        <View className="flex-row items-center gap-2"><Text className="text-[14px] font-medium text-gray-500">0,0 drink</Text><View className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"><Ionicons name="arrow-forward" size={14} color="#9CA3AF" /></View></View>
                    </View>

                    {/* Toggles */}
                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">📱</Text><Text className="text-[15px] font-bold text-gray-900">Device in bed</Text></View>
                        <TriToggle stateKey="device" />
                    </View>

                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">📖</Text><Text className="text-[15px] font-bold text-gray-900">Reading in bed</Text></View>
                        <TriToggle stateKey="reading" />
                    </View>

                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">❣️</Text><Text className="text-[15px] font-bold text-gray-900">Sexual activity</Text></View>
                        <TriToggle stateKey="sexual" />
                    </View>

                    {/* More Number Links */}
                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">💧</Text><Text className="text-[15px] font-bold text-gray-900">Hydration</Text></View>
                        <View className="flex-row items-center gap-2"><Text className="text-[14px] font-medium text-gray-500">0,0 ml</Text><View className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"><Ionicons name="arrow-forward" size={14} color="#9CA3AF" /></View></View>
                    </View>

                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">☕</Text><Text className="text-[15px] font-bold text-gray-900">Caffeine</Text></View>
                        <View className="flex-row items-center gap-2"><Text className="text-[14px] font-medium text-gray-500">0,0 mg</Text><View className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"><Ionicons name="arrow-forward" size={14} color="#9CA3AF" /></View></View>
                    </View>

                    {/* Final Toggles */}
                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">🥖</Text><Text className="text-[15px] font-bold text-gray-900">Low carbs</Text></View>
                        <TriToggle stateKey="lowCarbs" />
                    </View>

                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">🍽️</Text><Text className="text-[15px] font-bold text-gray-900">Late meal</Text></View>
                        <TriToggle stateKey="lateMeal" />
                    </View>

                    <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3"><Text className="text-[18px]">🍬</Text><Text className="text-[15px] font-bold text-gray-900">Added sugar</Text></View>
                        <TriToggle stateKey="sugar" />
                    </View>

                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 px-5 bg-[#F9FAFB]" style={{ paddingBottom: insets.bottom || 20, paddingTop: 10 }}>
                <TouchableOpacity onPress={() => router.back()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center shadow-lg shadow-black/10">
                    <Text className="text-white font-semibold text-[16px]">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}