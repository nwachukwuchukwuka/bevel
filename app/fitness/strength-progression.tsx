import { STRENGTH_PROGRESSION } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function StrengthProgressionModal() {
    return (
        <View className="flex-1 bg-[#090D16]">

            {/* Custom Modal Handle */}
            <View className="items-center py-3">
                <View className="w-10 h-1 bg-[#1E293B] rounded-full" />
            </View>

            {/* Custom Header */}
            <View className="px-5 pb-5 flex-row items-center justify-between border-b border-[#1E293B]">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-[#1E1E1E] rounded-xl items-center justify-center border border-[#2D3748]">
                        <Ionicons name="barbell-outline" size={18} color="#4DB9F2" />
                    </View>
                    <Text className="text-xl font-bold text-slate-100">Strength progression</Text>
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

            {/* Filters Area (Directly below Timeframe) */}
            <View className="px-5 py-3 border-b border-[#1E293B] bg-[#090D16]">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    <TouchableOpacity className="flex-row items-center gap-1.5 bg-[#1E1E1E] border border-[#2C2C2C] rounded-xl px-3 py-2">
                        <Ionicons name="filter-outline" size={14} color="#4DB9F2" />
                        <Ionicons name="chevron-down" size={10} color="#4DB9F2" />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-[#1E1E1E] border border-[#2C2C2C] rounded-xl w-9 h-9 items-center justify-center">
                        <Ionicons name="list" size={14} color="#94A3B8" />
                    </TouchableOpacity>

                    <TouchableOpacity className="rounded-xl px-4 py-2 justify-center border bg-[#1E293B] border-[#4DB9F2]">
                        <Text className="text-xs font-semibold text-[#4DB9F2]">All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="rounded-xl px-4 py-2 justify-center border bg-[#1E1E1E] border-[#2C2C2C] flex-row items-center gap-1.5">
                        <Ionicons name="barbell-outline" size={12} color="#A0A0A0" />
                        <Text className="text-xs font-semibold text-slate-400">Bench Press</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="rounded-xl px-4 py-2 justify-center border bg-[#1E1E1E] border-[#2C2C2C] flex-row items-center gap-1.5">
                        <Ionicons name="barbell-outline" size={12} color="#A0A0A0" />
                        <Text className="text-xs font-semibold text-slate-400">Back Squat</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Highly Structured Technical Chart Panel */}
                <View className="mx-5 mt-6 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-sm font-semibold text-slate-400">Muscular progression chart</Text>
                        <View className="flex-row items-center gap-1.5">
                            <View className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <Text className="text-xs text-slate-400">Strength load index</Text>
                        </View>
                    </View>

                    <View className="h-44 relative justify-end mt-4">
                        {/* Flat scale lines */}
                        <View className="absolute inset-0 justify-between">
                            <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">16,8k max</Text></View>
                            <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">11,2k avg</Text></View>
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
                                            style={{ height: `${height}%`, backgroundColor: isTarget ? '#F59E0B' : '#2C2C2C' }}
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

                {/* Integrated Summary Card (Positioned below the chart for layout difference) */}
                <View className="mx-5 mt-4 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                    <View className="flex-col">
                        <Text className="text-xs text-slate-400 mb-1">Current load</Text>
                        <Text className="text-2xl font-bold text-white">15.306 kg</Text>
                        <Text className="text-[10px] text-[#4DB9F2] mt-1">14 Sep 2025</Text>
                    </View>
                    <View className="h-8 w-[1px] bg-[#1E293B]" />
                    <View className="flex-col items-end">
                        <Text className="text-xs text-slate-400 mb-1">Previous load</Text>
                        <Text className="text-2xl font-bold text-slate-300">0 kg</Text>
                        <Text className="text-[10px] text-slate-500 mt-1">14 Aug 2025</Text>
                    </View>
                </View>

                {/* Integrated Success Tag Indicator */}
                <View className="mx-5 mt-4 bg-amber-950/20 border border-amber-500/10 rounded-2xl p-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <View className="w-8 h-8 rounded-lg bg-amber-500/10 items-center justify-center">
                            <Ionicons name="trending-up" size={16} color="#F59E0B" />
                        </View>
                        <Text className="text-sm font-semibold text-white">Stronger than ever!</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#F59E0B" />
                </View>

                {/* Exercises List (Modular Grid Cards) */}
                <View className="px-5 mt-8 mb-24">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-white">Exercises breakdown</Text>
                        <TouchableOpacity className="w-8 h-8 bg-[#1E1E1E] border border-[#2C2C2C] rounded-lg items-center justify-center">
                            <Ionicons name="add" size={16} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="gap-3">
                        {STRENGTH_PROGRESSION.map((ex, idx) => (
                            <View key={ex.id} className="bg-[#151E33] border border-[#1E293B] p-4 rounded-2xl flex-row justify-between items-center">
                                <View className="flex-row items-center gap-4 flex-1">
                                    <View className="w-12 h-12 bg-[#1E1E1E] rounded-xl border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="barbell-outline" size={22} color="#F59E0B" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-base text-white">{ex.name}</Text>
                                        <Text className="text-xs text-slate-400 mt-1">{ex.type} • {ex.sessions} sessions</Text>
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
        </View>
    );
}