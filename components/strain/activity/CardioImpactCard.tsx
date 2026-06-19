import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const CardioImpactCard = () => {
    return (
        <View className="mb-8">
            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">

                {/* Section 1: Cardio Load Pipeline */}
                <View className="flex-row items-center justify-between mb-6 border-b border-[#1E293B] pb-4">
                    <Text className="text-lg font-bold text-slate-100">Cardio Load</Text>
                    <View className="bg-rose-950/30 px-3 py-1.5 rounded-xl border border-rose-500/20 flex-row items-center gap-1.5">
                        <Text className="text-xs font-bold text-rose-500">Overtraining</Text>
                        <Ionicons name="warning-outline" size={14} color="#EF4444" />
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-8 bg-[#090D16] border border-[#1E293B] p-4 rounded-2xl">
                    <View className="items-center">
                        <Text className="text-[10px] font-semibold text-slate-500 mb-1">Before load</Text>
                        <View className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                            <Text className="font-bold text-slate-400 text-lg">5</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <View className="w-8 h-[2px] bg-[#1E293B] border border-dashed border-[#2D3748]" />
                        <View className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#4DB9F2]">
                            <Text className="text-sm font-bold text-[#4DB9F2]">+8</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={16} color="#4DB9F2" />
                    </View>

                    <View className="items-center">
                        <Text className="text-[10px] font-semibold text-slate-500 mb-1">After load</Text>
                        <View className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500 items-center justify-center">
                            <Text className="font-bold text-rose-500 text-lg">13</Text>
                        </View>
                    </View>
                </View>

                {/* Section 2: Cardio Focus Distribution */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-sm font-semibold text-slate-400">Cardio Focus Distribution</Text>
                    <Ionicons name="layers-outline" size={16} color="#4DB9F2" />
                </View>

                <View className="flex-row justify-between gap-2 mb-6">
                    <FocusBlock label="Low Aero." pct="100%" val="+20" color="#10B981" />
                    <FocusBlock label="High Aero." pct="0%" val="+0" color="#3B82F6" />
                    <FocusBlock label="Anaerobic" pct="0%" val="+0" color="#A855F7" />
                </View>

                {/* Unified Progress Bar */}
                <View className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden flex-row">
                    <View className="bg-[#10B981] h-full w-full" />
                </View>

            </View>
        </View>
    );
};

const FocusBlock = ({ label, pct, val, color }: any) => (
    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-xl p-3 flex-col items-center">
        <Text className="text-lg font-bold text-white mb-0.5">{pct}</Text>
        <Text className="text-[10px] font-semibold text-slate-500 mb-2">({val})</Text>
        <Text className="text-[10px] font-bold" style={{ color }}>{label}</Text>
    </View>
);