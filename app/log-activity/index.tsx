import { ACTIVITY_TYPES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SelectActivityScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" >
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#F9FAFB]">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text className="text-[16px] text-gray-500 font-medium">Cancel</Text>
                </TouchableOpacity>

                <View className="items-center">
                    {/* <View className="w-8 h-1 bg-gray-300 rounded-full mb-2" /> */}
                    <Text className="font-semibold text-[16px] text-gray-900">Activities</Text>
                </View>

                <TouchableOpacity
                    disabled={!selectedId}
                    onPress={() => router.push({ pathname: '/log-activity/details', params: { id: selectedId } })}
                >
                    <Text className={`text-[16px] font-semibold ${selectedId ? 'text-gray-900' : 'text-gray-300'}`}>Next</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
                {/* Search */}
                <View className="flex-row items-center bg-gray-100 rounded-[12px] px-4 h-[44px] mt-4 mb-4">
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-2 text-[15px] text-gray-900 font-medium"
                    />
                </View>

                {/* Filter */}
                <TouchableOpacity className="flex-row items-center justify-between bg-white border border-gray-100 rounded-[12px] px-4 h-[48px] mb-6 shadow-sm shadow-black/5">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="filter" size={18} color="#4B5563" />
                        <Text className="font-semibold text-[15px] text-gray-900">All types</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>

                {/* List */}
                <Text className="text-[13px] font-bold text-gray-500 mb-3">Recents</Text>
                <View className="gap-2">
                    {ACTIVITY_TYPES.map((item) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelectedId(item.id)}
                                activeOpacity={0.7}
                                className={`flex-row items-center justify-between bg-white px-4 h-[64px] rounded-[16px] border ${isSelected ? 'border-blue-500' : 'border-gray-50'} shadow-sm shadow-black/5`}
                            >
                                <View className="flex-row items-center gap-4">
                                    <Ionicons name={item.icon as any} size={24} color={isSelected ? "#3B82F6" : "#F59E0B"} />
                                    <Text className="font-bold text-[16px] text-gray-900">{item.name}</Text>
                                </View>
                                {isSelected && <Ionicons name="checkmark" size={24} color="#3B82F6" />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}