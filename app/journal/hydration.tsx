import { LogHydrationSheet, LogHydrationSheetRef } from '@/components/journal/LogHydrationSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HydrationScreen() {
    const logSheetRef = useRef<LogHydrationSheetRef>(null);
    const [entries, setEntries] = useState<{ id: string, amount: number, time: string }[]>([]);

    const handleSave = (amount: number, time: string) => {
        setEntries([...entries, { id: Date.now().toString(), amount, time }]);
    };

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F3F4F6]">
                <View className="flex-row items-center justify-between px-5 py-4">
                    <View className="w-10" />
                    <Text className="text-[16px] font-bold text-gray-900">Hydration</Text>
                    <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                        <Ionicons name="settings-outline" size={20} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-5 pt-4">
                    <View className="flex-row justify-between items-end mb-6">
                        <Text className="text-[16px] font-bold text-gray-900">Today's Entries</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[12px] font-bold text-gray-400">
                                {entries.length ? `${entries.reduce((a, b) => a + b.amount, 0).toFixed(1).replace('.', ',')}/1.893 ml` : '- ml'}
                            </Text>
                            {/* Simple circular progress mock */}
                            <View className="w-4 h-4 rounded-full border-2 border-blue-100 border-t-blue-500 -rotate-45" />
                        </View>
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
                                        <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center"><Ionicons name="water" size={20} color="#3B82F6" /></View>
                                        <View><Text className="text-[14px] font-bold text-gray-900">Hydration</Text><Text className="text-[11px] text-gray-400">{entry.time}</Text></View>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <Text className="text-[13px] font-bold text-gray-900">{entry.amount.toFixed(1).replace('.', ',')} ml</Text>
                                        <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View className="px-5 pb-8 pt-4 bg-[#F3F4F6]">
                    <TouchableOpacity className="bg-gray-200 h-[56px] rounded-full items-center justify-center mb-4">
                        <Text className="text-red-500 font-semibold text-[15px]">I did not drink water today</Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-3">
                        <TouchableOpacity onPress={() => handleSave(250, '11.13 AM')} className="flex-1 bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center flex-row gap-1">
                            <Text className="text-white font-semibold text-[15px]">Add 250,0 ml</Text>
                            <Ionicons name="add" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => logSheetRef.current?.present()} className="flex-1 bg-gray-200 h-[56px] rounded-full items-center justify-center flex-row gap-1">
                            <Text className="text-gray-900 font-semibold text-[15px]">Add custom</Text>
                            <Ionicons name="add" size={16} color="#111827" />
                        </TouchableOpacity>
                    </View>
                </View>

                <LogHydrationSheet ref={logSheetRef} onSave={handleSave} />
            </View>
        </BottomSheetModalProvider>
    );
}   