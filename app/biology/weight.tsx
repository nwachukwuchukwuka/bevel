import { WEIGHT_TRENDS_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function WeightModal() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                <View className="px-5 flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="scale-outline" size={20} color="#6B7280" />
                        <Text className="text-[16px] font-bold text-gray-600">Weight</Text>
                    </View>
                </View>

                <View className="px-5 flex-row justify-between items-end mb-8">
                    <View>
                        <Text className="text-[36px] font-bold text-gray-900 tracking-tight">61.0 <Text className="text-[18px] text-gray-500 font-medium">kg</Text></Text>
                        <Text className="text-[14px] font-medium text-gray-500">8 Sep 2025</Text>
                    </View>
                    <View className="flex-row items-center gap-1 mb-1">
                        <Ionicons name="arrow-down-circle" size={16} color="#6B7280" />
                        <Text className="text-[14px] font-bold text-gray-700">Decreasing</Text>
                    </View>
                </View>

                {/* Chart Area */}
                <View className="px-5 mb-8 relative h-72">
                    <View className="absolute right-5 top-0 bottom-24 justify-between items-end z-0">
                        <Text className="text-[10px] font-bold text-gray-400">63</Text>
                        <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed border-gray-200 w-full text-right">62,3</Text>
                        <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed border-gray-200 w-full text-right">61,7</Text>
                        <Text className="text-[10px] font-bold text-gray-400">61</Text>
                    </View>

                    {/* Line Chart Mock */}
                    <View className="absolute top-10 left-5 right-14 h-32 flex-row items-end">
                        <View className="w-[60%] h-full border-t-[2px] border-purple-400" />
                        <View className="flex-1 h-full border-t-[2px] border-purple-400 border-l-[2px] transform rotate-[70deg] translate-x-4 translate-y-12" />
                        <View className="absolute left-[60%] top-0 w-2.5 h-2.5 bg-white border-2 border-purple-400 rounded-full -translate-y-1 -translate-x-1" />

                        {/* Dotted projection line */}
                        <View className="absolute right-0 bottom-0 w-[40%] h-[80%] border-t-[2px] border-l-[2px] border-dashed border-blue-400 transform rotate-[65deg] translate-y-4" />

                        <View className="absolute right-4 bottom-[-10px] w-4 h-4 rounded-full bg-purple-200 items-center justify-center">
                            <View className="w-2 h-2 bg-purple-500 rounded-full" />
                        </View>
                        <View className="absolute right-2 bottom-10 w-2 h-2 bg-white border-2 border-blue-400 rounded-full" />
                    </View>

                    {/* Y-Axis Bar Chart Labels */}
                    <View className="absolute right-5 bottom-8 h-16 justify-between items-end z-0">
                        <Text className="text-[10px] font-bold text-gray-400">3,37K</Text>
                        <Text className="text-[10px] font-bold text-gray-400">2,25K</Text>
                        <Text className="text-[10px] font-bold text-gray-400">1,12K</Text>
                        <Text className="text-[10px] font-bold text-gray-400">0</Text>
                    </View>

                    {/* Bar Chart Mock (Energy) */}
                    <View className="absolute bottom-8 left-5 right-14 h-16 flex-row items-end justify-between gap-[2px]">
                        {Array.from({ length: 24 }).map((_, i) => {
                            const height = Math.max(10, Math.random() * 80);
                            return <View key={i} className="flex-1 rounded-t-sm bg-orange-500" style={{ height: `${height}%` }} />;
                        })}
                    </View>

                    {/* X-Axis */}
                    <View className="absolute bottom-0 left-5 right-14 flex-row justify-between">
                        <Text className="text-[10px] font-bold text-gray-400">9 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">16 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">24 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">31 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">8 Sep</Text>
                    </View>
                </View>

                <View className="px-5 flex-row items-center gap-4 mb-6">
                    <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-purple-400 border border-white" /><Text className="text-[12px] font-bold text-gray-500">Weight trend</Text></View>
                    <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-orange-500 border border-white" /><Text className="text-[12px] font-bold text-gray-500">Total Energy</Text></View>
                </View>

                {/* Timeframe Selector */}
                <View className="px-5 flex-row items-center justify-between mb-10">
                    <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-back" size={16} color="#9CA3AF" /></TouchableOpacity>
                    <View className="flex-row items-center gap-1">
                        <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm"><Text className="text-[12px] font-bold text-gray-900">1M</Text></TouchableOpacity>
                        <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">3M</Text></TouchableOpacity>
                        <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">6M</Text></TouchableOpacity>
                        <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">1Y</Text></TouchableOpacity>
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="calendar-outline" size={14} color="#9CA3AF" /></TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></TouchableOpacity>
                    </View>
                </View>

                {/* Trends Analysis */}
                <View className="px-5">
                    <Text className="text-[16px] font-bold text-gray-900 mb-1">Trends Analysis</Text>
                    <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 8 Sep 2025</Text>

                    <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-4">
                        <View className="flex-row justify-between mb-6">
                            <View>
                                <Text className="text-[11px] font-bold text-gray-400 mb-1">Last weight trend</Text>
                                <Text className="text-[20px] font-bold text-gray-900">62.0 kg</Text>
                            </View>
                            <View className="border-l border-gray-100 h-10 mx-4" />
                            <View className="flex-1">
                                <Text className="text-[11px] font-bold text-gray-400 mb-1">30-day projection</Text>
                                <Text className="text-[20px] font-bold text-gray-900">61.0 kg</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between pb-2 border-b border-gray-50 mb-2">
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3">Period</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-center">Change</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-right">Trend</Text>
                        </View>

                        {WEIGHT_TRENDS_ANALYSIS.map((item, idx) => (
                            <View key={idx} className={`flex-row items-center justify-between py-3 ${idx !== WEIGHT_TRENDS_ANALYSIS.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <Text className="text-[13px] font-bold text-gray-600 w-1/3">{item.period}</Text>
                                <View className="w-1/3 items-center flex-row justify-center gap-1">
                                    {item.icon !== 'remove-circle' && <Ionicons name={item.icon as any} size={14} color="#374151" />}
                                    <Text className="text-[13px] font-bold text-gray-900">{item.change}</Text>
                                </View>
                                <View className="w-1/3 items-end justify-center">
                                    {/* Mock Sparkline */}
                                    <View className={`w-16 h-4 border-t-[2px] border-gray-500 rounded-tr-full ${item.trend === 'down' ? 'border-r-[2px] transform rotate-12' : ''}`} />
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text className="text-center text-[10px] font-medium text-gray-400">Based on 7-day rolling averages for the select period.</Text>
                </View>

            </ScrollView>

            {/* Floating Button */}
            <View className="absolute bottom-10 self-center">
                <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
                    <Text className="text-[16px] mr-2">📉</Text>
                    <Text className="font-bold text-[14px] text-gray-900 mr-2">Weight Trend</Text>
                    <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}