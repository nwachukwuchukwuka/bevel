import { RECOVERY_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecoveryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

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
                        <Text className="text-xl font-bold text-slate-100">Recovery </Text>
                        <Text className="text-xs text-slate-400 mt-1">Today, 14 September</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="information-circle-outline" size={22} color="#10B981" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, paddingTop: 24 }}>

                <View className="px-5 mb-8">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-sm font-semibold text-slate-400">Recovery index</Text>
                            <View className="bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                                <Text className="text-xs font-bold text-emerald-500">Recovered</Text>
                            </View>
                        </View>

                        <View className="flex-row items-baseline gap-3 mb-6">
                            <Text className="text-6xl font-bold text-[#10B981]">77</Text>
                            <Text className="text-base text-slate-500 font-medium mb-1">/ 100 max</Text>
                        </View>

                        <View className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden flex-row">
                            <View className="h-full bg-[#10B981]" style={{ width: '77%' }} />
                        </View>
                    </View>
                </View>

                <View className="px-5 flex-row gap-4 mb-6">
                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-col gap-4 justify-between">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-slate-500">Resting HRV</Text>
                            <Ionicons name="pulse" size={16} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className="text-3xl font-bold text-white mb-1">55.2 <Text className="text-sm text-slate-500 font-medium">ms</Text></Text>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-col gap-4 justify-between">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-slate-500">Resting HR</Text>
                            <Ionicons name="heart-outline" size={16} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className="text-3xl font-bold text-white mb-1">62.0 <Text className="text-sm text-slate-500 font-medium">bpm</Text></Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-10">
                    <View className="bg-rose-950/20 border border-rose-500/10 rounded-2xl p-5 flex-row gap-4">
                        <Ionicons name="warning-outline" size={20} color="#EF4444" />
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-[#EF4444] mb-1">Getting Enough Sleep Is Key</Text>
                            <Text className="text-xs text-slate-400 leading-5">
                                It looks like your Sleep Score dipped to 67% last night, a bit lower than yesterday's 77%. While your time asleep was a healthy 6 hours...
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-[#1E293B] border border-[#2D3748] rounded-2xl p-4 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center gap-3">
                            <View className="w-10 h-10 bg-[#090D16] rounded-xl border border-[#1E293B] items-center justify-center">
                                <Ionicons name="sparkles" size={16} color="#4DB9F2" />
                            </View>
                            <Text className="font-bold text-white text-base">View insights</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={16} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="px-5 mb-8">
                    <Text className="text-lg font-bold text-white mb-4">Event timeline</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/sleep/primary')}
                        activeOpacity={0.8}
                        className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center gap-4">
                            <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center relative">
                                <Ionicons name="moon-outline" size={20} color="#818CF8" />
                                <View className="absolute -bottom-1.5 -right-1.5 bg-[#090D16] border border-[#1E293B] rounded px-1 py-0.5">
                                    <Text className="text-[9px] font-bold text-[#818CF8]">67</Text>
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

                <View className="px-5 mb-10">
                    <Text className="text-lg font-bold text-white mb-4">Telemetry breakdown</Text>

                    <View className="gap-3">
                        {RECOVERY_METRICS.map((metric) => (
                            <View
                                key={metric.id}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center"
                            >
                                <View className="flex-1 gap-2.5">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="analytics-outline" size={14} color="#4DB9F2" />
                                        <Text className="text-xs font-semibold text-slate-400">{metric.title}</Text>
                                    </View>
                                    <View className="flex-row items-baseline gap-1">
                                        <Text className="text-2xl font-bold text-white">{metric.value}</Text>
                                        <Text className="text-sm font-medium text-slate-500">{metric.unit}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1.5 bg-[#1E293B] self-start px-2 py-1 rounded-lg border border-[#2D3748]">
                                        <Ionicons
                                            name={metric.statusType === 'normal' ? 'checkmark-circle-outline' : 'warning-outline'}
                                            size={12}
                                            color={metric.statusType === 'normal' ? '#10B981' : '#F59E0B'}
                                        />
                                        <Text className={`text-xs font-bold ${metric.statusType === 'normal' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {metric.status}
                                        </Text>
                                    </View>
                                </View>

                                <View className="w-16 h-12 rounded-xl bg-[#1E293B40] border border-[#1E293B] items-center justify-center">
                                    <Ionicons
                                        name="pulse"
                                        size={24}
                                        color={metric.statusType === 'normal' ? '#10B981' : '#F59E0B'}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}