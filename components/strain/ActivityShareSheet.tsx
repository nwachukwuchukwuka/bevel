import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ActivityShareSheetRef = BottomSheetModal;

export const ActivityShareSheet = forwardRef<ActivityShareSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['70%'], []);

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
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-5 pt-3">

                <View className="px-2 pb-6 border-b border-[#1E293B] flex-row justify-between items-center mb-8">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Export</Text>
                        <Text className="text-sm text-slate-400 mt-1">Generate sharing pass</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Digital Export Pass Graphic */}
                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8 flex-col items-center relative overflow-hidden">
                    <View className="absolute -top-10 -right-10 w-32 h-32 bg-[#4DB9F2]/10 rounded-full blur-xl" />
                    <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-xl" />

                    <View className="w-16 h-16 bg-[#1E293B] rounded-2xl border border-[#2D3748] items-center justify-center mb-6">
                        <Ionicons name="walk" size={32} color="#F59E0B" />
                    </View>

                    <Text className="text-2xl font-bold text-white mb-2">Indoor Walk</Text>
                    <View className="bg-[#090D16] px-3 py-1.5 rounded-lg border border-[#1E293B] mb-8">
                        <Text className="text-xs font-semibold text-slate-400">14 September 2025 at 8.22 AM</Text>
                    </View>

                    <View className="flex-row justify-between w-full pt-6 border-t border-[#1E293B] border-dashed">
                        <View className="flex-col items-center">
                            <Text className="text-xl font-bold text-white mb-1">45m</Text>
                            <Text className="text-[10px] font-bold text-[#4DB9F2]">DURATION</Text>
                        </View>
                        <View className="flex-col items-center">
                            <Text className="text-xl font-bold text-white mb-1">294 <Text className="text-xs text-slate-500">kCal</Text></Text>
                            <Text className="text-[10px] font-bold text-[#F59E0B]">ENERGY</Text>
                        </View>
                        <View className="flex-col items-center">
                            <Text className="text-xl font-bold text-white mb-1">128 <Text className="text-xs text-slate-500">bpm</Text></Text>
                            <Text className="text-[10px] font-bold text-[#EF4444]">AVG HR</Text>
                        </View>
                    </View>
                </View>

                <View className="mt-auto pt-4 border-t border-[#1E293B]">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-row gap-2"
                    >
                        <Ionicons name="share-social" size={18} color="#090D16" />
                        <Text className="text-[#090D16] font-bold text-base">Share activity pass</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});