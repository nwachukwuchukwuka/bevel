import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SleepAlarmSheetRef = BottomSheetModal;

const ALARM_TYPES = ['Smart alarm', 'Regular', 'Sleep needed', 'No alarm'];
const HAPTICS = ['Progressive', 'Gentle', 'Medium', 'Intense'];
const WINDOWS = ['10 mins', '15 mins', '20 mins'];

export const SleepAlarmSheet = forwardRef<SleepAlarmSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const snapPoints = useMemo(() => ['90%'], []);

    // State Management
    const [view, setView] = useState<'main' | 'time' | 'type'>('main');
    const [time, setTime] = useState(new Date(new Date().setHours(5, 0, 0, 0)));
    const [alarmType, setAlarmType] = useState('Regular');
    const [haptic, setHaptic] = useState('Progressive');
    const [wakeWindow, setWakeWindow] = useState('15 mins');

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    // Helper to format time manually to match "5.00 AM" format
    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${hours}.${minutes} ${ampm}`;
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#6B7280', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#1D2235' }}
            enableDynamicSizing={false}
        >
            <LinearGradient
                colors={['#373F61', '#1D2235']}
                className="flex-1 rounded-t-[24px] overflow-hidden"
            >
                {/* Mock Starry Background Elements */}
                <View className="absolute inset-0 opacity-30" pointerEvents="none">
                    <View className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full" />
                    <View className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full opacity-50" />
                    <View className="absolute top-40 left-1/3 w-1 h-1 bg-white rounded-full" />
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} className="px-5 pt-4">

                    {/* Header */}
                    <Text className="text-center font-bold text-[14px] text-white mb-6">Sleep alarm settings</Text>
                    <View className="items-center mb-8">
                        <Ionicons name="sunny-outline" size={24} color="#D1D5DB" className="mb-2" />
                        <TouchableOpacity
                            onPress={() => setView('time')}
                            className="flex-row items-center gap-2"
                        >
                            <Text className="text-[28px] font-bold text-white">{formatTime(time)}</Text>
                            <Ionicons name={view === 'time' ? "chevron-up" : "chevron-down"} size={20} color="#D1D5DB" />
                        </TouchableOpacity>
                        <Text className="text-[12px] font-medium text-gray-400">Wake-up time</Text>
                    </View>

                    {/* --- DYNAMIC VIEWS --- */}
                    {view === 'time' && (
                        <View className="bg-[#2A3047]/80 rounded-[24px] p-5 animate-fade-in">
                            <Text className="text-center font-bold text-white mb-4">Wake up time</Text>
                            <View className="h-48 items-center justify-center">
                                <DateTimePicker
                                    value={time}
                                    mode="time"
                                    display="spinner"
                                    textColor="#FFFFFF" // Works on iOS
                                    themeVariant="dark" // Forces dark mode styling on iOS
                                    onChange={(e, selectedDate) => selectedDate && setTime(selectedDate)}
                                    style={{ width: 250, height: 180 }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setView('main')} className="bg-[#4B5563] h-[56px] rounded-full items-center justify-center mt-4">
                                <Text className="text-white font-semibold text-[16px]">Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {view === 'type' && (
                        <View className="bg-[#2A3047]/80 rounded-[24px] p-5 animate-fade-in">
                            <Text className="text-center font-bold text-white mb-6">Select alarm type</Text>
                            <View className="gap-3 mb-6">
                                {ALARM_TYPES.map(type => (
                                    <TouchableOpacity
                                        key={type}
                                        onPress={() => setAlarmType(type)}
                                        className={`flex-row items-center justify-between p-4 rounded-xl border ${alarmType === type ? 'border-white bg-white/10' : 'border-[#4B5563]'}`}
                                    >
                                        <Text className="text-[15px] font-bold text-white">{type}</Text>
                                        {alarmType === type && <Ionicons name="checkmark" size={20} color="white" />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => setView('main')} className="bg-[#4B5563] h-[56px] rounded-full items-center justify-center">
                                <Text className="text-white font-semibold text-[16px]">Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {view === 'main' && (
                        <View className="animate-fade-in">
                            {/* Alarm Type */}
                            <Text className="text-[13px] font-medium text-gray-400 mb-2">Alarm type</Text>
                            <TouchableOpacity
                                onPress={() => setView('type')}
                                className="flex-row items-center justify-between bg-[#4B5563]/50 rounded-[16px] p-4 border border-[#6B7280]/50 mb-3"
                            >
                                <Text className="text-[16px] font-bold text-white">{alarmType}</Text>
                                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text className="text-[12px] text-gray-500 mb-8">
                                {alarmType === 'Smart alarm' ? 'The alarm will wake you up during the lightest part of your sleep.' : 'The alarm will go off exactly at the time you set.'}
                            </Text>

                            {/* Wake-up Window (Only if Smart Alarm is selected) */}
                            {alarmType === 'Smart alarm' && (
                                <View className="mb-8">
                                    <Text className="text-[13px] font-medium text-gray-400 mb-2">Wake-up window</Text>
                                    <View className="bg-[#4B5563]/30 rounded-[16px] overflow-hidden">
                                        {WINDOWS.map((win, idx) => (
                                            <TouchableOpacity
                                                key={win}
                                                onPress={() => setWakeWindow(win)}
                                                className={`flex-row items-center justify-between p-4 ${idx !== WINDOWS.length - 1 ? 'border-b border-[#4B5563]/50' : ''}`}
                                            >
                                                <Text className="text-[15px] font-bold text-white">{win}</Text>
                                                {wakeWindow === win && <Ionicons name="checkmark" size={20} color="white" />}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {/* Alarm Haptic */}
                            <Text className="text-[13px] font-medium text-gray-400 mb-2">Alarm haptic</Text>
                            <View className="bg-[#4B5563]/30 rounded-[16px] overflow-hidden mb-8">
                                {HAPTICS.map((hap, idx) => (
                                    <TouchableOpacity
                                        key={hap}
                                        onPress={() => setHaptic(hap)}
                                        className={`flex-row items-center justify-between p-4 ${idx !== HAPTICS.length - 1 ? 'border-b border-[#4B5563]/50' : ''} ${haptic === hap ? 'bg-white/10 border border-white rounded-xl' : ''}`}
                                    >
                                        <Text className="text-[15px] font-bold text-white">{hap}</Text>
                                        {haptic === hap && <Ionicons name="checkmark" size={20} color="white" />}
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Footer Actions */}
                            <TouchableOpacity
                                onPress={() => {
                                    router.push('/sleep/how-to-alarm');
                                }}
                                className="flex-row items-center justify-center gap-2 mb-6"
                            >
                                <Ionicons name="information-circle-outline" size={16} color="#D1D5DB" />
                                <Text className="text-[13px] font-bold text-white">How to use the sleep alarm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="bg-[#4B5563] h-[56px] rounded-full items-center justify-center mb-6">
                                <Text className="text-white font-semibold text-[16px]">Save to watch</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </BottomSheetScrollView>
            </LinearGradient>
        </BottomSheetModal>
    );
});