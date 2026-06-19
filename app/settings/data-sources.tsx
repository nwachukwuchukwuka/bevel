import { DATA_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DataSourcesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-slate-800/80 rounded-xl items-center justify-center"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="text-[17px] font-bold text-slate-100 flex-1 text-center mr-10">Data sources</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60 }}>
                <View className="gap-3">
                    {DATA_METRICS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => router.push(`/settings/data-source/${item.label}`)}
                            className="bg-[#151E33] border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 bg-slate-800/60 rounded-xl items-center justify-center border border-slate-700/20">
                                    <Ionicons name="stats-chart-outline" size={16} color="#38BDF8" />
                                </View>
                                <View>
                                    <Text className="text-[15px] font-bold text-slate-100 mb-0.5">{item.label}</Text>
                                    <Text className="text-[12px] font-medium text-slate-400">{item.sources} active sources</Text>
                                </View>
                            </View>
                            <View className="w-8 h-8 rounded-lg bg-slate-800/40 items-center justify-center border border-slate-700/20">
                                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}