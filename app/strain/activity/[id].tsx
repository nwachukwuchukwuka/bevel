import { ActivityShareSheet, ActivityShareSheetRef } from '@/components/strain/ActivityShareSheet';
import { CardioImpactCard } from '@/components/strain/activity/CardioImpactCard';
import { HeartRateCard } from '@/components/strain/activity/HeartRateCard';
import { PerceivedEffortCard } from '@/components/strain/activity/PerceivedEffortCard';
import { SplitsCard } from '@/components/strain/activity/SplitsCard';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ActivityDetailsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State for Title Editing
    const [title, setTitle] = useState('Indoor Walk');
    const [isEditing, setIsEditing] = useState(false);

    // Ref for Share Sheet
    const shareSheetRef = useRef<ActivityShareSheetRef>(null);

    return (
        <BottomSheetModalProvider>
            <MenuProvider>
                <View className="flex-1 bg-[#F9FAFB]">

                    {/* Header */}
                    <View className="px-5 pt-7 py-4 flex-row items-center justify-between border-b border-gray-100 bg-white" >
                        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-back" size={24} color="#111827" />
                        </TouchableOpacity>

                        <View className="items-center flex-1">
                            {isEditing ? (
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    autoFocus
                                    onBlur={() => setIsEditing(false)}
                                    className="text-[18px] font-bold text-gray-900 border-b border-blue-500 pb-1 w-2/3 text-center"
                                />
                            ) : (
                                <Text className="text-[18px] font-bold text-gray-900">{title}</Text>
                            )}
                            <Text className="text-[12px] font-medium text-gray-400">14 September 2025 at 8.22 AM</Text>
                        </View>

                        {/* React Native Popup Menu for Ellipsis */}
                        <Menu>
                            <MenuTrigger
                                customStyles={{
                                    triggerWrapper: { padding: 8, marginRight: -8 },
                                    TriggerTouchableComponent: TouchableOpacity,
                                    triggerTouchable: { activeOpacity: 1 }
                                }}
                            >
                                <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                    <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                                </View>
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 200, marginTop: 40, paddingVertical: 4 } }}>
                                <MenuOption onSelect={() => setIsEditing(true)}>
                                    <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                        <Text className="text-[15px] text-gray-900">Edit title</Text>
                                        <Ionicons name="pencil-outline" size={18} color="#111827" />
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => shareSheetRef.current?.present()}>
                                    <View className="flex-row items-center justify-between px-4 py-3">
                                        <Text className="text-[15px] text-gray-900">Share</Text>
                                        <Ionicons name="share-outline" size={18} color="#111827" />
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>

                    <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                        {/* 1. Strain Card */}
                        <View className="bg-white rounded-full px-5 py-3 flex-row items-center justify-between border border-gray-100 shadow-sm shadow-black/5 mb-6">
                            <Text className="text-[15px] font-bold text-gray-900">Activity Strain</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-[15px] font-bold text-gray-900">31%</Text>
                                <View className="w-5 h-5 border-4 border-yellow-400 rounded-full border-t-transparent -rotate-45" />
                            </View>
                        </View>

                        {/* 2. Grid Stats */}
                        <View className="bg-white rounded-[24px] p-1 border border-gray-100 shadow-sm shadow-black/5 mb-6">
                            <View className="flex-row border-b border-gray-50">
                                <View className="flex-1 p-5 items-center border-r border-gray-50"><Text className="text-[11px] font-medium text-gray-400 mb-1">Total Duration</Text><Text className="text-[24px] font-bold text-gray-900">0:45:17</Text></View>
                                <View className="flex-1 p-5 items-center"><Text className="text-[11px] font-medium text-gray-400 mb-1">Active Duration</Text><Text className="text-[24px] font-bold text-gray-400">0:45:17</Text></View>
                            </View>
                            <View className="flex-row border-b border-gray-50">
                                <View className="flex-1 p-4 items-center border-r border-gray-50"><Ionicons name="location" size={14} color="#D1D5DB" className="mb-1" /><Text className="text-[16px] font-bold text-gray-900">3,22 <Text className="text-[12px] font-medium text-gray-400">km</Text></Text><Text className="text-[10px] text-gray-400">Distance</Text></View>
                                <View className="flex-1 p-4 items-center"><Ionicons name="stopwatch" size={14} color="#D1D5DB" className="mb-1" /><Text className="text-[16px] font-bold text-gray-900">36:22 <Text className="text-[12px] font-medium text-gray-400">km</Text></Text><Text className="text-[10px] text-gray-400">Pace</Text></View>
                            </View>
                            <View className="flex-row">
                                <View className="flex-1 p-4 items-center border-r border-gray-50"><Ionicons name="flame" size={14} color="#D1D5DB" className="mb-1" /><Text className="text-[16px] font-bold text-gray-900">294 <Text className="text-[12px] font-medium text-gray-400">kCal</Text></Text><Text className="text-[10px] text-gray-400">Total Energy</Text></View>
                                <View className="flex-1 p-4 items-center"><Ionicons name="heart" size={14} color="#D1D5DB" className="mb-1" /><Text className="text-[16px] font-bold text-gray-900">128 <Text className="text-[12px] font-medium text-gray-400">bpm</Text></Text><Text className="text-[10px] text-gray-400">Heart Rate</Text></View>
                            </View>
                        </View>

                        {/* 3. Insight Text */}
                        <View className="bg-white rounded-[24px] p-5 border border-purple-100 shadow-sm mb-10">
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="walk" size={16} color="#8B5CF6" />
                                    <Text className="text-[13px] font-bold text-gray-900">Recovery Walk</Text>
                                </View>
                                <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
                            </View>
                            <Text className="text-[13px] text-gray-600 leading-5">This 3.22 km Indoor Walk kept you squarely in the Low Aerobic zone, which is a smart move given your current Overtraining Cardio Status...</Text>
                        </View>

                        {/* --- NEW MODULAR SECTIONS --- */}
                        <CardioImpactCard />
                        <PerceivedEffortCard />
                        <HeartRateCard />
                        <SplitsCard />

                    </ScrollView>

                    {/* Bottom Sheets */}
                    <ActivityShareSheet ref={shareSheetRef} />
                </View>
            </MenuProvider>
        </BottomSheetModalProvider>
    );
}