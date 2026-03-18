import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type SleepGoalMethodSheetRef = BottomSheetModal;

export const SleepGoalMethodSheet = forwardRef<SleepGoalMethodSheetRef>((props, ref) => {
    const snapPoints = useMemo(() => ['70%'], []); // Explicit size
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);

    // States: 'select' -> 'error' (mocking the flow from the screenshots)
    const [view, setView] = useState<'select' | 'error'>('select');
    const [method, setMethod] = useState('Manual');

    const dismiss = () => {
        (ref as any).current?.dismiss();
        setTimeout(() => setView('select'), 300); // reset on close
    };

    const handleContinue = () => {
        if (method === 'Auto') {
            setView('error'); // Jump to the "Not enough data" mock state
        } else {
            dismiss();
        }
    };

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enableDynamicSizing={false} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}>
            <BottomSheetView className="flex-1 px-5 pt-4 pb-8">

                {view === 'select' ? (
                    <>
                        <Text className="text-center font-bold text-[15px] text-gray-900 mb-6">Choose a method</Text>

                        <TouchableOpacity onPress={() => setMethod('Manual')} className={`border rounded-[20px] p-5 mb-4 shadow-sm shadow-black/5 ${method === 'Manual' ? 'border-gray-900 bg-white' : 'border-gray-100 bg-white'}`}>
                            {method === 'Manual' && (
                                <View className="flex-row items-center justify-end mb-4 gap-4">
                                    <Ionicons name="remove-circle-outline" size={24} color="#D1D5DB" />
                                    <View className="items-center">
                                        <Text className="text-[14px] font-bold text-gray-300">7:20</Text>
                                        <Text className="text-[28px] font-bold text-gray-900 my-1">8:30</Text>
                                        <Text className="text-[14px] font-bold text-gray-300">9:40</Text>
                                    </View>
                                    <Ionicons name="add-circle-outline" size={24} color="#D1D5DB" />
                                </View>
                            )}
                            <View className="flex-row justify-between items-end">
                                <View className="flex-1 pr-4">
                                    <Text className="text-[15px] font-bold text-gray-900 mb-1">Set manually</Text>
                                    <Text className="text-[12px] text-gray-500 leading-4">Manually set a sleep goal that you want to achieve.</Text>
                                </View>
                                {method === 'Manual' && <Ionicons name="checkmark" size={20} color="#111827" />}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setMethod('Auto')} className={`border rounded-[20px] p-5 mb-auto shadow-sm shadow-black/5 ${method === 'Auto' ? 'border-gray-900 bg-white' : 'border-gray-100 bg-white'}`}>
                            {method === 'Auto' && (
                                <View className="items-end mb-4">
                                    <View className="w-16 h-16 rounded-full border-4 border-gray-100 items-center justify-center relative">
                                        <View className="absolute w-full h-full border-4 border-blue-400 rounded-full border-t-transparent -rotate-45" />
                                        <Ionicons name="sparkles" size={12} color="#3B82F6" className="absolute top-2 left-3" />
                                        <Ionicons name="sunny" size={12} color="#FACC15" className="absolute bottom-2 right-3" />
                                    </View>
                                </View>
                            )}
                            <View className="flex-row justify-between items-end">
                                <View className="flex-1 pr-4">
                                    <Text className="text-[15px] font-bold text-gray-900 mb-1">Automatically calculate</Text>
                                    <Text className="text-[12px] text-gray-500 leading-4">Calculate a sleep goal based on your Recovery scores over the past 90 days.</Text>
                                </View>
                                {method === 'Auto' && <Ionicons name="checkmark" size={20} color="#111827" />}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleContinue} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mb-6 mt-8">
                            <Text className="text-white font-semibold text-[16px]">Continue</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    // ERROR VIEW MOCK
                    <View className="flex-1 items-center justify-center pb-10">
                        <View className="w-24 h-24 rounded-full border-4 border-gray-50 items-center justify-center relative mb-8 shadow-sm">
                            <View className="absolute w-full h-full border-4 border-gray-200 rounded-full border-t-transparent border-r-transparent -rotate-45" />
                            <Ionicons name="sparkles" size={16} color="#3B82F6" className="absolute top-4 left-6" />
                            <Ionicons name="sunny" size={16} color="#FACC15" className="absolute bottom-4 right-6" />
                        </View>
                        <Text className="text-[20px] font-bold text-gray-900 mb-2">Not enough data</Text>
                        <Text className="text-[14px] text-gray-500 text-center leading-5 px-4 mb-auto">We need at least 90 days of data to calculate your sleep goal automatically.</Text>

                        <View className="w-full gap-3 mt-10">
                            <TouchableOpacity onPress={() => setView('select')} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                                <Text className="text-white font-semibold text-[16px]">Set manually</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={dismiss} className="bg-gray-100 h-[56px] rounded-full items-center justify-center">
                                <Text className="text-gray-900 font-semibold text-[16px]">Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});