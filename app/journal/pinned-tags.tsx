import { JOURNAL_AUTO } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PinnedTagsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [pinnedIds, setPinnedIds] = useState<string[]>([]);

    const togglePin = (id: string) => {
        if (pinnedIds.includes(id)) {
            setPinnedIds(pinnedIds.filter(pid => pid !== id));
        } else {
            setPinnedIds([...pinnedIds, id]);
        }
    };

    const pinnedItems = JOURNAL_AUTO.filter(item => pinnedIds.includes(item.id));
    const availableItems = JOURNAL_AUTO.filter(item => !pinnedIds.includes(item.id));

    return (
        <View className="flex-1 bg-[#090D16]">

            <View className="px-5 pb-6 pt-6 bg-[#151E33] border-b border-[#1E293B]">
                <View className="flex-row items-center justify-between mt-4">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Pinned tags</Text>
                        <Text className="text-xs text-slate-400 mt-1">Dashboard configuration</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                <View className="px-5 pt-8 mb-8 border-b border-[#1E293B] pb-8">
                    <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Currently pinned</Text>

                    {pinnedItems.length === 0 ? (
                        <View className="bg-[#151E33] border border-dashed border-[#1E293B] rounded-2xl p-6 items-center">
                            <Text className="text-slate-400 text-sm font-medium text-center">
                                No tags pinned. Select from below to pin your favorite tags to the top of your daily Journal.
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row flex-wrap justify-between gap-y-3">
                            {pinnedItems.map((item) => (
                                <View
                                    key={item.id}
                                    className="w-[48%] bg-[#1E293B40] border border-[#4DB9F2] p-4 rounded-2xl flex-col items-start"
                                >
                                    <View className="w-full flex-row justify-between items-start mb-3">
                                        <Ionicons name={item.icon as any} size={20} color="#4DB9F2" />
                                        <TouchableOpacity
                                            onPress={() => togglePin(item.id)}
                                            activeOpacity={0.7}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <Ionicons name="close-circle" size={20} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="text-sm font-bold text-white leading-5">{item.title}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View className="px-5">
                    <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Available tags</Text>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                        {availableItems.map((item, idx) => {
                            const isLast = idx === availableItems.length - 1;
                            return (
                                <View
                                    key={item.id}
                                    className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''
                                        }`}
                                >
                                    <View className="flex-row items-center gap-4 flex-1">
                                        <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                            <Ionicons name={item.icon as any} size={18} color={item.color} />
                                        </View>
                                        <Text className="text-base font-semibold text-slate-200">{item.title}</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => togglePin(item.id)}
                                        activeOpacity={0.7}
                                        className="w-10 h-10 bg-[#1E293B40] border border-[#1E293B] rounded-xl items-center justify-center"
                                    >
                                        <Ionicons name="add" size={18} color="#4DB9F2" />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>

            </ScrollView>

            <View
                className="absolute bottom-0 left-0 right-0 px-5 bg-[#090D16] border-t border-[#1E293B] pt-4 z-10"
                style={{ paddingBottom: insets.bottom || 24 }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                    className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-base">
                        Save configuration
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}