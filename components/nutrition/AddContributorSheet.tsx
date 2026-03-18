import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddContributorSheetRef = BottomSheetModal;

interface Props {
    title: string;
    unit: string;
    onAdd: (amount: number, time: string) => void;
    onEditGoal?: () => void;
}

export const AddContributorSheet = forwardRef<AddContributorSheetRef, Props>(({ title, unit, onAdd, onEditGoal }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['50%'], []);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const timeString = useMemo(() => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}.${strMinutes} ${ampm}`;
    }, [date]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const handleAdd = () => {
        onAdd(amount, timeString);
        setAmount(0); // Reset for next time
        (ref as any).current?.dismiss();
    };

    const handleEditGoal = () => {
        (ref as any).current?.dismiss();
        if (onEditGoal) onEditGoal();
    };

    const onTimeChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        setDate(currentDate);
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            stackBehavior="push"
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 40 }}
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Header */}
                <View className="flex-row items-center px-6 pt-4 pb-12">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center mr-6">
                        <Text className="font-bold text-[15px] text-gray-400">{title}</Text>
                    </View>
                </View>

                <View className="flex-1 px-8 items-center">
                    {/* Counter Row */}
                    <View className="flex-row items-center w-full justify-between mb-2">
                        <TouchableOpacity
                            onPress={() => setAmount(Math.max(0, amount - 1))}
                            className="w-16 h-16 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
                        >
                            <Ionicons name="remove" size={28} color="#1A1A1A" />
                        </TouchableOpacity>

                        <View className="flex-row items-baseline gap-1">
                            <Text className="text-[56px] font-bold text-gray-900">{amount}</Text>
                            <Text className="text-[28px] font-bold text-gray-900">{unit}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setAmount(amount + 1)}
                            className="w-16 h-16 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
                        >
                            <Ionicons name="add" size={28} color="#1A1A1A" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleEditGoal} className="mb-8">
                        <Text className="text-gray-400 font-bold text-[13px]">Edit Goal</Text>
                    </TouchableOpacity>

                    {/* Time Selector */}
                    <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        className="w-full flex-row items-center justify-between bg-white rounded-2xl px-5 py-4 mb-8 border border-gray-100"
                    >
                        <Text className="text-gray-500 font-bold text-[15px]">Time</Text>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-gray-900 font-bold text-[15px]">{timeString}</Text>
                            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                        </View>
                    </TouchableOpacity>

                    {showTimePicker && Platform.OS === 'ios' && (
                        <View className="absolute bottom-0 left-0 right-0 bg-white z-50 p-4 border-t border-gray-100 rounded-t-3xl">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="font-bold text-gray-900">Select Time</Text>
                                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                                    <Text className="text-blue-500 font-bold">Done</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={date}
                                mode="time"
                                is24Hour={false}
                                display="spinner"
                                themeVariant="light"
                                onChange={onTimeChange}
                            />
                        </View>
                    )}

                    {showTimePicker && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}
                </View>

                {/* Footer Button */}
                <View className="px-5 pb-8">
                    <TouchableOpacity
                        onPress={handleAdd}
                        disabled={amount === 0}
                        activeOpacity={0.8}
                        className={`h-[64px] rounded-[28px] items-center justify-center shadow-lg shadow-black/5 ${amount === 0 ? 'bg-gray-300' : 'bg-[#1A1A1A]'}`}
                    >
                        <Text className="text-white font-bold text-[18px]">Add to contributions</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
