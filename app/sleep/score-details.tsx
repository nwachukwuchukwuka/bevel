import { ResourceDetailSheet, ResourceDetailSheetRef } from '@/components/sleep/ResourceDetailSheet';
import { SLEEP_ANALYSIS, TIME_ASLEEP_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
            <View className="flex-1 bg-[#090D16]">

                <View className="px-5 pt-6 pb-6 flex-row items-center justify-between border-b border-[#1E293B] bg-[#151E33]">
                    <View>
                        <Text className="text-xl font-bold text-slate-100">{selectedTab}</Text>
                        <Text className="text-xs text-slate-400 mt-1">Telemetry analytics</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="px-5 py-4 bg-[#090D16] border-b border-[#1E293B]">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {TABS.map((tab) => {
                            const isActive = selectedTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setSelectedTab(tab)}
                                    activeOpacity={0.7}
                                    className={`px-4 py-2 rounded-lg border ${isActive
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'border-transparent'
                                        }`}
                                >
                                    <Text className={`font-semibold text-sm ${isActive ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    <View className="p-5">

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8">
                            <View className="flex-row justify-between items-center mb-6">
                                <Text className="text-sm font-semibold text-slate-400">Current baseline</Text>
                                <View className="bg-[#090D16] border border-[#1E293B] px-3 py-1.5 rounded-lg flex-row items-center gap-1.5">
                                    <Ionicons name="calendar-outline" size={12} color="#4DB9F2" />
                                    <Text className="text-[10px] font-bold text-slate-300">14 Sep 2025</Text>
                                </View>
                            </View>

                            <View className="flex-row items-baseline gap-2 mb-8">
                                <Text className="text-5xl font-bold text-white">
                                    {value}
                                </Text>
                                {unit ? <Text className="text-lg font-bold text-slate-500">{unit}</Text> : null}
                            </View>

                            <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-xl flex-row justify-between items-center mb-8">
                                <Text className="text-xs font-semibold text-slate-500">Normal range</Text>
                                <Text className="text-sm font-bold text-[#10B981]">{range}</Text>
                            </View>

                            <View className="h-44 relative justify-end mb-4 border-b border-[#2D3748] pb-1">
                                <View className="absolute inset-0 justify-between py-2">
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">100 limit</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">72 upper</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">44 median</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">16 lower</Text></View>
                                </View>

                                <View className="absolute left-0 right-0 top-[45%] border-t border-dashed border-[#4DB9F2] opacity-50 z-0" />
                                <View className="absolute left-[35%] top-[45%] -translate-y-2 bg-[#090D16] border border-[#2D3748] px-2 py-0.5 rounded flex-row items-center gap-1 z-20">
                                    <Text className="text-[10px] font-bold text-[#4DB9F2]">Avg. {isSleepScore ? '62%' : '6h 24m'}</Text>
                                </View>

                                <View className="absolute bottom-0 left-0 right-0 h-full flex-row items-end justify-between px-2 pt-2">
                                    {CHART_DATA.map((val, idx) => {
                                        const isLast = idx === CHART_DATA.length - 1;
                                        return (
                                            <View key={idx} className="items-center w-1" style={{ height: `${val}%` }}>
                                                <View className="flex-1 w-[2px] bg-[#4DB9F2] opacity-60" />
                                                <View className={`absolute top-0 w-2.5 h-2.5 rounded-full border-2 ${isLast ? 'bg-[#090D16] border-[#4DB9F2]' : 'bg-[#4DB9F2] border-[#4DB9F2]'
                                                    }`} />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-[10px] font-bold text-slate-500">15 Aug</Text>
                                <Text className="text-[10px] font-bold text-slate-500">30 Aug</Text>
                                <Text className="text-[10px] font-bold text-slate-500">14 Sep</Text>
                            </View>

                            <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B] mt-8">
                                {['1M', '3M', '6M', '1Y'].map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setSelectedTimeframe(time)}
                                        className={`flex-1 items-center justify-center py-2.5 rounded-lg border ${selectedTimeframe === time ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                            }`}
                                    >
                                        <Text className={`text-xs font-bold ${selectedTimeframe === time ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {isSleepScore ? (
                            <View className="mb-8">
                                <Text className="text-lg font-bold text-white mb-4">Score distribution limits</Text>
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                                    <View className="flex-row h-2 rounded-full overflow-hidden mb-6">
                                        <View className="bg-rose-500 flex-[7]" />
                                        <View className="bg-amber-500 flex-[1.5]" />
                                        <View className="bg-emerald-500 flex-[1.5]" />
                                    </View>
                                    <View className="gap-4">
                                        <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-rose-500" /><Text className="font-bold text-slate-200">Low</Text></View><Text className="text-slate-500 font-medium">{'<'} 70.0%</Text></View>
                                        <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-amber-500" /><Text className="font-bold text-slate-200">Normal</Text></View><Text className="text-slate-500 font-medium">70.0% - 85.0%</Text></View>
                                        <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><Text className="font-bold text-slate-200">Optimal</Text></View><Text className="text-slate-500 font-medium">{'>'} 85.0%</Text></View>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View className="mb-8">
                                <Text className="text-lg font-bold text-white mb-4">Weekly sleep distribution</Text>
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                                    <View className="flex-row justify-between items-end h-32 mb-4 border-b border-[#2D3748] pb-1">
                                        {[40, 20, 60, 30, 80, 50, 70].map((h, i) => (
                                            <View key={i} className={`w-[10%] rounded-t-sm ${h > 50 ? 'bg-[#4DB9F2]' : 'bg-[#1E293B]'}`} style={{ height: `${h}%` }} />
                                        ))}
                                    </View>
                                    <View className="flex-row justify-between mb-6">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                            <Text key={d} className="text-[10px] font-bold text-slate-500 w-[10%] text-center">{d}</Text>
                                        ))}
                                    </View>
                                    <View className="flex-row items-center gap-6 justify-center">
                                        <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-[#4DB9F2]" /><Text className="text-xs font-semibold text-slate-400">Adequate</Text></View>
                                        <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-[#1E293B]" /><Text className="text-xs font-semibold text-slate-400">Deficit</Text></View>
                                    </View>
                                </View>
                            </View>
                        )}

                        <View className="mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Trends breakdown</Text>
                            <View className="bg-[#151E33] rounded-3xl p-6 border border-[#1E293B]">
                                <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Period</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Change</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs text-right">Trend</Text>
                                </View>
                                {analysisData.map((item, idx) => (
                                    <View key={idx} className={`flex-row items-center py-4 ${idx !== analysisData.length - 1 ? 'border-b border-[#1E293B40]' : ''}`}>
                                        <Text className="flex-1 font-bold text-white text-sm">{item.period}</Text>
                                        <View className="flex-1 flex-row items-center gap-2">
                                            <Ionicons name={item.trend === 'down' ? 'arrow-down' : 'arrow-up'} size={14} color={item.trend === 'down' ? '#EF4444' : '#4DB9F2'} />
                                            <Text className={`font-bold text-sm ${item.trend === 'down' ? 'text-rose-500' : 'text-[#4DB9F2]'}`}>{item.change}</Text>
                                        </View>
                                        <View className="flex-1 items-end justify-center">
                                            <View className={`w-8 h-1 rounded-full ${item.trend === 'down' ? 'bg-rose-500' : 'bg-[#4DB9F2]'}`} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Educational resources</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                                <TouchableOpacity
                                    onPress={() => resourceSheetRef.current?.present()}
                                    activeOpacity={0.8}
                                    className="w-64 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mr-4"
                                >
                                    <View className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center mb-4">
                                        <Ionicons name="moon-outline" size={16} color="#4DB9F2" />
                                    </View>
                                    <Text className="font-bold text-slate-100 text-base mb-1">What is Sleep Score?</Text>
                                    <Text className="text-xs text-slate-400 leading-5">Understand the quality and duration of your rest metrics...</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    className="w-64 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5"
                                >
                                    <View className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center mb-4">
                                        <Ionicons name="book-outline" size={16} color="#4DB9F2" />
                                    </View>
                                    <Text className="font-bold text-slate-100 text-base mb-1">Sleep Hygiene</Text>
                                    <Text className="text-xs text-slate-400 leading-5">Tips for improving your sleep environment and daily habits...</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>

                <ResourceDetailSheet ref={resourceSheetRef} title={selectedTab} />
            </View>
        </BottomSheetModalProvider>
    );
}