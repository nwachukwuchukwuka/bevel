import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalculationsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Calculations</Text>
                <TouchableOpacity><Text className="text-[15px] font-bold text-blue-400 opacity-50">Save</Text></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                {/* Heart Rate Variability */}
                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Heart Rate Variability</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-2">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">HRV method:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Bevel (RMSSD)</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-bold text-gray-900">Use HRV from:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Entire sleep</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                </View>
                <Text className="text-[11px] text-gray-500 leading-4 mb-6 ml-1 mr-2">The Bevel method uses raw heart beat data and filters out noisy samples to calculate HRV (RMSSD). The Apple Health method uses the HRV field from Apple Health. It is recommended to use the Bevel method and "Entire sleep" option.</Text>

                {/* Resting Heart Rate */}
                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Resting Heart Rate</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-2">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">RHR method:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Bevel</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-bold text-gray-900">Use RHR from:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Entire sleep</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                </View>
                <Text className="text-[11px] text-gray-500 leading-4 mb-6 ml-1 mr-2">The Bevel method uses heart rate data to calculate RHR, while the Apple Health method uses the RHR field from Apple Health. It is recommended to use the Bevel method and "Entire sleep" option.</Text>

                {/* Other */}
                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Other</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-6">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Temperature method:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Wrist</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Use SpO2 from:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Entire sleep</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Use RR from:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Entire sleep</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Calories display:</Text>
                        <View className="flex-row items-center gap-1.5"><Text className="text-[15px] font-medium text-gray-600">Total calories</Text><Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" /><Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" /></View>
                    </TouchableOpacity>
                    <View className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-bold text-gray-900">Merge manual sleep</Text>
                        <Switch value={true} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}