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

    const [title, setTitle] = useState('Indoor Walk');
    const [isEditing, setIsEditing] = useState(false);

    const shareSheetRef = useRef<ActivityShareSheetRef>(null);

    return (
        <BottomSheetModalProvider>
            <MenuProvider>
                <View className="flex-1 bg-[#090D16]">
                    {/* Dark Terminal Header */}
                    <View className="px-5 pb-6 pt-5 border-b border-[#1E293B] bg-[#151E33] flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                        </TouchableOpacity>

                        <View className="flex-1 px-4">
                            {isEditing ? (
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    autoFocus
                                    onBlur={() => setIsEditing(false)}
                                    className="text-lg font-bold text-white border-b border-[#4DB9F2] pb-1 w-full"
                                    selectionColor="#4DB9F2"
                                />
                            ) : (
                                <Text className="text-xl font-bold text-white" numberOfLines={1}>{title}</Text>
                            )}
                            <Text className="text-xs text-slate-400 mt-1">14 September 2025 at 8.22 AM</Text>
                        </View>

                        <Menu>
                            <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                                <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                    <Ionicons name="options-outline" size={20} color="#94A3B8" />
                                </View>
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 220, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2C2C2C', paddingVertical: 4, marginTop: 40 } }}>
                                <MenuOption onSelect={() => setIsEditing(true)}>
                                    <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#2C2C2C]">
                                        <Text className="text-sm font-medium text-white">Edit title</Text>
                                        <Ionicons name="create-outline" size={18} color="#4DB9F2" />
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => shareSheetRef.current?.present()}>
                                    <View className="flex-row items-center justify-between px-4 py-3">
                                        <Text className="text-sm font-medium text-white">Share</Text>
                                        <Ionicons name="share-social-outline" size={18} color="#4DB9F2" />
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingTop: 24 }} className="px-5">

                        {/* Top Highlights Split */}
                        <View className="flex-row gap-4 mb-6">
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-3xl p-5 flex-col justify-between min-h-[140px]">
                                <Text className="text-sm font-semibold text-slate-400">Activity Strain</Text>
                                <View className="flex-row items-baseline gap-2">
                                    <Text className="text-5xl font-bold text-[#F59E0B]">31</Text>
                                    <Text className="text-base font-semibold text-slate-500">%</Text>
                                </View>
                                <View className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mt-4">
                                    <View className="h-full bg-[#F59E0B]" style={{ width: '31%' }} />
                                </View>
                            </View>

                            <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-3xl p-5 flex-col gap-4 justify-center">
                                <View className="flex-row items-center justify-between border-b border-[#1E293B] pb-3">
                                    <Text className="text-xs text-slate-400 font-semibold">Total Duration</Text>
                                    <Text className="text-base font-bold text-white">0:45:17</Text>
                                </View>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-xs text-slate-400 font-semibold">Active Time</Text>
                                    <Text className="text-base font-bold text-slate-300">0:45:17</Text>
                                </View>
                            </View>
                        </View>

                        {/* Telemetry Grid Nodes */}
                        <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
                            <TelemetryNode icon="location" value="3.22" unit="km" label="Distance" />
                            <TelemetryNode icon="stopwatch" value="36:22" unit="km" label="Pace" />
                            <TelemetryNode icon="flame" value="294" unit="kCal" label="Total Energy" />
                            <TelemetryNode icon="heart" value="128" unit="bpm" label="Heart Rate" />
                        </View>

                        {/* Integrated Context Board */}
                        <View className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 mb-10 flex-col">
                            <View className="flex-row items-center gap-3 mb-3">
                                <View className="w-8 h-8 rounded-lg bg-emerald-500/10 items-center justify-center border border-emerald-500/20">
                                    <Ionicons name="fitness-outline" size={16} color="#10B981" />
                                </View>
                                <Text className="text-sm font-bold text-emerald-400">Recovery Walk</Text>
                            </View>
                            <Text className="text-xs text-slate-300 leading-6">
                                This 3.22 km Indoor Walk kept you squarely in the Low Aerobic zone, which is a smart move given your current Overtraining Cardio Status.
                            </Text>
                        </View>

                        {/* External Metric Modules */}
                        <CardioImpactCard />
                        <PerceivedEffortCard />
                        <HeartRateCard />
                        <SplitsCard />

                    </ScrollView>

                    <ActivityShareSheet ref={shareSheetRef} />
                </View>
            </MenuProvider>
        </BottomSheetModalProvider>
    );
}

const TelemetryNode = ({ icon, value, unit, label }: any) => (
    <View className="w-[48%] bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-4">
        <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
            <Ionicons name={icon} size={16} color="#4DB9F2" />
        </View>
        <View className="flex-1">
            <View className="flex-row items-baseline gap-1">
                <Text className="text-lg font-bold text-white">{value}</Text>
                <Text className="text-[10px] text-slate-500 font-medium">{unit}</Text>
            </View>
            <Text className="text-[10px] text-slate-400 font-semibold">{label}</Text>
        </View>
    </View>
);