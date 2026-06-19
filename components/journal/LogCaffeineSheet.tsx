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
    const snapPoints = useMemo(() => ['55%'], []);
    const [amount, setAmount] = useState(initialAmount);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);
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
                        <Text className="text-2xl font-bold text-slate-100">Log Caffeine</Text>
                        <Text className="text-sm text-slate-400 mt-1">Record a new journal entry</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            onPress={onOpenInfo}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="information-circle-outline" size={20} color="#F59E0B" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={dismiss}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row gap-4 mb-4 flex-1">

                    <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-1 items-center justify-center relative overflow-hidden">
                        <View className="absolute inset-0 items-center justify-end opacity-20">
                            <LinearGradient
                                colors={['#F59E0B', '#B45309']}
                                style={{ width: '100%', height: `${Math.min((amount / 200) * 100, 100)}%` }}
                            />
                        </View>

                        <Text className="text-xs font-semibold text-slate-500 mb-4 z-10">Caffeine metric</Text>

                        <View className="flex-row items-center gap-4 z-10">
                            <TouchableOpacity
                                onPress={() => setAmount(Math.max(0, amount - 10))}
                                activeOpacity={0.7}
                                className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center"
                            >
                                <Ionicons name="remove" size={24} color="#4DB9F2" />
                            </TouchableOpacity>
                            <View className="items-center bg-[#090D16]/80 px-4 py-2 rounded-2xl border border-[#2D3748]">
                                <Text className="text-3xl font-bold text-white mb-1">
                                    {amount.toFixed(1).replace('.', ',')}
                                </Text>
                                <Text className="text-sm text-[#F59E0B] font-medium">mg</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setAmount(amount + 10)}
                                activeOpacity={0.7}
                                className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center"
                            >
                                <Ionicons name="add" size={24} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-[30%] bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-col justify-center"
                    >
                        <Text className="text-xs font-semibold text-slate-500 mb-1">Time</Text>
                        <Text className="text-base font-bold text-white mb-4">11.11 AM</Text>
                        <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center mt-auto">
                            <Ionicons name="time-outline" size={16} color="#4DB9F2" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mt-2 border-t border-[#1E293B] pt-4">
                    <TouchableOpacity
                        onPress={() => { onSave(amount, '11.11 AM'); dismiss(); }}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Add to journal</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});