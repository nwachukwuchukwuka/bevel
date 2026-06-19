import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export const NutritionSection = () => {
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity 
                onPress={() => router.push('/nutrition')}
                className="bg-[#151E33] rounded-[24px] p-5 border border-slate-800/80"
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-5">
                    <Text className="text-slate-200 font-semibold text-[15px]">Today's foods</Text>
                    <Ionicons name="arrow-forward" size={18} color="#94A3B8" />
                </View>

                {/* Blood Glucose Banner at the Top */}
                <View className="bg-slate-900/30 rounded-xl p-3 border border-slate-800/50 flex-row items-center justify-between mb-5">
                    <View className="flex-row items-center gap-2">
                        <View className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <Text className="text-[12px] font-semibold text-slate-400">Blood glucose</Text>
                    </View>
                    <Text className="text-[13px] font-bold text-slate-100">— <Text className="font-medium text-slate-500 text-[10px]">mmol/L</Text></Text>
                </View>

                {/* 3-Column Nutrient Grid */}
                <View className="flex-row justify-between">
                    <View className="w-[30%] bg-slate-800/40 border border-slate-800/60 rounded-2xl p-3 items-center">
                        <Ionicons name="nutrition" size={20} color="#F59E0B" />
                        <Text className="text-[11px] font-semibold text-slate-400 mt-1">Carbs</Text>
                        <Text className="text-sm font-bold text-slate-100 mt-2">0g</Text>
                    </View>
                    
                    <View className="w-[30%] bg-slate-800/40 border border-slate-800/60 rounded-2xl p-3 items-center">
                        <Ionicons name="leaf" size={20} color="#10B981" />
                        <Text className="text-[11px] font-semibold text-slate-400 mt-1">Fats</Text>
                        <Text className="text-sm font-bold text-slate-100 mt-2">0g</Text>
                    </View>

                    <View className="w-[30%] bg-slate-800/40 border border-slate-800/60 rounded-2xl p-3 items-center">
                        <Ionicons name="fish" size={20} color="#3B82F6" />
                        <Text className="text-[11px] font-semibold text-slate-400 mt-1">Protein</Text>
                        <Text className="text-sm font-bold text-slate-100 mt-2">0g</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
};