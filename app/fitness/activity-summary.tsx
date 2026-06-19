import { MetricFilterSheet, MetricFilterSheetRef } from '@/components/fitness/MetricFilterSheet';
import { TypeFilterSheet, TypeFilterSheetRef } from '@/components/fitness/TypeFilterSheet';
import { ACTIVITY_HISTORY } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ActivitySummaryModal() {
    const router = useRouter();
    const metricSheetRef = useRef<MetricFilterSheetRef>(null);
    const typeSheetRef = useRef<TypeFilterSheetRef>(null);

    const [metric, setMetric] = useState('duration');
    const [type, setType] = useState('all');

    const chartColor = metric === 'duration' ? '#F43F5E' : '#F97316';
    const chartVal = metric === 'duration' ? '15h 47m' : '33.8 km';

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                {/* Custom Modal Handle */}
                <View className="items-center py-3">
                    <View className="w-10 h-1 bg-[#1E293B] rounded-full" />
                </View>

                {/* Custom Header */}
                <View className="px-5 pb-5 flex-row items-center justify-between border-b border-[#1E293B]">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E1E1E] rounded-xl items-center justify-center border border-[#2D3748]">
                            <Ionicons name="bar-chart-outline" size={18} color="#4DB9F2" />
                        </View>
                        <Text className="text-xl font-bold text-slate-100">Activity summary</Text>
                    </View>
                </View>

                {/* Timeframe Selector (Positioned at the top for radical structural shift) */}
                <View className="px-5 py-4 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                    <View className="flex-row gap-2 bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                        {['1M', '3M', '6M', '1Y'].map((t) => {
                            const isActive = t === '1M';
                            return (
                                <TouchableOpacity
                                    key={t}
                                    className={`px-3 py-1.5 rounded-lg border ${isActive ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'border-transparent'
                                        }`}
                                >
                                    <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {t}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Top Filters (Directly below Timeframe) */}
                <View className="px-5 py-3 border-b border-[#1E293B] bg-[#090D16]">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        <TouchableOpacity
                            onPress={() => metricSheetRef.current?.present()}
                            activeOpacity={0.7}
                            className="flex-row items-center gap-1.5 bg-[#1E1E1E] border border-[#2C2C2C] rounded-xl px-3 py-2"
                        >
                            <Ionicons name={metric === 'duration' ? 'time-outline' : 'location-outline'} size={14} color="#4DB9F2" />
                            <Ionicons name="chevron-down" size={10} color="#4DB9F2" />
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#1E1E1E] border border-[#2C2C2C] rounded-xl w-9 h-9 items-center justify-center">
                            <Ionicons name="list" size={14} color="#94A3B8" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setType('all')}
                            activeOpacity={0.7}
                            className={`rounded-xl px-4 py-2 justify-center border ${type === 'all' ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#1E1E1E] border-[#2C2C2C]'
                                }`}
                        >
                            <Text className={`text-xs font-semibold ${type === 'all' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setType('strength')}
                            activeOpacity={0.7}
                            className={`rounded-xl px-4 py-2 justify-center border ${type === 'strength' ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#1E1E1E] border-[#2C2C2C]'
                                }`}
                        >
                            <Text className={`text-xs font-semibold ${type === 'strength' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Strength</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                    {/* Highly Structured Technical Chart Panel */}
                    <View className="mx-5 mt-6 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-sm font-semibold text-slate-400">Target metrics chart</Text>
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartColor }} />
                                <Text className="text-xs text-slate-400">Activity index</Text>
                            </View>
                        </View>

                        <View className="h-44 relative justify-end mt-4">
                            {/* Flat scale lines */}
                            <View className="absolute inset-0 justify-between">
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">39 max</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">26 avg</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">0 min</Text></View>
                            </View>

                            {/* Solid bar chart readout */}
                            <View className="absolute bottom-0 left-0 right-0 h-32 flex-row items-end justify-between gap-[3px]">
                                {Array.from({ length: 18 }).map((_, i) => {
                                    const height = Math.max(15, Math.random() * 90);
                                    const isTarget = i === 14; // Highlight current point
                                    return (
                                        <View key={i} className="flex-1 flex-col items-center">
                                            <View
                                                className="w-full rounded-t-sm"
                                                style={{ height: `${height}%`, backgroundColor: isTarget ? chartColor : '#2C2C2C' }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-4 pt-3 border-t border-[#1E293B]">
                            <Text className="text-[10px] font-bold text-slate-500">15 Aug</Text>
                            <Text className="text-[10px] font-bold text-slate-500">30 Aug</Text>
                            <Text className="text-[10px] font-bold text-slate-500">14 Sep</Text>
                        </View>
                    </View>

                    {/* Integrated Summary Card (Positioned below the chart for layout difference) */}
                    <View className="mx-5 mt-4 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                        <View className="flex-col">
                            <Text className="text-xs text-slate-400 mb-1">Current period</Text>
                            <Text className="text-2xl font-bold text-white">{chartVal}</Text>
                            <Text className="text-[10px] text-[#4DB9F2] mt-1">14 Sep 2025</Text>
                        </View>
                        <View className="h-8 w-[1px] bg-[#1E293B]" />
                        <View className="flex-col items-end">
                            <Text className="text-xs text-slate-400 mb-1">Previous period</Text>
                            <Text className="text-2xl font-bold text-slate-300">16h 20m</Text>
                            <Text className="text-[10px] text-slate-500 mt-1">14 Aug 2025</Text>
                        </View>
                    </View>

                    {/* Integrated Success Tag Indicator */}
                    <View className="mx-5 mt-4 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-4 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-lg bg-emerald-500/10 items-center justify-center">
                                <Ionicons name="trending-up" size={16} color="#10B981" />
                            </View>
                            <Text className="text-sm font-semibold text-white">
                                {metric === 'duration' ? 'Stronger, longer!' : 'Big strides!'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#10B981" />
                    </View>

                    {/* Activity History List (Modular Grid Cards) */}
                    <View className="px-5 mt-8 mb-24">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-white">Activity history</Text>
                            <TouchableOpacity className="w-8 h-8 bg-[#1E1E1E] border border-[#2C2C2C] rounded-lg items-center justify-center">
                                <Ionicons name="add" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-xs font-semibold text-slate-400 mb-4 pl-1">September 2025</Text>

                        <View className="gap-3">
                            {ACTIVITY_HISTORY.map((activity, idx) => (
                                <View key={idx} className="bg-[#151E33] border border-[#1E293B] p-4 rounded-2xl flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-4 flex-1">
                                        <View className="w-12 h-12 bg-[#1E1E1E] rounded-xl border border-[#2D3748] items-center justify-center relative">
                                            <Ionicons name={activity.icon as any} size={22} color={activity.color} />
                                            <View className="absolute -bottom-1.5 -right-1.5 bg-[#090D16] border border-[#1D2432] rounded-lg px-1.5 py-0.5">
                                                <Text className="text-[9px] font-bold text-orange-500">{activity.score}</Text>
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="font-bold text-base text-white">{activity.title}</Text>
                                            <Text className="text-xs text-slate-400 mt-1">{activity.time}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2C2C2C] items-center justify-center">
                                        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                </ScrollView>

                <MetricFilterSheet ref={metricSheetRef} selectedMetric={metric} onSelect={setMetric} />
                <TypeFilterSheet ref={typeSheetRef} selectedType={type} onSelect={setType} />
            </View>
        </BottomSheetModalProvider>
    );
}