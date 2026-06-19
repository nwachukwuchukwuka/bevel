import { SyncWatchSheet, SyncWatchSheetRef } from '@/components/fitness/SyncWatchSheet';
import { STRENGTH_PROGRESSION, WORKOUT_TEMPLATES_FITNESS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FitnessScreen() {
    const router = useRouter();

    const [strengthMetric, setStrengthMetric] = useState('Total Volume');
    const [isListView, setIsListView] = useState(false);

    const syncSheetRef = useRef<SyncWatchSheetRef>(null);

    return (
        <MenuProvider>
            <View className="flex-1 bg-[#090D16]">
                <SafeAreaView edges={['top']} className="flex-1">

                    {/* Left-Aligned Bold Header */}
                    <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
                        <View>
                            <Text className="text-2xl font-bold text-slate-100">Fitness insights</Text>
                            <Text className="text-xs text-slate-400 mt-1"> log of the last 30 days</Text>
                        </View>
                        <TouchableOpacity className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                            <Ionicons name="add" size={22} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                        {/* Top Performance Metrics - Grid Layout */}
                        <View className="flex-row gap-4 px-5 mt-6">
                            <TouchableOpacity
                                onPress={() => router.push('/fitness/activity-summary')}
                                activeOpacity={0.8}
                                className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5"
                            >
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-xs font-semibold text-slate-400">Total duration</Text>
                                    <Ionicons name="bar-chart-outline" size={16} color="#4DB9F2" />
                                </View>
                                <Text className="text-2xl font-bold text-slate-100">15h 47m</Text>
                                <Text className="text-xs text-slate-500 mt-1.5">Last 30 days</Text>
                            </TouchableOpacity>

                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-xs font-semibold text-slate-400">Cardio load</Text>
                                    <Ionicons name="pulse-outline" size={16} color="#EF4444" />
                                </View>
                                <Text className="text-2xl font-bold text-slate-100">13 score</Text>
                                <View className="bg-pink-950/30 self-start px-2.5 py-0.5 rounded-lg border border-red-500/20 mt-1.5">
                                    <Text className="text-[10px] font-bold text-red-500">Overtraining</Text>
                                </View>
                            </View>
                        </View>

                        {/* Cardio Focus & Recovery - Grid Layout */}
                        <View className="flex-row gap-4 px-5 mt-4">
                            <TouchableOpacity
                                onPress={() => router.push('/fitness/cardio-focus')}
                                activeOpacity={0.8}
                                className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5"
                            >
                                <Text className="text-xs font-semibold text-slate-400 mb-2">Cardio focus</Text>
                                <Text className="text-lg font-bold text-slate-100">Low Aerobic</Text>
                                <Text className="text-xs font-bold text-emerald-400 mt-1">100% target</Text>
                                <View className="h-1 bg-[#1E293B] rounded-full w-full mt-3 overflow-hidden">
                                    <View className="h-full bg-emerald-400" style={{ width: '100%' }} />
                                </View>
                            </TouchableOpacity>

                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                                <Text className="text-xs font-semibold text-slate-400 mb-2">Heart recovery</Text>
                                <Text className="text-lg font-bold text-slate-100">69 bpm</Text>
                                <Text className="text-xs font-bold text-blue-400 mt-1">Superior rate</Text>
                                <View className="h-1 bg-[#1E293B] rounded-full w-full mt-3 overflow-hidden">
                                    <View className="h-full bg-blue-400" style={{ width: '85%' }} />
                                </View>
                            </View>
                        </View>

                        {/* Strength Section with Custom Muscle Load Breakdown */}
                        <View className="px-5 mt-8">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-bold text-white">Muscular telemetry</Text>
                                <Menu>
                                    <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                                        <View className="flex-row items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded-xl border border-[#2D3748]">
                                            <Text className="text-xs font-semibold text-slate-400">{strengthMetric}</Text>
                                            <Ionicons name="chevron-down" size={12} color="#94A3B8" />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 220, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2C2C2C', paddingVertical: 4 } }}>
                                        {['Total Volume', 'Workout Frequency', 'Muscular Load'].map(opt => (
                                            <MenuOption key={opt} onSelect={() => setStrengthMetric(opt)}>
                                                <View className="flex-row items-center justify-between px-4 py-3">
                                                    <Text className="text-[15px] font-medium text-white">{opt}</Text>
                                                    {strengthMetric === opt && <Ionicons name="checkmark" size={18} color="#4DB9F2" />}
                                                </View>
                                            </MenuOption>
                                        ))}
                                    </MenuOptions>
                                </Menu>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 gap-4">
                                {[
                                    { label: 'Chest', value: '2,01k kg', color: 'bg-amber-500' },
                                    { label: 'Arms', value: '3,42k kg', color: 'bg-emerald-500' },
                                    { label: 'Back', value: '2,36k kg', color: 'bg-emerald-500' },
                                    { label: 'Core', value: '690 kg', color: 'bg-amber-500' },
                                    { label: 'Legs', value: '8,44k kg', color: 'bg-blue-500' },
                                    { label: 'Shoulders', value: '1,91k kg', color: 'bg-amber-500' },
                                ].map(group => (
                                    <View key={group.label} className="flex-row justify-between items-center">
                                        <View className="flex-row items-center gap-2.5">
                                            <View className={`w-2.5 h-2.5 rounded-full ${group.color}`} />
                                            <Text className="text-sm font-semibold text-slate-300">{group.label}</Text>
                                        </View>
                                        <Text className="text-sm font-bold text-white">{group.value}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Strength Progression List */}
                        <View className="px-5 mt-8">
                            <TouchableOpacity
                                onPress={() => router.push('/fitness/strength-progression')}
                                activeOpacity={0.8}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5"
                            >
                                <View className="flex-row justify-between items-center mb-6">
                                    <Text className="text-lg font-bold text-white">Strength progression</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#4DB9F2" />
                                </View>
                                <View className="gap-4">
                                    {STRENGTH_PROGRESSION.map((ex, idx) => {
                                        const isLast = idx === STRENGTH_PROGRESSION.length - 1;
                                        return (
                                            <View
                                                key={ex.id}
                                                className={`flex-row justify-between items-center pb-4 ${!isLast ? 'border-b border-[#1E293B]' : ''
                                                    }`}
                                            >
                                                <View>
                                                    <Text className="text-base font-semibold text-white">{ex.name}</Text>
                                                    <Text className="text-xs text-slate-400 mt-0.5">{ex.type} • {ex.sessions} sessions</Text>
                                                </View>
                                                <View className="bg-[#1E293B] px-3 py-1.5 rounded-xl border border-[#2D3748]">
                                                    <Text className="text-xs font-bold text-[#4DB9F2]">Tracked</Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Workout Templates Section */}
                        <View className="px-5 mt-8">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-lg font-bold text-white">Workout templates</Text>
                                <View className="flex-row gap-2.5">
                                    <Menu>
                                        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                                            <View className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center">
                                                <Ionicons name="ellipsis-horizontal" size={18} color="#94A3B8" />
                                            </View>
                                        </MenuTrigger>
                                        <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 200, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2C2C2C', paddingVertical: 4 } }}>
                                            <MenuOption onSelect={() => router.push('/fitness/edit-pins')}>
                                                <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#2C2C2C]">
                                                    <Text className="text-[15px] font-medium text-white">Edit pins</Text>
                                                    <Ionicons name="pin" size={18} color="#4DB9F2" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => setIsListView(!isListView)}>
                                                <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#2C2C2C]">
                                                    <Text className="text-[15px] font-medium text-white">{isListView ? 'Card view' : 'List view'}</Text>
                                                    <Ionicons name={isListView ? "grid" : "list"} size={18} color="#4DB9F2" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => syncSheetRef.current?.present()}>
                                                <View className="flex-row items-center justify-between px-4 py-3">
                                                    <Text className="text-[15px] font-medium text-white">Sync to watch</Text>
                                                    <Ionicons name="sync" size={18} color="#4DB9F2" />
                                                </View>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>

                                    <TouchableOpacity className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center">
                                        <Ionicons name="add" size={20} color="#4DB9F2" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {isListView ? (
                                <View className="gap-3">
                                    {WORKOUT_TEMPLATES_FITNESS.map(template => (
                                        <View key={template.id} className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                                            <View>
                                                <Text className="text-base font-bold text-white mb-1">{template.title}</Text>
                                                <Text className="text-xs text-slate-400">{template.exercises} exercises, {template.sets} sets</Text>
                                            </View>
                                            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                                <Ionicons name="ellipsis-horizontal" size={18} color="#94A3B8" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                                    {WORKOUT_TEMPLATES_FITNESS.map(template => (
                                        <View key={template.id} className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 w-48">
                                            <Text className="text-base font-bold text-white mb-1" numberOfLines={1}>{template.title}</Text>
                                            <Text className="text-xs text-slate-400 mb-4">{template.exercises} exercises, {template.sets} sets</Text>
                                            <View className="flex-row items-center gap-1.5">
                                                {template.load.map((num, i) => (
                                                    <View key={i} className="bg-[#1E293B] border border-[#2D3748] rounded-lg w-7 h-9 items-center justify-center">
                                                        <Text className="font-bold text-white">{num}</Text>
                                                    </View>
                                                ))}
                                                <Text className="text-xs text-slate-400 ml-1">kg</Text>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {/* Calendar Consistency Block - Swapped to the Bottom */}
                        <View className="px-5 mt-8 mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Training consistency</Text>
                            <View className="bg-[#151E33] rounded-2xl p-5 border border-[#1E293B]">
                                <View className="flex-row justify-between mb-4">
                                    <View><Text className="text-sm font-bold text-white mb-1">Aug 2025</Text><Text className="text-xs text-slate-500">S M T W T F S</Text></View>
                                    <View><Text className="text-sm font-bold text-white mb-1">Sep 2025</Text><Text className="text-xs text-slate-500">S M T W T F S</Text></View>
                                </View>

                                <View className="flex-row justify-between mb-5">
                                    <View className="gap-2">
                                        <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-emerald-400" /><View className="w-4 h-2 rounded-full bg-emerald-500" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /></View>
                                        <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-emerald-400" /><View className="w-4 h-2 rounded-full bg-emerald-400" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /></View>
                                    </View>
                                    <View className="gap-2">
                                        <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-emerald-400" /><View className="w-4 h-2 rounded-full bg-blue-500" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /></View>
                                        <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /><View className="w-4 h-2 rounded-full bg-[#1E293B]" /></View>
                                    </View>
                                </View>

                                <View className="flex-row gap-4 border-t border-[#1E293B] pt-4">
                                    <View className="flex-row items-center gap-1.5"><View className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><Text className="text-xs text-slate-400">1 session</Text></View>
                                    <View className="flex-row items-center gap-1.5"><View className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><Text className="text-xs text-slate-400">2 sessions</Text></View>
                                    <View className="flex-row items-center gap-1.5"><View className="w-2.5 h-2.5 rounded-full bg-blue-500" /><Text className="text-xs text-slate-400">3+ sessions</Text></View>
                                </View>
                            </View>
                        </View>

                        <View className="px-5 mb-10">
                            <TouchableOpacity className="bg-[#151E33] border border-[#1E293B] rounded-2xl h-14 items-center justify-center">
                                <Text className="text-white font-bold text-base">Edit metrics layout</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </SafeAreaView>

                <SyncWatchSheet ref={syncSheetRef} />

            </View>
        </MenuProvider>
    );
}