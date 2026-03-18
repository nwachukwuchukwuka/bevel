import { MetricFilterSheet, MetricFilterSheetRef } from '@/components/fitness/MetricFilterSheet';
import { TypeFilterSheet, TypeFilterSheetRef } from '@/components/fitness/TypeFilterSheet';
import { ACTIVITY_HISTORY } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ActivitySummaryModal() {
    const router = useRouter();
    const metricSheetRef = useRef<MetricFilterSheetRef>(null);
    const typeSheetRef = useRef<TypeFilterSheetRef>(null);

    const [metric, setMetric] = useState('duration'); // duration, distance
    const [type, setType] = useState('all');

    // Dynamic Chart Data Mock based on metric
    const chartColor = metric === 'duration' ? '#F43F5E' : '#F97316'; // Red for duration, Orange for distance
    const chartBg = metric === 'duration' ? ['rgba(244,63,94,0.2)', 'rgba(244,63,94,0)'] : ['rgba(249,115,22,0.2)', 'rgba(249,115,22,0)'];
    const chartVal = metric === 'duration' ? '15h 47m' : '33,8 km';

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F9FAFB]">
                {/* Modal Drag Handle area */}
                <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                    <View className="px-5 pt-4">
                        <View className="flex-row items-center gap-2 mb-6">
                            <Ionicons name="bar-chart" size={18} color="#9CA3AF" />
                            <Text className="text-[16px] font-bold text-gray-500">Activity Summary</Text>
                        </View>

                        <View className="flex-row justify-between items-end mb-6">
                            <View>
                                <Text className="text-[32px] font-bold text-gray-900 tracking-tight">{chartVal}</Text>
                                <View className="flex-row items-center gap-1 mt-1">
                                    <View className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    <Text className="text-[11px] font-bold text-gray-500">14 Sep 2025</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text className="text-[16px] font-bold text-gray-900">16h 20m</Text>
                                <View className="flex-row items-center gap-1 mt-1">
                                    <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    <Text className="text-[11px] font-bold text-gray-500">14 Aug 2025</Text>
                                </View>
                            </View>
                        </View>

                        {/* Top Filters */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                            <TouchableOpacity onPress={() => metricSheetRef.current?.present()} className="flex-row items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm mr-2">
                                <Ionicons name={metric === 'duration' ? 'time-outline' : 'location-outline'} size={16} color="#4B5563" />
                                <Ionicons name="chevron-down" size={12} color="#4B5563" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white border border-gray-200 rounded-full w-8 h-8 items-center justify-center shadow-sm mr-2">
                                <Ionicons name="list" size={16} color="#4B5563" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => typeSheetRef.current?.present()} className={`rounded-full px-4 py-1.5 justify-center mr-2 ${type === 'all' ? 'bg-[#111827]' : 'bg-gray-100'}`}>
                                <Text className={`text-[13px] font-bold ${type === 'all' ? 'text-white' : 'text-gray-500'}`}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setType('strength'); typeSheetRef.current?.present(); }} className={`rounded-full px-4 py-1.5 justify-center mr-2 ${type === 'strength' ? 'bg-[#111827]' : 'bg-gray-100'}`}>
                                <Text className={`text-[13px] font-bold ${type === 'strength' ? 'text-white' : 'text-gray-500'}`}>Strength Training</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-100 rounded-full px-4 py-1.5 justify-center mr-2"><Text className="text-[13px] font-bold text-gray-500">Mixed Cardio</Text></TouchableOpacity>
                        </ScrollView>

                        {/* Line Chart Mock */}
                        <View className="h-56 relative justify-end pb-6 border-b-2 border-emerald-400 mb-6">
                            <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0 opacity-40">
                                <Text className="text-[10px] font-bold text-gray-400">39</Text>
                                <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">26</Text>
                                <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">13</Text>
                                <Text className="text-[10px] font-bold text-gray-400">0</Text>
                            </View>
                            <View className="absolute bottom-6 left-0 right-6 top-0 overflow-hidden z-0">
                                <LinearGradient colors={chartBg as [string, string]} style={{ width: '100%', height: '100%' }} />
                            </View>
                            {/* Line Mock (Step progression visual) */}
                            <View className="absolute bottom-6 left-0 right-10 h-32 flex-row items-end">
                                <View className="flex-1 h-[20%] border-t-2" style={{ borderColor: chartColor }} />
                                <View className="flex-1 h-[40%] border-t-2 border-l-2" style={{ borderColor: chartColor }} />
                                <View className="flex-1 h-[60%] border-t-2 border-l-2" style={{ borderColor: chartColor }} />
                                <View className="flex-1 h-[80%] border-t-2 border-l-2 relative" style={{ borderColor: chartColor }}>
                                    <View className={`absolute -right-1 -top-1.5 w-3 h-3 rounded-full border-2 border-white`} style={{ backgroundColor: chartColor }} />
                                    <View className={`absolute -right-3 -top-3 w-7 h-7 rounded-full opacity-30`} style={{ backgroundColor: chartColor }} />
                                </View>
                            </View>
                            {/* Gray comparison line */}
                            <View className="absolute bottom-6 left-0 right-10 h-20 flex-row items-end opacity-50">
                                <View className="flex-1 h-[20%] border-t-2 border-gray-400" />
                                <View className="flex-1 h-[30%] border-t-2 border-l-2 border-gray-400" />
                                <View className="flex-1 h-[60%] border-t-2 border-l-2 border-gray-400" />
                                <View className="flex-1 h-[70%] border-t-2 border-l-2 border-gray-400 relative">
                                    <View className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-gray-400" />
                                </View>
                            </View>
                        </View>
                        <View className="flex-row justify-between pr-8 mb-6">
                            <Text className="text-[10px] font-bold text-gray-400">15 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">23 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">30 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">7 Sep</Text>
                            <Text className="text-[10px] font-bold text-gray-400">14 Sep</Text>
                        </View>

                        {/* Timeframe Selector */}
                        <View className="flex-row items-center justify-between mb-8">
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-back" size={16} color="#9CA3AF" /></TouchableOpacity>
                            <View className="flex-row items-center gap-1">
                                {['1M', '3M', '6M', '1Y'].map(t => (
                                    <TouchableOpacity key={t} className={`w-10 h-8 items-center justify-center rounded-full ${t === '1M' ? 'bg-white border border-gray-200 shadow-sm' : ''}`}>
                                        <Text className={`text-[12px] font-bold ${t === '1M' ? 'text-gray-900' : 'text-gray-400'}`}>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View className="flex-row gap-2">
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="calendar-outline" size={14} color="#9CA3AF" /></TouchableOpacity>
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* History List */}
                    <View className="px-5 pb-10">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-[16px] font-bold text-gray-900">Activity History</Text>
                            <TouchableOpacity><Ionicons name="add" size={20} color="#9CA3AF" /></TouchableOpacity>
                        </View>
                        <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">September 2025</Text>
                        <View className="gap-3">
                            {ACTIVITY_HISTORY.map((activity, idx) => (
                                <View key={idx} className="flex-row items-center justify-between bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm shadow-black/5">
                                    <View className="flex-row items-center gap-4">
                                        <View className="w-12 h-12 bg-orange-50 rounded-[14px] border border-orange-100 items-center justify-center relative">
                                            <Ionicons name={activity.icon as any} size={24} color={activity.color} />
                                            <View className="absolute -bottom-1 -right-1 bg-yellow-100 border border-white rounded-full px-1">
                                                <Text className="text-[9px] font-bold text-yellow-600">{activity.score}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text className="font-bold text-[15px] text-gray-900">{activity.title}</Text>
                                            <Text className="text-[12px] font-medium text-gray-400">{activity.time}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="arrow-forward" size={18} color="#D1D5DB" />
                                </View>
                            ))}
                        </View>
                    </View>

                </ScrollView>

                {/* Floating "Stronger, longer!" Pill */}
                <View className="absolute bottom-10 self-center">
                    <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
                        <Text className="text-[16px] mr-2">📈</Text>
                        <Text className="font-bold text-[14px] text-gray-900 mr-2">{metric === 'duration' ? 'Stronger, longer!' : 'Big Strides!'}</Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                <MetricFilterSheet ref={metricSheetRef} selectedMetric={metric} onSelect={setMetric} />
                <TypeFilterSheet ref={typeSheetRef} selectedType={type} onSelect={setType} />
            </View>
        </BottomSheetModalProvider>
    );
}