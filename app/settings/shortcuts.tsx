import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShortcutsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900 flex-1 text-center mr-6">Shortcuts</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                <Text className="text-[14px] font-bold text-gray-900 mb-4 ml-1">Sleep</Text>

                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-6 p-5">
                    <Text className="text-[15px] font-bold text-gray-900 mb-2">Sleep alarm + sleep focus</Text>
                    <Text className="text-[13px] text-gray-500 leading-5 mb-6">Schedule the alarm and activate Sleep Focus mode at the same time.</Text>

                    <View className="h-[1px] bg-gray-100 mb-4" />

                    <TouchableOpacity className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                            {/* Apple Shortcuts Icon Mock */}
                            <View className="w-5 h-5 rounded overflow-hidden flex-row flex-wrap">
                                <View className="w-1/2 h-1/2 bg-pink-400" />
                                <View className="w-1/2 h-1/2 bg-purple-400" />
                                <View className="w-1/2 h-1/2 bg-blue-400" />
                                <View className="w-1/2 h-1/2 bg-teal-400" />
                            </View>
                            <Text className="text-[15px] font-bold text-gray-900">Add to Shortcuts</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}