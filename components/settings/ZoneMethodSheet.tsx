import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type ZoneMethodSheetRef = BottomSheetModal;
interface Props { method: string; setMethod: (m: string) => void; }

const METHODS = [
    { id: 'Max HR', desc: 'Based on percentage of maximum heart rate. This is the most common method and is useful if you know your max HR.' },
    { id: 'HR Reserve', desc: 'Based on percentage of heart rate reserve. This method uses your daily RHR baselines to calculate personalized zones.' },
    { id: 'Lactate Threshold', desc: 'Based on your lactate threshold heart rate (LTHR). Ideal for endurance athletes who have tested their LTHR.' },
    { id: 'Manual', desc: 'Set each heart rate zone manually.' }
];

export const ZoneMethodSheet = forwardRef<ZoneMethodSheetRef, Props>(({ method, setMethod }, ref) => {
    const snapPoints = useMemo(() => ['80%'], []); // Explicit size
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enableDynamicSizing={false} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}>
            <BottomSheetScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-4 pb-8">
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-6">Zone Calculation Method</Text>

                <View className="gap-6 mb-8">
                    {METHODS.map(m => (
                        <TouchableOpacity key={m.id} onPress={() => setMethod(m.id)} className="flex-row gap-4">
                            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${method === m.id ? 'border-gray-900' : 'border-gray-300'}`}>
                                {method === m.id && <View className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                            </View>
                            <View className="flex-1 border-b border-gray-100 pb-4">
                                <Text className="text-[15px] font-bold text-gray-900 mb-1">{m.id}</Text>
                                <Text className="text-[13px] text-gray-500 leading-5">{m.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={dismiss} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mb-10">
                    <Text className="text-white font-semibold text-[16px]">Done</Text>
                </TouchableOpacity>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});