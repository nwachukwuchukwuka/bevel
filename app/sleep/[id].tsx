import { SleepNeededSheet, SleepNeededSheetRef } from '@/components/sleep/SleepNeededSheet';
import { SLEEP_STAGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SleepDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const neededSheetRef = useRef<SleepNeededSheetRef>(null);

    const isNap = id === 'nap';

    const [activeTab, setActiveTab] = useState('HR');

    const getChartConfig = () => {
        switch (activeTab) {
            case 'HR': return { color: '#F43F5E', title: 'Sleeping Heart Rate', val: '62,0', unit: 'bpm', label: 'AVERAGE HR' };
            case 'HRV': return { color: '#10B981', title: 'Sleeping HRV', val: '60,8', unit: 'ms', label: 'AVERAGE HRV' };
            case 'RR': return { color: '#F59E0B', title: 'Sleeping Respiratory Rate', val: '15,3', unit: 'rpm', label: 'AVERAGE RR' };
            case 'SpO2': return { color: '#4DB9F2', title: 'Sleeping SpO2', val: '95.4', unit: '%', label: 'AVERAGE SPO2' };
            default: return { color: '#F43F5E', title: '', val: '', unit: '', label: '' };
        }
    };

    const config = getChartConfig();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-slate-100">{isNap ? 'Nap' : 'Primary sleep'}</Text>
                        <Text className="text-xs text-slate-400 mt-1">14/09/25 at 1.01 AM</Text>
                    </View>
                </View>
                <View className="w-10 h-10 bg-[#151E33] rounded-xl items-center justify-center">
                    <Ionicons name="moon-outline" size={20} color="#94A3B8" />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                <View className="p-5">
                    {isNap ? (
                        <>
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-6">
                                <View className="flex-row justify-between items-center mb-6">
                                    <Text className="text-sm font-semibold text-slate-400">Time Asleep</Text>
                                    <View className="bg-[#1E293B] px-2 py-1 rounded-md border border-[#2D3748]">
                                        <Text className="text-[10px] text-slate-400 font-semibold">Tracked with Bevel</Text>
                                    </View>
                                </View>

                                <Text className="text-5xl font-bold text-white mb-8">60 <Text className="text-lg font-medium text-slate-500">m</Text></Text>

                                <View className="w-full bg-[#090D16] border border-[#1E293B] rounded-2xl p-4 flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="bed-outline" size={16} color="#4DB9F2" />
                                        <Text className="text-sm font-semibold text-slate-300">Sleep Period</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-white">4.40 PM - 5.40 PM</Text>
                                </View>
                            </View>

                            <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center mb-8">
                                <View className="flex-col">
                                    <Text className="text-xs font-semibold text-slate-500 mb-1">Sleep Impact</Text>
                                    <Text className="text-base font-bold text-white">Sleep bank</Text>
                                </View>
                                <View className="bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                    <Text className="text-sm font-bold text-emerald-400">+1h 0m</Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-6">
                                <View className="flex-row items-center justify-between mb-6 pb-4 border-b border-[#1E293B]">
                                    <Text className="text-lg font-bold text-slate-100">Sleep Score</Text>
                                    <View className="flex-row items-center gap-3">
                                        <Text className="text-xl font-bold text-[#4DB9F2]">67%</Text>
                                        <View className="w-6 h-6 border-4 border-[#4DB9F2] rounded-full border-t-transparent -rotate-45" />
                                    </View>
                                </View>

                                <View className="flex-row justify-between items-center bg-[#090D16] border border-[#1E293B] p-4 rounded-2xl mb-6">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                                        <Text className="text-sm font-semibold text-slate-300">Sleep Period</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-white">1.01 AM - 7.34 AM</Text>
                                </View>

                                <View className="flex-row justify-between gap-4 mb-6">
                                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 items-center">
                                        <Text className="text-xs font-semibold text-slate-500 mb-1">Time In Bed</Text>
                                        <Text className="text-xl font-bold text-white">6h 32m</Text>
                                    </View>
                                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 items-center">
                                        <Text className="text-xs font-semibold text-slate-500 mb-1">Time Asleep</Text>
                                        <Text className="text-xl font-bold text-white">6h 26m</Text>
                                    </View>
                                </View>

                                <View className="bg-[#090D16] border border-[#1E293B] rounded-2xl p-5 flex-row flex-wrap gap-y-6">
                                    <View className="w-1/2 items-start"><Text className="text-xs text-slate-500 mb-1">Time Asleep</Text><Text className="text-base font-bold text-amber-500">Fair</Text></View>
                                    <View className="w-1/2 items-start"><Text className="text-xs text-slate-500 mb-1">Heart Rate Dip</Text><Text className="text-base font-bold text-[#4DB9F2]">Excellent</Text></View>
                                    <View className="w-1/2 items-start"><Text className="text-xs text-slate-500 mb-1">REM Sleep</Text><Text className="text-base font-bold text-emerald-500">Good</Text></View>
                                    <View className="w-1/2 items-start"><Text className="text-xs text-slate-500 mb-1">Deep Sleep</Text><Text className="text-base font-bold text-amber-500">Fair</Text></View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => neededSheetRef.current?.present()}
                                activeOpacity={0.7}
                                className="bg-[#1E293B40] border border-[#1E293B] p-5 rounded-2xl flex-row justify-between items-center mb-8"
                            >
                                <Text className="text-sm font-bold text-slate-300">Last night's sleep needed</Text>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-sm font-bold text-white">8h 12m</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>

                            <View className="mb-8">
                                <Text className="text-lg font-bold text-white mb-4">Sleep Stages</Text>
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">

                                    <View className="h-40 relative flex-row items-end justify-between border-b border-[#2D3748] pb-1 mb-4">
                                        <View className="w-[5%] h-[20%] bg-[#F59E0B] absolute left-[0%]" />
                                        <View className="w-[10%] h-[40%] bg-[#10B981] absolute left-[5%]" />
                                        <View className="w-[15%] h-[80%] bg-[#1E293B] absolute left-[15%]" />
                                        <View className="w-[5%] h-[10%] bg-[#EF4444] absolute left-[30%]" />
                                        <View className="w-[20%] h-[60%] bg-[#4DB9F2] absolute left-[35%]" />
                                        <View className="w-[15%] h-[90%] bg-[#1E293B] absolute left-[55%]" />
                                        <View className="w-[10%] h-[30%] bg-[#10B981] absolute left-[70%]" />
                                        <View className="w-[15%] h-[50%] bg-[#F59E0B] absolute left-[80%]" />
                                        <View className="w-[5%] h-[15%] bg-[#EF4444] absolute left-[95%]" />
                                    </View>
                                    <View className="flex-row justify-between mb-8">
                                        <Text className="text-[10px] font-bold text-slate-500">1.01 AM</Text>
                                        <Text className="text-[10px] font-bold text-slate-500">7.34 AM</Text>
                                    </View>

                                    <View className="flex-row flex-wrap justify-between gap-y-4">
                                        {SLEEP_STAGES.map(stage => {
                                            const stageColor = stage.name === 'Awake' ? '#EF4444' : stage.name === 'REM' ? '#10B981' : stage.name === 'Core' ? '#F59E0B' : '#1E293B';
                                            return (
                                                <View key={stage.name} className="w-[48%] bg-[#090D16] border border-[#1E293B] rounded-xl p-4 flex-row justify-between items-center">
                                                    <View>
                                                        <Text className="text-xs font-semibold text-slate-500 mb-1">{stage.name}</Text>
                                                        <Text className="text-sm font-bold text-white mb-0.5">{stage.duration}</Text>
                                                        <Text className="text-[10px] font-bold" style={{ color: stageColor }}>{stage.pct}</Text>
                                                    </View>
                                                    <View className="w-4 h-4 rounded-full" style={{ backgroundColor: stageColor }} />
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>

                            <View className="mb-8">
                                <Text className="text-lg font-bold text-white mb-4">Time To Fall Asleep</Text>
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 items-center">
                                    <Text className="text-3xl font-bold text-[#4DB9F2] mb-6">8 <Text className="text-base text-slate-500 font-medium">minutes</Text></Text>

                                    <View className="w-full h-2 rounded-full bg-[#1E293B] relative mb-3">
                                        <View className="absolute left-0 h-full w-[35%] bg-[#4DB9F2] rounded-full" />
                                        <View className="absolute left-[30%] -top-1.5 w-5 h-5 bg-[#090D16] rounded-full border-4 border-[#4DB9F2]" />
                                    </View>
                                    <View className="flex-row justify-between w-full">
                                        <Text className="text-[10px] font-bold text-slate-500">Fast</Text>
                                        <Text className="text-[10px] font-bold text-[#4DB9F2]">Normal</Text>
                                        <Text className="text-[10px] font-bold text-slate-500">Late</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}

                    <View className="border-t border-[#1E293B] pt-8">
                        <Text className="text-lg font-bold text-white mb-4">{config.title}</Text>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                            <View className="flex-row justify-between items-start mb-8">
                                <View>
                                    <Text className="text-[10px] font-bold text-slate-500 mb-1">{config.label}</Text>
                                    <View className="flex-row items-baseline gap-1">
                                        <Text className="text-4xl font-bold text-white">{config.val}</Text>
                                        <Text className="text-base font-medium text-slate-500">{config.unit}</Text>
                                    </View>
                                </View>
                                <View className="w-10 h-10 rounded-xl items-center justify-center border border-[#1E293B]" style={{ backgroundColor: '#090D16' }}>
                                    <Ionicons name="analytics" size={16} color={config.color} />
                                </View>
                            </View>

                            <View className="h-40 relative mb-4 border-b border-[#2D3748] pb-1">
                                <View className="absolute inset-0 justify-between py-2">
                                    <View className="border-b border-[#1E293B] w-full" />
                                    <View className="border-b border-[#1E293B] w-full" />
                                    <View className="border-b border-[#1E293B] w-full" />
                                </View>

                                <View className="flex-1 justify-center relative items-center">
                                    {activeTab === 'HR' ? (
                                        <View className="w-full h-full relative">
                                            <View className="absolute top-[40%] left-0 right-0 h-[1px] bg-rose-500/50" />
                                            <View className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-rose-500" />
                                            <View className="absolute top-[60%] left-[30%] w-2 h-2 rounded-full bg-rose-500" />
                                            <View className="absolute top-[80%] left-[50%] w-2 h-2 rounded-full bg-rose-500" />
                                            <View className="absolute top-[30%] left-[70%] w-2 h-2 rounded-full bg-rose-500" />
                                        </View>
                                    ) : (
                                        <View className="w-full h-full relative items-center justify-center">
                                            <View className="w-[90%] h-1" style={{ backgroundColor: config.color, transform: [{ rotate: '-10deg' }] }} />
                                            <View className="w-3 h-3 rounded-full border-2 bg-[#090D16] absolute left-0 bottom-[30%]" style={{ borderColor: config.color }} />
                                            <View className="w-3 h-3 rounded-full border-2 bg-[#090D16] absolute right-0 top-[30%]" style={{ borderColor: config.color }} />
                                        </View>
                                    )}
                                </View>
                            </View>

                            <View className="flex-row justify-between mb-8">
                                <Text className="text-[10px] font-bold text-slate-500">1.03 AM</Text>
                                <Text className="text-[10px] font-bold text-slate-500">7.33 AM</Text>
                            </View>

                            <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                                {[
                                    { id: 'HR', icon: 'heart-outline', color: '#F43F5E' },
                                    { id: 'HRV', icon: 'pulse-outline', color: '#10B981' },
                                    { id: 'RR', icon: 'leaf-outline', color: '#F59E0B' },
                                    { id: 'SpO2', icon: 'water-outline', color: '#4DB9F2' }
                                ].map(tab => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <TouchableOpacity
                                            key={tab.id}
                                            onPress={() => setActiveTab(tab.id)}
                                            activeOpacity={0.8}
                                            className={`flex-1 items-center justify-center py-2.5 rounded-lg border ${isActive ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>{tab.id}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <SleepNeededSheet ref={neededSheetRef} />
        </SafeAreaView>
    );
}