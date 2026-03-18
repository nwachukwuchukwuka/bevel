import { STRESS_BREAKDOWN, STRESS_TRENDS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StressScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Hero Header Area */}
                <View className="relative pb-6 rounded-b-[40px] overflow-hidden bg-white">
                    {/* LinearGradient using inline style as requested */}
                    <LinearGradient
                        colors={['#E0F2FE', '#F3F4F6', '#FFFFFF']}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />

                    <View style={{ paddingTop: insets.top }} className="px-5 flex-row items-center justify-between mb-8 pt-4">
                        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-back" size={24} color="#111827" />
                        </TouchableOpacity>
                        <View className="items-center">
                            <Text className="text-[18px] font-bold text-gray-900">Stress</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-[12px] font-medium text-gray-500">Today, 14 September</Text>
                                <Ionicons name="chevron-down" size={12} color="#6B7280" />
                            </View>
                        </View>
                        <TouchableOpacity className="w-8 h-8 bg-white/50 rounded-full items-center justify-center">
                            <Ionicons name="information-circle-outline" size={20} color="#4B5563" />
                        </TouchableOpacity>
                    </View>

                    {/* Big Gauge Mock */}
                    <View className="items-center justify-center mb-8">
                        <View className="w-48 h-48 bg-white rounded-full shadow-lg shadow-black/10 items-center justify-center relative">
                            {/* Dashed outer ring mock */}
                            <View className="absolute w-[90%] h-[90%] border-4 border-dashed border-gray-200 rounded-full" />
                            <View className="absolute w-[90%] h-[90%] border-4 border-dashed border-yellow-400 rounded-full border-b-transparent border-r-transparent -rotate-45" />
                            <View className="items-center mt-2">
                                <Text className="text-[48px] font-bold text-gray-900 tracking-tighter">36</Text>
                                <Text className="text-[14px] font-bold text-yellow-500">Medium</Text>
                            </View>
                            <Text className="absolute bottom-2 left-8 text-[10px] font-bold text-gray-300">0</Text>
                            <Text className="absolute bottom-2 right-6 text-[10px] font-bold text-gray-300">100</Text>
                        </View>
                    </View>

                    {/* Quick Stats */}
                    <View className="flex-row gap-3 px-5 mb-4">
                        <View className="flex-1 bg-white/80 rounded-[20px] p-4 shadow-sm shadow-black/5 border border-white">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="pulse" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-500">Last HRV</Text>
                            </View>
                            <Text className="text-[24px] font-bold text-gray-900 mb-1">60 <Text className="text-[14px] text-gray-400 font-medium">ms</Text></Text>
                            <Text className="text-[10px] text-gray-400">Updated: 7:54 AM</Text>
                        </View>
                        <View className="flex-1 bg-white/80 rounded-[20px] p-4 shadow-sm shadow-black/5 border border-white">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="heart" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-500">Last HR</Text>
                            </View>
                            <View className="flex-row items-center justify-between mb-1">
                                <Text className="text-[24px] font-bold text-gray-900">86 <Text className="text-[14px] text-gray-400 font-medium">bpm</Text></Text>
                                <View className="w-6 h-6 bg-blue-50 rounded-md items-center justify-center"><Ionicons name="caret-down" size={12} color="#3B82F6" /></View>
                            </View>
                            <Text className="text-[10px] text-gray-400">Updated: 7:54 AM</Text>
                        </View>
                    </View>

                    {/* Insight Card */}
                    <View className="mx-5 bg-yellow-50/80 rounded-[20px] p-4 border border-yellow-100 relative">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-[13px] font-bold text-gray-900">🧘 Calmness Amidst Activity</Text>
                            <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
                        </View>
                        <Text className="text-[13px] text-gray-700 leading-5 font-medium">It's great to see your Stress Score is currently at 11, which is below your typical range for today, even after your Indoor Walk! This suggests your body is managing the activity well...</Text>
                    </View>
                </View>

                {/* --- Chart Section --- */}
                <View className="px-5 mt-8">
                    <Text className="text-[18px] font-bold text-gray-900 mb-1">September 11, 2025</Text>
                    <Text className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-6">Today's Stress</Text>

                    {/* Interactive Chart Mock */}
                    <View className="mb-4 relative">
                        {/* Sleep Indicator Header */}
                        <View className="flex-row w-full h-4 mb-2 relative">
                            <View className="absolute left-[5%] top-0"><Ionicons name="moon" size={12} color="#3B82F6" /></View>
                            <View className="absolute left-[65%] top-0"><Ionicons name="moon" size={12} color="#3B82F6" /></View>
                        </View>

                        {/* Main Graph Area */}
                        <View className="h-48 border-b border-gray-200 relative flex-row items-end">
                            {/* Y-Axis Labels */}
                            <View className="absolute right-0 top-0 bottom-0 justify-between items-end pb-2 opacity-50 z-0">
                                <Text className="text-[10px] font-bold text-gray-400">100</Text>
                                <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">75</Text>
                                <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">50</Text>
                                <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">25</Text>
                                <Text className="text-[10px] font-bold text-gray-400">0</Text>
                            </View>

                            {/* Sleep Background Overlays */}
                            <View className="absolute top-0 bottom-0 left-0 w-[20%] bg-blue-50/50 z-0" />
                            <View className="absolute top-0 bottom-0 left-[60%] w-[15%] bg-blue-50/50 z-0" />

                            {/* Data Line Mock (Bar sequence) */}
                            <View className="flex-1 flex-row items-end gap-[1px] z-10 pb-2 mr-6">
                                {Array.from({ length: 80 }).map((_, i) => {
                                    // Generate varying heights and colors
                                    let height = Math.random() * 80;
                                    let color = 'bg-emerald-400';
                                    if (height > 60) color = 'bg-orange-500';
                                    else if (height > 40) color = 'bg-yellow-400';
                                    else if (i > 10 && i < 20) height = 10; // Sleep dip

                                    return (
                                        <View key={i} className={`flex-1 ${color} rounded-t-sm`} style={{ height: `${height}%` }} />
                                    );
                                })}
                            </View>
                        </View>

                        {/* X-Axis Labels */}
                        <View className="flex-row justify-between pr-6 mt-2">
                            <Text className="text-[10px] font-medium text-gray-400">11:33 PM</Text>
                            <Text className="text-[10px] font-medium text-gray-400">6:00 AM</Text>
                            <Text className="text-[10px] font-medium text-gray-400">12:00 PM</Text>
                            <Text className="text-[10px] font-medium text-gray-400">6:00 PM</Text>
                        </View>
                    </View>

                    {/* Breakdown */}
                    <Text className="text-[13px] font-bold text-gray-500 text-right mb-4">Duration: <Text className="text-gray-900">18:36:00</Text></Text>

                    <View className="gap-4 mb-10">
                        {STRESS_BREAKDOWN.map((item) => (
                            <View key={item.id} className="flex-row items-center justify-between">
                                <Text className="text-[14px] font-bold text-gray-600 w-[15%]">{item.label}</Text>
                                <View className={`flex-1 h-2 rounded-full ${item.bg} flex-row overflow-hidden mx-4`}>
                                    <View className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.pct}%` }} />
                                </View>
                                <Text className="text-[13px] font-bold text-gray-900 w-[15%] text-right">{item.pct}%</Text>
                                <Text className="text-[12px] font-medium text-gray-400 w-[20%] text-right">{item.time}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Trends List */}
                    <Text className="text-[16px] font-bold text-gray-900 mb-4">Trends</Text>
                    <View className="gap-3">
                        {STRESS_TRENDS.map((trend) => (
                            <View key={trend.id} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm shadow-black/5 flex-row justify-between items-center">
                                <View className="gap-2">
                                    <View className="flex-row items-center gap-1.5">
                                        <Ionicons name="pie-chart-outline" size={14} color="#9CA3AF" />
                                        <Text className="text-[13px] font-bold text-gray-500">{trend.title}</Text>
                                    </View>
                                    <Text className="text-[24px] font-bold text-gray-900 tracking-tight">{trend.value}</Text>
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                                        <Text className="text-[12px] font-bold text-green-500">{trend.status}</Text>
                                    </View>
                                </View>

                                {/* Sparkline Mock */}
                                <View className="w-24 h-12 relative items-end justify-end">
                                    <View className="absolute inset-0 bg-emerald-50 opacity-50 rounded-t-lg" />
                                    <Ionicons name="pulse" size={40} color="#22C55E" />
                                    <View className="absolute right-0 top-3 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}