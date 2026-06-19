import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SleepNeededSheetRef = BottomSheetModal;

export const SleepNeededSheet = forwardRef<SleepNeededSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['85%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">

                <View className="pb-6 border-b border-[#1E293B] flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Sleep needed</Text>
                        <Text className="text-sm text-slate-400 mt-1">Calculation methodology</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Calculation Engine Interface */}
                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8">
                    <Text className="text-xs font-semibold text-slate-500 mb-6">Algorithm breakdown</Text>

                    <View className="flex-col gap-4">
                        <View className="flex-row justify-between items-center bg-[#090D16] p-4 rounded-2xl border border-[#1E293B]">
                            <Text className="text-sm font-medium text-slate-400">Sleep goal</Text>
                            <Text className="text-base font-bold text-white">7:30:00</Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-[#090D16] p-4 rounded-2xl border border-[#1E293B]">
                            <Text className="text-sm font-medium text-slate-400">Recent strain</Text>
                            <Text className="text-base font-bold text-white">0:00:00</Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-[#090D16] p-4 rounded-2xl border border-[#1E293B] mb-2">
                            <Text className="text-sm font-medium text-slate-400">Sleep debt</Text>
                            <Text className="text-base font-bold text-rose-500">+ 1:25:00</Text>
                        </View>

                        <View className="border-t border-[#2D3748] pt-4 mt-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-base font-bold text-[#4DB9F2]">Sleep needed</Text>
                                <Text className="text-2xl font-bold text-[#4DB9F2]">8:55:00</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Definitions List */}
                <View className="flex-col gap-3">
                    <Text className="text-sm font-semibold text-slate-500 mb-2 ml-1">Definitions</Text>

                    <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-col gap-1">
                        <Text className="text-sm font-bold text-slate-200">Sleep Goal</Text>
                        <Text className="text-xs text-slate-400 leading-5">The base duration needed every 24 hours before accounting for other factors.</Text>
                    </View>

                    <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-col gap-1">
                        <Text className="text-sm font-bold text-slate-200">Recent Strain</Text>
                        <Text className="text-xs text-slate-400 leading-5">The additional time needed based on your recent Strain score.</Text>
                    </View>

                    <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-col gap-1">
                        <Text className="text-sm font-bold text-slate-200">Sleep Debt</Text>
                        <Text className="text-xs text-slate-400 leading-5">The additional time needed to catch up with your previous 7-day sleep deficit.</Text>
                    </View>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});