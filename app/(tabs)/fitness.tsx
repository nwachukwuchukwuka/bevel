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

    // States
    const [strengthMetric, setStrengthMetric] = useState('Total Volume');
    const [isListView, setIsListView] = useState(false);

    // Refs
    const syncSheetRef = useRef<SyncWatchSheetRef>(null);

    return (
        <MenuProvider>
            <View className="flex-1 bg-[#F9FAFB]">
                <SafeAreaView edges={['top']} className="flex-1">

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-5 py-2 mb-4">
                        <View>
                            <Text className="text-[24px] font-bold text-gray-900">Fitness</Text>
                            <Text className="text-[13px] font-bold text-gray-400">Last 30 days</Text>
                        </View>
                        <TouchableOpacity className="w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                            <Ionicons name="add" size={20} color="#4B5563" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>

                        {/* Calendar Mock */}
                        <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-6">
                            <View className="flex-row justify-between mb-4">
                                <View><Text className="text-[14px] font-bold text-gray-900 mb-2">Aug 2025</Text><Text className="text-[10px] font-bold text-gray-300">S  M  T  W  T  F  S</Text></View>
                                <View><Text className="text-[14px] font-bold text-gray-900 mb-2">Sep 2025</Text><Text className="text-[10px] font-bold text-gray-300">S  M  T  W  T  F  S</Text></View>
                            </View>
                            {/* Grid Dots Mock */}
                            <View className="flex-row justify-between mb-4">
                                <View className="gap-2">
                                    <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-green-400" /><View className="w-4 h-2 rounded-full bg-green-500" /><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /></View>
                                    <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-green-400" /><View className="w-4 h-2 rounded-full bg-green-400" /><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /></View>
                                </View>
                                <View className="gap-2">
                                    <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-green-400" /><View className="w-4 h-2 rounded-full bg-blue-500" /><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /></View>
                                    <View className="flex-row gap-1.5"><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /><View className="w-4 h-2 rounded-full bg-gray-200" /></View>
                                </View>
                            </View>
                            {/* Legend */}
                            <View className="flex-row gap-4">
                                <View className="flex-row items-center gap-1"><View className="w-2 h-2 rounded-full bg-green-400" /><Text className="text-[10px] font-medium text-gray-500">1 activity</Text></View>
                                <View className="flex-row items-center gap-1"><View className="w-2 h-2 rounded-full bg-green-500" /><Text className="text-[10px] font-medium text-gray-500">2 activities</Text></View>
                                <View className="flex-row items-center gap-1"><View className="w-2 h-2 rounded-full bg-blue-500" /><Text className="text-[10px] font-medium text-gray-500">3+ activities</Text></View>
                            </View>
                        </View>

                        {/* Activity Summary Link Card */}
                        <TouchableOpacity onPress={() => router.push('/fitness/activity-summary')} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-8">
                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center gap-2"><Ionicons name="bar-chart" size={16} color="#9CA3AF" /><Text className="text-[15px] font-bold text-gray-500">Activity Summary</Text></View>
                                <Ionicons name="arrow-forward" size={16} color="#D1D5DB" />
                            </View>
                            <View className="flex-row justify-between items-end mb-4">
                                <View><Text className="text-[28px] font-bold text-gray-900 tracking-tight">15h 47m</Text><Text className="text-[12px] font-medium text-gray-400 mt-1">15 Aug - 14 Sep 2025</Text></View>
                                <View className="flex-row items-center gap-1"><Ionicons name="arrow-down-circle" size={14} color="#9CA3AF" /><Text className="text-[14px] font-bold text-gray-500">33m</Text></View>
                            </View>
                            {/* Tiny Line Chart Mock */}
                            <View className="h-20 relative justify-end pb-2 border-b border-gray-100">
                                <View className="absolute bottom-2 left-0 right-0 h-[60%] border-t-2 border-red-400" />
                                <View className="absolute right-4 bottom-10 w-2 h-2 rounded-full bg-white border-2 border-red-500 shadow-sm" />
                            </View>
                        </TouchableOpacity>

                        {/* Cardio Section */}
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Cardio</Text>
                        <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-3">
                            <View className="flex-row justify-between items-center mb-6">
                                <View className="flex-row items-center gap-2"><Ionicons name="pulse" size={16} color="#9CA3AF" /><Text className="text-[14px] font-bold text-gray-500">Cardio Load</Text></View>
                                <Ionicons name="arrow-forward" size={16} color="#D1D5DB" />
                            </View>
                            <View className="flex-row justify-between items-end">
                                <View><Text className="text-[24px] font-bold text-gray-900">13</Text><Text className="text-[13px] font-bold text-pink-500">Overtraining</Text></View>
                                {/* Sparkline */}
                                <View className="w-32 h-10 border-b-2 border-purple-200 relative items-end justify-end pb-1">
                                    <View className="w-10 border-t-2 border-purple-400 transform -rotate-[60deg] translate-y-3 -translate-x-2" />
                                    <View className="w-2 h-2 rounded-full border border-purple-500 bg-white" />
                                </View>
                            </View>
                        </View>

                        <View className="flex-row gap-3 mb-8">
                            <TouchableOpacity onPress={() => router.push('/fitness/cardio-focus')} className="flex-1 bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm shadow-black/5">
                                <View className="flex-row items-center justify-between mb-4">
                                    <View className="flex-row items-center gap-1.5"><Ionicons name="layers" size={14} color="#9CA3AF" /><Text className="text-[12px] font-bold text-gray-500">Cardio Focus</Text></View>
                                    <Ionicons name="arrow-forward" size={14} color="#D1D5DB" />
                                </View>
                                <Text className="text-[18px] font-bold text-gray-900">Low Aerobic</Text>
                                <Text className="text-[13px] font-bold text-teal-400 mb-4">100%</Text>
                                <View className="h-1.5 bg-teal-400 rounded-full w-full mb-1" />
                                <View className="h-1.5 bg-gray-100 rounded-full w-full mb-1" />
                                <View className="h-1.5 bg-gray-100 rounded-full w-full" />
                            </TouchableOpacity>
                            <View className="flex-1 bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm shadow-black/5">
                                <View className="flex-row items-center justify-between mb-4">
                                    <View className="flex-row items-center gap-1.5"><Ionicons name="heart" size={14} color="#9CA3AF" /><Text className="text-[12px] font-bold text-gray-500">HRR</Text></View>
                                    <Ionicons name="arrow-forward" size={14} color="#D1D5DB" />
                                </View>
                                <Text className="text-[18px] font-bold text-gray-900">69 <Text className="text-[13px] font-medium text-gray-500">bpm</Text></Text>
                                <Text className="text-[13px] font-bold text-indigo-500 mb-4">Superior</Text>
                                <View className="h-6 justify-end relative">
                                    <Ionicons name="pulse" size={24} color="#818CF8" />
                                    <View className="absolute right-0 top-2 w-2 h-2 rounded-full border border-indigo-500 bg-white" />
                                </View>
                            </View>
                        </View>

                        {/* Strength Section */}
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Strength</Text>
                        <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-3">
                            <View className="flex-row justify-between items-center mb-6">
                                <View className="flex-row items-center gap-2"><Ionicons name="barbell" size={16} color="#9CA3AF" /><Text className="text-[14px] font-bold text-gray-500">{strengthMetric}</Text></View>

                                {/* Popup Menu for Selecting Strength Metric */}
                                <Menu>
                                    <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                                        <View className="p-1"><Ionicons name="chevron-down" size={16} color="#D1D5DB" /></View>
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 220, paddingVertical: 4 } }}>
                                        {['Total Volume', 'Workout Frequency', 'Muscular Load'].map(opt => (
                                            <MenuOption key={opt} onSelect={() => setStrengthMetric(opt)}>
                                                <View className="flex-row items-center justify-between px-4 py-3">
                                                    <Text className="text-[15px] font-medium text-gray-900">{opt}</Text>
                                                    {strengthMetric === opt && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                </View>
                                            </MenuOption>
                                        ))}
                                    </MenuOptions>
                                </Menu>
                            </View>

                            {/* Concentric Circle Mock */}
                            <View className="items-center justify-center my-6 h-48">
                                <Text className="absolute top-0 text-[12px] font-bold text-yellow-500 text-center">2,01K kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Chest</Text></Text>
                                <Text className="absolute left-0 top-[20%] text-[12px] font-bold text-green-500 text-center">3,42K kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Arms</Text></Text>
                                <Text className="absolute right-0 top-[20%] text-[12px] font-bold text-green-500 text-center">2,36K kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Back</Text></Text>
                                <Text className="absolute left-0 bottom-[10%] text-[12px] font-bold text-yellow-500 text-center">690 kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Core</Text></Text>
                                <Text className="absolute right-0 bottom-[10%] text-[12px] font-bold text-teal-400 text-center">8,44K kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Legs</Text></Text>
                                <Text className="absolute bottom-[-10] text-[12px] font-bold text-yellow-500 text-center">1,91K kg{'\n'}<Text className="text-[10px] font-medium text-gray-400">Shoulders</Text></Text>

                                {/* Center Rings */}
                                <View className="w-24 h-24 rounded-full border-[10px] border-green-200 justify-center items-center">
                                    <View className="w-16 h-16 rounded-full border-[8px] border-yellow-300 justify-center items-center">
                                        <View className="w-8 h-8 rounded-full border-[4px] border-teal-200 bg-white" />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/fitness/strength-progression')} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-8 gap-4">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center gap-2"><Ionicons name="barbell" size={16} color="#9CA3AF" /><Text className="text-[14px] font-bold text-gray-500">Strength Progression</Text></View>
                                <Ionicons name="arrow-forward" size={16} color="#D1D5DB" />
                            </View>
                            {STRENGTH_PROGRESSION.map(ex => (
                                <View key={ex.id} className="flex-row justify-between items-center">
                                    <View><Text className="text-[15px] font-bold text-gray-900">{ex.name}</Text><Text className="text-[12px] font-medium text-gray-500">{ex.type} • {ex.sessions} sessions</Text></View>
                                    <View className="w-16 h-8 border-b-2 border-blue-200 relative items-end justify-end pb-1">
                                        <View className="w-full border-t-2 border-blue-300 transform -rotate-12 translate-y-1" />
                                        <View className="w-2 h-2 rounded-full border border-blue-500 bg-white" />
                                    </View>
                                </View>
                            ))}
                        </TouchableOpacity>

                        {/* --- WORKOUT TEMPLATES SECTION --- */}
                        <View className="flex-row items-center justify-between mb-4 mt-6">
                            <Text className="text-[16px] font-bold text-gray-900">Workout Templates</Text>
                            <View className="flex-row gap-2">

                                {/* POPUP MENU FOR ELLIPSIS */}
                                <Menu>
                                    <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                                        <View className="w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#6B7280" />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 200, marginTop: 35, paddingVertical: 4 } }}>
                                        <MenuOption onSelect={() => router.push('/fitness/edit-pins')}>
                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                <Text className="text-[15px] font-medium text-gray-900">Edit pins</Text>
                                                <Ionicons name="pin" size={18} color="#111827" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => setIsListView(!isListView)}>
                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                <Text className="text-[15px] font-medium text-gray-900">{isListView ? 'Card view' : 'List view'}</Text>
                                                <Ionicons name={isListView ? "grid" : "list"} size={18} color="#111827" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => syncSheetRef.current?.present()}>
                                            <View className="flex-row items-center justify-between px-4 py-3">
                                                <Text className="text-[15px] font-medium text-gray-900">Sync to watch</Text>
                                                <Ionicons name="sync" size={18} color="#111827" />
                                            </View>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>

                                <TouchableOpacity className="w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                                    <Ionicons name="add" size={20} color="#6B7280" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TOGGLE RENDER: LIST VIEW OR CARD VIEW */}
                        {isListView ? (
                            <View className="gap-3 mb-8">
                                {WORKOUT_TEMPLATES_FITNESS.map(template => (
                                    <View key={template.id} className="bg-white border border-gray-100 rounded-[20px] p-4 flex-row justify-between items-center shadow-sm shadow-black/5">
                                        <View>
                                            <Text className="text-[15px] font-bold text-gray-900 mb-1">{template.title}</Text>
                                            <Text className="text-[12px] font-medium text-gray-500">{template.exercises} exercises, {template.sets} sets</Text>
                                        </View>
                                        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                            <Ionicons name="ellipsis-horizontal" size={20} color="#D1D5DB" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                                {WORKOUT_TEMPLATES_FITNESS.map(template => (
                                    <View key={template.id} className="bg-white border border-gray-100 rounded-[20px] p-5 w-48 shadow-sm shadow-black/5 mr-3">
                                        <Text className="text-[14px] font-bold text-gray-900 mb-1" numberOfLines={1}>{template.title}</Text>
                                        <Text className="text-[11px] font-medium text-gray-400 mb-4">{template.exercises} exercises, {template.sets} sets</Text>
                                        <View className="flex-row items-center gap-1">
                                            {template.load.map((num, i) => (
                                                <View key={i} className="bg-gray-50 border border-gray-100 rounded-md w-6 h-8 items-center justify-center"><Text className="font-bold text-gray-900">{num}</Text></View>
                                            ))}
                                            <Text className="text-[12px] font-medium text-gray-400 ml-1">kg</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                        <TouchableOpacity className="bg-white border border-gray-200 rounded-[16px] h-[56px] items-center justify-center shadow-sm shadow-black/5">
                            <Text className="text-gray-900 font-bold text-[16px]">Edit Fitness</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </SafeAreaView>

                {/* BOTTOM SHEET FOR SYNCING */}
                <SyncWatchSheet ref={syncSheetRef} />

            </View>
        </MenuProvider>
    );
}