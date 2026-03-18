import { CaffeineInfoSheet, CaffeineInfoSheetRef } from '@/components/journal/CaffeineInfoSheet';
import { LogCaffeineSheet, LogCaffeineSheetRef } from '@/components/journal/LogCaffeineSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CaffeineScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const logSheetRef = useRef<LogCaffeineSheetRef>(null);
    const infoSheetRef = useRef<CaffeineInfoSheetRef>(null);

    const [entries, setEntries] = useState<{ id: string, amount: number, time: string }[]>([]);
    const [presetAmount] = useState(100);

    const handleSave = (amount: number, time: string) => {
        setEntries([...entries, { id: Date.now().toString(), amount, time }]);
    };

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F3F4F6]">
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <View className="w-10" />
                    <Text className="text-[16px] font-bold text-gray-900">Caffeine</Text>
                    <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                        <Ionicons name="settings-outline" size={20} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-5 pt-4">
                    <View className="flex-row justify-between items-end mb-6">
                        <Text className="text-[16px] font-bold text-gray-900">Today's Entries</Text>
                        <Text className="text-[12px] font-medium text-gray-400">{entries.length ? `${entries.reduce((a, b) => a + b.amount, 0)} mg` : '- mg'}</Text>
                    </View>

                    {entries.length === 0 ? (
                        <View className="flex-1 items-center justify-center pb-20">
                            <Text className="text-[15px] font-bold text-gray-500 mb-1">No logs yet</Text>
                            <Text className="text-[13px] text-gray-400">Once you add a log, it will show up here.</Text>
                        </View>
                    ) : (
                        <View className="gap-3">
                            {entries.map(entry => (
                                <View key={entry.id} className="bg-white rounded-[20px] p-4 flex-row items-center justify-between shadow-sm shadow-black/5">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl border border-gray-100 items-center justify-center"><Text className="text-[18px]">☕</Text></View>
                                        <View><Text className="text-[14px] font-bold text-gray-900">Caffeine</Text><Text className="text-[11px] text-gray-400">{entry.time}</Text></View>
                                    </View>
                                    <Text className="text-[13px] font-bold text-gray-900">{entry.amount} mg</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Bottom Actions */}
                <View className="px-5 pb-8 pt-4 bg-[#F3F4F6]">
                    <TouchableOpacity className="bg-gray-200 h-[56px] rounded-full items-center justify-center mb-4">
                        <Text className="text-red-500 font-semibold text-[15px]">I did not take Caffeine today</Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-3">
                        <TouchableOpacity onPress={() => handleSave(presetAmount, '11.11 AM')} className="flex-1 bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center flex-row gap-1">
                            <Text className="text-white font-semibold text-[15px]">Add {presetAmount.toFixed(1).replace('.', ',')} mg</Text>
                            <Ionicons name="add" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => logSheetRef.current?.present()} className="flex-1 bg-gray-200 h-[56px] rounded-full items-center justify-center flex-row gap-1">
                            <Text className="text-gray-900 font-semibold text-[15px]">Add custom</Text>
                            <Ionicons name="add" size={16} color="#111827" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Mount Sheets */}
                <LogCaffeineSheet
                    ref={logSheetRef}
                    initialAmount={presetAmount}
                    onSave={handleSave}
                    onOpenInfo={() => infoSheetRef.current?.present()}
                />
                <CaffeineInfoSheet ref={infoSheetRef} />
            </View>
        </BottomSheetModalProvider>

    );
}