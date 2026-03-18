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
        // { id: 'nut', label: 'Nutrition', icon: 'restaurant', color: '#C084FC' },
        { id: 'str', label: 'Strength Builder', icon: 'barbell', color: '#FBBF24' },
        { id: 'jour', label: 'Journal', icon: 'book', color: '#86EFAC' },
        { id: 'bio', label: 'Biology', icon: 'heart', color: '#F472B6' },
    ];

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Customization</Text>
                <View className="w-6" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-6">
                    {menuData.map((item, idx) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => item.route ? router.push(item.route as any) : null}
                            className={`flex-row items-center justify-between p-4 ${idx !== menuData.length - 1 ? 'border-b border-gray-50' : ''}`}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-8 h-8 rounded-xl items-center justify-center border border-white shadow-sm shadow-black/10" style={{ backgroundColor: item.color }}>
                                    <Ionicons name={item.icon as any} size={16} color="white" />
                                </View>
                                <View>
                                    <Text className="text-[15px] font-bold text-gray-900 mb-0.5">{item.label}</Text>
                                    <Text className="text-[12px] text-gray-500">{item.desc}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden">
                    {categoryData.map((item, idx) => (
                        <TouchableOpacity
                            key={item.id}
                            className={`flex-row items-center justify-between p-4 ${idx !== categoryData.length - 1 ? 'border-b border-gray-50' : ''}`}
                            onPress={() => item.route ? router.push(item.route as any) : null}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-8 h-8 rounded-xl items-center justify-center border border-white shadow-sm shadow-black/10" style={{ backgroundColor: item.color }}>
                                    <Ionicons name={item.icon as any} size={16} color="white" />
                                </View>
                                <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}