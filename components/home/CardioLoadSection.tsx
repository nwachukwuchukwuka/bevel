import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const CardioLoadSection = () => {
    return (
        <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
            <View className="flex-row items-center gap-2 mb-6">
                <Ionicons name="stats-chart" size={16} color="#9CA3AF" />
                <Text className="text-[14px] font-bold text-gray-500 uppercase tracking-tight">Cardio Load</Text>
            </View>

            <View className="flex-row items-end justify-between">
                <View>
                    <Text className="text-[32px] font-bold text-gray-900 leading-9">13</Text>
                    <Text className="text-[13px] font-bold text-pink-500 mt-1">Overtraining</Text>
                </View>

                {/* Line Chart Mock */}
                <View className="flex-1 h-12 ml-6 justify-end">
                    <View className="absolute w-full h-[2px] bg-indigo-100 bottom-2" />
                    <View className="flex-row items-end h-full">
                        <View className="flex-1" />
                        <View className="w-full h-full relative">
                            {/* SVG PATH or just a slanted View for mock */}
                            <View 
                                className="absolute bottom-2 left-0 right-4 h-[2px] bg-indigo-200" 
                                style={{ width: '80%' }}
                            />
                            <View 
                                className="absolute bottom-2 right-4 w-4 h-[30px] border-r-2 border-indigo-400" 
                                style={{ transform: [{ skewY: '-45deg' }] }}
                            />
                            <View className="absolute top-0 right-3 w-2.5 h-2.5 rounded-full bg-pink-400 border-2 border-white shadow-sm" />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
