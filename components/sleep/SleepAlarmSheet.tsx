import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    const snapPoints = useMemo(() => ['85%'], []);

    const [view, setView] = useState<'main' | 'time' | 'type'>('main');
    const [time, setTime] = useState(new Date(new Date().setHours(5, 0, 0, 0)));
    const [alarmType, setAlarmType] = useState('Regular');
    const [haptic, setHaptic] = useState('Progressive');
    const [wakeWindow, setWakeWindow] = useState('15 mins');

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

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
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            stackBehavior='push'
            enableDynamicSizing={false}
        >
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">

                <View className="flex-row items-center justify-between mb-8 pb-4 border-b border-[#1E293B]">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Sleep alarm settings</Text>
                        <Text className="text-xs text-slate-400 mt-1">Configure wake-up parameters</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {view === 'time' && (
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <Text className="text-sm font-semibold text-slate-400 mb-6">Wake up time</Text>
                        <View className="items-center justify-center bg-[#090D16] border border-[#1E293B] rounded-2xl py-4 mb-6">
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="spinner"
                                textColor="#FFFFFF"
                                themeVariant="dark"
                                onChange={(e, selectedDate) => selectedDate && setTime(selectedDate)}
                                style={{ width: 250, height: 180 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setView('main')}
                            activeOpacity={0.8}
                            className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Done</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {view === 'type' && (
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <Text className="text-sm font-semibold text-slate-400 mb-6">Select alarm type</Text>
                        <View className="gap-3 mb-8">
                            {ALARM_TYPES.map(type => {
                                const isActive = alarmType === type;
                                return (
                                    <TouchableOpacity
                                        key={type}
                                        onPress={() => setAlarmType(type)}
                                        activeOpacity={0.8}
                                        className={`flex-row items-center justify-between p-4 rounded-xl border ${isActive
                                            ? 'bg-[#1E293B] border-[#4DB9F2]'
                                            : 'bg-[#090D16] border-[#1E293B]'
                                            }`}
                                    >
                                        <Text className={`text-base font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                            {type}
                                        </Text>
                                        {isActive && <Ionicons name="checkmark-circle" size={20} color="#4DB9F2" />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity
                            onPress={() => setView('main')}
                            activeOpacity={0.8}
                            className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Done</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {view === 'main' && (
                    <View className="flex-col gap-6">

                        <View className="flex-row gap-4">
                            <TouchableOpacity
                                onPress={() => setView('time')}
                                activeOpacity={0.8}
                                className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-col justify-between"
                            >
                                <Ionicons name="sunny-outline" size={20} color="#F59E0B" className="mb-4" />
                                <View>
                                    <Text className="text-xs font-semibold text-slate-500 mb-1">Wake-up time</Text>
                                    <Text className="text-2xl font-bold text-white">{formatTime(time)}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setView('type')}
                                activeOpacity={0.8}
                                className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-col justify-between"
                            >
                                <Ionicons name="options-outline" size={20} color="#4DB9F2" className="mb-4" />
                                <View>
                                    <Text className="text-xs font-semibold text-slate-500 mb-1">Alarm type</Text>
                                    <Text className="text-lg font-bold text-white">{alarmType}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-xl flex-row items-start gap-3">
                            <Ionicons name="information-circle" size={20} color="#4DB9F2" />
                            <Text className="flex-1 text-xs text-slate-400 leading-5">
                                {alarmType === 'Smart alarm' ? 'The alarm will wake you up during the lightest part of your sleep.' : 'The alarm will go off exactly at the time you set.'}
                            </Text>
                        </View>

                        {alarmType === 'Smart alarm' && (
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                                <Text className="text-xs font-semibold text-slate-500 mb-4">Wake-up window</Text>
                                <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                                    {WINDOWS.map((win) => {
                                        const isActive = wakeWindow === win;
                                        return (
                                            <TouchableOpacity
                                                key={win}
                                                onPress={() => setWakeWindow(win)}
                                                activeOpacity={0.8}
                                                className={`flex-1 items-center justify-center py-2.5 rounded-lg border ${isActive ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                                    }`}
                                            >
                                                <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                                    {win}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        )}

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-4">
                            <Text className="text-xs font-semibold text-slate-500 mb-4">Alarm haptic</Text>
                            <View className="flex-row flex-wrap gap-3">
                                {HAPTICS.map((hap) => {
                                    const isActive = haptic === hap;
                                    return (
                                        <TouchableOpacity
                                            key={hap}
                                            onPress={() => setHaptic(hap)}
                                            activeOpacity={0.8}
                                            className={`px-4 py-2 rounded-xl border ${isActive ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#090D16] border-[#1E293B]'
                                                }`}
                                        >
                                            <Text className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                                {hap}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push('/sleep/how-to-alarm')}
                            activeOpacity={0.7}
                            className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between mb-8"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-[#1E293B] rounded-lg items-center justify-center border border-[#2D3748]">
                                    <Ionicons name="help" size={16} color="#4DB9F2" />
                                </View>
                                <Text className="text-sm font-semibold text-slate-200">How to use the sleep alarm</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] mb-10"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Save to watch</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});