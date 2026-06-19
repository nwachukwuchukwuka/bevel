import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type CalendarSheetRef = BottomSheetModal;

interface Props {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
}

const TABS = ['Strain', 'Recovery', 'Sleep', 'Stress'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarSheet = forwardRef<CalendarSheetRef, Props>(({ selectedDate, onDateSelect }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['90%'], []);
    const [activeTab, setActiveTab] = useState('Strain');

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />,
        []
    );

    // September 2025 starts on Monday (1st)
    const startOffset = 1;
    const daysInMonth = 30;

    const calendarItems = useMemo(() => {
        const items = [];
        for (let i = 1; i <= daysInMonth; i++) {
            items.push({
                day: i,
                score: i < 14 ? 30 + Math.floor(Math.random() * 60) : 0, // Mock scores for past days
            });
        }
        return items;
    }, []);

    const getTabColor = (type: string) => {
        if (type === 'Strain') return '#F97316';
        if (type === 'Recovery') return '#22C55E';
        if (type === 'Sleep') return '#6366F1';
        if (type === 'Stress') return '#F43F5E';
        return '#E5E7EB';
    };

    const handleSelectDay = (day: number) => {
        const newDate = new Date(2025, 8, day);
        onDateSelect(newDate);
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: '#334155', width: 40 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-2 bg-[#090D16]" style={{ paddingBottom: insets.bottom || 20 }}>
                {/* Tabs */}
                <View className="flex-row items-center bg-slate-900/60 border border-slate-800/80 rounded-xl p-1 mb-6">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        const color = getTabColor(tab);
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${isActive ? 'bg-[#151E33] border border-slate-700/20' : ''}`}
                            >
                                <View
                                    className="w-1.5 h-1.5 rounded-full mr-2 items-center justify-center"
                                    style={{ backgroundColor: color, opacity: isActive ? 1 : 0.4 }}
                                />
                                <Text className={`text-[12px] font-semibold ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Month/Year with navigation arrows */}
                <View className="flex-row items-center justify-between mb-6">
                    <View>
                        <Text className="text-[20px] font-bold text-slate-100">September 2025</Text>
                        <Text className="text-[12px] font-medium text-slate-500 mt-0.5">Overview & History</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/20 items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/20 items-center justify-center">
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Weekdays */}
                <View className="flex-row justify-between mb-4">
                    {DAYS.map(day => (
                        <Text key={day} className="flex-1 text-center text-[12px] font-semibold text-slate-500">
                            {day}
                        </Text>
                    ))}
                </View>

                {/* Calendar Grid */}
                <View className="flex-row flex-wrap pb-6">
                    {/* Empty offsets */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <View key={`offset-${i}`} className="w-[14.28%] aspect-square" />
                    ))}

                    {calendarItems.map((item) => {
                        const isDateSelected = selectedDate.getDate() === item.day && selectedDate.getMonth() === 8;
                        const isSpecialDay = item.day === 11;
                        const isToday = item.day === 14;
                        const ringColor = getTabColor(activeTab);

                        return (
                            <TouchableOpacity
                                key={item.day}
                                className="w-[14.28%] aspect-square items-center justify-center mb-3"
                                onPress={() => handleSelectDay(item.day)}
                            >
                                <View
                                    className={`items-center justify-center w-10 h-10 rounded-full border ${isDateSelected ? 'bg-blue-600 border-blue-500' : isSpecialDay ? 'bg-[#151E33] border-slate-700/50' : 'bg-slate-900/30 border-transparent'}`}
                                >
                                    <Text className={`text-[13px] font-bold ${isDateSelected ? 'text-white' : isToday ? 'text-blue-400' : 'text-slate-100'}`}>
                                        {item.day}
                                    </Text>
                                    {item.score > 0 && !isDateSelected && (
                                        <View className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ backgroundColor: ringColor }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Bottom Actions */}
                <View className="flex-row items-center justify-between mt-auto py-4 border-t border-slate-800/80">
                    <TouchableOpacity
                        onPress={() => onDateSelect(new Date())}
                        className="bg-[#151E33] border border-slate-800/80 px-4 py-2 rounded-xl"
                    >
                        <Text className="text-blue-400 font-bold text-sm">Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1.5 bg-[#151E33] border border-slate-800/80 px-4 py-2 rounded-xl">
                        <Text className="text-slate-400 font-bold text-sm">Go to</Text>
                        <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
