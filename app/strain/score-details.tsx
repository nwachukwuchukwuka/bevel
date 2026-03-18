import { ResourceDetailSheet, ResourceDetailSheetRef } from '@/components/strain/ResourceDetailSheet';
import { STRAIN_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function StrainScoreModal() {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState('Strain Score');
    const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

    const resourceSheetRef = useRef<ResourceDetailSheetRef>(null);
    const CHART_DATA = [25, 45, 60, 50, 40, 15, 20, 65, 70, 45, 80, 50, 65, 20, 10, 35, 40];


    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F9FAFB]">
                {/* Modal Header */}
                <View className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100 bg-white">
                    <View className="w-8" />
                    <Text className="text-[16px] font-bold text-gray-900">Strain Score</Text>
                    <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                        <Ionicons name="close" size={18} color="#111827" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    <View className="flex-row items-center gap-2 mb-2">
                        <Ionicons name="analytics" size={18} color="#9CA3AF" />
                        <Text className="text-[16px] font-bold text-gray-500">Strain Score</Text>
                    </View>

                    <View className="flex-row justify-between items-end mb-6">
                        <View>
                            <Text className="text-[48px] font-bold text-gray-900 tracking-tighter leading-none">
                                38<Text className="text-[24px]">%</Text>
                            </Text>
                            <Text className="text-[13px] font-medium text-gray-500 mt-2">14 Sep 2025</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-[14px] font-bold text-emerald-500 mb-1">Normal range</Text>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="menu" size={14} color="#9CA3AF" />
                                <Text className="text-[13px] font-bold text-gray-400">8 - 64%</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-1.5 mb-8">
                        {['Strain Score', 'Exercise Duration', 'Daytime HR'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                className={`px-3 py-2 rounded-full ${selectedTab === tab ? 'bg-gray-900' : 'bg-gray-100'}`}
                            >
                                <Text className={`text-[10px] font-bold ${selectedTab === tab ? 'text-white' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="mb-10">
                        <View className="h-56 relative justify-end pb-6 border-b-2 border-emerald-400">

                            {/* Y-Axis Labels (Background) */}
                            <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0 opacity-40">
                                <Text className="text-[10px] font-bold text-gray-400">92</Text>
                                <Text className="text-[10px] font-bold text-gray-400">62</Text>
                                <Text className="text-[10px] font-bold text-gray-400">31</Text>
                                <Text className="text-[10px] font-bold text-gray-400">0</Text>
                            </View>

                            {/* Background Fill Gradient */}
                            <View className="absolute bottom-6 left-0 right-6 top-0 overflow-hidden z-0">
                                <LinearGradient
                                    colors={['rgba(251, 146, 60, 0.2)', 'rgba(251, 146, 60, 0)']}
                                    className="w-full h-full"
                                />
                            </View>

                            {/* Dotted Average Line */}
                            <View className="absolute left-0 right-6 top-[55%] border-b border-dashed border-orange-400 z-10 opacity-70" />
                            <View className="absolute left-[35%] top-[55%] -translate-y-3 bg-orange-500 px-2 py-0.5 rounded-full z-20">
                                <Text className="text-[10px] font-bold text-white">Avg. 35%</Text>
                            </View>

                            {/* Data Points (Vertical lines with dots to simulate the jagged line chart visually) */}
                            <View className="flex-row items-end justify-between pr-8 z-20 h-full">
                                {CHART_DATA.map((val, idx) => {
                                    const isLast = idx === CHART_DATA.length - 1;
                                    return (
                                        <View key={idx} className="items-center w-[4px]" style={{ height: `${val}%` }}>
                                            {/* Connecting Line Mock */}
                                            <View className="w-0.5 flex-1 bg-orange-400" />
                                            {/* Dot */}
                                            <View className={`w-2.5 h-2.5 rounded-full border-[1.5px] bg-white absolute top-0 ${isLast ? 'border-orange-500 w-3 h-3 bg-orange-100' : 'border-orange-500'}`} />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        {/* X-Axis Labels */}
                        <View className="flex-row justify-between pr-8 mt-2 mb-6">
                            <Text className="text-[10px] font-bold text-gray-400">15 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">22 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">30 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">6 Sep</Text>
                            <Text className="text-[10px] font-bold text-gray-400">14 Sep</Text>
                        </View>

                        {/* Timeframe Selector */}
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                                <Ionicons name="chevron-back" size={16} color="#9CA3AF" />
                            </TouchableOpacity>

                            <View className="flex-row items-center gap-1">
                                {['1M', '3M', '6M', '1Y'].map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setSelectedTimeframe(time)}
                                        className={`w-10 h-8 items-center justify-center rounded-full ${selectedTimeframe === time ? 'bg-white border border-gray-200 shadow-sm' : ''}`}
                                    >
                                        <Text className={`text-[12px] font-bold ${selectedTimeframe === time ? 'text-gray-900' : 'text-gray-400'}`}>{time}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View className="flex-row gap-2">
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                                    <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                                </TouchableOpacity>
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Strain Breakdown Mock */}
                    <Text className="text-[16px] font-bold text-gray-900 mb-4">Strain Breakdown</Text>
                    <View className="flex-row h-3 rounded-full overflow-hidden mb-4">
                        <View className="bg-yellow-400 h-full" style={{ width: '40%' }} />
                        <View className="bg-orange-500 h-full border-l border-white" style={{ width: '45%' }} />
                        <View className="bg-red-500 h-full border-l border-white" style={{ width: '15%' }} />
                    </View>
                    <View className="gap-2 mb-8">
                        <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-yellow-400" /><Text className="text-[12px] font-bold text-gray-900">Low <Text className="font-medium text-gray-400">&lt;34.0%</Text></Text></View>
                        <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-orange-500" /><Text className="text-[12px] font-bold text-gray-900">Normal <Text className="font-medium text-gray-400">34.0% - 67.0%</Text></Text></View>
                        <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-red-500" /><Text className="text-[12px] font-bold text-gray-900">High <Text className="font-medium text-gray-400">&gt;67.0%</Text></Text></View>
                    </View>

                    {/* Trends Analysis */}
                    <Text className="text-[16px] font-bold text-gray-900 mb-1">Trends Analysis</Text>
                    <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 14 Sep 2025</Text>

                    <View className="bg-white rounded-[20px] p-2 border border-gray-100 shadow-sm mb-2">
                        <View className="flex-row justify-between px-4 py-3 border-b border-gray-50">
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3">Period</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-center">Change</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-right">Trend</Text>
                        </View>
                        {STRAIN_ANALYSIS.map((item, idx) => (
                            <View key={idx} className={`flex-row items-center justify-between px-4 py-4 ${idx !== STRAIN_ANALYSIS.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <Text className="text-[13px] font-bold text-gray-600 w-1/3">{item.period}</Text>
                                <View className="w-1/3 items-center flex-row justify-center gap-1">
                                    <Ionicons name={item.trend === 'down' ? 'arrow-down-circle' : 'arrow-up-circle'} size={14} color={item.trend === 'down' ? '#EF4444' : '#3B82F6'} />
                                    <Text className={`text-[13px] font-bold ${item.trend === 'down' ? 'text-red-500' : 'text-blue-500'}`}>{item.change}</Text>
                                </View>
                                <View className="w-1/3 items-end justify-center">
                                    {/* Tiny Sparkline Mock */}
                                    <Ionicons name="pulse" size={24} color={item.trend === 'down' ? '#EF4444' : '#3B82F6'} />
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text className="text-center text-[10px] text-gray-400 mb-8">Based on 7-day rolling averages for the select period.</Text>

                    {/* Resources */}
                    <Text className="text-[16px] font-bold text-gray-900 mb-4">Resources</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible">
                        {/* The Clickable Resource Card */}
                        <TouchableOpacity
                            onPress={() => resourceSheetRef.current?.present()}
                            activeOpacity={0.8}
                            className="w-[240px] mr-4"
                        >
                            <View className="h-[120px] bg-orange-200 rounded-[20px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative">
                                <View className="absolute inset-0 bg-orange-400 opacity-20" />
                                <Text className="text-white font-bold text-[18px] mt-auto">Strain Score</Text>
                                <View className="w-12 h-12 bg-white rounded-full items-center justify-center border-4 border-white shadow-sm">
                                    <Text className="text-[12px] font-bold text-orange-500">54%</Text>
                                </View>
                            </View>
                            <Text className="text-[14px] font-bold text-gray-900 mb-1">What is Strain Score?</Text>
                            <Text className="text-[12px] font-medium text-gray-500 leading-4">Understand the intensity of your workouts and optimize...</Text>
                        </TouchableOpacity>

                        {/* Dummy Second Card */}
                        <View className="w-[240px]">
                            <View className="h-[120px] bg-gray-800 rounded-[20px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative">
                                <Text className="text-white font-bold text-[18px] mt-auto">Exercise Duration</Text>
                            </View>
                            <Text className="text-[14px] font-bold text-gray-900 mb-1">The Basics: Exercise</Text>
                            <Text className="text-[12px] font-medium text-gray-500 leading-4">The amount of time you exercise per day plays a crucial...</Text>
                        </View>
                    </ScrollView>

                </ScrollView>

                <View className="absolute bottom-10 self-center">
                    <Pressable
                        className="bg-white px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100"
                    >
                        <Text className="text-[16px] mr-2">💪</Text>
                        <Text className="font-bold text-[15px] text-gray-900 mr-2">Strain Score Update</Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                    </Pressable>
                </View>

                <ResourceDetailSheet ref={resourceSheetRef} />
            </View>
        </BottomSheetModalProvider>

    );
}