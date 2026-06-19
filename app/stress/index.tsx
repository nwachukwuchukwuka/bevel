import { STRESS_BREAKDOWN, STRESS_TRENDS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StressScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#090D16]">

            <View style={{ paddingTop: insets.top }} className="px-5 pb-6 border-b border-[#1E293B] flex-row items-center justify-between bg-[#151E33]">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Stress analysis</Text>
                        <Text className="text-xs text-slate-400 mt-1">Today, 14 September</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="information-circle-outline" size={22} color="#F59E0B" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, paddingTop: 24 }}>

                <View className="px-5 mb-8">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                            <Text className="text-sm font-semibold text-slate-400">Current stress index</Text>
                            <View className="bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-500/20">
                                <Text className="text-xs font-bold text-amber-500">Medium</Text>
                            </View>
                        </View>

                        <View className="flex-row items-baseline gap-3 mb-6">
                            <Text className="text-6xl font-bold text-[#F59E0B]">36</Text>
                            <Text className="text-base text-slate-500 font-medium mb-1">/ 100 max</Text>
                        </View>

                        <View className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden flex-row relative">
                            <View className="absolute inset-0 flex-row">
                                <View className="h-full flex-[1]" />
                                <View className="h-full border-l-2 border-[#151E33] flex-[1]" />
                                <View className="h-full border-l-2 border-[#151E33] flex-[1]" />
                                <View className="h-full border-l-2 border-[#151E33] flex-[1]" />
                            </View>
                            <View className="h-full bg-[#F59E0B]" style={{ width: '36%' }} />
                        </View>
                    </View>
                </View>

                <View className="px-5 flex-row gap-4 mb-6">
                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-col gap-4 justify-between">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-slate-500">Last HRV</Text>
                            <Ionicons name="pulse" size={16} color="#10B981" />
                        </View>
                        <View>
                            <Text className="text-3xl font-bold text-white mb-1">60 <Text className="text-sm text-slate-500 font-medium">ms</Text></Text>
                            <Text className="text-[10px] text-slate-500 font-semibold">Updated: 7:54 AM</Text>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-col gap-4 justify-between">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-slate-500">Last HR</Text>
                            <Ionicons name="heart-outline" size={16} color="#EF4444" />
                        </View>
                        <View>
                            <View className="flex-row items-baseline gap-2 mb-1">
                                <Text className="text-3xl font-bold text-white">86</Text>
                                <Text className="text-sm text-slate-500 font-medium">bpm</Text>
                                <Ionicons name="arrow-down" size={14} color="#4DB9F2" />
                            </View>
                            <Text className="text-[10px] text-slate-500 font-semibold">Updated: 7:54 AM</Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-10">
                    <View className="bg-amber-950/20 border border-amber-500/10 rounded-2xl p-5 flex-row gap-4">
                        <Ionicons name="information-circle" size={20} color="#F59E0B" />
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-[#F59E0B] mb-1">Calmness Amidst Activity</Text>
                            <Text className="text-xs text-slate-400 leading-5">
                                It's great to see your Stress Score is currently at 11, which is below your typical range for today, even after your Indoor Walk! This suggests your body is managing the activity well...
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <Text className="text-lg font-bold text-white mb-4">Today's Stress</Text>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-sm font-semibold text-slate-400">September 11, 2025</Text>
                            <View className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748]">
                                <Text className="text-xs font-bold text-slate-300">18:36:00 duration</Text>
                            </View>
                        </View>

                        <View className="h-44 relative justify-end mb-4 border-b border-[#2D3748] pb-1">
                            <View className="absolute inset-0 justify-between py-2">
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">100</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">75</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">50</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">25</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">0</Text></View>
                            </View>

                            <View className="absolute top-0 bottom-0 left-0 w-[20%] bg-[#4DB9F2]/10 border-x border-[#4DB9F2]/20 z-0" />
                            <View className="absolute top-0 bottom-0 left-[60%] w-[15%] bg-[#4DB9F2]/10 border-x border-[#4DB9F2]/20 z-0" />

                            <View className="absolute bottom-0 left-0 right-0 h-full flex-row items-end justify-between px-1 pt-2">
                                {Array.from({ length: 48 }).map((_, i) => {
                                    let height = Math.max(10, Math.random() * 80);
                                    let color = '#10B981';
                                    if (height > 60) color = '#F97316';
                                    else if (height > 40) color = '#F59E0B';
                                    else if (i > 6 && i < 12) { height = 15; color = '#4DB9F2'; }
                                    else if (i > 28 && i < 34) { height = 10; color = '#4DB9F2'; }

                                    return (
                                        <View key={i} className="items-center flex-1 pr-[1px]" style={{ height: `${height}%` }}>
                                            <View className="flex-1 w-full rounded-t-[1px] opacity-80" style={{ backgroundColor: color }} />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2 mb-8">
                            <Text className="text-[10px] font-bold text-slate-500">11:33 PM</Text>
                            <Text className="text-[10px] font-bold text-slate-500">6:00 AM</Text>
                            <Text className="text-[10px] font-bold text-slate-500">12:00 PM</Text>
                            <Text className="text-[10px] font-bold text-slate-500">6:00 PM</Text>
                        </View>

                        <View className="flex-col gap-4">
                            {STRESS_BREAKDOWN.map((item) => (
                                <View key={item.id} className="flex-row items-center justify-between">
                                    <Text className="text-sm font-semibold text-white w-[25%]">{item.label}</Text>

                                    <View className="flex-1 flex-row items-center gap-3 pr-4">
                                        <Text className="text-sm font-bold text-slate-300 w-10 text-right">{item.pct}%</Text>
                                        <View className="flex-1 h-1.5 rounded-full bg-[#1E293B]">
                                            <View
                                                className="h-full rounded-full"
                                                style={{ width: `${item.pct}%`, backgroundColor: item.bg === 'bg-blue-500' ? '#4DB9F2' : item.bg === 'bg-green-500' ? '#10B981' : item.bg === 'bg-yellow-400' ? '#F59E0B' : '#F97316' }}
                                            />
                                        </View>
                                    </View>

                                    <Text className="text-xs font-semibold text-slate-500 w-[20%] text-right">{item.time}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-10">
                    <Text className="text-lg font-bold text-white mb-4">Trends</Text>

                    <View className="gap-3">
                        {STRESS_TRENDS.map((trend) => (
                            <View
                                key={trend.id}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center"
                            >
                                <View className="flex-1 gap-2.5">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="pie-chart-outline" size={14} color="#4DB9F2" />
                                        <Text className="text-xs font-semibold text-slate-400">{trend.title}</Text>
                                    </View>
                                    <View className="flex-row items-baseline gap-1">
                                        <Text className="text-2xl font-bold text-white">{trend.value}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1.5 bg-[#1E293B] self-start px-2 py-1 rounded-lg border border-[#2D3748]">
                                        <Ionicons name="checkmark-circle-outline" size={12} color="#10B981" />
                                        <Text className="text-xs font-bold text-emerald-500">{trend.status}</Text>
                                    </View>
                                </View>

                                <View className="w-16 h-12 rounded-xl bg-[#1E293B40] border border-[#1E293B] items-center justify-center">
                                    <Ionicons name="pulse" size={24} color="#10B981" />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}