import { WORKOUT_TEMPLATES_FITNESS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditPinsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Manage pinned templates state locally for this view
    const [pinnedIds, setPinnedIds] = useState<string[]>(['1']); // Default pin for demonstration

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
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
                <View className="w-8" />
                <Text className="text-[16px] font-bold text-gray-900">Edit pins</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>

                {/* Pinned Section */}
                {pinnedTemplates.length === 0 ? (
                    <View className="items-center justify-center mb-10 mt-4">
                        <Text className="text-[16px] font-bold text-gray-900 mb-2">No pins</Text>
                        <Text className="text-[14px] text-gray-500 text-center leading-5 px-8">
                            Pin workouts to your Fitness page by tapping on " <Ionicons name="pin-outline" size={14} color="#6B7280" /> ".
                        </Text>
                    </View>
                ) : (
                    <View className="flex-row flex-wrap gap-3 mb-10">
                        {pinnedTemplates.map(template => (
                            <View key={template.id} className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-sm shadow-black/5 relative w-[48%]">
                                <TouchableOpacity
                                    onPress={() => togglePin(template.id)}
                                    className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm z-10"
                                >
                                    <Ionicons name="remove" size={16} color="#9CA3AF" />
                                </TouchableOpacity>

                                <Text className="text-[14px] font-bold text-gray-900 mb-1" numberOfLines={1}>{template.title}</Text>
                                <Text className="text-[11px] font-medium text-gray-400 mb-4">{template.exercises} exercises, {template.sets} sets</Text>
                                <View className="flex-row items-center gap-1">
                                    {template.load.map((num, i) => (
                                        <View key={i} className="bg-gray-50 border border-gray-100 rounded-md w-6 h-8 items-center justify-center"><Text className="font-bold text-gray-900">{num}</Text></View>
                                    ))}
                                    <Text className="text-[10px] font-medium text-gray-400 ml-1">kg</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Available Templates Section */}
                <View className="gap-3 pb-32">
                    {unpinnedTemplates.map((template) => (
                        <View key={template.id} className="flex-row items-center justify-between bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm shadow-black/5">
                            <View>
                                <Text className="text-[15px] font-bold text-gray-900 mb-1">{template.title}</Text>
                                <Text className="text-[12px] font-medium text-gray-500">{template.exercises} exercises, {template.sets} sets</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => togglePin(template.id)}
                                className="p-2"
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="pin-outline" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Bottom Save Button */}
            <View className="absolute bottom-0 left-0 right-0 px-5 bg-gradient-to-t from-[#F9FAFB] to-transparent pt-4" style={{ paddingBottom: insets.bottom || 20 }}>
                <TouchableOpacity onPress={() => router.back()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center shadow-lg shadow-black/10">
                    <Text className="text-white font-semibold text-[16px]">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}