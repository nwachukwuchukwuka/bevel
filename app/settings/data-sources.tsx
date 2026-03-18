import { DATA_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DataSourcesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900 flex-1 text-center mr-6">Data Sources</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden">
                    {DATA_METRICS.map((item, idx) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => router.push(`/settings/data-source/${item.label}`)}
                            className={`flex-row items-center justify-between p-5 ${idx !== DATA_METRICS.length - 1 ? 'border-b border-gray-50' : ''}`}
                        >
                            <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Text className="text-[14px] font-medium text-gray-400">{item.sources} sources</Text>
                                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}