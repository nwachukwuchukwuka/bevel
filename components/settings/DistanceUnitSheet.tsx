import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type DistanceUnitSheetRef = BottomSheetModal;
interface Props { unit: string; setUnit: (u: string) => void; }

export const DistanceUnitSheet = forwardRef<DistanceUnitSheetRef, Props>(({ unit, setUnit }, ref) => {
    const snapPoints = useMemo(() => ['45%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enableDynamicSizing={false} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}>
            <BottomSheetView className="flex-1 px-5 pt-4 pb-8">
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-6">Select distance unit</Text>

                <View className="gap-4 mb-auto">
                    <TouchableOpacity onPress={() => setUnit('Miles')} className={`flex-row items-center justify-between p-4 rounded-xl border ${unit === 'Miles' ? 'border-orange-400 bg-orange-50/30' : 'border-gray-100 bg-white'}`}>
                        <Text className={`text-[15px] font-bold ${unit === 'Miles' ? 'text-orange-500' : 'text-gray-900'}`}>Miles</Text>
                        <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${unit === 'Miles' ? 'border-orange-500' : 'border-gray-300'}`}>
                            {unit === 'Miles' && <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setUnit('Kilometers')} className={`flex-row items-center justify-between p-4 rounded-xl border ${unit === 'Kilometers' ? 'border-orange-400 bg-orange-50/30' : 'border-gray-100 bg-white'}`}>
                        <Text className={`text-[15px] font-bold ${unit === 'Kilometers' ? 'text-orange-500' : 'text-gray-900'}`}>Kilometers</Text>
                        <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${unit === 'Kilometers' ? 'border-orange-500' : 'border-gray-300'}`}>
                            {unit === 'Kilometers' && <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={dismiss} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mb-6 mt-8">
                    <Text className="text-white font-semibold text-[16px]">Done</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});