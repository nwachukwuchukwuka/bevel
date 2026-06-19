import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TriState = 'none' | 'yes' | 'no';

export default function DefaultEntriesScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

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

    const TriToggle = ({ stateKey }: { stateKey: string }) => {
        const val = states[stateKey];
        return (
            <View className="flex-row bg-[#090D16] rounded-xl border border-[#1E293B] p-1 gap-1">
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'no')}
                    activeOpacity={0.8}
                    className={`w-10 h-8 items-center justify-center rounded-lg border ${val === 'no' ? 'bg-[#EF4444] border-[#EF4444]' : 'bg-[#1E293B40] border-transparent'
                        }`}
                >
                    <Ionicons name="close" size={16} color={val === 'no' ? '#090D16' : '#94A3B8'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'none')}
                    activeOpacity={0.8}
                    className={`w-10 h-8 items-center justify-center rounded-lg border ${val === 'none' ? 'bg-[#1E293B] border-[#2D3748]' : 'bg-[#1E293B40] border-transparent'
                        }`}
                >
                    <View className={`w-3 h-1 rounded-full ${val === 'none' ? 'bg-slate-300' : 'bg-slate-600'}`} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setToggle(stateKey, 'yes')}
                    activeOpacity={0.8}
                    className={`w-10 h-8 items-center justify-center rounded-lg border ${val === 'yes' ? 'bg-[#10B981] border-[#10B981]' : 'bg-[#1E293B40] border-transparent'
                        }`}
                >
                    <Ionicons name="checkmark" size={16} color={val === 'yes' ? '#090D16' : '#94A3B8'} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-[#090D16]">

            {/* Header Block */}
            <View className="px-5 pb-6 bg-[#151E33] border-b border-[#1E293B]">
                <View className="flex-row items-center justify-between mt-4">
                    <View className="w-[280px]">
                        <Text className="text-2xl font-bold text-slate-100">Set default entries</Text>
                        <Text className="text-xs text-slate-400 mt-1 pr-6 leading-5">
                            Each day, the Journal will start out with the default states set below.
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Numeric Metrics Grid */}
                <View className="px-5 pt-8 mb-4">
                    <Text className="text-sm font-semibold text-slate-500 mb-3 ml-1">Numeric baselines</Text>
                    <View className="flex-row flex-wrap justify-between gap-y-3">
                        <View className="w-[48%] bg-[#151E33] border border-[#1E293B] p-4 rounded-2xl flex-col">
                            <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] mb-3">
                                <Text className="text-xl">🍷</Text>
                            </View>
                            <Text className="text-sm font-semibold text-slate-300 mb-1">Alcohol</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-bold text-white">0,0 <Text className="text-xs text-slate-500 font-medium">drink</Text></Text>
                                <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                            </View>
                        </View>

                        <View className="w-[48%] bg-[#151E33] border border-[#1E293B] p-4 rounded-2xl flex-col">
                            <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] mb-3">
                                <Text className="text-xl">💧</Text>
                            </View>
                            <Text className="text-sm font-semibold text-slate-300 mb-1">Hydration</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-bold text-white">0,0 <Text className="text-xs text-slate-500 font-medium">ml</Text></Text>
                                <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                            </View>
                        </View>

                        <View className="w-[48%] bg-[#151E33] border border-[#1E293B] p-4 rounded-2xl flex-col">
                            <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] mb-3">
                                <Text className="text-xl">☕</Text>
                            </View>
                            <Text className="text-sm font-semibold text-slate-300 mb-1">Caffeine</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-bold text-white">0,0 <Text className="text-xs text-slate-500 font-medium">mg</Text></Text>
                                <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Behavioral Toggles List */}
                <View className="px-5 pt-6 pb-8">
                    <Text className="text-sm font-semibold text-slate-500 mb-3 ml-1">Behavioral states</Text>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                        {[
                            { emoji: '📱', label: 'Device in bed', key: 'device' },
                            { emoji: '📖', label: 'Reading in bed', key: 'reading' },
                            { emoji: '❣️', label: 'Sexual activity', key: 'sexual' },
                            { emoji: '🥖', label: 'Low carbs', key: 'lowCarbs' },
                            { emoji: '🍽️', label: 'Late meal', key: 'lateMeal' },
                            { emoji: '🍬', label: 'Added sugar', key: 'sugar' },
                        ].map((item, idx, arr) => {
                            const isLast = idx === arr.length - 1;
                            return (
                                <View
                                    key={item.key}
                                    className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''
                                        }`}
                                >
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                            <Text className="text-lg">{item.emoji}</Text>
                                        </View>
                                        <Text className="text-base font-semibold text-slate-200">{item.label}</Text>
                                    </View>
                                    <TriToggle stateKey={item.key} />
                                </View>
                            );
                        })}
                    </View>
                </View>

            </ScrollView>

            <View
                className="absolute bottom-0 left-0 right-0 px-5 bg-[#090D16] border-t border-[#1E293B] pt-4 z-10"
                style={{ paddingBottom: insets.bottom || 24 }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                    className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-base">
                        Save defaults
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}