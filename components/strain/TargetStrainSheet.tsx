import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TargetStrainSheetRef = BottomSheetModal;

export const TargetStrainSheet = forwardRef<TargetStrainSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['45%'], []);

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
            backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom }} className="px-6 pt-6 items-center">
                {/* Mock Circular Gauge */}
                <View className="w-32 h-32 mb-6 relative items-center justify-center">
                    <View className="absolute w-full h-full border-[10px] border-gray-100 rounded-full" />
                    <View className="absolute w-full h-full border-[10px] border-orange-400 rounded-full border-l-transparent border-t-transparent -rotate-45 opacity-90" />
                    <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']} className="absolute inset-0 rounded-full" />
                </View>

                <Text className="text-[18px] font-bold text-gray-900 mb-3 text-center">Target Strain Calibration</Text>
                <Text className="text-[14px] font-medium text-gray-500 text-center leading-5 px-2">
                    Your Target Strain is calculated from your recent Recoveries and Strain baseline. Please allow <Text className="font-bold text-gray-800">up to 2 weeks</Text> for the app to learn how to adjust your target strain.
                </Text>
            </BottomSheetView>
        </BottomSheetModal>
    );
});