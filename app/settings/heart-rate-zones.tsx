import { ZoneMethodSheet, ZoneMethodSheetRef } from '@/components/settings/ZoneMethodSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HeartRateZonesScreen() {
    const router = useRouter();
    const sheetRef = useRef<ZoneMethodSheetRef>(null);
    const [method, setMethod] = useState('Max HR');

    const ZONES = method === 'Max HR'
        ? [{ z: '0', p: '0-49%', r: '0-94 bpm', c: 'bg-gray-300' }, { z: '1', p: '50-59%', r: '95-114 bpm', c: 'bg-blue-500' }, { z: '2', p: '60-69%', r: '115-132 bpm', c: 'bg-yellow-400' }, { z: '3', p: '70-79%', r: '133-151 bpm', c: 'bg-orange-500' }, { z: '4', p: '80-89%', r: '152-170 bpm', c: 'bg-red-500' }, { z: '5', p: '90-100%', r: '171+ bpm', c: 'bg-purple-500' }]
        : [{ z: '0', p: '0-49%', r: '69-129 bpm', c: 'bg-gray-300' }, { z: '1', p: '50-59%', r: '130-141 bpm', c: 'bg-blue-500' }, { z: '2', p: '60-69%', r: '142-153 bpm', c: 'bg-yellow-400' }, { z: '3', p: '70-79%', r: '154-165 bpm', c: 'bg-orange-500' }, { z: '4', p: '80-89%', r: '166-177 bpm', c: 'bg-red-500' }, { z: '5', p: '90-100%', r: '178+ bpm', c: 'bg-purple-500' }];

    return (
        <BottomSheetModalProvider>
            <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
                <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                    <Text className="text-[16px] font-bold text-gray-900">Heart Rate Zones</Text>
                    <TouchableOpacity><Text className="text-[15px] font-bold text-blue-400">Save</Text></TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
                    <Text className="text-[13px] font-bold text-gray-900 mb-2 ml-1">Settings</Text>
                    <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-6">
                        <TouchableOpacity onPress={() => sheetRef.current?.present()} className="flex-row items-center justify-between p-4 border-b border-gray-50">
                            <Text className="text-[15px] font-bold text-gray-900">Method</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Text className="text-[15px] font-medium text-gray-600">{method}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                            </View>
                        </TouchableOpacity>
                        <View className={`flex-row items-center justify-between p-4 ${method === 'HR Reserve' ? 'border-b border-gray-50' : ''}`}>
                            <Text className="text-[15px] font-bold text-gray-900">Maximum heart rate</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Text className="text-[15px] font-bold text-gray-900">190 <Text className="font-medium text-gray-500">bpm</Text></Text>
                                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                            </View>
                        </View>
                        {method === 'HR Reserve' && (
                            <View className="flex-row items-center justify-between p-4">
                                <View>
                                    <Text className="text-[15px] font-bold text-gray-900">Resting heart rate</Text>
                                    <Text className="text-[11px] text-gray-400">Automatically updated from baseline</Text>
                                </View>
                                <Text className="text-[15px] font-medium text-gray-500">68 bpm</Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-[13px] font-bold text-gray-900 mb-2 ml-1">Zones</Text>
                    <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden">
                        {ZONES.map((z, idx) => (
                            <View key={z.z} className={`flex-row items-center justify-between p-4 ${idx !== ZONES.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <View className="flex-row items-center gap-2">
                                    <View className={`w-2 h-2 rounded-full ${z.c}`} />
                                    <Text className="text-[15px] font-bold text-gray-900">Zone {z.z} <Text className="font-medium text-gray-500">{z.p}</Text></Text>
                                </View>
                                <Text className="text-[15px] font-medium text-gray-400">{z.r}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <ZoneMethodSheet ref={sheetRef} method={method} setMethod={setMethod} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}