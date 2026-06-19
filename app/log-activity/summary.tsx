import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LogSummaryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" >

            {/* Success Toast */}
            <View className="self-center mt-4 bg-[#151E33] border border-[#1E2D4A] px-5 py-2.5 rounded-full flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={18} color="#4DB9F2" />
                <Text className="text-[14px]  text-[#4DB9F2]">Synced at 8.39 PM on 14/09/25</Text>
            </View>

            <ScrollView className="flex-1 px-5 mt-8" showsVerticalScrollIndicator={false}>

                {/* Header Icon & Title */}
                <View className="items-center mb-10 gap-3">
                    <View className="w-20 h-20 bg-[#0F172A] border border-[#1E2D4A] rounded-[20px] items-center justify-center">
                        <Text className="text-[42px]">👏</Text>
                    </View>
                    <Text className="text-[28px]  text-[#F1F5F9] mt-2">Indoor Walk</Text>
                    <Text className="text-[15px] font-medium text-[#94A3B8]">Today at 8.38 PM</Text>
                </View>

                {/* Time Stats */}
                <View className="flex-row justify-between bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-6 mb-6">
                    <View className="items-center gap-1.5 flex-1 border-r border-[#1E2D4A]">
                        <Text className="text-[26px]  text-[#F1F5F9]">0:30:00</Text>
                        <Text className="text-[13px] font-semibold text-[#64748B]">Total Duration</Text>
                    </View>
                    <View className="items-center gap-1.5 flex-1">
                        <Text className="text-[26px]  text-[#F1F5F9]">0:30:00</Text>
                        <Text className="text-[13px] font-semibold text-[#64748B]">Active Duration</Text>
                    </View>
                </View>

                {/* Strain Card */}
                <View className="flex-row items-center justify-between border border-[#1E2D4A] rounded-[24px] p-5 mb-4 bg-[#151E33]">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-[12px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                            <Ionicons name="analytics" size={20} color="#4DB9F2" />
                        </View>
                        <Text className=" text-[16px] text-[#F1F5F9]">Activity Strain</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <Text className=" text-[18px] text-[#F1F5F9]">0%</Text>
                        <View className="w-8 h-8 rounded-full border-2 border-[#1E2D4A] bg-[#0F172A]" />
                    </View>
                </View>

                {/* Metric Cards Row */}
                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1 border border-[#1E2D4A] rounded-[24px] p-5 gap-4 bg-[#151E33]">
                        <View className="w-12 h-12 rounded-[14px] bg-[#0F172A] items-center justify-center border border-[#1E2D4A]">
                            <Ionicons name="location" size={22} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className=" text-[18px] text-[#F1F5F9]">5.00 km</Text>
                            <Text className="text-[13px] font-semibold text-[#64748B] mt-0.5">Distance</Text>
                        </View>
                    </View>

                    <View className="flex-1 border border-[#1E2D4A] rounded-[24px] p-5 gap-4 bg-[#151E33]">
                        <View className="w-12 h-12 rounded-[14px] bg-[#0F172A] items-center justify-center border border-[#1E2D4A]">
                            <Ionicons name="stopwatch" size={22} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className=" text-[18px] text-[#F1F5F9]">15:32 km</Text>
                            <Text className="text-[13px] font-semibold text-[#64748B] mt-0.5">Pace</Text>
                        </View>
                    </View>
                </View>

                {/* Total Energy Card */}
                <View className="border border-[#1E2D4A] rounded-[24px] p-5 flex-row items-center gap-4 bg-[#151E33] mb-8">
                    <View className="w-12 h-12 rounded-[14px] bg-[#0F172A] items-center justify-center border border-[#1E2D4A]">
                        <Ionicons name="flame" size={22} color="#FB923C" />
                    </View>
                    <View>
                        <Text className=" text-[18px] text-[#F1F5F9]">200 kCal</Text>
                        <Text className="text-[13px] font-semibold text-[#64748B] mt-0.5">Total Energy</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Action Buttons */}
            <View style={{ paddingBottom: insets.bottom || 20 }} className="px-5 pt-4 bg-[#090D16] border-t border-[#1E2D4A] gap-4">
                <TouchableOpacity onPress={() => router.dismissAll()} className="bg-[#4DB9F2] h-[56px] rounded-[16px] items-center justify-center">
                    <Text className="text-[#090D16]  text-[16px]">View Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.dismissAll()} className="bg-[#0F172A] border border-[#1E2D4A] h-[56px] rounded-[16px] items-center justify-center">
                    <Text className="text-[#F87171]  text-[16px]">Discard</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}