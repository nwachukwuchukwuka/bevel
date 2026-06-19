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
            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">

                <View className="flex-row items-center justify-between mb-6 border-b border-[#1E293B] pb-4">
                    <Text className="text-lg font-bold text-slate-100">Splits</Text>
                    <View className="flex-row items-center gap-2 bg-[#090D16] px-3 py-1.5 rounded-lg border border-[#1E293B]">
                        <View className="w-2 h-2 rounded-full bg-emerald-500" />
                        <Text className="text-xs font-semibold text-slate-400">Pace increase</Text>
                    </View>
                </View>

                <View className="flex-row justify-between mb-3 px-2">
                    <Text className="text-[10px] font-bold text-slate-500 w-[15%]">Km</Text>
                    <Text className="text-[10px] font-bold text-slate-500 flex-1">Pace (/km)</Text>
                    <Text className="text-[10px] font-bold text-slate-500 w-[15%] text-right">HR</Text>
                </View>

                <View className="gap-2">
                    {SPLITS.map((split, i) => (
                        <View key={i} className="flex-row items-center justify-between bg-[#1E293B40] border border-[#1E293B] rounded-xl px-4 py-3 relative overflow-hidden">

                            {/* Background fill representing pace duration */}
                            <View
                                className="absolute left-0 top-0 bottom-0 bg-[#1E293B]/50"
                                style={{ width: `${split.fill}%` }}
                            />

                            <Text className="text-sm font-bold text-slate-400 w-[15%] relative z-10">{split.km}</Text>

                            <View className="flex-1 flex-row items-center gap-3 relative z-10">
                                <Text className="text-base font-bold text-white w-[50px]">{split.pace}</Text>
                            </View>

                            <View className="w-[20%] flex-row items-center justify-end gap-2 relative z-10">
                                {split.isIncrease && <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                <Text className="text-base font-bold text-[#4DB9F2] text-right">{split.hr}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>
        </View>
    );
};