import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LogSummaryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="flex-1 bg-white" >

            {/* Success Toast */}
            <View className="self-center mt-2 bg-green-50 px-4 py-2 rounded-full flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                <Text className="text-[13px] font-bold text-green-600">Synced at 8.39 PM on 14/09/25</Text>
            </View>

            <ScrollView className="flex-1 px-5 mt-8" showsVerticalScrollIndicator={false}>

                {/* Header Icon & Title */}
                <View className="items-center mb-10 gap-2">
                    <Text className="text-[48px]">👏</Text>
                    <Text className="text-[28px] font-extrabold text-gray-900 tracking-tight mt-2">Indoor Walk</Text>
                    <Text className="text-[14px] font-medium text-gray-400">Today at 8.38 PM</Text>
                </View>

                {/* Time Stats */}
                <View className="flex-row justify-between px-6 mb-8">
                    <View className="items-center gap-1">
                        <Text className="text-[28px] font-medium text-gray-900 tracking-tight">0:30:00</Text>
                        <Text className="text-[12px] font-medium text-gray-400">Total Duration</Text>
                    </View>
                    <View className="items-center gap-1">
                        <Text className="text-[28px] font-medium text-gray-900 tracking-tight">0:30:00</Text>
                        <Text className="text-[12px] font-medium text-gray-400">Active Duration</Text>
                    </View>
                </View>

                {/* Strain Card */}
                <View className="flex-row items-center justify-between border border-gray-100 rounded-[20px] p-5 mb-4 shadow-sm shadow-black/5 bg-white">
                    <Text className="font-bold text-[15px] text-gray-900">Activity Strain</Text>
                    <View className="flex-row items-center gap-3">
                        <Text className="font-bold text-[15px] text-gray-900">0%</Text>
                        <View className="w-6 h-6 rounded-full border border-gray-200" />
                    </View>
                </View>

                {/* Metric Cards Row */}
                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1 border border-gray-100 rounded-[20px] p-4 flex-row items-center gap-3 shadow-sm shadow-black/5 bg-white">
                        <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
                            <Ionicons name="location" size={18} color="#9CA3AF" />
                        </View>
                        <View>
                            <Text className="font-bold text-[15px] text-gray-900">5.00 km</Text>
                            <Text className="text-[12px] font-medium text-gray-400">Distance</Text>
                        </View>
                    </View>

                    <View className="flex-1 border border-gray-100 rounded-[20px] p-4 flex-row items-center gap-3 shadow-sm shadow-black/5 bg-white">
                        <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
                            <Ionicons name="stopwatch" size={18} color="#9CA3AF" />
                        </View>
                        <View>
                            <Text className="font-bold text-[15px] text-gray-900">15:32 km</Text>
                            <Text className="text-[12px] font-medium text-gray-400">Pace</Text>
                        </View>
                    </View>
                </View>

                {/* Total Energy Card */}
                <View className="border border-gray-100 rounded-[20px] p-4 flex-row items-center gap-3 shadow-sm shadow-black/5 bg-white mb-8">
                    <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
                        <Ionicons name="flame" size={18} color="#9CA3AF" />
                    </View>
                    <View>
                        <Text className="font-bold text-[15px] text-gray-900">200 kCal</Text>
                        <Text className="text-[12px] font-medium text-gray-400">Total Energy</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Action Buttons */}
            <View style={{ paddingBottom: insets.bottom || 20 }} className="px-5 pt-4 bg-white gap-3">
                <TouchableOpacity onPress={() => router.dismissAll()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">View Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.dismissAll()} className="bg-red-50 h-[56px] rounded-full items-center justify-center">
                    <Text className="text-red-500 font-semibold text-[16px]">Discard</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}