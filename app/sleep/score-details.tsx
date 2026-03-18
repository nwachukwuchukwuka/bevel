import { ResourceDetailSheet, ResourceDetailSheetRef } from '@/components/sleep/ResourceDetailSheet';
import { SLEEP_ANALYSIS, TIME_ASLEEP_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const TABS = ['Sleep Score', 'Time Asleep', 'REM Sleep', 'Deep Sleep'];

export default function SleepScoreDetails() {
    const router = useRouter();
    const { initialTab } = useLocalSearchParams<{ initialTab: string }>();
    
    const [selectedTab, setSelectedTab] = useState(initialTab || 'Sleep Score');
    const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

    useEffect(() => {
        if (initialTab && TABS.includes(initialTab)) {
            setSelectedTab(initialTab);
        }
    }, [initialTab]);

    const resourceSheetRef = useRef<ResourceDetailSheetRef>(null);
    const CHART_DATA = [45, 60, 50, 40, 65, 75, 55, 67, 82, 60, 40, 50, 65, 70, 75, 67];

    const isSleepScore = selectedTab === 'Sleep Score';
    const analysisData = isSleepScore ? SLEEP_ANALYSIS : TIME_ASLEEP_ANALYSIS;
    const value = isSleepScore ? '67' : '7h 26m';
    const unit = isSleepScore ? '%' : '';
    const range = isSleepScore ? '43 - 82%' : '4h 19m - 8h 30m';


    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#181B28]">
                {/* Modal Header */}
                <View className="px-5 py-4 flex-row items-center justify-between border-b border-[#2A3047] bg-[#181B28]">
                    <View className="w-8" />
                    <Text className="text-[16px] font-semibold text-white">{selectedTab}</Text>
                    <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-[#2A3047] rounded-full items-center justify-center">
                        <Ionicons name="close" size={18} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    <View className="flex-row items-center gap-2 mb-2">
                        <Ionicons name={isSleepScore ? "moon" : "time"} size={18} color="#9CA3AF" />
                        <Text className="text-[15px] font-semibold text-gray-400">{selectedTab}</Text>
                    </View>

                    <View className="flex-row justify-between items-end mb-6">
                        <View>
                            <Text className="text-[42px] font-semibold text-white tracking-tighter leading-none">
                                {value}<Text className="text-[20px]">{unit}</Text>
                            </Text>
                            <Text className="text-[13px] font-medium text-gray-500 mt-2">14 Sep 2025</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-[13px] font-semibold text-green-400 mb-1">Normal range</Text>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="menu" size={14} color="#6B7280" />
                                <Text className="text-[12px] font-semibold text-gray-400">{range}</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mb-8 overflow-visible">
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                className={`px-4 py-2 rounded-full border ${selectedTab === tab ? 'bg-[#2A3047] border-[#3B82F6]' : 'bg-[#1F2437] border-transparent'}`}
                            >
                                <Text className={`text-[11px] font-semibold ${selectedTab === tab ? 'text-white' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="mb-10">
                        <View className="h-56 relative justify-end pb-6 border-b border-gray-700">

                            {/* Y-Axis Labels (Background) */}
                            <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0">
                                <Text className="text-[10px] font-medium text-gray-600">100</Text>
                                <Text className="text-[10px] font-medium text-gray-600">72</Text>
                                <Text className="text-[10px] font-medium text-gray-600">44</Text>
                                <Text className="text-[10px] font-medium text-gray-600">16</Text>
                            </View>

                            {/* Background Fill Gradient */}
                            <View className="absolute bottom-6 left-0 right-6 top-0 overflow-hidden z-0 rounded-t-xl">
                                <LinearGradient
                                    colors={['rgba(129, 140, 248, 0.15)', 'rgba(129, 140, 248, 0)']}
                                    className="w-full h-full"
                                />
                            </View>

                            {/* Dotted Average Line */}
                            <View className="absolute left-0 right-6 top-[45%] border-b border-dashed border-indigo-400/50 z-10" />
                            <View className="absolute left-[35%] top-[45%] -translate-y-3 bg-indigo-500 px-2 py-0.5 rounded-full z-20">
                                <Text className="text-[10px] font-semibold text-white">Avg. {isSleepScore ? '62%' : '6h 24m'}</Text>
                            </View>

                            {/* Data Points (Solid path line) */}
                            <View className="flex-row items-end justify-between pr-8 z-20 h-full relative">
                                {CHART_DATA.map((val, idx) => {
                                    const isLast = idx === CHART_DATA.length - 1;
                                    return (
                                        <View key={idx} className="items-center w-[4px]" style={{ height: `${val}%` }}>
                                            <View className="w-[1.5px] flex-1 bg-indigo-400" />
                                            <View className={`w-2 h-2 rounded-full border bg-white absolute top-0 ${isLast ? 'border-indigo-500 w-2.5 h-2.5' : 'border-indigo-400'}`} />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        {/* X-Axis Labels */}
                        <View className="flex-row justify-between pr-8 mt-2 mb-6">
                            <Text className="text-[10px] font-medium text-gray-500">15 Aug</Text>
                            <Text className="text-[10px] font-medium text-gray-500">22 Aug</Text>
                            <Text className="text-[10px] font-medium text-gray-500">30 Aug</Text>
                            <Text className="text-[10px] font-medium text-gray-500">6 Sep</Text>
                            <Text className="text-[10px] font-medium text-gray-500">14 Sep</Text>
                        </View>

                        {/* Timeframe Selector */}
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-[#2A3047] items-center justify-center">
                                <Ionicons name="chevron-back" size={16} color="white" />
                            </TouchableOpacity>

                            <View className="flex-row items-center gap-1">
                                {['1M', '3M', '6M', '1Y'].map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setSelectedTimeframe(time)}
                                        className={`w-10 h-8 items-center justify-center rounded-full ${selectedTimeframe === time ? 'bg-[#2A3047]' : ''}`}
                                    >
                                        <Text className={`text-[12px] font-semibold ${selectedTimeframe === time ? 'text-white' : 'text-gray-500'}`}>{time}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View className="flex-row gap-2">
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-[#2A3047] items-center justify-center">
                                    <Ionicons name="calendar-outline" size={14} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-[#2A3047] items-center justify-center">
                                    <Ionicons name="chevron-forward" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {isSleepScore ? (
                        <>
                            {/* Sleep Breakdown */}
                            <Text className="text-[15px] font-semibold text-white mb-4">Sleep Breakdown</Text>
                            <View className="flex-row h-3 rounded-full overflow-hidden mb-4">
                                <View className="bg-indigo-300 h-full" style={{ width: '70%' }} />
                                <View className="bg-indigo-500 h-full border-l border-[#181B28]" style={{ width: '15%' }} />
                                <View className="bg-purple-500 h-full border-l border-[#181B28]" style={{ width: '15%' }} />
                            </View>
                            <View className="gap-2 mb-8">
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-indigo-300" /><Text className="text-[12px] font-medium text-white">Low <Text className="text-gray-500">&lt;70.0%</Text></Text></View>
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-indigo-500" /><Text className="text-[12px] font-medium text-white">Normal <Text className="text-gray-500">70.0% - 85.0%</Text></Text></View>
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-purple-500" /><Text className="text-[12px] font-medium text-white">Optimal <Text className="text-gray-500">&gt;85.0%</Text></Text></View>
                            </View>
                        </>
                    ) : (
                        <>
                            {/* Weekly sleep distribution */}
                            <Text className="text-[15px] font-semibold text-white mb-4">Weekly sleep distribution</Text>
                            <View className="flex-row justify-between items-end h-16 mb-2 px-2">
                                {[40, 20, 60, 30, 80, 50, 70].map((h, i) => (
                                    <View key={i} className={`w-[12%] rounded-t-md ${h > 50 ? 'bg-indigo-400' : 'bg-indigo-900/40'}`} style={{ height: h }} />
                                ))}
                            </View>
                            <View className="flex-row justify-between px-2 mb-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                    <Text key={d} className="text-[10px] font-medium text-gray-500 w-[12%] text-center">{d}</Text>
                                ))}
                            </View>
                            <View className="flex-row gap-4 mb-8">
                                <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-indigo-400" /><Text className="text-[11px] text-gray-500">More sleep</Text></View>
                                <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-indigo-900/40" /><Text className="text-[11px] text-gray-500">Less sleep</Text></View>
                            </View>
                        </>
                    )}

                    {/* Trends Analysis */}
                    <Text className="text-[15px] font-semibold text-white mb-1">Trends Analysis</Text>
                    <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 14 Sep 2025</Text>

                    <View className="bg-[#22273B] rounded-[20px] p-2 border border-[#2A3047] mb-2">
                        <View className="flex-row justify-between px-4 py-3 border-b border-[#2A3047]">
                            <Text className="text-[11px] font-semibold text-gray-500 w-1/3">Period</Text>
                            <Text className="text-[11px] font-semibold text-gray-500 w-1/3 text-center">Change</Text>
                            <Text className="text-[11px] font-semibold text-gray-500 w-1/3 text-right">Trend</Text>
                        </View>
                        {analysisData.map((item, idx) => (
                            <View key={idx} className={`flex-row items-center justify-between px-4 py-4 ${idx !== analysisData.length - 1 ? 'border-b border-[#2A3047]' : ''}`}>
                                <Text className="text-[13px] font-semibold text-gray-400 w-1/3">{item.period}</Text>
                                <View className="w-1/3 items-center flex-row justify-center gap-1">
                                    <Ionicons name={item.trend === 'down' ? 'arrow-down-circle' : 'arrow-up-circle'} size={14} color={item.trend === 'down' ? '#F97316' : '#818CF8'} />
                                    <Text className={`text-[13px] font-semibold ${item.trend === 'down' ? 'text-orange-500' : 'text-indigo-400'}`}>{item.change}</Text>
                                </View>
                                <View className="w-1/3 items-end justify-center">
                                     <View className="w-12 h-4 items-end justify-end"><Ionicons name="pulse" size={18} color={item.trend === 'down' ? '#F97316' : '#818CF8'} /></View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text className="text-center text-[10px] text-gray-600 mb-8">Based on 7-day rolling averages for the select period.</Text>

                    {/* Resources */}
                    <Text className="text-[15px] font-semibold text-white mb-4">Resources</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible">
                        <TouchableOpacity
                            onPress={() => resourceSheetRef.current?.present()}
                            activeOpacity={0.8}
                            className="w-[240px] mr-4"
                        >
                            <View className="h-[140px] bg-[#22273B] rounded-[24px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative border border-[#2A3047]">
                                <LinearGradient colors={['rgba(99, 102, 241, 0.4)', 'rgba(99, 102, 241, 0)']} className="absolute inset-0" />
                                <Text className="text-white font-semibold text-[18px] mt-auto">Sleep Score</Text>
                                <View className="w-10 h-10 bg-[#181B28] rounded-full items-center justify-center border-2 border-[#2A3047]">
                                    <Ionicons name="moon" size={20} color="#818CF8" />
                                </View>
                            </View>
                            <Text className="text-[14px] font-semibold text-white mb-1">What is Sleep Score?</Text>
                            <Text className="text-[12px] font-medium text-gray-500 leading-4">Understand the quality and duration of your rest...</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-[240px]">
                            <View className="h-[140px] bg-[#22273B] rounded-[24px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative border border-[#2A3047]">
                                <LinearGradient colors={['rgba(168, 85, 247, 0.3)', 'rgba(168, 85, 247, 0)']} className="absolute inset-0" />
                                <Text className="text-white font-semibold text-[18px] mt-auto">Sleep Hygiene</Text>
                            </View>
                            <Text className="text-[14px] font-semibold text-white mb-1">The Basics: Sleep</Text>
                            <Text className="text-[12px] font-medium text-gray-500 leading-4">Tips for improving your sleep environment and habits...</Text>
                        </TouchableOpacity>
                    </ScrollView>

                </ScrollView>

                <View className="absolute bottom-10 self-center rounded-full overflow-hidden border border-[#3A415C]">
                    <BlurView intensity={20} tint="dark" className="px-5 py-3 flex-row items-center bg-[#2A3047]/40">
                         <Ionicons name="analytics" size={16} color="#818CF8" className="mr-2" />
                        <Text className="font-semibold text-[14px] text-white">
                            {isSleepScore ? 'Sleep Score Trending Down' : 'Sleep Check-in'}
                        </Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" className="ml-2" />
                    </BlurView>
                </View>

                <ResourceDetailSheet ref={resourceSheetRef} title={selectedTab} />
            </View>
        </BottomSheetModalProvider>

    );
}
