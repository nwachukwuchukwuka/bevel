import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type LogCaffeineSheetRef = BottomSheetModal;

interface Props {
    initialAmount: number;
    onSave: (amount: number, time: string) => void;
    onOpenInfo: () => void;
}

export const LogCaffeineSheet = forwardRef<LogCaffeineSheetRef, Props>(({ initialAmount, onSave, onOpenInfo }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['50%'], []);
    const [amount, setAmount] = useState(initialAmount);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
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
                    <Text className="text-[15px] font-bold text-gray-900">Log Caffeine</Text>
                    <TouchableOpacity onPress={onOpenInfo} className="w-8 h-8 border border-gray-200 rounded-full items-center justify-center">
                        <Ionicons name="information" size={16} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <View className="items-center mb-6">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Text className="text-[28px] font-bold text-gray-900">{amount.toFixed(1).replace('.', ',')} mg</Text>
                        <Ionicons name="pencil" size={16} color="#9CA3AF" />
                    </View>

                    <View className="flex-row items-center gap-8">
                        <TouchableOpacity onPress={() => setAmount(Math.max(0, amount - 10))} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Ionicons name="remove" size={24} color="#111827" />
                        </TouchableOpacity>

                        {/* Cup Visual Mock */}
                        <View className="w-20 h-16 relative items-center justify-end">
                            <View className="w-full h-full bg-orange-100 rounded-b-[30px] rounded-t-sm overflow-hidden absolute">
                                <LinearGradient colors={['#92400E', '#FCD34D']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} className="absolute bottom-0 w-full" style={{ height: `${Math.min((amount / 200) * 100, 100)}%` }} />
                            </View>
                            {/* Cup Handle */}
                            <View className="absolute -right-3 top-2 w-6 h-10 border-4 border-orange-100 rounded-r-full -z-10" />
                        </View>

                        <TouchableOpacity onPress={() => setAmount(amount + 10)} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Ionicons name="add" size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Row */}
                <View className="flex-row items-center justify-between border border-gray-200 rounded-[16px] px-4 py-4 mb-6 mt-auto">
                    <Text className="text-[15px] font-bold text-gray-900">Time</Text>
                    <View className="flex-row items-center gap-1">
                        <Text className="text-[15px] text-gray-600">11.11 AM</Text>
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                    </View>
                </View>

                <TouchableOpacity onPress={() => { onSave(amount, '11.11 AM'); dismiss(); }} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Add to journal</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});