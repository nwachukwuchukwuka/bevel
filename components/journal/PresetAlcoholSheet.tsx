import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type PresetAlcoholSheetRef = BottomSheetModal;

export const PresetAlcoholSheet = forwardRef<PresetAlcoholSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['75%'], []);
    const [amount, setAmount] = useState(1.5);
    const [logTime, setLogTime] = useState('Daytime');
    const [isEditing, setIsEditing] = useState(false);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-3">

                <View className="px-2 pb-6 border-b border-[#1E293B] flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Alcohol</Text>
                        <Text className="text-sm text-slate-400 mt-1">Preset configuration</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-4 mb-4 flex-1">

                    <View className="w-[48%] flex-col gap-4">
                        <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-1 items-center justify-center">
                            <View className="flex-row items-center justify-between w-full mb-6">
                                <Text className="text-xs font-semibold text-slate-500">Preset amount</Text>
                                {isEditing ? (
                                    <TouchableOpacity onPress={() => setIsEditing(false)}>
                                        <Text className="text-xs font-bold text-[#4DB9F2]">Done</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                                        <Ionicons name="create-outline" size={16} color="#4DB9F2" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {isEditing ? (
                                <View className="flex-col items-center gap-4 w-full">
                                    <TouchableOpacity
                                        onPress={() => setAmount(amount + 0.5)}
                                        activeOpacity={0.7}
                                        className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center"
                                    >
                                        <Ionicons name="add" size={24} color="#4DB9F2" />
                                    </TouchableOpacity>
                                    <Text className="text-3xl font-bold text-white">
                                        {amount.toFixed(1).replace('.', ',')}
                                    </Text>
                                    <Text className="text-xs text-slate-500 font-medium">drinks</Text>
                                    <TouchableOpacity
                                        onPress={() => setAmount(Math.max(0, amount - 0.5))}
                                        activeOpacity={0.7}
                                        className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-full items-center justify-center mt-2"
                                    >
                                        <Ionicons name="remove" size={24} color="#4DB9F2" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View className="items-center justify-center flex-1">
                                    <Text className="text-5xl font-bold text-white mb-2">
                                        {amount.toFixed(1).replace('.', ',')}
                                    </Text>
                                    <Text className="text-sm text-slate-500 font-medium">drinks</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View className="w-[48%] flex-col gap-4">
                        <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4">
                            <Text className="text-xs font-semibold text-slate-500 mb-2">Log time</Text>
                            <Text className="text-[10px] text-slate-400 mb-4 leading-4">This organizes your journal and morning reminders but won't impact how insights are calculated.</Text>

                            <View className="flex-col gap-2">
                                <TouchableOpacity
                                    onPress={() => setLogTime('Daytime')}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center gap-2 p-2.5 rounded-xl border ${logTime === 'Daytime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                        }`}
                                >
                                    <View className={`w-2.5 h-2.5 rounded-full ${logTime === 'Daytime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                    <Text className={`text-xs font-semibold ${logTime === 'Daytime' ? 'text-white' : 'text-slate-500'}`}>
                                        Daytime
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setLogTime('Nighttime')}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center gap-2 p-2.5 rounded-xl border ${logTime === 'Nighttime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                        }`}
                                >
                                    <View className={`w-2.5 h-2.5 rounded-full ${logTime === 'Nighttime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                    <Text className={`text-xs font-semibold ${logTime === 'Nighttime' ? 'text-white' : 'text-slate-500'}`}>
                                        Nighttime
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row justify-between items-center flex-1"
                        >
                            <View>
                                <Text className="text-sm font-semibold text-white mb-1">Pin</Text>
                                <Text className="text-[10px] text-slate-500">To dashboard</Text>
                            </View>
                            <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                <Ionicons name="pin-outline" size={14} color="#4DB9F2" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View className="mt-2 border-t border-[#1E293B] pt-4">
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save configuration</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});