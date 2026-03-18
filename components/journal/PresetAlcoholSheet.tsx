import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type PresetAlcoholSheetRef = BottomSheetModal;

export const PresetAlcoholSheet = forwardRef<PresetAlcoholSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['65%'], []);
    const [amount, setAmount] = useState(1.5);
    const [logTime, setLogTime] = useState('Daytime');
    const [isEditing, setIsEditing] = useState(false);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-8">Alcohol</Text>

                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-[14px] font-bold text-gray-900">Preset amount</Text>
                    {isEditing && (
                        <TouchableOpacity onPress={() => setIsEditing(false)}>
                            <Text className="text-teal-500 font-bold text-[13px]">Done</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="flex-row items-center justify-between mb-8">
                    {isEditing ? (
                        <View className="flex-row items-center gap-6">
                            <TouchableOpacity 
                                onPress={() => setAmount(Math.max(0, amount - 0.5))} 
                                className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
                            >
                                <Ionicons name="remove" size={20} color="#111827" />
                            </TouchableOpacity>
                            <Text className="text-[24px] font-bold text-gray-900">
                                {amount.toFixed(1).replace('.', ',')} drinks
                            </Text>
                            <TouchableOpacity 
                                onPress={() => setAmount(amount + 0.5)} 
                                className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
                            >
                                <Ionicons name="add" size={20} color="#111827" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text className="text-[24px] font-bold text-gray-900">
                                {amount.toFixed(1).replace('.', ',')} drinks
                            </Text>
                            <TouchableOpacity 
                                onPress={() => setIsEditing(true)}
                                className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                            >
                                <Ionicons name="pencil" size={14} color="#6B7280" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <Text className="text-[14px] font-bold text-gray-900 mb-1">Log time</Text>
                <Text className="text-[12px] font-medium text-gray-400 mb-4 leading-5">This organizes your journal and morning reminders but won't impact how insights are calculated.</Text>

                {/* Segmented Control Mock */}
                <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
                    <TouchableOpacity onPress={() => setLogTime('Daytime')} className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Daytime' ? 'bg-white shadow-sm' : ''}`}>
                        <Text className={`text-[13px] font-bold ${logTime === 'Daytime' ? 'text-gray-900' : 'text-gray-500'}`}>Daytime</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLogTime('Nighttime')} className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Nighttime' ? 'bg-white shadow-sm' : ''}`}>
                        <Text className={`text-[13px] font-bold ${logTime === 'Nighttime' ? 'text-gray-900' : 'text-gray-500'}`}>Nighttime</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-end gap-3">
                    <TouchableOpacity className="bg-gray-50 h-[56px] rounded-full items-center justify-center flex-row gap-2">
                        <Text className="text-gray-900 font-semibold text-[16px]">Pin</Text>
                        <Ionicons name="pin-outline" size={16} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={dismiss} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                        <Text className="text-white font-semibold text-[16px]">Save</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});