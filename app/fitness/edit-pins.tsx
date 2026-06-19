import { WORKOUT_TEMPLATES_FITNESS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditPinsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [pinnedIds, setPinnedIds] = useState<string[]>(['1']);

    const togglePin = (id: string) => {
        if (pinnedIds.includes(id)) {
            setPinnedIds(pinnedIds.filter(pid => pid !== id));
        } else {
            setPinnedIds([...pinnedIds, id]);
        }
    };

    const pinnedTemplates = WORKOUT_TEMPLATES_FITNESS.filter(t => pinnedIds.includes(t.id));
    const unpinnedTemplates = WORKOUT_TEMPLATES_FITNESS.filter(t => !pinnedIds.includes(t.id));

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]">

            {/* Header Section (With Integrated Save Button on top right) */}
            <View className="px-5 pb-6 pt-6 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                <View>
                    <Text className="text-2xl font-bold text-slate-100">Pin templates</Text>
                    <Text className="text-xs text-slate-400 mt-1">Configure your fitness home dashboard</Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                    className="bg-[#4DB9F2] px-5 py-2.5 rounded-xl border border-[#4DB9F2]"
                >
                    <Text className="text-[#1A1A1A] font-bold text-sm">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Horizontal Pinned Pill Dock (Radical position and structure shift) */}
                <View className="py-6 bg-[#090D16] border-b border-[#1E293B]">
                    <Text className="text-sm font-semibold text-slate-400 px-5 mb-3">Currently pinned</Text>
                    {pinnedTemplates.length === 0 ? (
                        <View className="px-5">
                            <Text className="text-xs text-slate-500">No templates pinned. Select from below.</Text>
                        </View>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
                            {pinnedTemplates.map(template => (
                                <TouchableOpacity
                                    key={template.id}
                                    onPress={() => togglePin(template.id)}
                                    activeOpacity={0.8}
                                    className="bg-[#1E293B] border border-[#4DB9F2] px-4 py-2.5 rounded-xl flex-row items-center gap-2"
                                >
                                    <Ionicons name="pin" size={14} color="#4DB9F2" />
                                    <Text className="text-sm font-semibold text-white">{template.title}</Text>
                                    <Ionicons name="close-circle-outline" size={16} color="#EF4444" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Available Library (Now styled as an inline 2-column Grid of Cards) */}
                <View className="px-5 mt-6 mb-12">
                    <Text className="text-lg font-bold text-white mb-4">Available library</Text>

                    <View className="flex-row flex-wrap justify-between gap-y-3">
                        {unpinnedTemplates.map(template => (
                            <TouchableOpacity
                                key={template.id}
                                onPress={() => togglePin(template.id)}
                                activeOpacity={0.8}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 w-[48%] flex-col"
                            >
                                <View className="flex-row justify-between items-start mb-3">
                                    <View className="bg-[#1E293B] w-8 h-8 rounded-lg items-center justify-center border border-[#2D3748]">
                                        <Ionicons name="barbell-outline" size={16} color="#4DB9F2" />
                                    </View>
                                    <Ionicons name="pin-outline" size={16} color="#94A3B8" />
                                </View>

                                <Text className="text-sm font-bold text-white mb-1" numberOfLines={1}>
                                    {template.title}
                                </Text>
                                <Text className="text-[11px] text-slate-400 mb-4">
                                    {template.exercises} exercises • {template.sets} sets
                                </Text>

                                <View className="flex-row items-center gap-1 mt-auto">
                                    {template.load.map((num, i) => (
                                        <View key={i} className="bg-[#1E293B] border border-[#2D3748] rounded-md w-6 h-8 items-center justify-center">
                                            <Text className="font-bold text-white text-xs">{num}</Text>
                                        </View>
                                    ))}
                                    <Text className="text-[10px] text-slate-500 ml-1">kg</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}