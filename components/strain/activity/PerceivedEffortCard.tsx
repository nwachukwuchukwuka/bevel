import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const PerceivedEffortCard = () => {
    return (
        <View className="mb-8">
            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">

                <View className="flex-row items-center justify-between mb-6 border-b border-[#1E293B] pb-4">
                    <Text className="text-lg font-bold text-slate-100">Perceived Effort</Text>
                    <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                        <Ionicons name="information" size={16} color="#4DB9F2" />
                    </View>
                </View>

                <View className="flex-row items-center justify-between gap-6">

                    <View className="w-24 h-24 relative items-center justify-center">
                        <View className="absolute inset-0 border-8 border-[#1E293B] rounded-full" />
                        <View className="absolute inset-0 border-8 border-[#F59E0B] rounded-full border-l-transparent border-t-transparent -rotate-45" />
                        <Text className="text-3xl font-bold text-white">4</Text>
                    </View>

                    <View className="flex-1 bg-[#090D16] border border-[#1E293B] p-4 rounded-2xl">
                        <Text className="text-base font-bold text-[#F59E0B] mb-1">Moderate</Text>
                        <Text className="text-xs font-medium text-slate-400 leading-5">Moderate effort, noticeable breathing but manageable.</Text>
                    </View>

                </View>

            </View>
        </View>
    );
};