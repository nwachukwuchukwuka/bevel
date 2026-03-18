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
            handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-2" style={{ paddingBottom: insets.bottom || 20 }}>
                {/* Tabs */}
                <View className="flex-row items-center border-b border-gray-100 mb-6">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        const color = getTabColor(tab);
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 flex-row items-center justify-center py-4 border-b-2 ${isActive ? 'border-gray-900' : 'border-transparent'}`}
                            >
                                <View
                                    className="w-4 h-4 rounded-full border-2 mr-2 items-center justify-center"
                                    style={{ borderColor: color, opacity: isActive ? 1 : 0.3 }}
                                >
                                    <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                                </View>
                                <Text className={`text-[13px] font-semibold ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Month/Year */}
                <View className="mb-6">
                    <Text className="text-[24px] font-bold text-gray-900">September</Text>
                    <Text className="text-[14px] font-medium text-gray-300">2025</Text>
                </View>

                {/* Weekdays */}
                <View className="flex-row justify-between mb-6">
                    {DAYS.map(day => (
                        <Text key={day} className="flex-1 text-center text-[12px] font-medium text-gray-400">
                            {day}
                        </Text>
                    ))}
                </View>

                {/* Calendar Grid */}
                <View className="flex-row flex-wrap pb-6">
                    {/* Empty offsets */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <View key={`offset-${i}`} className="w-[14.28%] h-24" />
                    ))}

                    {calendarItems.map((item) => {
                        const isDateSelected = selectedDate.getDate() === item.day && selectedDate.getMonth() === 8;
                        const isSpecialDay = item.day === 11; // Day 11 is highlighted in screenshot
                        const isToday = item.day === 14; // Day 14 is "Today" with blue text
                        const ringColor = getTabColor(activeTab);

                        return (
                            <TouchableOpacity
                                key={item.day}
                                className="w-[14.28%] items-center justify-center mb-6"
                                onPress={() => handleSelectDay(item.day)}
                            >
                                <View
                                    className={`items-center justify-between py-3 rounded-full w-[85%] aspect-[1/2.2] border ${isSpecialDay || isDateSelected ? 'bg-white border-gray-100' : 'border-transparent'}`}
                                >
                                    {/* Metric Ring */}
                                    <View className="w-10 h-10 items-center justify-center">
                                        {/* Background Ring */}
                                        <View className="w-8 h-8 rounded-full border-[3px] border-gray-50" />

                                        {/* Metric Arc (Mock) */}
                                        {item.score > 0 && (
                                            <View
                                                className="absolute w-8 h-8 rounded-full border-[3px] border-t-transparent border-l-transparent"
                                                style={{
                                                    borderColor: ringColor,
                                                    transform: [{ rotate: '45deg' }],
                                                }}
                                            />
                                        )}

                                        {/* Small inner dot if score > 0 */}
                                        {item.score > 0 && (
                                            <View className="absolute w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ringColor }} />
                                        )}
                                    </View>

                                    {/* Day Number */}
                                    <Text className={`text-[14px] font-bold ${isToday ? 'text-blue-500' : 'text-gray-900'}`}>
                                        {item.day}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Bottom Actions */}
                <View className="flex-row items-center justify-between mt-auto py-5 border-t border-gray-100">
                    <TouchableOpacity onPress={() => onDateSelect(new Date())}>
                        <Text className="text-blue-500 font-bold text-[16px]">Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1">
                        <Text className="text-gray-400 font-bold text-[16px]">Go to</Text>
                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
