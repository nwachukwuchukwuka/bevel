import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

export const CardioImpactCard = () => {
    return (
        <View className="mb-6">
            <Text className="text-[16px] font-bold text-gray-900 mb-3">Cardio Impact</Text>
            <View className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">

                {/* Cardio Load */}
                <View className="flex-row items-center gap-2 mb-4">
                    <Ionicons name="pulse" size={16} color="#9CA3AF" />
                    <Text className="text-[13px] font-bold text-gray-500">Cardio Load</Text>
                </View>

                <View className="flex-row items-end justify-between mb-6 pb-6 border-b border-gray-50">
                    <View>
                        <Text className="text-[24px] font-bold text-gray-900">+8</Text>
                        <Text className="text-[13px] font-bold text-pink-500">Overtraining</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <View className="items-center">
                            <Text className="text-[11px] font-medium text-gray-400 mb-1">Before</Text>
                            <View className="bg-gray-200 px-6 py-2 rounded-lg"><Text className="font-bold text-gray-400">5</Text></View>
                        </View>
                        <View className="items-center">
                            <Text className="text-[11px] font-medium text-gray-400 mb-1">After</Text>
                            <LinearGradient colors={['#FF719A', '#B95CE4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="px-6 py-2 rounded-lg">
                                <Text className="font-bold text-white">13</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>

                {/* Cardio Focus */}
                <View className="flex-row items-center gap-2 mb-4">
                    <Ionicons name="layers" size={16} color="#9CA3AF" />
                    <Text className="text-[13px] font-bold text-gray-500">Cardio Focus</Text>
                </View>

                <View className="flex-row justify-between mb-3">
                    <View>
                        <Text className="text-[15px] font-bold text-gray-900">100% <Text className="text-[11px] font-medium text-gray-400">(+20)</Text></Text>
                        <Text className="text-[12px] font-bold text-teal-400">Low Aero.</Text>
                    </View>
                    <View>
                        <Text className="text-[15px] font-bold text-gray-900">0% <Text className="text-[11px] font-medium text-gray-400">(+0)</Text></Text>
                        <Text className="text-[12px] font-bold text-blue-400">High Aero.</Text>
                    </View>
                    <View>
                        <Text className="text-[15px] font-bold text-gray-900">0% <Text className="text-[11px] font-medium text-gray-400">(+0)</Text></Text>
                        <Text className="text-[12px] font-bold text-purple-400">Anaerobic</Text>
                    </View>
                </View>

                {/* Progress Bar Mock */}
                <View className="h-2.5 rounded-full bg-gray-100 overflow-hidden flex-row">
                    <View className="bg-teal-400 h-full w-full rounded-full" />
                </View>

            </View>
        </View>
    );
};