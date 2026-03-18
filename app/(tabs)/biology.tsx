import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BiologyScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <SafeAreaView edges={['top']} className="flex-1">
                <View className="px-5 pt-2 mb-6">
                    <Text className="text-[24px] font-bold text-gray-900">Biology</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>

                    {/* VO2 Max Card */}
                    <TouchableOpacity onPress={() => router.push('/biology/vo2-max')} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-4">
                        <View className="flex-row items-center gap-1.5 mb-4">
                            <Ionicons name="fitness" size={14} color="#9CA3AF" />
                            <Text className="text-[12px] font-bold text-gray-500">VO₂ Max</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-[28px] font-bold text-gray-900 tracking-tight">29.9</Text>
                                <Text className="text-[13px] font-bold text-yellow-500">Fair</Text>
                            </View>
                            {/* Horizontal Bar Graphic Mock */}
                            <View className="w-32 gap-1 items-end">
                                <View className="w-full h-1.5 bg-orange-50 rounded-full" />
                                <View className="w-full h-1.5 bg-orange-100 rounded-full" />
                                <View className="w-full h-4 bg-orange-200 rounded-full relative justify-center">
                                    <View className="absolute right-[40%] w-3 h-3 bg-white border-2 border-orange-400 rounded-full" />
                                </View>
                                <View className="w-full h-1.5 bg-orange-100 rounded-full" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* HRV & RHR Row */}
                    <View className="flex-row gap-4 mb-4">
                        <View className="flex-1 bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-1.5 mb-6">
                                <Ionicons name="pulse" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">HRV Baselines</Text>
                            </View>
                            {/* Sparkline Mock */}
                            <View className="h-10 mb-4 items-end justify-end border-b border-gray-100">
                                <View className="w-full border-t-2 border-gray-400 transform -rotate-12 translate-y-1 relative">
                                    <View className="absolute right-0 -top-2 w-3 h-3 bg-white border-2 border-gray-400 rounded-full" />
                                </View>
                            </View>
                            <Text className="text-[20px] font-bold text-gray-900">65.2 <Text className="text-[12px] text-gray-400 font-medium">ms</Text></Text>
                            <View className="flex-row items-center gap-1 mt-1">
                                <Ionicons name="arrow-forward-circle" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">Stabilizing</Text>
                            </View>
                        </View>

                        <View className="flex-1 bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-1.5 mb-6">
                                <Ionicons name="heart" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">RHR Baselines</Text>
                            </View>
                            <Text className="text-[20px] font-bold text-gray-900">57.9 <Text className="text-[12px] text-gray-400 font-medium">bpm</Text></Text>
                            <Text className="text-[13px] font-bold text-yellow-500 mb-4">Fair</Text>
                            {/* Arch Gauge Mock */}
                            <View className="h-10 items-center justify-end overflow-hidden relative">
                                <View className="w-24 h-24 rounded-full border-[4px] border-dashed border-gray-200" />
                                <View className="absolute w-24 h-24 rounded-full border-[4px] border-yellow-400 border-b-transparent border-r-transparent -rotate-45" />
                                <View className="absolute left-[20%] top-[40%] w-3 h-3 bg-white border-2 border-yellow-400 rounded-full" />
                                <Text className="absolute bottom-0 left-0 text-[10px] font-bold text-blue-400">-</Text>
                                <Text className="absolute bottom-0 right-0 text-[10px] font-bold text-red-400">+</Text>
                            </View>
                        </View>
                    </View>

                    {/* Weight Card */}
                    <TouchableOpacity onPress={() => router.push('/biology/weight')} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5 mb-4">
                        <View className="flex-row items-center gap-1.5 mb-6">
                            <Ionicons name="scale" size={14} color="#9CA3AF" />
                            <Text className="text-[12px] font-bold text-gray-500">Weight</Text>
                        </View>
                        <View className="flex-row justify-between items-end">
                            <View>
                                <Text className="text-[24px] font-bold text-gray-900 tracking-tight">63.1 <Text className="text-[14px] text-gray-400 font-medium">kg</Text></Text>
                                <View className="flex-row items-center gap-1 mt-1">
                                    <Ionicons name="arrow-up-circle" size={14} color="#6B7280" />
                                    <Text className="text-[12px] font-bold text-gray-700">Increasing</Text>
                                </View>
                            </View>
                            {/* Mini line chart mock */}
                            <View className="w-32 h-16 relative items-end justify-end border-b border-dashed border-gray-200 pb-1">
                                <View className="w-full h-full border-b-[2px] border-blue-400 transform rotate-12 -translate-y-2 relative">
                                    <View className="absolute right-0 -bottom-1 w-2.5 h-2.5 bg-white border-2 border-blue-400 rounded-full" />
                                </View>
                                <View className="absolute inset-0 border-b-[2px] border-dashed border-purple-400 transform -rotate-12 translate-y-4" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Lean Body Mass & Body Fat Row */}
                    <View className="flex-row gap-4 mb-8">
                        <View className="flex-1 bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-1.5 mb-6">
                                <Ionicons name="body" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">Lean Body Mass</Text>
                            </View>
                            <View className="h-10 mb-4 items-end justify-end border-b border-gray-100">
                                <View className="w-full border-t-2 border-gray-600 transform -rotate-[20deg] translate-y-3 relative">
                                    <View className="absolute right-0 -top-2 w-3 h-3 bg-white border-2 border-gray-600 rounded-full" />
                                </View>
                            </View>
                            <Text className="text-[20px] font-bold text-gray-900">45.4 <Text className="text-[12px] text-gray-400 font-medium">kg</Text></Text>
                            <View className="flex-row items-center gap-1 mt-1">
                                <Ionicons name="arrow-up-circle" size={14} color="#6B7280" />
                                <Text className="text-[12px] font-bold text-gray-700">Increasing</Text>
                            </View>
                        </View>

                        <View className="flex-1 bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-1.5 mb-6">
                                <Ionicons name="water" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">Body Fat</Text>
                            </View>
                            <Text className="text-[20px] font-bold text-gray-900">26.9 <Text className="text-[12px] text-gray-400 font-medium">%</Text></Text>
                            <Text className="text-[13px] font-bold text-emerald-500 mb-4">Acceptable</Text>

                            <View className="h-10 items-center justify-end overflow-hidden relative">
                                <View className="w-24 h-24 rounded-full border-[4px] border-dashed border-gray-200" />
                                <View className="absolute w-24 h-24 rounded-full border-[6px] border-emerald-400 border-b-transparent border-r-transparent -rotate-[60deg]" />
                                <View className="absolute left-[45%] top-[20%] w-3 h-3 bg-white border-2 border-emerald-500 rounded-full" />
                                <Text className="absolute bottom-0 left-0 text-[10px] font-bold text-blue-400">-</Text>
                                <Text className="absolute bottom-0 right-0 text-[10px] font-bold text-orange-400">+</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}