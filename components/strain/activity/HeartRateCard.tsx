import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const ZONES = [
    { z: 0, duration: '0:00:10', pct: 0, color: 'bg-gray-300' },
    { z: 1, duration: '0:00:48', pct: 2, color: 'bg-blue-500' },
    { z: 2, duration: '0:30:32', pct: 68, color: 'bg-yellow-400' },
    { z: 3, duration: '0:13:41', pct: 30, color: 'bg-orange-500' },
    { z: 4, duration: '0:00:00', pct: 0, color: 'bg-red-500' },
    { z: 5, duration: '0:00:00', pct: 0, color: 'bg-purple-500' },
];

export const HeartRateCard = () => {
    return (
        <View className="mb-6">
            <Text className="text-[16px] font-bold text-gray-900 mb-3">Heart Rate</Text>
            <View className="bg-white rounded-[24px] border border-gray-100 shadow-sm shadow-black/5 overflow-hidden">

                {/* Header & Graph Area */}
                <View className="p-5 border-b border-gray-50">
                    <View className="flex-row justify-between items-start mb-6">
                        <View>
                            <Text className="text-[28px] font-bold text-gray-900 tracking-tight">128 <Text className="text-[18px] font-bold text-gray-500">bpm</Text></Text>
                            <Text className="text-[12px] font-medium text-gray-400">Average HR</Text>
                        </View>
                        <Text className="text-[14px] font-bold text-yellow-500">Zone 2</Text>
                    </View>

                    {/* Chart Mock */}
                    <View className="h-32 w-full justify-end relative pb-6">
                        {/* Fake Y-Axis Label */}
                        <Text className="absolute right-0 top-0 text-[10px] text-gray-300 font-bold">145</Text>
                        <Text className="absolute right-0 bottom-6 text-[10px] text-gray-300 font-bold">92</Text>

                        {/* Fake jagged line (Using a gradient block for visual mock as requested) */}
                        <View className="h-20 w-[95%] overflow-hidden items-end justify-end flex-row items-end gap-[2px]">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <View key={i} className="w-[1.5%] bg-yellow-400 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
                            ))}
                        </View>

                        {/* X-Axis Labels */}
                        <View className="flex-row justify-between w-[95%] mt-2">
                            <Text className="text-[10px] font-medium text-gray-400">8.22 AM</Text>
                            <Text className="text-[10px] font-medium text-gray-400">8.45 AM</Text>
                            <Text className="text-[10px] font-medium text-gray-400">9.08 AM</Text>
                        </View>
                    </View>

                    {/* Spectrum Bar */}
                    <View className="mt-2">
                        <View className="flex-row justify-between mb-1 px-1">
                            {['Z0', 'Z1', 'Z2', 'Z3', 'Z4', 'Z5'].map((z, i) => (
                                <Text key={z} className={`text-[10px] font-bold ${i === 2 ? 'text-yellow-500' : i === 1 ? 'text-blue-500' : i === 3 ? 'text-orange-500' : i === 4 ? 'text-red-500' : i === 5 ? 'text-purple-500' : 'text-gray-300'}`}>{z}</Text>
                            ))}
                        </View>
                        <LinearGradient colors={['#D1D5DB', '#3B82F6', '#FACC15', '#F97316', '#EF4444', '#A855F7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-2 rounded-full w-full relative">
                            {/* Marker */}
                            <View className="absolute left-[40%] -top-1 w-4 h-4 rounded-full border-2 border-white bg-transparent" />
                        </LinearGradient>
                        <View className="flex-row justify-between mt-1 px-1">
                            <Text className="text-[9px] font-bold text-gray-400">0</Text>
                            <Text className="text-[9px] font-bold text-gray-400">95</Text>
                            <Text className="text-[9px] font-bold text-gray-400">115</Text>
                            <Text className="text-[9px] font-bold text-gray-400">133</Text>
                            <Text className="text-[9px] font-bold text-gray-400">152</Text>
                            <Text className="text-[9px] font-bold text-gray-400">171+</Text>
                        </View>
                    </View>
                </View>

                {/* Zones List */}
                <View className="p-5">
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-[11px] font-medium text-gray-400 w-[15%]">Zone</Text>
                        <Text className="text-[11px] font-medium text-gray-400 w-[25%]">Duration</Text>
                        <Text className="text-[11px] font-medium text-gray-400 w-[10%] text-right">%</Text>
                    </View>

                    <View className="gap-4">
                        {ZONES.map((zone) => (
                            <View key={zone.z} className="flex-row items-center justify-between">
                                <Text className="text-[13px] font-bold text-gray-500 w-[15%]">{zone.z}</Text>
                                <Text className="text-[13px] font-bold text-gray-900 w-[25%]">{zone.duration}</Text>
                                <View className="flex-1 px-2 justify-center">
                                    <View className={`h-1.5 rounded-full ${zone.color}`} style={{ width: `${Math.max(zone.pct, 2)}%`, opacity: zone.pct === 0 ? 0 : 1 }} />
                                </View>
                                <Text className="text-[13px] font-medium text-gray-500 w-[10%] text-right">{zone.pct}%</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};