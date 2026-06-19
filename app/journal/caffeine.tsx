import { CaffeineInfoSheet, CaffeineInfoSheetRef } from '@/components/journal/CaffeineInfoSheet';
import { LogCaffeineSheet, LogCaffeineSheetRef } from '@/components/journal/LogCaffeineSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

    const totalAmount = entries.length ? entries.reduce((a, b) => a + b.amount, 0) : 0;

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">
                <View className="px-5 pt-4 pb-4 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold text-slate-100">Caffeine</Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mx-5 mt-4 mb-8 flex-row justify-between items-center">
                        <View>
                            <Text className="text-slate-400 text-sm font-semibold mb-2">Today's Entries</Text>
                            {entries.length > 0 ? (
                                <View className="flex-row items-baseline gap-2">
                                    <Text className="text-4xl font-bold text-white">{totalAmount}</Text>
                                    <Text className="text-base text-slate-500 font-medium">mg</Text>
                                </View>
                            ) : (
                                <Text className="text-2xl font-bold text-slate-500">- mg</Text>
                            )}
                        </View>
                        <View className="w-16 h-16 bg-amber-500/10 rounded-2xl items-center justify-center border border-amber-500/20">
                            <Text className="text-3xl">☕</Text>
                        </View>
                    </View>

                    <View className="px-5">
                        {entries.length === 0 ? (
                            <View className="border-2 border-dashed border-[#1E293B] bg-[#151E33]/30 rounded-3xl p-8 items-center justify-center">
                                <Text className="text-slate-300 font-bold text-lg mb-2">No logs yet</Text>
                                <Text className="text-slate-500 text-center leading-6 text-sm">
                                    Once you add a log, it will show up here.
                                </Text>
                            </View>
                        ) : (
                            <View className="gap-4">
                                {entries.map(entry => (
                                    <View
                                        key={entry.id}
                                        className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center"
                                    >
                                        <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center mr-4">
                                            <Text className="text-xl">☕</Text>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-white font-bold text-base mb-1">Caffeine</Text>
                                            <Text className="text-slate-400 text-xs">{entry.time}</Text>
                                        </View>
                                        <View className="bg-[#1E293B] px-3 py-2 rounded-lg border border-[#2D3748] flex-row items-center gap-2">
                                            <Text className="text-[#4DB9F2] font-bold text-sm">
                                                {entry.amount} mg
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>

                <View
                    className="absolute bottom-0 left-0 right-0 px-5 pt-4 bg-[#090D16] border-t border-[#1E293B]"
                    style={{ paddingBottom: insets.bottom || 24 }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-rose-500/10 border border-rose-500/20 py-4 rounded-2xl items-center justify-center mb-3"
                    >
                        <Text className="text-rose-400 font-semibold text-sm">I did not take Caffeine today</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => handleSave(presetAmount, '11.11 AM')}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#4DB9F2] border border-[#4DB9F2] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#090D16" />
                            <Text className="text-[#090D16] font-bold text-sm">
                                Add {presetAmount.toFixed(1).replace('.', ',')} mg
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => logSheetRef.current?.present()}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#1E293B] border border-[#2D3748] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="text-white font-bold text-sm">Add custom</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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