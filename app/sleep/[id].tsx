import { SleepNeededSheet, SleepNeededSheetRef } from '@/components/sleep/SleepNeededSheet';
import { SLEEP_STAGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SleepDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const neededSheetRef = useRef<SleepNeededSheetRef>(null);

    const isNap = id === 'nap';

    // Graph Tabs State
    const [activeTab, setActiveTab] = useState('HR');

    // Chart Configuration per Tab
    const getChartConfig = () => {
        switch (activeTab) {
            case 'HR': return { color: '#EC4899', title: 'Sleeping Heart Rate', val: '62,0', unit: 'bpm', label: 'AVERAGE HR' };
            case 'HRV': return { color: '#2DD4BF', title: 'Sleeping HRV', val: '60,8', unit: 'ms', label: 'AVERAGE HRV' };
            case 'RR': return { color: '#A855F7', title: 'Sleeping Respiratory Rate', val: '15,3', unit: 'rpm', label: 'AVERAGE RR' };
            case 'SpO2': return { color: '#06B6D4', title: 'Sleeping SpO2', val: '95.4', unit: '%', label: 'AVERAGE SPO2' };
            default: return { color: '#EC4899', title: '', val: '', unit: '', label: '' };
        }
    };

    const config = getChartConfig();

    return (
        <SafeAreaView className="flex-1 bg-[#181B28]">
            {/* Header */}
            <View className="px-5 py-4 flex-row items-center justify-between ">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close" size={24} color="#D1D5DB" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-[15px] font-semibold text-white">{isNap ? 'Nap' : 'Primary sleep'}</Text>
                    <Text className="text-[11px] font-medium text-gray-400">14/09/25 at 1.01 AM</Text>
                </View>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

                {isNap ? (
                    // --- NAP VIEW ---
                    <>
                        <View className="bg-[#22273B] rounded-[24px] p-6 mb-6 items-center border border-[#2A3047]">
                            <Text className="text-[12px] font-medium text-gray-400 mb-1">Time Asleep</Text>
                            <Text className="text-[28px] font-semibold text-white mb-6">60m</Text>
                            <View className="w-full bg-[#2A3047] rounded-xl p-4 flex-row justify-between items-center">
                                <View className="flex-row items-center gap-2"><Ionicons name="bed" size={16} color="#9CA3AF" /><Text className="text-[13px] font-semibold text-white">Sleep Period</Text></View>
                                <Text className="text-[13px] font-semibold text-gray-300">4.40 PM - 5.40 PM</Text>
                            </View>
                            <Text className="text-[11px] text-gray-500 mt-4">((•)) Tracked with Bevel</Text>
                        </View>

                        <Text className="text-[15px] font-semibold text-white mb-3">Sleep Impact</Text>
                        <View className="bg-[#2A3047] rounded-[16px] p-4 flex-row justify-between items-center mb-8">
                            <View className="flex-row items-center gap-2"><Ionicons name="business" size={16} color="#9CA3AF" /><Text className="text-[13px] font-semibold text-white">Sleep bank</Text></View>
                            <Text className="text-[13px] font-semibold text-green-400">+1h 0m</Text>
                        </View>
                    </>
                ) : (
                    // --- PRIMARY SLEEP VIEW ---
                    <>
                        <View className="bg-[#22273B] rounded-[24px] p-5 border border-[#2A3047] mb-6">
                            <View className="flex-row items-center justify-between mb-6">
                                <Text className="text-[15px] font-semibold text-white">Sleep Score</Text>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[15px] font-semibold text-white">67%</Text>
                                    <View className="w-5 h-5 border-4 border-indigo-500 rounded-full border-t-transparent -rotate-45" />
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center bg-[#2A3047] p-3 rounded-xl mb-6">
                                <View className="flex-row items-center gap-2"><Ionicons name="bed" size={14} color="#9CA3AF" /><Text className="text-[12px] font-semibold text-white">Sleep Period</Text></View>
                                <Text className="text-[12px] font-semibold text-gray-300">1.01 AM - 7.34 AM</Text>
                            </View>

                            <View className="flex-row mb-6">
                                <View className="flex-1 items-center border-r border-[#3A415C]">
                                    <Text className="text-[10px] font-medium text-gray-400 mb-1">Time In Bed</Text>
                                    <Text className="text-[20px] font-semibold text-white">6h 32m</Text>
                                </View>
                                <View className="flex-1 items-center">
                                    <Text className="text-[10px] font-medium text-gray-400 mb-1">Time Asleep</Text>
                                    <Text className="text-[20px] font-semibold text-white">6h 26m</Text>
                                </View>
                            </View>

                            {/* 4x4 Grid Stats Mock */}
                            <View className="bg-[#181B28] rounded-2xl p-4 flex-row flex-wrap gap-y-6">
                                <View className="w-1/2 items-center"><Ionicons name="time" size={14} color="#9CA3AF" /><Text className="text-[15px] font-semibold text-white mt-1">Fair</Text><Text className="text-[10px] text-gray-500">Time Asleep</Text><View className="w-8 h-1 bg-yellow-500 mt-1 rounded-full" /></View>
                                <View className="w-1/2 items-center"><Ionicons name="heart" size={14} color="#9CA3AF" /><Text className="text-[15px] font-semibold text-white mt-1">Excellent</Text><Text className="text-[10px] text-gray-500">Heart Rate Dip</Text><View className="w-8 h-1 bg-indigo-500 mt-1 rounded-full" /></View>
                                <View className="w-1/2 items-center"><Ionicons name="moon" size={14} color="#9CA3AF" /><Text className="text-[15px] font-semibold text-white mt-1">Good</Text><Text className="text-[10px] text-gray-500">REM Sleep</Text><View className="w-8 h-1 bg-teal-400 mt-1 rounded-full" /></View>
                                <View className="w-1/2 items-center"><Ionicons name="moon" size={14} color="#9CA3AF" /><Text className="text-[15px] font-semibold text-white mt-1">Fair</Text><Text className="text-[10px] text-gray-500">Deep Sleep</Text><View className="w-8 h-1 bg-yellow-500 mt-1 rounded-full" /></View>
                            </View>
                        </View>


                        <TouchableOpacity onPress={() => neededSheetRef.current?.present()} className="bg-[#2A3047] p-4 rounded-xl flex-row justify-between items-center mb-8">
                            <Text className="text-[13px] font-semibold text-white">Last night's sleep needed</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-[13px] font-semibold text-gray-300">8h 12m</Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>

                        {/* Sleep Stages Chart Block */}
                        <Text className="text-[15px] font-semibold text-white mb-4">Sleep Stages</Text>
                        <View className="bg-[#22273B] rounded-[24px] p-5 border border-[#2A3047] mb-8">
                            <View className="h-40 relative mb-4 flex-row items-end justify-between border-b border-gray-600 pb-1">
                                {/* Mock Block Chart for Sleep Stages */}
                                <View className="w-[5%] h-[20%] bg-[#3B82F6] absolute left-[0%]" />
                                <View className="w-[10%] h-[40%] bg-[#818CF8] absolute left-[5%]" />
                                <View className="w-[15%] h-[80%] bg-[#1E3A8A] absolute left-[15%]" />
                                <View className="w-[5%] h-[10%] bg-[#F97316] absolute left-[30%]" />
                                <View className="w-[20%] h-[60%] bg-[#2563EB] absolute left-[35%]" />
                                <View className="w-[15%] h-[90%] bg-[#1E3A8A] absolute left-[55%]" />
                                <View className="w-[10%] h-[30%] bg-[#818CF8] absolute left-[70%]" />
                                <View className="w-[15%] h-[50%] bg-[#3B82F6] absolute left-[80%]" />
                                <View className="w-[5%] h-[15%] bg-[#F97316] absolute left-[95%]" />
                            </View>
                            <View className="flex-row justify-between mb-6">
                                <Text className="text-[10px] font-bold text-gray-400">1.01 AM</Text>
                                <Text className="text-[10px] font-bold text-gray-400">7.34 AM</Text>
                            </View>

                            <View className="flex-row flex-wrap justify-between gap-y-3">
                                {SLEEP_STAGES.map(stage => (
                                    <View key={stage.name} className="w-[48%] bg-[#181B28] rounded-xl p-3 flex-row justify-between items-center">
                                        <View>
                                            <Text className="text-[11px] font-semibold text-gray-400 mb-1">{stage.name}</Text>
                                            <Text className="text-[14px] font-semibold text-white mb-0.5">{stage.duration}</Text>
                                            <Text className={`text-[10px] font-medium ${stage.name === 'Awake' ? 'text-orange-500' : stage.name === 'REM' ? 'text-[#818CF8]' : stage.name === 'Core' ? 'text-[#3B82F6]' : 'text-[#1E3A8A]'}`}>{stage.pct}</Text>
                                        </View>
                                        <View className={`w-8 h-8 rounded-full border-4 ${stage.name === 'Awake' ? 'border-orange-500' : stage.name === 'REM' ? 'border-[#818CF8]' : stage.name === 'Core' ? 'border-[#3B82F6]' : 'border-[#1E3A8A]'}`} style={{ borderTopColor: 'transparent' }} />
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Time To Fall Asleep */}
                        <Text className="text-[15px] font-semibold text-white mb-4">Time To Fall Asleep</Text>
                        <View className="bg-[#22273B] rounded-[24px] p-5 border border-[#2A3047] mb-8 items-center">
                            <Text className="text-[16px] font-semibold text-white mb-4">8 minutes</Text>
                            <View className="w-full h-2 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 relative mb-2" style={{ backgroundColor: '#4F46E5' }}>
                                <View className="absolute left-[30%] -top-1.5 w-5 h-5 bg-white rounded-full border-4 border-indigo-200" />
                            </View>
                            <View className="flex-row justify-between w-full px-2">
                                <Text className="text-[10px] font-medium text-gray-500">Fast</Text>
                                <Text className="text-[10px] font-medium text-white">Normal</Text>
                                <Text className="text-[10px] font-medium text-gray-500">Late</Text>
                            </View>
                        </View>
                    </>
                )}

                {/* --- SHARED MULTI-TAB GRAPH (HR, HRV, RR, SpO2) --- */}
                <Text className="text-[15px] font-semibold text-white mb-4">{config.title}</Text>

                <Text className="text-[22px] font-semibold text-white tracking-tight">{config.val} <Text className="text-[15px] text-gray-400 font-medium">{config.unit}</Text></Text>
                <Text className="text-[10px] font-medium text-gray-500 mb-6">{config.label}</Text>

                <View className="h-48 relative mb-8">
                    {/* Y-Axis Grid Lines */}
                    <View className="absolute inset-0 justify-between py-2 border-b border-gray-700">
                        <View className="border-b border-gray-700 w-full border-dashed" />
                        <View className="border-b border-gray-700 w-full border-dashed" />
                        <View className="border-b border-gray-700 w-full border-dashed" />
                    </View>

                    {/* Chart Data Mock */}
                    <View className="flex-1 justify-center relative">
                        {activeTab === 'HR' && (
                            // Scatter plot mock
                            <View className="w-full h-full relative">
                                <View className="absolute top-[40%] left-0 right-0 h-1 bg-pink-500/50" />
                                <View className="absolute top-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-pink-500" />
                                <View className="absolute top-[60%] left-[30%] w-1.5 h-1.5 rounded-full bg-pink-500" />
                                <View className="absolute top-[80%] left-[50%] w-1.5 h-1.5 rounded-full bg-pink-500" />
                                <View className="absolute top-[30%] left-[70%] w-1.5 h-1.5 rounded-full bg-pink-500" />
                            </View>
                        )}
                        {activeTab !== 'HR' && (
                            // Line plot mock
                            <View className="w-full h-full relative items-center justify-center">
                                <View className="w-[90%] h-1" style={{ backgroundColor: config.color, transform: [{ rotate: '-10deg' }] }} />
                                <View className="w-2.5 h-2.5 rounded-full border-[1.5px] bg-white absolute left-0 bottom-[30%]" style={{ borderColor: config.color }} />
                                <View className="w-2.5 h-2.5 rounded-full border-[1.5px] bg-white absolute right-0 top-[30%]" style={{ borderColor: config.color }} />
                            </View>
                        )}
                    </View>

                    {/* X-Axis */}
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-[10px] font-medium text-gray-400">1.03 AM</Text>
                        <Text className="text-[10px] font-medium text-gray-400">7.33 AM</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View className="flex-row justify-between gap-2 bg-[#22273B] p-2 rounded-[20px] mb-8">
                    {[
                        { id: 'HR', icon: 'heart', color: '#EC4899' },
                        { id: 'HRV', icon: 'pulse', color: '#2DD4BF' },
                        { id: 'RR', icon: 'leaf', color: '#A855F7' },
                        { id: 'SpO2', icon: 'water', color: '#06B6D4' }
                    ].map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <TouchableOpacity
                                key={tab.id}
                                onPress={() => setActiveTab(tab.id)}
                                className={`flex-1 items-center justify-center py-3 rounded-xl border ${isActive ? `border-[${tab.color}] bg-[#181B28]` : 'border-transparent'}`}
                                style={isActive ? { borderColor: tab.color } : {}}
                            >
                                <Ionicons name={tab.icon as any} size={18} color={isActive ? tab.color : '#6B7280'} className="mb-1" />
                                <Text className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>{tab.id}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </ScrollView>

            <SleepNeededSheet ref={neededSheetRef} />
        </SafeAreaView>
    );
}