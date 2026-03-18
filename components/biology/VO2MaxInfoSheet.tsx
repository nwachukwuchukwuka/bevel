import { VO2_MAX_RANGES } from '@/constants';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type VO2MaxInfoSheetRef = BottomSheetModal;

export const VO2MaxInfoSheet = forwardRef<VO2MaxInfoSheetRef>((props, ref) => {
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
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-6 pt-4">

                <View className="items-center mb-8">
                    <Text className="text-[18px] font-bold text-gray-900 mb-2">VO₂ Max ranges</Text>
                    <Text className="text-[14px] text-gray-500 text-center leading-5 px-4">
                        These ranges are standardized to your age (30) and sex (female).
                    </Text>
                </View>

                {/* Segmented Bar Graphic */}
                <View className="items-center mb-10">
                    <View className="bg-yellow-500 px-2 py-0.5 rounded mb-1 border border-white relative z-10">
                        <Text className="text-white text-[12px] font-bold">29.9</Text>
                    </View>
                    <View className="h-4 border-l border-dashed border-yellow-500 mb-1" />

                    <View className="flex-row w-full h-4 rounded-full overflow-hidden gap-1 px-4 relative">
                        <View className="flex-1 bg-red-100 rounded-l-full" />
                        <View className="flex-1 bg-yellow-500" />
                        <View className="flex-1 bg-green-100" />
                        <View className="flex-1 bg-blue-100" />
                        <View className="flex-1 bg-purple-100 rounded-r-full" />
                    </View>

                    <Text className="text-[13px] font-medium text-gray-500 mt-4">Your range is <Text className="font-bold text-yellow-500">Fair</Text></Text>
                </View>

                {/* Ranges List */}
                <View className="gap-3 mb-8">
                    {VO2_MAX_RANGES.map((item) => (
                        <View key={item.id} className={`flex-row justify-between items-center px-4 py-4 rounded-xl ${item.bg}`}>
                            <Text className={`text-[15px] font-bold ${item.color}`}>{item.label}</Text>
                            <Text className={`text-[15px] font-bold ${item.color}`}>{item.range}</Text>
                        </View>
                    ))}
                </View>

                <Text className="text-center text-[12px] text-gray-400 px-4 leading-5">
                    These ranges are derived from the Fitness Registry and Importance of Exercise National Database (FRIEND).
                </Text>

            </BottomSheetView>
        </BottomSheetModal>
    );
});