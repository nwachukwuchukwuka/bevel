import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const FEATURES = [
    'Unlock all historical data',
    'View advanced health metrics',
    'Track & improve biomarkers',
    'Access the app on the Apple Watch',
    'Build better habits with Journal',
    'Get stronger with Strength Builder'
];

export default function ManageSubscriptionScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Manage Subscription</Text>
                <View className="w-6" />
            </View>

            <View className="px-5 pt-6">
                <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5 border border-gray-100">
                    <View className="flex-row items-center gap-2 mb-3">
                        <Text className="text-[18px] font-bold text-gray-900">Bevel Pro Yearly</Text>
                        <View className="bg-gray-700 px-2 py-0.5 rounded-md"><Text className="text-[10px] font-bold text-white uppercase">Pro</Text></View>
                    </View>

                    <Text className="text-[13px] text-gray-500 leading-5 mb-6">
                        You are currently on a free trial. Your subscription will renew on 22/09/25.
                    </Text>

                    <View className="gap-3 mb-6">
                        {FEATURES.map((feature, idx) => (
                            <View key={idx} className="flex-row items-center gap-2">
                                <Ionicons name="checkmark" size={18} color="#22C55E" />
                                <Text className="text-[14px] text-gray-700">{feature}</Text>
                            </View>
                        ))}
                    </View>

                    <View className="h-[1px] bg-gray-100 mb-4" />

                    <TouchableOpacity className="flex-row items-center justify-between py-2">
                        <Text className="text-[15px] font-bold text-gray-900">Edit subscription</Text>
                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}