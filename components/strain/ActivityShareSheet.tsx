import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ActivityShareSheetRef = BottomSheetModal;

export const ActivityShareSheet = forwardRef<ActivityShareSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['75%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-5 pt-4">

                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}><Text className="text-[15px] text-gray-500 font-medium">Cancel</Text></TouchableOpacity>
                    <View className="w-10" />
                </View>

                <View className="items-center mb-10">
                    <Text className="text-[20px] font-bold text-gray-900 mb-1">Share your progress</Text>
                    <Text className="text-[14px] font-medium text-gray-400">Post or send a screenshot of this activity</Text>
                </View>

                {/* Share Card Mock */}
                <View className="bg-white rounded-[24px] p-6 shadow-sm shadow-black/5 border border-gray-100 items-center">
                    <View className="w-14 h-14 bg-gray-50 rounded-[16px] border border-gray-200 items-center justify-center mb-4 shadow-sm">
                        <Ionicons name="walk" size={28} color="#6B7280" />
                    </View>
                    <Text className="text-[18px] font-bold text-gray-900 mb-1">Indoor Walk</Text>
                    <Text className="text-[12px] font-medium text-gray-400 mb-8">14 September 2025 at 8.22 AM</Text>

                    <View className="flex-row justify-between w-full px-4 pt-4 border-t border-gray-50">
                        <View className="items-center"><Text className="text-[18px] font-bold text-gray-900">45m</Text><Text className="text-[11px] font-medium text-gray-400">Duration</Text></View>
                        <View className="items-center"><Text className="text-[18px] font-bold text-gray-900">294 <Text className="text-[13px] text-gray-400">kCal</Text></Text><Text className="text-[11px] font-medium text-gray-400">Total Energy</Text></View>
                        <View className="items-center"><Text className="text-[18px] font-bold text-gray-900">128 <Text className="text-[13px] text-gray-400">bpm</Text></Text><Text className="text-[11px] font-medium text-gray-400">Avg HR</Text></View>
                    </View>
                </View>

                <View className="flex-1 justify-end">
                    <TouchableOpacity className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                        <Text className="text-white font-semibold text-[16px]">Share</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});