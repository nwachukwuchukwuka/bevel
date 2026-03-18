import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const PerceivedEffortCard = () => {
    return (
        <View className="mb-6">
            <View className="flex-row items-center gap-1.5 mb-3">
                <Text className="text-[16px] font-bold text-gray-900">Perceived Effort</Text>
                <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
            </View>
            <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                    <Text className="text-[16px] font-bold text-gray-900 mb-1">Moderate</Text>
                    <Text className="text-[13px] font-medium text-gray-500 leading-5">Moderate effort, noticeable breathing but manageable.</Text>
                </View>

                {/* Gauge Mock */}
                <View className="w-16 h-16 relative items-center justify-center">
                    <View className="absolute w-full h-full border-[6px] border-gray-100 rounded-full" />
                    <View className="absolute w-full h-full border-[6px] border-yellow-400 rounded-full border-l-transparent border-t-transparent -rotate-45" />
                    <Text className="text-[20px] font-bold text-yellow-500">4</Text>
                </View>
            </View>
        </View>
    );
};