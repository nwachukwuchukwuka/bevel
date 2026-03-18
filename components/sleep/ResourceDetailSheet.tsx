import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ResourceDetailSheetRef = BottomSheetModal;

export const ResourceDetailSheet = forwardRef<ResourceDetailSheetRef, { title: string }>(({ title }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['100%'], []);

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
            backgroundStyle={{ backgroundColor: '#181B28', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} showsVerticalScrollIndicator={false}>
                {/* Header Image Mock */}
                <LinearGradient
                    colors={['#818CF8', '#C084FC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        height: 192,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View className="w-24 h-24 bg-white/20 rounded-full border-4 border-white/40 items-center justify-center">
                         <View className="w-20 h-20 border-4 border-white rounded-full border-l-transparent -rotate-45" />
                    </View>
                </LinearGradient>

                <View className="p-6">
                    <Text className="text-[24px] font-semibold text-white mb-2">{title}</Text>
                    <Text className="text-[15px] font-medium text-gray-400 mb-6 leading-6">Understand the quality and duration of your rest to optimize health and daily performance.</Text>

                    <View className="h-[1px] bg-gray-800 mb-6" />

                    <Text className="text-[18px] font-semibold text-white mb-4">What is {title}?</Text>
                    <Text className="text-[14px] text-gray-400 leading-6 mb-4">
                        Bevel's <Text className="font-semibold text-white">{title}</Text> is a comprehensive metric that evaluates various aspects of your sleep, helping you identify trends and areas for improvement.
                    </Text>
                    <Text className="text-[14px] text-gray-400 leading-6">
                        Consistency and quality are key. By tracking these metrics over time, you can better understand how lifestyle factors like diet, activity, and stress impact your recovery.
                    </Text>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});
