import { WEIGHT_TRENDS_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function WeightModal() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#090D16]">

            {/* Custom Modal Handle */}
            <View className="items-center py-3">
                <View className="w-10 h-1 bg-[#1E293B] rounded-full" />
            </View>

            {/* Custom Header */}
            <View className="px-5 pb-5 flex-row items-center justify-between border-b border-[#1E293B]">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                        <Ionicons name="scale-outline" size={18} color="#4DB9F2" />
                    </View>
                    <Text className="text-xl font-bold text-slate-100">Weight analytics</Text>
                </View>
            </View>

            {/* Timeframe Selector (Positioned at the top for radical structural shift) */}
            <View className="px-5 py-4 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                <View className="flex-row gap-2 bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                    {['1M', '3M', '6M', '1Y'].map((item) => {
                        const isActive = item === '1M';
                        return (
                            <TouchableOpacity
                                key={item}
                                className={`px-3 py-1.5 rounded-lg border ${isActive ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                    }`}
                            >
                                <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View className="flex-row gap-2">
                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                        <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                        <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

                {/* Integrated Summary Card */}
                <View className="mx-5 mt-6 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                    <View className="flex-row items-center gap-4">
                        <View className="bg-emerald-950/20 w-12 h-12 rounded-xl items-center justify-center border border-emerald-500/20">
                            <Ionicons name="trending-down" size={24} color="#10B981" />
                        </View>
                        <View>
                            <Text className="text-3xl font-bold text-slate-100">61.0 kg</Text>
                            <Text className="text-xs text-slate-400 mt-0.5">Recorded on 8 Sep 2025</Text>
                        </View>
                    </View>
                    <View className="bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                        <Text className="text-xs font-bold text-[#10B981]">Decreasing</Text>
                    </View>
                </View>

                {/* Highly Structured Technical Chart Panel */}
                <View className="mx-5 mt-4 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-sm font-semibold text-slate-400">Biological trends</Text>
                        <View className="flex-row items-center gap-1.5">
                            <View className="w-2.5 h-2.5 rounded-full bg-[#4DB9F2]" />
                            <Text className="text-xs text-slate-400">Weight baseline</Text>
                        </View>
                    </View>

                    <View className="h-44 relative justify-end mt-4">
                        {/* Flat scale lines */}
                        <View className="absolute inset-0 justify-between">
                            <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">63 kg</Text></View>
                            <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">62 kg</Text></View>
                            <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">61 kg</Text></View>
                        </View>

                        {/* Solid bar chart readout */}
                        <View className="absolute bottom-0 left-0 right-0 h-32 flex-row items-end justify-between gap-[3px]">
                            {Array.from({ length: 18 }).map((_, i) => {
                                const height = Math.max(15, Math.random() * 90);
                                const isTarget = i === 14; // Highlight current point
                                return (
                                    <View key={i} className="flex-1 flex-col items-center">
                                        <View
                                            className={`w-full rounded-t-sm ${isTarget ? 'bg-[#10B981]' : 'bg-[#4DB9F2] opacity-40'}`}
                                            style={{ height: `${height}%` }}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <View className="flex-row justify-between mt-4 pt-3 border-t border-[#1E293B]">
                        <Text className="text-[10px] font-bold text-slate-500">9 Aug</Text>
                        <Text className="text-[10px] font-bold text-slate-500">24 Aug</Text>
                        <Text className="text-[10px] font-bold text-slate-500">8 Sep</Text>
                    </View>
                </View>

                {/* Staggered Telemetry Breakdown Grid */}
                <View className="px-5 mt-8 gap-4">
                    <Text className="text-lg font-bold text-white mb-2">Telemetry breakdown</Text>

                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] p-4 rounded-xl">
                            <Text className="text-xs text-slate-500 font-semibold mb-1">Last weight trend</Text>
                            <Text className="text-xl font-bold text-white">62.0 kg</Text>
                        </View>
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] p-4 rounded-xl">
                            <Text className="text-xs text-slate-500 font-semibold mb-1">30-day projection</Text>
                            <Text className="text-xl font-bold text-[#10B981]">61.0 kg</Text>
                        </View>
                    </View>

                    {/* Compact Telemetry Row Cards */}
                    <View className="gap-3 mb-10">
                        {WEIGHT_TRENDS_ANALYSIS.map((item, idx) => (
                            <View key={idx} className="bg-[#151E33] border border-[#1E293B] p-4 rounded-xl flex-row justify-between items-center">
                                <View className="flex-row items-center gap-3">
                                    <Ionicons name="calendar-outline" size={16} color="#4DB9F2" />
                                    <Text className="text-sm font-semibold text-white">{item.period}</Text>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <View className="bg-emerald-950/20 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex-row items-center gap-1">
                                        {item.icon !== 'remove-circle' && <Ionicons name={item.icon as any} size={12} color="#10B981" />}
                                        <Text className="text-xs font-bold text-[#10B981]">{item.change}</Text>
                                    </View>
                                    <View className="w-12 h-6 bg-[#1E293B] border border-[#2D3748] rounded-md items-center justify-center">
                                        <Ionicons name="pulse" size={14} color="#4DB9F2" />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}