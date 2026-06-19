import { VO2_MAX_RANGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type VO2MaxInfoSheetRef = BottomSheetModal;

export const VO2MaxInfoSheet = forwardRef<VO2MaxInfoSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['75%'], []);

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
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-6 pt-4">

                <View className="px-2 pb-6 border-b border-[#1E293B]">
                    <Text className="text-2xl font-bold text-slate-100 mb-2">Aerobic capacity scale</Text>
                    <Text className="text-sm text-slate-400 leading-5">
                        These reference metrics are standardized to your age (30) and sex (female).
                    </Text>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-row justify-between items-center mt-6">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#1E293B]">
                            <Ionicons name="stats-chart" size={18} color="#F59E0B" />
                        </View>
                        <View>
                            <Text className="text-xs text-slate-400 font-medium">Your current baseline</Text>
                            <Text className="text-lg font-bold text-slate-100">29.9 score</Text>
                        </View>
                    </View>
                    <View className="bg-orange-950/20 px-3 py-1.5 rounded-xl border border-orange-500/20">
                        <Text className="text-xs font-bold text-orange-500">Fair condition</Text>
                    </View>
                </View>

                <View className="gap-3 mt-6 mb-8">
                    {VO2_MAX_RANGES.map((item) => {
                        const isActive = item.label === 'Fair';
                        return (
                            <View
                                key={item.id}
                                className={`flex-row justify-between items-center px-4 py-4 rounded-xl border ${isActive
                                    ? 'bg-orange-950/20 border-orange-500/20'
                                    : 'bg-[#1E293B40] border-[#1E293B]'
                                    }`}
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className={`w-3 h-3 rounded-full ${isActive ? 'bg-[#F59E0B]' : 'bg-[#1E293B]'}`} />
                                    <Text className={`text-base font-semibold ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                                        {item.label}
                                    </Text>
                                </View>
                                <Text className={`text-base font-bold ${isActive ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                                    {item.range}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <Text className="text-center text-xs text-slate-500 px-4 leading-5">
                    These standardized metrics are derived from the Fitness Registry and Importance of Exercise National Database (FRIEND).
                </Text>

            </BottomSheetView>
        </BottomSheetModal>
    );
});