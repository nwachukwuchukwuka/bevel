import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddManualSleepSheetRef = BottomSheetModal;

export const AddManualSleepSheet = forwardRef<AddManualSleepSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['90%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#4B5563', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#22273B', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-5 pt-4">
                <Text className="text-center font-semibold text-[15px] text-white mb-8">Add manual sleep</Text>

                <Text className="text-[13px] font-medium text-gray-400 mb-2">Activity</Text>
                <View className="bg-[#2A3047] rounded-[16px] p-4 flex-row items-center gap-3 mb-6">
                    <Ionicons name="moon" size={18} color="#818CF8" />
                    <Text className="text-[15px] font-semibold text-white">Asleep</Text>
                </View>

                <Text className="text-[13px] font-medium text-gray-400 mb-2">Time</Text>
                <View className="bg-[#2A3047] rounded-[16px] overflow-hidden mb-8">
                    <View className="flex-row items-center justify-between p-4 border-b border-[#3A415C]">
                        <Text className="text-[15px] font-semibold text-white">Starts</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[14px] font-medium text-gray-300">4.40 PM</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-semibold text-white">Ends</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[14px] font-medium text-gray-300">5.40 PM</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                    </View>
                </View>

                <View className="flex-1 justify-end">
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        className="bg-[#4B5563] h-[56px] rounded-full items-center justify-center"
                    >
                        <Text className="text-white font-semibold text-[16px]">Save</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});