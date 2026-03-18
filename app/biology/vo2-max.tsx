import { VO2MaxInfoSheet, VO2MaxInfoSheetRef } from '@/components/biology/VO2MaxInfoSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function VO2MaxModal() {
    const router = useRouter();
    const infoSheetRef = useRef<VO2MaxInfoSheetRef>(null);

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-white">
                {/* Modal Handle */}
                <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    <View className="px-5 flex-row items-center justify-between mb-6">
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="fitness" size={20} color="#6B7280" />
                            <Text className="text-[16px] font-bold text-gray-600">VO₂ Max</Text>
                        </View>
                        <TouchableOpacity onPress={() => infoSheetRef.current?.present()} className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center bg-gray-50">
                            <Ionicons name="information" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    <View className="px-5 flex-row justify-between items-end mb-8">
                        <View>
                            <Text className="text-[36px] font-bold text-gray-900 tracking-tight">29.9</Text>
                            <Text className="text-[14px] font-medium text-gray-500">10 Aug 2025</Text>
                        </View>
                        <Text className="text-[16px] font-bold text-yellow-500">Fair</Text>
                    </View>

                    {/* Chart Area */}
                    <View className="px-5 mb-8 relative h-72">
                        {/* Y-Axis Line Chart Labels */}
                        <View className="absolute right-5 top-0 bottom-24 justify-between items-end z-0">
                            <Text className="text-[10px] font-bold text-gray-400">30,2</Text>
                            <Text className="text-[10px] font-bold text-yellow-500">30,1</Text>
                            <Text className="text-[10px] font-bold text-yellow-500">25,3</Text>
                            <Text className="text-[10px] font-bold text-gray-400">25,2</Text>
                        </View>

                        {/* Line Chart Background Gradient */}
                        <View className="absolute top-10 left-5 right-14 h-32 overflow-hidden">
                            <LinearGradient colors={['rgba(250, 204, 21, 0.2)', 'rgba(250, 204, 21, 0)']} style={{ width: '100%', height: '100%' }} />
                        </View>

                        {/* Line Chart Mock */}
                        <View className="absolute top-10 left-5 right-14 h-32 flex-row items-end pb-8">
                            <View className="flex-1 h-full border-t-[3px] border-yellow-500 transform -rotate-6 translate-y-4" />
                            <View className="w-3 h-3 bg-white border-[3px] border-yellow-500 rounded-full shadow-sm absolute right-0 top-0" />
                            <Text className="absolute left-2 top-2 text-[10px] font-bold text-yellow-500">Fair</Text>
                        </View>

                        {/* Y-Axis Bar Chart Labels */}
                        <View className="absolute right-5 bottom-8 h-20 justify-between items-end z-0">
                            <Text className="text-[10px] font-bold text-gray-400">83,6</Text>
                            <Text className="text-[10px] font-bold text-gray-400">55,7</Text>
                            <Text className="text-[10px] font-bold text-gray-400">27,9</Text>
                            <Text className="text-[10px] font-bold text-gray-400">0</Text>
                        </View>

                        {/* Bar Chart Mock (Strain) */}
                        <View className="absolute bottom-8 left-5 right-14 h-20 flex-row items-end justify-between gap-[2px]">
                            {Array.from({ length: 20 }).map((_, i) => {
                                const height = Math.max(10, Math.random() * 100);
                                const isHigh = height > 70;
                                return (
                                    <View key={i} className={`flex-1 rounded-t-sm ${isHigh ? 'bg-orange-500' : 'bg-yellow-400'}`} style={{ height: `${height}%` }} />
                                );
                            })}
                        </View>

                        {/* X-Axis */}
                        <View className="absolute bottom-0 left-5 right-14 flex-row justify-between">
                            <Text className="text-[10px] font-bold text-gray-400">11 Jul</Text>
                            <Text className="text-[10px] font-bold text-gray-400">18 Jul</Text>
                            <Text className="text-[10px] font-bold text-gray-400">26 Jul</Text>
                            <Text className="text-[10px] font-bold text-gray-400">2 Aug</Text>
                            <Text className="text-[10px] font-bold text-gray-400">10 Aug</Text>
                        </View>
                    </View>

                    <View className="px-5 flex-row items-center gap-1.5 mb-6">
                        <Ionicons name="bar-chart" size={14} color="#F59E0B" />
                        <Text className="text-[12px] font-bold text-gray-500">Strain</Text>
                    </View>

                    {/* Timeframe Selector */}
                    <View className="px-5 flex-row items-center justify-between mb-10">
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-back" size={16} color="#9CA3AF" /></TouchableOpacity>
                        <View className="flex-row items-center gap-1">
                            <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm"><Text className="text-[12px] font-bold text-gray-900">1M</Text></TouchableOpacity>
                            <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">3M</Text></TouchableOpacity>
                            <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">6M</Text></TouchableOpacity>
                            <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">1Y</Text></TouchableOpacity>
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="calendar-outline" size={14} color="#9CA3AF" /></TouchableOpacity>
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></TouchableOpacity>
                        </View>
                    </View>

                    {/* Dummy Content to allow scrolling */}
                    <View className="px-5">
                        <Text className="text-[16px] font-bold text-gray-900 mb-1">Trends Analysis</Text>
                        <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 10 Aug 2025</Text>
                    </View>

                </ScrollView>

                {/* Floating Button */}
                <View className="absolute bottom-10 self-center">
                    <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
                        <Text className="text-[16px] mr-2">📈</Text>
                        <Text className="font-bold text-[14px] text-gray-900 mr-2">VO2 Max on the Rise!</Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                <VO2MaxInfoSheet ref={infoSheetRef} />
            </View>
        </BottomSheetModalProvider>
    );
}