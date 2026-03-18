import { STRENGTH_PROGRESSION } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function StrengthProgressionModal() {
    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                <View className="flex-row items-center gap-2 mb-4">
                    <Ionicons name="barbell" size={18} color="#9CA3AF" />
                    <Text className="text-[16px] font-bold text-gray-500">Strength Progression</Text>
                </View>

                <View className="flex-row justify-between items-end mb-6">
                    <View>
                        <Text className="text-[12px] font-medium text-gray-500 mb-1">All exercises</Text>
                        <Text className="text-[32px] font-bold text-gray-900 tracking-tight">15.306 kg</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <Text className="text-[11px] font-bold text-gray-500">14 Sep 2025</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className="text-[16px] font-bold text-gray-900">0 kg</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <Text className="text-[11px] font-bold text-gray-500">14 Aug 2025</Text>
                        </View>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                    <TouchableOpacity className="flex-row items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm mr-2">
                        <Ionicons name="filter" size={14} color="#4B5563" />
                        <Ionicons name="chevron-down" size={12} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white border border-gray-200 rounded-full w-8 h-8 items-center justify-center shadow-sm mr-2"><Ionicons name="list" size={16} color="#4B5563" /></TouchableOpacity>
                    <TouchableOpacity className="rounded-full px-4 py-1.5 justify-center mr-2 bg-[#111827]"><Text className="text-[13px] font-bold text-white">All</Text></TouchableOpacity>
                    <TouchableOpacity className="bg-gray-100 rounded-full px-4 py-1.5 justify-center mr-2 flex-row items-center gap-1"><Ionicons name="barbell" size={12} color="#9CA3AF" /><Text className="text-[13px] font-bold text-gray-500">Bench Press</Text></TouchableOpacity>
                    <TouchableOpacity className="bg-gray-100 rounded-full px-4 py-1.5 justify-center mr-2 flex-row items-center gap-1"><Ionicons name="barbell" size={12} color="#9CA3AF" /><Text className="text-[13px] font-bold text-gray-500">Back Squat</Text></TouchableOpacity>
                </ScrollView>

                {/* Line Chart Mock */}
                <View className="h-56 relative justify-end pb-6 border-b-2 border-emerald-400 mb-6">
                    <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0 opacity-40">
                        <Text className="text-[10px] font-bold text-gray-400">16,8K</Text>
                        <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">11,2K</Text>
                        <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">5,61K</Text>
                        <Text className="text-[10px] font-bold text-gray-400">0</Text>
                    </View>
                    {/* Stepped Line Graph Mock */}
                    <View className="absolute bottom-6 left-0 right-10 h-40 flex-row items-end">
                        <View className="flex-1 h-[20%] border-t-4 border-blue-300 relative"><View className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full border-2 border-blue-400 bg-white" /></View>
                        <View className="flex-1 h-[20%] border-t-4 border-blue-300 relative" />
                        <View className="w-1 h-[20%] border-l-4 border-blue-300" />
                        <View className="flex-1 h-[40%] border-t-4 border-blue-300 relative"><View className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full border-2 border-blue-400 bg-white" /></View>
                        <View className="w-1 h-[20%] border-l-4 border-blue-300" />
                        <View className="flex-1 h-[60%] border-t-4 border-blue-300 relative"><View className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full border-2 border-blue-400 bg-white" /></View>
                        <View className="flex-1 h-[60%] border-t-4 border-blue-300 relative" />
                        <View className="w-1 h-[30%] border-l-4 border-blue-300" />
                        <View className="flex-1 h-[90%] border-t-4 border-blue-300 relative"><View className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full border-2 border-blue-400 bg-white" /></View>
                        <View className="absolute right-0 top-[10%] w-3 h-3 rounded-full border-[2px] border-blue-500 bg-white" />
                        <View className="absolute -right-2 top-[5%] w-7 h-7 rounded-full bg-blue-400 opacity-20" />
                    </View>
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

                {/* Exercises List */}
                <Text className="text-[16px] font-bold text-gray-900 mb-4">Exercises</Text>
                <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 gap-6">
                    {STRENGTH_PROGRESSION.map(ex => (
                        <View key={ex.id} className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-[15px] font-bold text-gray-900">{ex.name}</Text>
                                <Text className="text-[12px] font-medium text-gray-500">{ex.type} • {ex.sessions} sessions</Text>
                            </View>
                            {/* Tiny Sparkline */}
                            <View className="w-16 h-8 border-b-2 border-blue-200 relative items-end justify-end pb-1">
                                <View className="w-full border-t-2 border-blue-300 transform -rotate-12 translate-y-1" />
                                <View className="w-2 h-2 rounded-full border border-blue-500 bg-white" />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View className="absolute bottom-10 self-center">
                <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
                    <Text className="text-[16px] mr-2">📈</Text>
                    <Text className="font-bold text-[14px] text-gray-900 mr-2">Stronger than ever!</Text>
                    <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}