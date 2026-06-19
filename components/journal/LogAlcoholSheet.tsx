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
    const snapPoints = useMemo(() => ['55%'], []);
    const [amount, setAmount] = useState(initialAmount);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-3">

                <View className="px-2 pb-6 border-b border-[#1E293B] flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Log Alcohol</Text>
                        <Text className="text-sm text-slate-400 mt-1">Record a new journal entry</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-4 mb-4 flex-1">
                    <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-1 items-center justify-center">
                        <Text className="text-xs font-semibold text-slate-500 mb-6">Serving count</Text>
                        <View className="flex-row items-center gap-5">
                            <TouchableOpacity
                                onPress={() => setAmount(Math.max(0, amount - 0.5))}
                                activeOpacity={0.7}
                                className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center"
                            >
                                <Ionicons name="remove" size={24} color="#4DB9F2" />
                            </TouchableOpacity>
                            <View className="items-center">
                                <Text className="text-4xl font-bold text-white mb-1">
                                    {amount.toFixed(1).replace('.', ',')}
                                </Text>
                                <Text className="text-sm text-slate-400 font-medium">drinks</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setAmount(amount + 0.5)}
                                activeOpacity={0.7}
                                className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center"
                            >
                                <Ionicons name="add" size={24} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="w-[35%] flex-col gap-4">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-1 justify-center"
                        >
                            <Text className="text-xs font-semibold text-slate-500 mb-1">Time</Text>
                            <Text className="text-base font-bold text-white mb-2">4.35 PM</Text>
                            <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                <Ionicons name="time-outline" size={16} color="#4DB9F2" />
                            </View>
                        </TouchableOpacity>

                        {isEditing && (
                            <TouchableOpacity
                                onPress={() => { onDelete?.(); dismiss(); }}
                                activeOpacity={0.7}
                                className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-4 flex-row items-center justify-center gap-2"
                            >
                                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                                <Text className="text-xs font-bold text-rose-500">Delete</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View className="mt-2 border-t border-[#1E293B] pt-4">
                    <TouchableOpacity
                        onPress={() => { onSave(amount, '4.35 PM'); dismiss(); }}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">
                            {isEditing ? 'Save changes' : 'Add to journal'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});