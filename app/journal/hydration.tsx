import { LogHydrationSheet, LogHydrationSheetRef } from '@/components/journal/LogHydrationSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HydrationScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const logSheetRef = useRef<LogHydrationSheetRef>(null);

    const [entries, setEntries] = useState<{ id: string, amount: number, time: string }[]>([]);

    const handleSave = (amount: number, time: string) => {
        setEntries([...entries, { id: Date.now().toString(), amount, time }]);
    };

    const totalAmount = entries.reduce((a, b) => a + b.amount, 0);
    const targetAmount = 1893; // Fixed mock target for display
    const progressPercent = Math.min((totalAmount / targetAmount) * 100, 100);

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                <View className="px-5 pb-4 pt-6 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold text-slate-100">Hydration</Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>

                    {/* Integrated Summary & Progress Block */}
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mx-5 mt-4 mb-8">
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <Text className="text-slate-400 text-sm font-semibold mb-2">Today's Intake</Text>
                                <View className="flex-row items-baseline gap-2">
                                    <Text className="text-4xl font-bold text-white">
                                        {totalAmount.toFixed(1).replace('.', ',')}
                                    </Text>
                                    <Text className="text-sm text-slate-500 font-medium">/ 1.893 ml</Text>
                                </View>
                            </View>
                            <View className="w-12 h-12 bg-blue-500/10 rounded-xl items-center justify-center border border-blue-500/20">
                                <Ionicons name="water-outline" size={24} color="#3B82F6" />
                            </View>
                        </View>

                        {/* Custom Flat Progress Bar */}
                        <View className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden mb-2">
                            <View
                                className="h-full bg-[#3B82F6]"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </View>
                        <Text className="text-xs text-slate-500 text-right">
                            {progressPercent.toFixed(0)}% of daily goal
                        </Text>
                    </View>

                    <View className="px-5">
                        <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Log history</Text>

                        {entries.length === 0 ? (
                            <View className="border-2 border-dashed border-[#1E293B] bg-[#151E33]/30 rounded-3xl p-8 items-center justify-center mt-2">
                                <Text className="text-slate-300 font-bold text-lg mb-2">No hydration data</Text>
                                <Text className="text-slate-500 text-center leading-6 text-sm">
                                    Add your first water intake log below.
                                </Text>
                            </View>
                        ) : (
                            <View className="gap-3">
                                {entries.map(entry => (
                                    <View
                                        key={entry.id}
                                        className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                                    >
                                        <View className="flex-row items-center gap-4">
                                            <View className="w-10 h-10 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center">
                                                <Ionicons name="water" size={18} color="#3B82F6" />
                                            </View>
                                            <View>
                                                <Text className="text-white font-bold text-base">Water</Text>
                                                <Text className="text-slate-400 text-xs mt-0.5">{entry.time}</Text>
                                            </View>
                                        </View>
                                        <View className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748] flex-row items-center gap-2">
                                            <Text className="text-[#4DB9F2] font-bold text-sm">
                                                {entry.amount.toFixed(1).replace('.', ',')} ml
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Fixed Bottom Action Dock */}
                <View
                    className="absolute bottom-0 left-0 right-0 px-5 pt-4 bg-[#090D16] border-t border-[#1E293B]"
                    style={{ paddingBottom: insets.bottom || 24 }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-rose-500/10 border border-rose-500/20 py-4 rounded-2xl items-center justify-center mb-3"
                    >
                        <Text className="text-rose-400 font-semibold text-sm">I did not drink water today</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => handleSave(250, '11.13 AM')}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#4DB9F2] border border-[#4DB9F2] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#090D16" />
                            <Text className="text-[#090D16] font-bold text-sm">
                                Add 250,0 ml
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => logSheetRef.current?.present()}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#1E293B] border border-[#2D3748] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="text-white font-bold text-sm">Custom</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <LogHydrationSheet ref={logSheetRef} onSave={handleSave} />
            </View>
        </BottomSheetModalProvider>
    );
}