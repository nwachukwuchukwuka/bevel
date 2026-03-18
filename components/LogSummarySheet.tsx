import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';

const SUMMARY_DATA = [
    { label: 'Total Fat', value: '33,3g', isIndented: false },
    { label: 'Saturated Fat', value: '10,2g', isIndented: true },
    { label: 'Trans Fat', value: '0g', isIndented: true },
    { label: 'Polyunsaturated Fat', value: '5,4g', isIndented: true },
    { label: 'Monounsaturated Fat', value: '14,9g', isIndented: true },
    { label: 'Cholesterol', value: '206,7mg', isIndented: false },
    { label: 'Sodium', value: '388,1mg', isIndented: false },
    { label: 'Total Carbohydrates', value: '94,7g', isIndented: false },
    { label: 'Dietary Fiber', value: '32,7g', isIndented: true },
    { label: 'Total Sugars', value: '13,3g', isIndented: true },
    { label: 'Protein', value: '27g', isIndented: false, isBold: true },
];

export const LogSummarySheet = forwardRef<BottomSheetModal>((props, ref) => {
    const snapPoints = ['100%'];

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.4} />,
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
            backgroundStyle={{ borderRadius: 32, backgroundColor: '#F4F5F9' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="px-6 pt-2 pb-4">
                <Text className="text-xl font-bold text-gray-900">Log summary</Text>
            </BottomSheetView>

            <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                <View className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">

                    {/* Header */}
                    <View className="flex-row justify-between items-center border-b-[3px] border-black pb-4 mb-4">
                        <Text className="text-lg font-bold text-gray-900">Calories</Text>
                        <Text className="text-xl font-bold text-gray-900">699 kcal</Text>
                    </View>

                    {/* List */}
                    <View className="gap-4">
                        {SUMMARY_DATA.map((item, index) => (
                            <View key={index} className={`flex-row justify-between items-center ${index !== SUMMARY_DATA.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                                <Text className={`text-gray-800 ${item.isIndented ? 'ml-4 text-gray-500' : ''} ${item.isBold ? 'font-bold' : 'font-medium'}`}>
                                    {item.label}
                                </Text>
                                <Text className={`text-gray-900 font-medium ${item.isBold ? 'font-bold' : ''}`}>
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});