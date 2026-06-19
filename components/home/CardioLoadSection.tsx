import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const CardioLoadSection = () => {
    return (
        <View className="bg-[#151E33] rounded-[24px] p-5 border border-slate-800/80">
            {/* Header Row */}
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="stats-chart" size={16} color="#94A3B8" />
                    <Text className="text-[14px] font-bold text-slate-400">Cardio Load</Text>
                </View>
                <View className="bg-pink-950/30 border border-pink-900/30 px-3 py-1 rounded-full">
                    <Text className="text-[11px] font-bold text-pink-500">Overtraining</Text>
                </View>
            </View>

            {/* Score */}
            <Text className="text-[40px] font-bold text-slate-100 leading-10 my-2">13</Text>

            {/* Bottom Full-Width Graph */}
            <View className="w-full h-12 bg-slate-900/30 border border-slate-800/50 rounded-xl mt-4 relative justify-center">
                <View className="absolute w-full h-[1.5px] bg-slate-800 bottom-3" />
                <View className="absolute bottom-3 left-4 right-8 h-[2px] bg-slate-700" style={{ width: '80%' }} />
                <View className="absolute bottom-3 right-8 w-4 h-[20px] border-r-2 border-slate-600" style={{ transform: [{ skewY: '-45deg' }] }} />
                <View className="absolute top-2 right-7 w-2.5 h-2.5 rounded-full bg-pink-400 border-2 border-[#151E33]" />
            </View>
        </View>
    );
};
