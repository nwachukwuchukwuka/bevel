import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface StressSectionProps {
    onPress?: () => void;
}

export const StressSection = ({ onPress }: StressSectionProps) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 mb-3">
            <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center gap-2">
                    <View className="w-2 h-2 rounded-full bg-green-500" />
                    <Text className="text-gray-700 font-semibold">Today's stress</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color="#9CA3AF" />
            </View>
            <Text className="text-xs text-gray-400 mb-6 ml-4">Last updated at 7:54 AM</Text>
            <View className="flex-row items-center">
                <View className="flex-1 flex-row justify-between pr-4">
                    <View>
                        <Text className="text-yellow-500 text-lg font-bold">36</Text>
                        <Text className="text-gray-400 text-xs">Highest</Text>
                    </View>
                    <View className="border-l border-gray-100 h-8 mx-2" />
                    <View>
                        <Text className="text-green-500 text-lg font-bold">6</Text>
                        <Text className="text-gray-400 text-xs">Lowest</Text>
                    </View>
                    <View className="border-l border-gray-100 h-8 mx-2" />
                    <View>
                        <Text className="text-teal-500 text-lg font-bold">11</Text>
                        <Text className="text-gray-400 text-xs">Average</Text>
                    </View>
                </View>
                <View className="w-[72px] h-[72px] items-center justify-center relative">
                    <View className="absolute w-full h-full border-4 border-gray-100 rounded-full border-dashed" />
                    <Text className="text-xl font-bold text-gray-700">36</Text>
                </View>
            </View>
        </View>
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center gap-3">
            <Ionicons name="flash" size={20} color="#22C55E" />
            <View className="flex-1 h-6 flex-row items-end gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => (
                    <View key={i} className={`w-[2px] rounded-full ${i < 30 ? 'bg-green-400 h-full' : 'bg-gray-100 h-3'}`} />
                ))}
            </View>
            <Text className="font-bold text-gray-900">71%</Text>
        </View>
    </TouchableOpacity>
);
