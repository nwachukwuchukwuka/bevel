import { JOURNAL_AUTO } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PinnedTagsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Manage local pinned state
    const [pinnedIds, setPinnedIds] = useState<string[]>([]);

    const togglePin = (id: string) => {
        if (pinnedIds.includes(id)) {
            setPinnedIds(pinnedIds.filter(pid => pid !== id));
        } else {
            setPinnedIds([...pinnedIds, id]);
        }
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
                <View className="w-8" />
                <Text className="text-[16px] font-bold text-gray-900">Pinned tags</Text>
                <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                    <Ionicons name="close" size={18} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-[18px] font-bold text-gray-900 mb-1">Pinned tags</Text>
                <Text className="text-[14px] text-gray-500 leading-5 mb-6">Based on your enabled tags, pin your favorite tags to move them to the top of your daily Journal.</Text>

                <View className="gap-3 pb-24">
                    {JOURNAL_AUTO.map((item) => {
                        const isPinned = pinnedIds.includes(item.id);
                        return (
                            <View key={item.id} className="flex-row items-center justify-between bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm shadow-black/5">
                                <View className="flex-row items-center gap-3 flex-1 pr-4">
                                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                                    <Text className="text-[15px] font-bold text-gray-900">{item.title}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => togglePin(item.id)}
                                    className="p-1"
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name={isPinned ? "pin" : "pin-outline"} size={20} color={isPinned ? "#111827" : "#9CA3AF"} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 px-5 bg-[#F9FAFB]" style={{ paddingBottom: insets.bottom || 20, paddingTop: 10 }}>
                <TouchableOpacity onPress={() => router.back()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center shadow-lg shadow-black/10">
                    <Text className="text-white font-semibold text-[16px]">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}