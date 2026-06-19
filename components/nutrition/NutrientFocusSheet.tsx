import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type NutrientData = {
    id: string;
    name: string;
    current: number;
    target: number;
    unit: string;
    color: string;
    type: 'macro' | 'limit';
};

interface NutrientFocusSheetProps {
    data: NutrientData | null;
}

export const NutrientFocusSheet = forwardRef<BottomSheetModal, NutrientFocusSheetProps>(({ data }, ref) => {
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.6} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

    if (!data) return null;

    const percentage = Math.min(data.current / data.target, 1);
    const rotation = -225 + (180 * percentage);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['85%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32, }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 flex-col">

                <View className="px-5 pt-4 pb-6 border-b border-[#1E293B] bg-[#151E33] flex-row items-center justify-between rounded-t-[32px]">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">{data.name}</Text>
                        <Text className="text-xs text-slate-400 mt-1">Goal tracking & limit monitoring</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="options-outline" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (ref as any).current?.dismiss()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    <View className="bg-[#151E33] border-b border-[#1E293B] p-6 mb-8 flex-row items-center justify-between">

                        <View className="flex-col gap-6 flex-1">
                            <View>
                                <Text className="text-xs text-slate-500 font-semibold mb-1">Current intake</Text>
                                <Text className="text-3xl font-bold text-white">
                                    {data.current} <Text className="text-sm font-medium text-slate-500">{data.unit}</Text>
                                </Text>
                            </View>

                            <View>
                                <Text className="text-xs text-slate-500 font-semibold mb-1">Target limit</Text>
                                <Text className="text-xl font-bold text-slate-300">
                                    {data.target} <Text className="text-xs font-medium text-slate-600">{data.unit}</Text>
                                </Text>
                            </View>

                            <View className="bg-[#1E293B] px-3 py-2 rounded-lg border border-[#2D3748] self-start">
                                <Text className="text-sm font-bold text-white">
                                    {Math.round(percentage * 100)}% consumed
                                </Text>
                            </View>
                        </View>

                        {data.type === 'macro' ? (
                            <View className="w-32 h-40 justify-center items-end pr-2 overflow-hidden relative">
                                <View className="w-32 h-32 rounded-full border-8 border-[#1E293B] absolute top-4 right-0" />
                                <View
                                    className="w-32 h-32 rounded-full border-8 absolute top-4 right-0"
                                    style={{
                                        borderColor: data.color,
                                        borderBottomColor: 'transparent',
                                        borderRightColor: 'transparent',
                                        transform: [{ rotate: `${rotation}deg` }]
                                    }}
                                />
                                <View
                                    className="absolute top-4 right-0 w-32 h-32 items-center"
                                    style={{ transform: [{ rotate: `${-90 + (180 * percentage)}deg` }] }}
                                >
                                    <View
                                        className="w-4 h-4 rounded-full bg-[#090D16] border-2 mt-1"
                                        style={{ borderColor: data.color }}
                                    />
                                </View>
                                <View className="absolute inset-0 items-center justify-center pt-8 pr-4">
                                    <Text className="text-xl font-bold text-white">
                                        {data.target - data.current > 0 ? (data.target - data.current).toFixed(1) : 0}
                                    </Text>
                                    <Text className="text-[10px] font-bold text-slate-500">left</Text>
                                </View>
                            </View>
                        ) : (
                            <View className="flex-1 max-w-[140px] flex-col justify-center">
                                <View className="h-4 bg-[#1E293B] rounded-full w-full mb-4 relative justify-center border border-[#2D3748]">
                                    <View
                                        className="h-full rounded-full"
                                        style={{ width: `${percentage * 100}%`, backgroundColor: data.color }}
                                    />
                                    <View
                                        className="absolute w-5 h-5 bg-[#090D16] border-2 rounded-full"
                                        style={{ left: `${Math.max(0, (percentage * 100) - 5)}%`, borderColor: data.color }}
                                    />
                                </View>

                                <View className="flex-row justify-between items-center bg-[#1E293B] px-3 py-2 rounded-lg border border-[#2D3748]">
                                    <Text className="text-white text-xs font-bold">
                                        {Math.max(data.target - data.current, 0).toFixed(1)} {data.unit} left
                                    </Text>
                                </View>
                            </View>
                        )}

                    </View>

                    <View className="px-5">
                        <Text className="font-bold text-white text-lg mb-2">Today's Entries</Text>
                        <Text className="text-slate-400 text-sm leading-6 mb-6">
                            Entries that contributed to your <Text className="font-bold text-slate-300">{data.name}</Text> goal. Detected by nutrition and manual log.
                        </Text>

                        <View className="gap-3">
                            <TouchableOpacity activeOpacity={0.8} className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4 flex-1 pr-4">
                                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] relative">
                                        <Text className="text-xl">🥑</Text>
                                        <View className="absolute -bottom-1.5 -right-1.5 bg-[#4DB9F2]/10 border border-[#4DB9F2]/30 px-1 py-0.5 rounded flex-row items-center gap-0.5">
                                            <Ionicons name="flame" size={8} color="#4DB9F2" />
                                            <Text className="text-[9px] font-bold text-[#4DB9F2]">88</Text>
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-slate-100 text-sm mb-1" numberOfLines={1}>Avocado Toast with Fried Egg</Text>
                                        <Text className="text-slate-500 text-xs font-medium">12:48 PM</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-3">
                                    <Text className="font-bold text-white text-sm">
                                        +{data.name === 'Calories' ? '577' : data.name === 'Fat' ? '26,8' : '186,7'}{data.unit}
                                    </Text>
                                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4 flex-1 pr-4">
                                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] relative">
                                        <Text className="text-xl">☕️</Text>
                                        <View className="absolute -bottom-1.5 -right-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-1 py-0.5 rounded flex-row items-center gap-0.5">
                                            <Ionicons name="flame" size={8} color="#F59E0B" />
                                            <Text className="text-[9px] font-bold text-[#F59E0B]">61</Text>
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-slate-100 text-sm mb-1" numberOfLines={1}>Coffee Latte</Text>
                                        <Text className="text-slate-500 text-xs font-medium">12:48 PM</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-3">
                                    <Text className="font-bold text-white text-sm">
                                        +{data.name === 'Calories' ? '122' : data.name === 'Fat' ? '6,5' : '20'}{data.unit}
                                    </Text>
                                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </BottomSheetScrollView>

                <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] border-t border-[#1E293B] px-5 pt-4 pb-8">
                    {data.type === 'limit' ? (
                        <View className="flex-row gap-3">
                            <TouchableOpacity activeOpacity={0.8} className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-1 flex-row gap-2">
                                <Ionicons name="add" size={18} color="#090D16" />
                                <Text className="text-[#090D16] font-bold text-sm">Add 50mg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} className="bg-[#1E293B] h-14 rounded-2xl items-center justify-center border border-[#2D3748] flex-1 flex-row gap-2">
                                <Ionicons name="add" size={18} color="#4DB9F2" />
                                <Text className="text-white font-bold text-sm">Custom</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity activeOpacity={0.8} className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-row gap-2">
                            <Ionicons name="add" size={20} color="#090D16" />
                            <Text className="text-[#090D16] font-bold text-base">Add custom entry</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </BottomSheetModal>
    );
});