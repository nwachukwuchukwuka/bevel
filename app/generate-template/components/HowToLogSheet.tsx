import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';

export const HowToLogSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />,
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['55%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
            backgroundStyle={{ borderRadius: 32, backgroundColor: '#FFFFFF' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-6 pt-4 items-center">
                <Text className="text-xl font-bold text-gray-900 mb-3">Logging Machine Exercises</Text>
                <Text className="text-gray-500 text-center text-sm leading-5 mb-8">
                    Log the weight loaded on the machine. If the loaded weight is total 90 lb, log 90.
                </Text>

                {/* Mock Weight Picker Visual */}
                <View className="w-64 h-64 bg-[#2C2C2E] rounded-3xl overflow-hidden relative items-center justify-center shadow-lg">

                    {/* Background Gradients to simulate the rounded picker depth */}
                    <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} className="absolute top-0 w-full h-1/3 z-10" />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className="absolute bottom-0 w-full h-1/3 z-10" />

                    {/* Horizontal separator lines */}
                    <View className="absolute top-[35%] w-full h-[1px] bg-gray-600" />
                    <View className="absolute top-[65%] w-full h-[1px] bg-gray-600" />

                    {/* Number List Mock */}
                    <View className="gap-4 items-center">
                        <Text className="text-gray-500 font-bold text-lg">70</Text>
                        <Text className="text-gray-400 font-bold text-xl">80</Text>

                        {/* Selected Item */}
                        <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center border border-white/30 my-2 shadow-xl shadow-black">
                            <Text className="text-white font-bold text-4xl">90</Text>
                        </View>

                        <Text className="text-gray-400 font-bold text-xl">100</Text>
                        <Text className="text-gray-500 font-bold text-lg">110</Text>
                    </View>

                    {/* Fake Pin visual */}
                    <View className="absolute left-6 top-1/2 -mt-2 w-8 h-4 bg-black rounded-full border border-gray-600" />
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});