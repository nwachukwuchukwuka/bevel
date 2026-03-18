import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const NutritionRow = ({ icon, label }: { icon: any, label: string }) => (
    <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={14} color="#D1D5DB" />
        <Text className="text-sm font-semibold text-gray-900">{label}</Text>
        <View className="flex-1 h-[1px] border-b border-dotted border-gray-200" />
    </View>
);

export const NutritionSection = () => {
    const router = useRouter(); // <-- Add this

    return (
        <View>
            <TouchableOpacity onPress={() => router.push('/nutrition')}
                className="bg-white rounded-3xl p-5 shadow-sm shadow-black/5 border border-gray-50">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-gray-700 font-semibold">Today's foods</Text>
                    <Ionicons name="arrow-forward" size={18} color="#9CA3AF" />
                </View>

                <View className="flex-row items-center">
                    {/* Circular Graph Graphic Placeholder */}
                    <View className="w-[88px] h-[88px] items-center justify-center relative mr-6">
                        <View className="absolute w-full h-full border-[5px] border-dashed border-gray-100 rounded-full" />
                        <View className="w-4 h-[2px] bg-gray-300" />
                    </View>

                    {/* Right List */}
                    <View className="flex-1 gap-4">
                        <NutritionRow icon="nutrition" label="0g" />
                        <NutritionRow icon="leaf" label="0g" />
                        <NutritionRow icon="fish" label="0g" />
                    </View>
                </View>

                {/* NEW: Blood Glucose Row */}
                <View className="h-[1px] border-b border-dashed border-gray-100 my-4" />
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="w-2 h-2 rounded-full bg-gray-300" />
                        <Text className="text-[13px] font-semibold text-gray-600">Blood glucose</Text>
                    </View>
                    <Text className="text-[14px] font-bold text-gray-900">— <Text className="font-medium text-gray-400">mmol/L</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};