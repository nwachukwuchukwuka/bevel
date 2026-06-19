import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TargetStrainSheetRef = BottomSheetModal;

export const TargetStrainSheet = forwardRef<TargetStrainSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['60%'], []);

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
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">

                <View className="flex-row items-center justify-between pb-6 border-b border-[#1E293B] mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Target Strain Calibration</Text>
                        <Text className="text-xs text-slate-400 mt-1">Algorithm learning phase</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center gap-6 mb-8 px-2">
                    <View className="w-24 h-24 relative items-center justify-center">
                        {/* Technical Square Bracket Frame */}
                        <View className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4DB9F2]" />
                        <View className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#4DB9F2]" />
                        <View className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#4DB9F2]" />
                        <View className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4DB9F2]" />

                        <View className="bg-[#151E33] w-16 h-16 rounded-2xl border border-[#2D3748] items-center justify-center">
                            <Ionicons name="sync" size={28} color="#F59E0B" />
                        </View>
                    </View>

                    <View className="flex-1 flex-col gap-2">
                        <View className="flex-row items-center gap-2">
                            <View className="w-2 h-2 rounded-full bg-emerald-500" />
                            <Text className="text-sm font-semibold text-slate-300">Tracking Recoveries</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="w-2 h-2 rounded-full bg-emerald-500" />
                            <Text className="text-sm font-semibold text-slate-300">Measuring Strain</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="w-2 h-2 rounded-full bg-amber-500" />
                            <Text className="text-sm font-semibold text-amber-500">Calibrating baseline...</Text>
                        </View>
                    </View>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mb-auto">
                    <Text className="text-sm text-slate-400 leading-6">
                        Your Target Strain is calculated from your recent Recoveries and Strain baseline. Please allow <Text className="font-bold text-white">up to 2 weeks</Text> for the app to learn how to adjust your target strain.
                    </Text>
                </View>

                <View className="mt-4 border-t border-[#1E293B] pt-4">
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Acknowledge</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});