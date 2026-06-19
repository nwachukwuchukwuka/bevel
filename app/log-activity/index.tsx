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
        <SafeAreaView className="flex-1 bg-[#090D16]" >
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 bg-[#090D16]">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-[#151E33] rounded-[12px] items-center justify-center border border-[#1E2D4A]">
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>

                <View className="items-center">
                    <Text className="font-bold text-[18px] text-[#F1F5F9]">Activities</Text>
                </View>

                <TouchableOpacity
                    disabled={!selectedId}
                    onPress={() => router.push({ pathname: '/log-activity/details', params: { id: selectedId } })}
                    className={`px-4 py-2 rounded-[10px] items-center justify-center ${selectedId ? 'bg-[#4DB9F2]' : 'bg-[#151E33] border border-[#1E2D4A]'}`}
                >
                    <Text className={`text-[14px] ${selectedId ? 'text-[#090D16]' : 'text-[#475569]'}`}>Next</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
                {/* Search */}
                <View className="flex-row items-center bg-[#151E33] border border-[#1E2D4A] rounded-[16px] px-4 h-[52px] mb-5">
                    <Ionicons name="search" size={20} color="#64748B" />
                    <TextInput
                        placeholder="Search activities..."
                        placeholderTextColor="#64748B"
                        className="flex-1 ml-3 text-[16px] text-[#F1F5F9] font-medium"
                    />
                </View>

                {/* Filter */}
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-[18px] font-semibold text-[#F1F5F9]">Categories</Text>
                    <TouchableOpacity className="flex-row items-center gap-2 bg-[#151E33] border border-[#1E2D4A] rounded-full px-4 py-2">
                        <Ionicons name="filter" size={16} color="#94A3B8" />
                        <Text className="font-semibold text-[14px] text-[#94A3B8]">All types</Text>
                        <Ionicons name="chevron-down" size={16} color="#64748B" />
                    </TouchableOpacity>
                </View>

                {/* List (Redesigned as Grid) */}
                <View className="flex-row flex-wrap justify-between gap-y-4">
                    {ACTIVITY_TYPES.map((item) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelectedId(item.id)}
                                activeOpacity={0.7}
                                className={`w-[48%] aspect-square p-4 rounded-[24px] border items-center justify-center gap-3
                                    ${isSelected ? 'bg-[#15233A] border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                            >
                                <View className={`w-14 h-14 rounded-full items-center justify-center border 
                                    ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#0F172A] border-[#1E2D4A]'}`}
                                >
                                    <Ionicons name={item.icon as any} size={28} color={isSelected ? '#090D16' : '#94A3B8'} />
                                </View>
                                <Text className={` text-[15px] text-center ${isSelected ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>
                                    {item.name}
                                </Text>
                                {isSelected && (
                                    <View className="absolute top-4 right-4 w-6 h-6 bg-[#4DB9F2] rounded-full items-center justify-center border-2 border-[#15233A]">
                                        <Ionicons name="checkmark" size={12} color="#090D16" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}