import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type LogHydrationSheetRef = BottomSheetModal;

interface Props {
    onSave: (amount: number, time: string) => void;
}

export const LogHydrationSheet = forwardRef<LogHydrationSheetRef, Props>(({ onSave }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const [amount, setAmount] = useState(250);

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
            <BottomSheetView className="flex-1 px-5 pt-5 pb-8">

                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={dismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <Text className="text-[15px] font-bold text-gray-900">Log Hydration</Text>
                    <View className="w-8" />
                </View>

                <View className="items-center mb-6">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Text className="text-[28px] font-bold text-gray-900">{amount.toFixed(1).replace('.', ',')} ml</Text>
                        <Ionicons name="pencil" size={16} color="#9CA3AF" />
                    </View>

                    <View className="flex-row items-center gap-8">
                        <TouchableOpacity onPress={() => setAmount(Math.max(0, amount - 50))} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Ionicons name="remove" size={24} color="#111827" />
                        </TouchableOpacity>

                        {/* Glass Visual Mock */}
                        <View className="w-16 h-20 bg-blue-50 border-x-4 border-b-4 border-blue-100 rounded-b-xl items-center justify-end overflow-hidden">
                            <LinearGradient
                                colors={['#60A5FA', '#2563EB']}
                                style={{ width: '100%', height: `${Math.min((amount / 500) * 100, 100)}%` }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => setAmount(amount + 50)} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Ionicons name="add" size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row items-center justify-between border border-gray-200 rounded-[16px] px-4 py-4 mb-6 mt-auto">
                    <Text className="text-[15px] font-bold text-gray-900">Time</Text>
                    <View className="flex-row items-center gap-1">
                        <Text className="text-[15px] text-gray-600">11.13 AM</Text>
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                    </View>
                </View>

                <TouchableOpacity onPress={() => { onSave(amount, '11.13 AM'); dismiss(); }} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Add to journal</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});