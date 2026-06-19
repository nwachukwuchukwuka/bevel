import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddManualSleepSheetRef = BottomSheetModal;

export const AddManualSleepSheet = forwardRef<AddManualSleepSheetRef>((props, ref) => {
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
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32, }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-5 pt-4">

                <View className="flex-row items-center justify-between pb-6 border-b border-[#1E293B]">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Add manual sleep</Text>
                        <Text className="text-sm text-slate-400 mt-1">Record a sleep event</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 mt-6">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-4">
                        <Text className="text-sm font-semibold text-slate-400 mb-4">Activity</Text>
                        <View className="flex-row items-center justify-between bg-[#090D16] p-4 rounded-2xl border border-[#1E293B]">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name="moon-outline" size={20} color="#4DB9F2" />
                                <Text className="text-base font-bold text-white">Asleep</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </View>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <Text className="text-sm font-semibold text-slate-400 mb-4">Time boundaries</Text>

                        <View className="flex-col gap-3">
                            <View className="flex-row items-center justify-between bg-[#090D16] p-4 rounded-2xl border border-[#1E293B]">
                                <Text className="text-sm font-bold text-slate-300">Starts</Text>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-base font-bold text-white">4.40 PM</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </View>

                            <View className="flex-row items-center justify-between bg-[#090D16] p-4 rounded-2xl border border-[#1E293B]">
                                <Text className="text-sm font-bold text-slate-300">Ends</Text>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-base font-bold text-white">5.40 PM</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-auto pt-4 border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save configuration</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});