import { Ionicons } from '@expo/vector-icons';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, getYear, isAfter, isBefore, isSameDay, isSameMonth, setMonth, setYear, startOfDay, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onBack: () => void;
    onDone: (dateStr: string) => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_HEADER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CustomDateView = ({ onBack, onDone }: Props) => {
    const today = startOfDay(new Date());

    // State for the currently viewed calendar page
    const [viewDate, setViewDate] = useState(today);
    // State for the user's selected end date
    const [selectedDate, setSelectedDate] = useState(today);
    // State to toggle the Month/Year picker overlay
    const [showPicker, setShowPicker] = useState(false);

    // --- Actions ---
    const handlePrevMonth = () => setViewDate(subMonths(viewDate, 1));
    const handleNextMonth = () => setViewDate(addMonths(viewDate, 1));
    const handleDone = () => onDone(`Until ${format(selectedDate, 'dd/MM/yy')}`);
    const handleReset = () => {
        setSelectedDate(today);
        setViewDate(today);
    };

    // --- Calendar Generation (using date-fns) ---
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    // --- Sub-component: Month/Year Picker ---
    const renderPicker = () => (
        <View className="mb-6 bg-gray-50 p-4 rounded-2xl">
            {/* Year Selector */}
            <View className="flex-row items-center justify-between mb-6 px-4">
                <TouchableOpacity onPress={() => setViewDate(setYear(viewDate, getYear(viewDate) - 1))}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[18px] font-bold text-gray-900">{getYear(viewDate)}</Text>
                <TouchableOpacity onPress={() => setViewDate(setYear(viewDate, getYear(viewDate) + 1))}>
                    <Ionicons name="chevron-forward" size={24} color="#111827" />
                </TouchableOpacity>
            </View>

            {/* Months Grid */}
            <View className="flex-row flex-wrap justify-between gap-y-4">
                {MONTHS.map((m, idx) => {
                    const isCurrentMonth = viewDate.getMonth() === idx;
                    return (
                        <TouchableOpacity
                            key={m}
                            onPress={() => {
                                setViewDate(setMonth(viewDate, idx));
                                setShowPicker(false);
                            }}
                            className={`w-[30%] py-3 items-center rounded-xl ${isCurrentMonth ? 'bg-gray-900' : 'bg-white'}`}
                        >
                            <Text className={`font-bold ${isCurrentMonth ? 'text-white' : 'text-gray-600'}`}>{m}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <View className="px-5 pt-2 pb-8">
            {/* Header controls */}
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity
                    onPress={() => setShowPicker(!showPicker)}
                    className="flex-row items-center gap-2"
                >
                    <Text className="text-[20px] font-bold text-gray-900">{format(viewDate, 'MMMM yyyy')}</Text>
                    <Ionicons name={showPicker ? "chevron-up" : "chevron-down"} size={20} color="#111827" />
                </TouchableOpacity>

                {!showPicker && (
                    <View className="flex-row items-center gap-6">
                        <TouchableOpacity onPress={handlePrevMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-back" size={22} color="#111827" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-forward" size={22} color="#111827" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Body */}
            {showPicker ? renderPicker() : (
                <View className="mb-6">
                    {/* Days Header */}
                    <View className="flex-row justify-between mb-4">
                        {DAYS_HEADER.map(day => (
                            <Text key={day} className="w-[14%] text-center text-[12px] font-bold text-gray-300">{day}</Text>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View className="flex-row flex-wrap">
                        {calendarDays.map((day, idx) => {
                            const isSameMonthAsView = isSameMonth(day, viewDate);
                            const isSelected = isSameDay(day, selectedDate);
                            const isPast = isBefore(day, today); // Prevent selecting past days
                            const isStart = isSameDay(day, today);
                            const inRange = isAfter(day, today) && isBefore(day, selectedDate);

                            return (
                                <TouchableOpacity
                                    key={idx}
                                    disabled={isPast || !isSameMonthAsView}
                                    onPress={() => setSelectedDate(day)}
                                    className="w-[14%] items-center justify-center py-2 relative"
                                >
                                    {/* Range Highlight Mock */}
                                    {inRange && <View className="absolute inset-y-2 left-0 right-0 bg-gray-50" />}
                                    {(isStart && isAfter(selectedDate, today)) && <View className="absolute inset-y-2 left-1/2 right-0 bg-gray-50" />}
                                    {(isSelected && isAfter(selectedDate, today)) && <View className="absolute inset-y-2 left-0 right-1/2 bg-gray-50" />}

                                    <View className={`w-[34px] h-[34px] items-center justify-center rounded-full z-10 
                                        ${isSelected ? 'bg-gray-900' : isStart ? 'bg-blue-50' : 'bg-transparent'}`}
                                    >
                                        <Text className={`text-[12px] font-bold 
                                            ${!isSameMonthAsView || isPast ? 'text-gray-300' :
                                                isSelected ? 'text-white' :
                                                    isStart ? 'text-blue-500' : 'text-gray-900'}`}
                                        >
                                            {format(day, 'd')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}

            {!showPicker && (
                <Text className="text-center text-[11px] font-bold text-gray-500 mb-8">
                    Selected: {format(today, 'dd MMMM yyyy')} - <Text className="text-gray-900">{format(selectedDate, 'dd MMMM yyyy')}</Text>
                </Text>
            )}

            {/* Actions */}
            <View className="gap-4">
                <TouchableOpacity onPress={handleDone} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onBack} className="h-[40px] items-center justify-center">
                    <Text className="text-gray-400 font-bold text-[15px]">Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};