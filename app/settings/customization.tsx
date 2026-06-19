import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomizationScreen() {
    const router = useRouter();

    const menuData = [
        { id: 'goals', label: 'Goals', desc: 'Set goals for your metrics', icon: 'trophy', color: '#60A5FA', route: '/settings/goals' },
        { id: 'units', label: 'Unit of Measurement', desc: 'Distance, height, weight, etc.', icon: 'resize', color: '#FBBF24', route: '/settings/unit-of-measurement' },
        { id: 'hr', label: 'Heart Rate Zones', desc: 'Customize heart rate zones', icon: 'heart-circle', color: '#F87171', route: '/settings/heart-rate-zones' },
        { id: 'calc', label: 'Calculations', desc: 'Define how Bevel calculates metrics', icon: 'calculator', color: '#5EEAD4', route: '/settings/calculations' },
        { id: 'data', label: 'Data Loading Window', desc: 'Sync more than one year of data', icon: 'time', color: '#FB923C', route: '/settings/data-loading-window' },
    ];

    const categoryData = [
        { id: 'intel', label: 'Bevel Intelligence', icon: 'aperture', color: '#38BDF8' },
        { id: 'nut', label: 'Nutrition', icon: 'restaurant', color: '#C084FC', route: '/settings/nutrition' },
        { id: 'str', label: 'Strength Builder', icon: 'barbell', color: '#FBBF24' },
        { id: 'jour', label: 'Journal', icon: 'book', color: '#86EFAC' },
        { id: 'bio', label: 'Biology', icon: 'heart', color: '#F472B6' },
    ];

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-slate-800/80 rounded-xl items-center justify-center"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="text-[17px] font-bold text-slate-100">Customization</Text>
                <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60 }}>

                <View className="flex-row items-center gap-2 mb-4 ml-1">
                    <Text className="text-[13px] font-bold text-slate-400">App settings</Text>
                    <View className="flex-1 h-[1px] bg-slate-800/80" />
                </View>

                <View className="gap-3 mb-8">
                    {menuData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => item.route ? router.push(item.route as any) : null}
                            className="bg-[#151E33] border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-3.5 flex-1 pr-4">
                                <View className="w-9 h-9 rounded-xl items-center justify-center bg-slate-800 border border-slate-700/30">
                                    <Ionicons name={item.icon as any} size={15} color={item.color} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[14px] font-bold text-slate-100 mb-0.5">{item.label}</Text>
                                    <Text className="text-[11px] text-slate-400" numberOfLines={1}>{item.desc}</Text>
                                </View>
                            </View>
                            <View className="w-7 h-7 rounded-lg bg-slate-800/40 border border-slate-700/20 items-center justify-center">
                                <Ionicons name="chevron-forward" size={12} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row items-center gap-2 mb-4 ml-1">
                    <Text className="text-[13px] font-bold text-slate-400">Metrics & features</Text>
                    <View className="flex-1 h-[1px] bg-slate-800/80" />
                </View>

                <View className="gap-3">
                    {categoryData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className="bg-[#151E33] border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                            onPress={() => item.route ? router.push(item.route as any) : null}
                        >
                            <View className="flex-row items-center gap-3.5">
                                <View className="w-9 h-9 rounded-xl items-center justify-center bg-slate-800 border border-slate-700/30">
                                    <Ionicons name={item.icon as any} size={15} color={item.color} />
                                </View>
                                <Text className="text-[14px] font-bold text-slate-100">{item.label}</Text>
                            </View>
                            <View className="w-7 h-7 rounded-lg bg-slate-800/40 border border-slate-700/20 items-center justify-center">
                                <Ionicons name="chevron-forward" size={12} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}