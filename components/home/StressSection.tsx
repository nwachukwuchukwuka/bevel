import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface StressSectionProps {
    onPress?: () => void;
}

export const StressSection = ({ onPress }: StressSectionProps) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View className="bg-[#151E33] rounded-[24px] p-5 border border-slate-800/80 mb-3">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                    <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <Text className="text-slate-200 font-semibold text-[15px]">Today's stress</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color="#94A3B8" />
            </View>

            {/* Asymmetrical Columns */}
            <View className="flex-row items-center gap-4">
                {/* Left Side: Score Display */}
                <View className="bg-slate-800/60 border border-slate-700/30 rounded-2xl p-4 items-center justify-center w-24 h-24">
                    <Text className="text-[28px] font-bold text-slate-100 leading-8">36</Text>
                    <Text className="text-[11px] font-semibold text-slate-400 mt-1">Stress Score</Text>
                </View>

                {/* Right Side: Stats Stack */}
                <View className="flex-1 gap-2.5 pl-2">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-slate-400 font-semibold">Highest</Text>
                        <Text className="text-sm font-bold text-yellow-500">36</Text>
                    </View>
                    <View className="h-[1px] bg-slate-800/80" />
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-slate-400 font-semibold">Average</Text>
                        <Text className="text-sm font-bold text-teal-500">11</Text>
                    </View>
                    <View className="h-[1px] bg-slate-800/80" />
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-slate-400 font-semibold">Lowest</Text>
                        <Text className="text-sm font-bold text-green-500">6</Text>
                    </View>
                </View>
            </View>

            <View className="h-[1px] bg-slate-800/80 my-4" />

            {/* Integrated Energy Meter */}
            <View className="flex-row items-center gap-3">
                <Ionicons name="flash" size={18} color="#22C55E" />
                <View className="flex-1 h-5 flex-row items-end gap-[2px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <View key={i} className={`w-[2px] rounded-full ${i < 30 ? 'bg-green-400 h-full' : 'bg-slate-800 h-3'}`} />
                    ))}
                </View>
                <Text className="font-bold text-slate-100 text-sm">71%</Text>
            </View>
        </View>
    </TouchableOpacity>
);
