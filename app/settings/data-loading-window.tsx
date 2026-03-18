import { TimePeriodSheet, TimePeriodSheetRef } from '@/components/settings/TimePeriodSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DataLoadingWindowScreen() {
    const router = useRouter();
    const sheetRef = useRef<TimePeriodSheetRef>(null);

    const [loadExtended, setLoadExtended] = useState(true);
    const [period, setPeriod] = useState('1 year');
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            router.back();
        }, 1500);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] relative pt-4">

                {/* Toast Mock */}
                {showToast && (
                    <View className="absolute top-12 left-5 right-5 z-50 bg-white rounded-2xl p-4 shadow-lg shadow-black/10 border border-gray-100 flex-row justify-between items-center animate-fade-in">
                        <Text className="text-[15px] font-bold text-gray-900">Data loading window saved.</Text>
                        <Ionicons name="checkmark" size={20} color="#111827" />
                    </View>
                )}

                <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                    <Text className="text-[16px] font-bold text-gray-900">Data Loading Window</Text>
                    <TouchableOpacity onPress={handleSave}><Text className="text-[15px] font-bold text-blue-500">Save</Text></TouchableOpacity>
                </View>

                <View className="px-5 pt-4">
                    <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-4">
                        <View className="flex-row items-center justify-between p-5 border-b border-gray-50">
                            <View className="flex-1">
                                <Text className="text-[15px] font-bold text-gray-900 mb-1">Load extended data</Text>
                                <Text className="text-[12px] text-gray-500">Sync more than one year of data</Text>
                            </View>
                            <Switch value={loadExtended} onValueChange={setLoadExtended} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                        </View>

                        <TouchableOpacity
                            onPress={() => sheetRef.current?.present()}
                            disabled={!loadExtended}
                            className={`flex-row items-center justify-between p-5 ${!loadExtended ? 'opacity-50' : ''}`}
                        >
                            <Text className="text-[15px] font-bold text-gray-900">Time period:</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Text className="text-[15px] font-medium text-gray-600">{period}</Text>
                                <Ionicons name="chevron-up" size={14} color="#D1D5DB" className="rotate-180" />
                                <Ionicons name="chevron-down" size={14} color="#D1D5DB" className="-ml-2.5" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[11px] text-gray-400 leading-4 ml-1">Enable to sync more than one year of historical data. Please note that this will increase loading time.</Text>
                </View>

                <TimePeriodSheet ref={sheetRef} period={period} setPeriod={setPeriod} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}