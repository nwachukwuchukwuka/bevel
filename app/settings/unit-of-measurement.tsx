import { DistanceUnitSheet, DistanceUnitSheetRef } from '@/components/settings/DistanceUnitSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnitsScreen() {
    const router = useRouter();
    const sheetRef = useRef<DistanceUnitSheetRef>(null);
    const [distUnit, setDistUnit] = useState('km');

    const formatUnit = (val: string) => val === 'Miles' ? 'mi' : 'km';

    return (
        <BottomSheetModalProvider>
            <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
                <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-[16px] font-bold text-gray-900">Unit of Measurement</Text>
                    <TouchableOpacity><Text className="text-[15px] font-bold text-blue-400">Save</Text></TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
                    <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden">
                        {[
                            { l: 'Distance', v: formatUnit(distUnit), a: () => sheetRef.current?.present() },
                            { l: 'Height', v: 'm', a: null },
                            { l: 'Weight', v: 'kg', a: null },
                            { l: 'Temperature', v: '°C', a: null },
                            { l: 'Energy', v: 'kCal', a: null },
                            { l: 'Water', v: 'ml', a: null },
                            { l: 'Glucose', v: 'mmol/L', a: null },
                        ].map((item, idx, arr) => (
                            <TouchableOpacity key={item.l} onPress={item.a as any} className={`flex-row items-center justify-between p-4 ${idx !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <Text className="text-[15px] font-bold text-gray-900">{item.l}</Text>
                                <View className="flex-row items-center gap-1.5">
                                    <Text className="text-[15px] font-medium text-gray-600">{item.v}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <DistanceUnitSheet ref={sheetRef} unit={distUnit === 'km' ? 'Kilometers' : 'Miles'} setUnit={(val) => setDistUnit(val === 'Kilometers' ? 'km' : 'mi')} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}