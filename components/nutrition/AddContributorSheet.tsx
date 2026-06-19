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
    const snapPoints = useMemo(() => ['65%'], []); // Adjusted for vertical layout
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const timeString = useMemo(() => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}.${strMinutes} ${ampm}`;
    }, [date]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const handleAdd = () => {
        onAdd(amount, timeString);
        setAmount(0);
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
            handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Header (Re-arranged) */}
                <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
                    <Text className="text-[20px] text-[#F1F5F9] font-bold">{title}</Text>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-6">
                    {/* Counter Block */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-6 w-full items-center mb-6">
                        <Text className="text-[#64748B] text-[15px] mb-4">Amount to add</Text>
                        
                        <View className="flex-row items-center justify-between w-full">
                            <TouchableOpacity
                                onPress={() => setAmount(Math.max(0, amount - 1))}
                                className="w-14 h-14 bg-[#0F172A] rounded-[16px] border border-[#1E2D4A] items-center justify-center"
                            >
                                <Ionicons name="remove" size={24} color="#F1F5F9" />
                            </TouchableOpacity>

                            <View className="items-center flex-1">
                                <Text className="text-[64px] text-[#F1F5F9] leading-none tracking-tight">{amount}</Text>
                                <Text className="text-[18px] text-[#4DB9F2] mt-2">{unit}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setAmount(amount + 1)}
                                className="w-14 h-14 bg-[#0F172A] rounded-[16px] border border-[#4DB9F2]/30 items-center justify-center"
                            >
                                <Ionicons name="add" size={24} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Controls Row */}
                    <View className="flex-row items-center justify-between gap-4 mb-8">
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            className="flex-1 flex-row items-center justify-between bg-[#151E33] rounded-[20px] px-5 py-4 border border-[#1E2D4A]"
                        >
                            <Text className="text-[#94A3B8] text-[15px]">Time</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-[#F1F5F9] text-[15px]">{timeString}</Text>
                                <Ionicons name="time-outline" size={18} color="#4DB9F2" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={handleEditGoal} 
                            className="bg-[#151E33] rounded-[20px] px-5 py-4 border border-[#1E2D4A] justify-center"
                        >
                            <Text className="text-[#4DB9F2] text-[15px]">Edit goal</Text>
                        </TouchableOpacity>
                    </View>

                    {showTimePicker && Platform.OS === 'ios' && (
                        <View className="absolute bottom-0 left-0 right-0 bg-[#151E33] z-50 p-4 border-t border-[#1E2D4A] rounded-t-[32px]">
                            <View className="flex-row justify-between items-center mb-4 px-2">
                                <Text className="text-[#F1F5F9] text-[16px]">Select Time</Text>
                                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                                    <Text className="text-[#4DB9F2] text-[16px]">Done</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={date}
                                mode="time"
                                is24Hour={false}
                                display="spinner"
                                themeVariant="dark"
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
                <View className="px-6 pb-6 pt-2">
                    <TouchableOpacity
                        onPress={handleAdd}
                        disabled={amount === 0}
                        activeOpacity={0.8}
                        className={`h-[56px] rounded-[16px] items-center justify-center ${amount === 0 ? 'bg-[#151E33] border border-[#1E2D4A]' : 'bg-[#4DB9F2]'}`}
                    >
                        <Text className={`text-[16px] ${amount === 0 ? 'text-[#64748B]' : 'text-[#090D16]'}`}>Add to contributions</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
