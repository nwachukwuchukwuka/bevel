import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ResourceDetailSheetRef = BottomSheetModal;

export const ResourceDetailSheet = forwardRef<ResourceDetailSheetRef>((props, ref) => {
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
            backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} showsVerticalScrollIndicator={false}>
                {/* Header Image Mock */}
                <LinearGradient
                    colors={['#FCD34D', '#FCA5A5']}
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
                    <Text className="text-[24px] font-bold text-gray-900 mb-2">What is Strain Score?</Text>
                    <Text className="text-[15px] font-medium text-gray-500 mb-6 leading-6">Understand the intensity of your workouts and optimize your fitness routine with our personalized Strain Score.</Text>

                    <View className="h-[1px] bg-gray-100 mb-6" />

                    <Text className="text-[18px] font-bold text-gray-900 mb-4">What is Strain Score?</Text>
                    <Text className="text-[15px] text-gray-600 leading-6 mb-4">
                        Bevel's <Text className="font-bold text-gray-900">Strain Score</Text> is a numerical representation of your body's physical exertion. You can think of your Strain Score as consisting of two components: passive and active strain.
                    </Text>
                    <Text className="text-[15px] text-gray-600 leading-6">
                        Active strain refers to the heart rate and movement associated with recorded workouts. Passive strain is calculated by leveraging factors like motion, heart rate measurements, and step counts that occur outside of workouts.
                    </Text>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});