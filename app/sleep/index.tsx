import { AddManualSleepSheet, AddManualSleepSheetRef } from '@/components/sleep/AddManualSleepSheet';
import { SleepAlarmSheet, SleepAlarmSheetRef } from '@/components/sleep/SleepAlarmSheet';
import { SLEEP_TRENDS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SleepScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const addSheetRef = useRef<AddManualSleepSheetRef>(null);
    const alarmSheetRef = useRef<SleepAlarmSheetRef>(null);

    return (
        <View className="flex-1 bg-[#090D16]">

            <View style={{ paddingTop: insets.top }} className="px-5 pb-6 border-b border-[#1E293B] bg-[#151E33] flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Sleep</Text>
                        <Text className="text-xs text-slate-400 mt-1">Today, 14 September</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => alarmSheetRef.current?.present()}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="alarm-outline" size={20} color="#F59E0B" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, paddingTop: 24 }}>

                <View className="px-5 mb-8">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                            <Text className="text-sm font-semibold text-slate-400">Sleep Quality Index</Text>
                            <View className="bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                                <Text className="text-xs font-bold text-emerald-500">Fair condition</Text>
                            </View>
                        </View>

                        <View className="flex-row items-end gap-3 mb-6">
                            <Text className="text-6xl font-bold text-[#4DB9F2]">67</Text>
                            <Text className="text-base text-slate-500 font-medium mb-1">% quality</Text>
                        </View>

                        <View className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden flex-row">
                            <View className="h-full bg-[#4DB9F2]" style={{ width: '67%' }} />
                        </View>
                    </View>
                </View>

                <View className="px-5 flex-row gap-4 mb-6">
                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-4">
                        <View className="w-10 h-10 bg-[#151E33] rounded-xl border border-[#2D3748] items-center justify-center">
                            <Ionicons name="bed-outline" size={18} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className="text-xs text-slate-500 font-semibold mb-0.5">Time in Bed</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Text className="text-lg font-bold text-white">6h 32m</Text>
                                <Ionicons name="trending-up" size={12} color="#10B981" />
                            </View>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-4">
                        <View className="w-10 h-10 bg-[#151E33] rounded-xl border border-[#2D3748] items-center justify-center">
                            <Ionicons name="time-outline" size={18} color="#F59E0B" />
                        </View>
                        <View>
                            <Text className="text-xs text-slate-500 font-semibold mb-0.5">Time Asleep</Text>
                            <Text className="text-lg font-bold text-white">6h 26m</Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <View className="bg-rose-950/20 border border-rose-500/10 rounded-2xl p-5 flex-row gap-4">
                        <Ionicons name="warning-outline" size={20} color="#EF4444" />
                        <View className="flex-1">
                            <Text className="text-sm font-semibold text-rose-400 mb-1">Sleep Debt: A Call for More Rest</Text>
                            <Text className="text-xs text-slate-400 leading-5">It looks like your sleep debt has increased to -3 hours 10 minutes, despite a good 98% sleep efficiency last night...</Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <Text className="text-lg font-bold text-white mb-4">Chronotype parameters</Text>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between mb-8">
                            <View className="bg-[#1E293B] px-3 py-2 rounded-xl border border-[#2D3748]">
                                <Text className="text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-widest">Wind down</Text>
                                <Text className="text-base font-bold text-white">10.06 PM</Text>
                            </View>
                            <View className="bg-[#1E293B] px-3 py-2 rounded-xl border border-[#2D3748]">
                                <Text className="text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-widest">Target bedtime</Text>
                                <Text className="text-base font-bold text-white">10.36 PM</Text>
                            </View>
                        </View>

                        <View className="h-44 relative justify-center my-4">
                            <View className="absolute inset-0 bg-[#090D16] border border-[#1E293B] rounded-2xl overflow-hidden">
                                <View className="absolute top-0 bottom-0 left-1/4 right-1/4 bg-[#1E293B]/50" />
                                <View className="flex-row justify-between h-full w-full opacity-20">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <View key={i} className="w-[1px] h-full bg-[#4DB9F2]" />
                                    ))}
                                </View>
                            </View>

                            <View className="absolute left-[15%] w-8 h-8 bg-[#1E293B] border border-[#4DB9F2] rounded-lg items-center justify-center -translate-y-4">
                                <Ionicons name="bed" size={16} color="#4DB9F2" />
                            </View>
                            <View className="absolute right-[25%] w-8 h-8 bg-[#1E293B] border border-[#F59E0B] rounded-lg items-center justify-center -translate-y-4">
                                <Ionicons name="alarm" size={16} color="#F59E0B" />
                            </View>

                            <View className="absolute bottom-2 left-4 right-4 flex-row justify-between">
                                <Text className="text-[10px] font-bold text-slate-500">6PM</Text>
                                <Text className="text-[10px] font-bold text-slate-500">12AM</Text>
                                <Text className="text-[10px] font-bold text-slate-500">6AM</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center mt-6 pt-4 border-t border-[#1E293B]">
                            <Text className="text-sm font-semibold text-slate-400">Wake up at</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-base font-bold text-white">7.00 AM</Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center mt-4 bg-[#1E293B40] p-4 rounded-xl border border-[#1E293B]">
                            <Text className="text-sm font-semibold text-slate-300">Tonight's sleep needed</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-sm font-bold text-white">8h 23m</Text>
                                <Ionicons name="arrow-forward" size={16} color="#4DB9F2" />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-white">Event log</Text>
                        <TouchableOpacity
                            onPress={() => addSheetRef.current?.present()}
                            activeOpacity={0.7}
                            className="w-8 h-8 bg-[#1E293B] rounded-lg border border-[#2D3748] items-center justify-center"
                        >
                            <Ionicons name="add" size={16} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="gap-3">
                        <TouchableOpacity
                            onPress={() => router.push('/sleep/nap')}
                            activeOpacity={0.8}
                            className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center">
                                    <Ionicons name="moon-outline" size={20} color="#4DB9F2" />
                                </View>
                                <View>
                                    <Text className="font-bold text-white text-base mb-1">Nap</Text>
                                    <Text className="text-xs text-slate-500 font-medium">14/09/25 at 10.31 AM</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/sleep/primary')}
                            activeOpacity={0.8}
                            className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center relative">
                                    <Ionicons name="moon" size={20} color="#4DB9F2" />
                                    <View className="absolute -bottom-1.5 -right-1.5 bg-[#090D16] border border-[#1E293B] rounded px-1 py-0.5">
                                        <Text className="text-[9px] font-bold text-white">67</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="font-bold text-white text-base mb-1">Primary sleep</Text>
                                    <Text className="text-xs text-slate-500 font-medium">14/09/25 at 1.01 AM</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <Text className="text-lg font-bold text-white mb-4">Telemetry analysis</Text>

                    <View className="gap-3">
                        {SLEEP_TRENDS.map((trend) => (
                            <TouchableOpacity
                                key={trend.id}
                                onPress={() => router.push({ pathname: '/sleep/score-details', params: { initialTab: trend.title } })}
                                activeOpacity={0.8}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center"
                            >
                                <View className="flex-1 gap-2.5">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name={trend.icon as any} size={14} color="#4DB9F2" />
                                        <Text className="text-xs font-semibold text-slate-400">{trend.title}</Text>
                                    </View>
                                    <View className="flex-row items-baseline gap-1">
                                        <Text className="text-2xl font-bold text-white">{trend.value}</Text>
                                        <Text className="text-sm font-medium text-slate-500">{trend.unit}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1.5 bg-[#1E293B] self-start px-2 py-1 rounded-lg border border-[#2D3748]">
                                        <Ionicons name={trend.statusType === 'warning' ? 'warning-outline' : 'checkmark-circle-outline'} size={12} color={trend.statusType === 'warning' ? '#F59E0B' : '#10B981'} />
                                        <Text className={`text-xs font-bold ${trend.statusType === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>{trend.status}</Text>
                                    </View>
                                </View>

                                <View className="w-16 h-12 rounded-xl bg-[#1E293B40] border border-[#1E293B] items-center justify-center">
                                    <Ionicons name="pulse" size={24} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>

            <AddManualSleepSheet ref={addSheetRef} />
            <SleepAlarmSheet ref={alarmSheetRef} />
        </View>
    );
}