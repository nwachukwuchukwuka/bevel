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
        <View className="flex-1 bg-[#181B28]">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Header */}
                <View style={{ paddingTop: insets.top }} className="px-5 flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-[17px] font-semibold text-white">Sleep</Text>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-[12px] font-medium text-gray-400">Today, 14 September</Text>
                            <Ionicons name="chevron-down" size={12} color="#6B7280" />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => alarmSheetRef.current?.present()}
                        className="w-8 h-8 bg-[#2A3047] rounded-full items-center justify-center"
                    >
                        <Ionicons name="alarm-outline" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>

                {/* Hero Circle */}
                <View className="items-center justify-center mb-8 px-5">
                    <View className="w-48 h-48 bg-[#1F2437] rounded-full items-center justify-center relative">
                        <View className="absolute w-full h-full border-[12px] border-[#2A3047] rounded-full" />
                        <View className="absolute w-full h-full border-[12px] border-indigo-500 rounded-full border-l-transparent border-b-transparent -rotate-45" />
                        <View className="items-center">
                            <Text className="text-[36px] font-semibold text-white">67<Text className="text-[18px]">%</Text></Text>
                            <Text className="text-[11px] font-medium text-gray-400 mt-1">Quality</Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 gap-6">
                    {/* Quick Stats */}
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-[#22273B] rounded-[20px] p-4">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="bed" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-400">Time in Bed</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-[20px] font-semibold text-white">6h 32m</Text>
                                <Ionicons name="caret-up" size={14} color="#3B82F6" />
                            </View>
                        </View>
                        <View className="flex-1 bg-[#22273B] rounded-[20px] p-4">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="time" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-400">Time Asleep</Text>
                            </View>
                            <Text className="text-[20px] font-semibold text-white">6h 26m</Text>
                        </View>
                    </View>

                    {/* Insight Card */}
                    <View className="bg-[#2A3047]/50 rounded-[20px] p-4 border border-indigo-500/20 relative overflow-hidden">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-[13px] font-semibold text-white">😴 Sleep Debt: A Call for More Rest</Text>
                            <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
                        </View>
                        <Text className="text-[13px] text-gray-300 leading-5">It looks like your sleep debt has increased to -3 hours 10 minutes, despite a good 98% sleep efficiency last night...</Text>
                    </View>

                    {/* Clock Face Widget */}
                    <View className="bg-[#2D354E] rounded-[32px] p-6 shadow-xl">
                        <View className="flex-row justify-between mb-8">
                            <View>
                                <Text className="text-[12px] font-medium text-gray-400 mb-1">Wind down</Text>
                                <Text className="text-[20px] font-semibold text-white">10.06 PM</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-[12px] font-medium text-gray-400 mb-1">Target bedtime</Text>
                                <Text className="text-[20px] font-semibold text-white">10.36 PM</Text>
                            </View>
                        </View>

                        {/* Sophisticated Clock Face */}
                        <View className="w-64 h-64 self-center items-center justify-center relative mb-8">
                            {/* Outer Subtle Circle */}
                            <View className="absolute inset-0 rounded-full border border-gray-100/5" />

                            {/* Sleep Arc (Shaded Area) - Mocked with a larger circle and clip/border */}
                            <View className="absolute inset-0 rounded-full border-[28px] border-gray-100/5" />
                            <View
                                className="absolute inset-0 rounded-full border-[28px] border-indigo-500/30"
                                style={{ transform: [{ rotate: '45deg' }], borderLeftColor: 'transparent', borderBottomColor: 'transparent' }}
                            />

                            {/* Icons on the Arc */}
                            <View className="absolute top-[8%] left-[32%] w-7 h-7 bg-[#4F46E5] rounded-full items-center justify-center z-20 border-2 border-[#2D354E]">
                                <Ionicons name="bed" size={14} color="white" />
                            </View>
                            <View className="absolute bottom-[28%] right-[2%] w-7 h-7 bg-[#4F46E5] rounded-full items-center justify-center z-20 border-2 border-[#2D354E]">
                                <Ionicons name="alarm" size={14} color="white" />
                            </View>
                            <View className="absolute top-[21%] left-[18%] w-6 h-6 bg-gray-500/40 rounded-full items-center justify-center z-10">
                                <Ionicons name="body" size={12} color="white" />
                            </View>

                            {/* Inner Face with Ticks and Digits */}
                            <View className="w-48 h-48 rounded-full border border-gray-100/10 items-center justify-center relative">
                                {/* Center Icons */}
                                <View className="absolute top-6"><Ionicons name="moon" size={14} color="#818CF8" /></View>
                                <View className="absolute bottom-6"><Ionicons name="sunny" size={14} color="#FBBF24" /></View>

                                {/* 24 Hour Digits Mock */}
                                <Text className="text-white text-[11px] font-semibold absolute top-2">12AM</Text>
                                <Text className="text-white text-[11px] font-semibold absolute bottom-2">12PM</Text>
                                <Text className="text-gray-400 text-[10px] absolute right-2">6AM</Text>
                                <Text className="text-gray-400 text-[10px] absolute left-2">6PM</Text>

                                <Text className="text-gray-600 text-[9px] absolute top-[20%] right-[24%]">2</Text>
                                <Text className="text-gray-600 text-[9px] absolute bottom-[20%] right-[24%]">8</Text>
                                <Text className="text-gray-600 text-[9px] absolute bottom-[20%] left-[24%]">4</Text>
                                <Text className="text-gray-600 text-[9px] absolute top-[20%] left-[24%]">10</Text>

                                {/* Mimic Ticks around the circle */}
                                {[...Array(24)].map((_, i) => (
                                    <View
                                        key={i}
                                        className="absolute w-0.5 h-1.5 bg-gray-500/30"
                                        style={{ transform: [{ rotate: `${i * 15}deg` }, { translateY: -88 }] }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View className="flex-row justify-center items-center gap-2 mb-8">
                            <Text className="text-[14px] font-medium text-gray-400">Wake up at</Text>
                            <Text className="text-[14px] font-semibold text-white">7.00 AM</Text>
                            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                        </View>

                        <View className="bg-[#3A4363] rounded-2xl p-4 flex-row justify-between items-center -mx-2 -mb-2">
                            <Text className="text-[13px] font-semibold text-white">Tonight's sleep needed</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-[13px] font-semibold text-white">8h 23m</Text>
                                <Ionicons name="arrow-forward" size={14} color="white" className="opacity-60" />
                            </View>
                        </View>
                    </View>

                    {/* Timeline */}
                    <View>
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-[16px] font-bold text-white">Timeline</Text>
                            <TouchableOpacity onPress={() => addSheetRef.current?.present()}>
                                <Ionicons name="add" size={24} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/sleep/nap')} className="flex-row items-center justify-between bg-[#22273B] p-4 rounded-[20px] mb-3">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#2A3047] rounded-[14px] items-center justify-center"><Ionicons name="moon" size={24} color="#818CF8" /></View>
                                <View><Text className="font-bold text-[15px] text-white">Nap</Text><Text className="text-[12px] font-medium text-gray-400">14/09/25 at 10.31 AM</Text></View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/sleep/primary')} className="flex-row items-center justify-between bg-[#22273B] p-4 rounded-[20px]">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#2A3047] rounded-[14px] items-center justify-center relative">
                                    <Ionicons name="moon" size={24} color="#818CF8" />
                                    <View className="absolute -bottom-1 -right-1 bg-[#181B28] rounded-full px-1"><Text className="text-[9px] font-bold text-white">67</Text></View>
                                </View>
                                <View><Text className="font-bold text-[15px] text-white">Primary sleep</Text><Text className="text-[12px] font-medium text-gray-400">14/09/25 at 1.01 AM</Text></View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Trends */}
                    <View>
                        <Text className="text-[16px] font-bold text-white mb-3">Trends</Text>
                        <View className="gap-3">
                            {SLEEP_TRENDS.map((trend) => (
                                <TouchableOpacity
                                    key={trend.id}
                                    onPress={() => router.push({ pathname: '/sleep/score-details', params: { initialTab: trend.title } })}
                                    className="bg-[#22273B] rounded-[20px] p-5 flex-row justify-between items-center"
                                >
                                    <View className="gap-2">
                                        <View className="flex-row items-center gap-1.5">
                                            <Ionicons name={trend.icon as any} size={14} color="#9CA3AF" />
                                            <Text className="text-[12px] font-semibold text-gray-400">{trend.title}</Text>
                                        </View>
                                        <Text className="text-[20px] font-semibold text-white tracking-tight">{trend.value} <Text className="text-[13px] text-gray-400 font-medium">{trend.unit}</Text></Text>
                                        <View className="flex-row items-center gap-1">
                                            <Ionicons name={trend.statusType === 'warning' ? 'arrow-down-circle' : 'checkmark-circle'} size={14} color={trend.statusType === 'warning' ? '#F97316' : '#22C55E'} />
                                            <Text className={`text-[11px] font-semibold ${trend.statusType === 'warning' ? 'text-orange-500' : 'text-green-500'}`}>{trend.status}</Text>
                                        </View>
                                    </View>
                                    <View className="w-20 h-10 items-end justify-end"><Ionicons name="pulse" size={36} color="#818CF8" /></View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <AddManualSleepSheet ref={addSheetRef} />
            <SleepAlarmSheet ref={alarmSheetRef} />
        </View>
    );
}