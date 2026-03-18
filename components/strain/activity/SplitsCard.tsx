import React from 'react';
import { Text, View } from 'react-native';

const SPLITS = [
    { km: '1', pace: '15:33', hr: 148, fill: 60, isIncrease: false },
    { km: '2', pace: '12:54', hr: 160, fill: 40, isIncrease: true },
    { km: '3', pace: '16:30', hr: 142, fill: 70, isIncrease: false },
    { km: '3,6', pace: '18:19', hr: 157, fill: 80, isIncrease: false },
];

export const SplitsCard = () => {
    return (
        <View className="mb-8">
            <Text className="text-[16px] font-bold text-gray-900 mb-3">Splits</Text>
            <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">

                <View className="flex-row justify-between mb-4 border-b border-gray-50 pb-2">
                    <Text className="text-[11px] font-medium text-gray-400 w-[15%]">Km</Text>
                    <Text className="text-[11px] font-medium text-gray-400 flex-1">Pace (/km)</Text>
                    <Text className="text-[11px] font-medium text-gray-400 w-[15%] text-right">HR</Text>
                </View>

                <View className="gap-4 mb-6">
                    {SPLITS.map((split, i) => (
                        <View key={i} className="flex-row items-center justify-between">
                            <Text className="text-[13px] font-medium text-gray-500 w-[15%]">{split.km}</Text>

                            <View className="flex-1 flex-row items-center gap-3">
                                <Text className="text-[13px] font-bold text-gray-900 w-[45px]">{split.pace}</Text>
                                <View className="h-2 rounded-full bg-gray-800 flex-row overflow-hidden" style={{ width: `${split.fill}%` }}>
                                    {/* Mock the green increase bar */}
                                    {split.isIncrease && (
                                        <>
                                            <View className="h-full bg-gray-800" style={{ width: '60%' }} />
                                            <View className="h-full bg-emerald-400 flex-1" style={{ opacity: 0.8 }} />
                                        </>
                                    )}
                                </View>
                            </View>

                            <Text className="text-[13px] font-bold text-gray-900 w-[15%] text-right">{split.hr}</Text>
                        </View>
                    ))}
                </View>

                {/* Legend */}
                <View className="flex-row items-center gap-2">
                    <View className="w-5 h-2 rounded-full bg-emerald-400" style={{ opacity: 0.8 }} />
                    <Text className="text-[12px] font-medium text-gray-500">Pace increase</Text>
                </View>

            </View>
        </View>
    );
};