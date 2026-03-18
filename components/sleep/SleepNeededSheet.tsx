import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SleepNeededSheetRef = BottomSheetModal;

export const SleepNeededSheet = forwardRef<SleepNeededSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['95%'], []);

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
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} showsVerticalScrollIndicator={false} className="px-6 pt-4">
                <Text className="text-center font-semibold text-[17px] text-white mb-8">How Sleep Needed{'\n'}is calculated</Text>

                <View className="bg-[#2A3047] rounded-[20px] p-5 mb-8">
                    <View className="flex-row justify-between mb-4"><Text className="text-[13px] font-medium text-gray-400">Sleep goal</Text><Text className="text-[13px] font-semibold text-white">7:30:00</Text></View>
                    <View className="flex-row justify-between mb-4"><Text className="text-[13px] font-medium text-gray-400">Recent strain</Text><Text className="text-[13px] font-semibold text-white">0:00:00</Text></View>
                    <View className="flex-row justify-between mb-4 border-b border-[#3A415C] pb-4"><Text className="text-[13px] font-medium text-gray-400">Sleep debt</Text><Text className="text-[13px] font-semibold text-white">+ 1:25:00</Text></View>
                    <View className="flex-row justify-between"><Text className="text-[14px] font-semibold text-white">Sleep needed</Text><Text className="text-[14px] font-semibold text-white">8:55:00</Text></View>
                </View>

                <View className="gap-6 mb-10">
                    <Text className="text-[15px] text-gray-300 leading-6"><Text className="font-semibold text-white">Sleep Goal:</Text> the base duration needed every 24 hours before accounting for other factors.</Text>
                    <Text className="text-[15px] text-gray-300 leading-6"><Text className="font-semibold text-white">Recent Strain:</Text> the additional time needed based on your recent Strain score.</Text>
                    <Text className="text-[15px] text-gray-300 leading-6"><Text className="font-semibold text-white">Sleep Debt:</Text> the additional time needed to catch up with your previous 7-day sleep deficit.</Text>
                </View>

            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});