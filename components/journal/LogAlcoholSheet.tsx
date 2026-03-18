import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type LogAlcoholSheetRef = BottomSheetModal;

interface Props {
    initialAmount: number;
    onSave: (amount: number, time: string) => void;
    onDelete?: () => void;
    isEditing?: boolean;
}

export const LogAlcoholSheet = forwardRef<LogAlcoholSheetRef, Props>(({ initialAmount, onSave, onDelete, isEditing }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['45%'], []);
    const [amount, setAmount] = useState(initialAmount);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleComponent={null}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-5">

                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={dismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <Text className="text-[15px] font-bold text-gray-900">Log Alcohol</Text>
                    {isEditing ? (
                        <TouchableOpacity onPress={() => { onDelete?.(); dismiss(); }} className="w-8 h-8 bg-red-50 rounded-full items-center justify-center">
                            <Ionicons name="trash" size={16} color="#EF4444" />
                        </TouchableOpacity>
                    ) : <View className="w-8" />}
                </View>

                {/* Amount Selector */}
                <View className="flex-row items-center justify-center gap-6 mb-8">
                    <TouchableOpacity onPress={() => setAmount(Math.max(0, amount - 0.5))} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                        <Ionicons name="remove" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-[32px] font-bold text-gray-900 tracking-tighter">{amount.toFixed(1).replace('.', ',')} <Text className="text-[20px] font-bold">drinks</Text></Text>
                    <TouchableOpacity onPress={() => setAmount(amount + 0.5)} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                        <Ionicons name="add" size={24} color="#111827" />
                    </TouchableOpacity>
                </View>

                {/* Time Row */}
                <View className="flex-row items-center justify-between border border-gray-200 rounded-[16px] px-4 py-4 mb-6">
                    <Text className="text-[15px] font-bold text-gray-900">Time</Text>
                    <View className="flex-row items-center gap-1">
                        <Text className="text-[15px] text-gray-600">4.35 PM</Text>
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => { onSave(amount, '4.35 PM'); dismiss(); }}
                    className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mt-auto"
                >
                    <Text className="text-white font-semibold text-[16px]">{isEditing ? 'Save' : 'Add to journal'}</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});