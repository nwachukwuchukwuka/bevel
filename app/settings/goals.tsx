import { SleepGoalMethodSheet, SleepGoalMethodSheetRef } from '@/components/settings/SleepGoalMethodSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalsScreen() {
    const router = useRouter();
    const sheetRef = useRef<SleepGoalMethodSheetRef>(null);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB]">
                <View className="flex-row items-center px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-[16px] font-bold text-gray-900 flex-1 text-center mr-6">Goals</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                    <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Sleep</Text>
                    <TouchableOpacity onPress={() => sheetRef.current?.present()} className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row justify-between items-center mb-8">
                        <View>
                            <View className="flex-row items-center gap-1.5 mb-6">
                                <Ionicons name="moon" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">Sleep goal</Text>
                            </View>
                            <Text className="text-[28px] font-bold text-gray-900 mb-1">7h 30m</Text>
                            <Text className="text-[13px] font-medium text-gray-500">Time asleep</Text>
                        </View>
                        <View className="flex-row items-center gap-4">
                            <View className="w-16 h-16 rounded-full border-4 border-gray-100 items-center justify-center relative">
                                <View className="absolute w-full h-full border-4 border-blue-400 rounded-full border-t-transparent -rotate-45" />
                                <Ionicons name="sparkles" size={12} color="#3B82F6" className="absolute top-2 left-3" />
                                <Ionicons name="sunny" size={12} color="#FACC15" className="absolute bottom-2 right-3" />
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                    </TouchableOpacity>

                    <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Nutrition</Text>
                    <TouchableOpacity className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 mb-8">
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center gap-1.5">
                                <Ionicons name="restaurant" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-bold text-gray-500">Nutrition goal</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-1.5">
                                <Ionicons name="logo-apple" size={16} color="#4B5563" />
                                <Text className="text-[16px] font-bold text-gray-900">1.892 kcal</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-[11px] font-bold text-blue-500">63,1g</Text>
                                <Text className="text-[11px] font-bold text-yellow-500">189,2g</Text>
                                <Text className="text-[11px] font-bold text-pink-500">141,9g</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Journal</Text>
                    <TouchableOpacity className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row justify-between items-center">
                        <Text className="text-[15px] font-bold text-gray-900">Daily water goal</Text>
                        <View className="flex-row items-center gap-1.5">
                            <Text className="text-[15px] font-medium text-gray-600">1892.71 ml</Text>
                            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                        </View>
                    </TouchableOpacity>

                </ScrollView>

                <SleepGoalMethodSheet ref={sheetRef} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}