import { LogAlcoholSheet, LogAlcoholSheetRef } from '@/components/journal/LogAlcoholSheet';
import { PresetAlcoholSheet, PresetAlcoholSheetRef } from '@/components/journal/PresetAlcoholSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AlcoholScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const logSheetRef = useRef<LogAlcoholSheetRef>(null);
    const presetSheetRef = useRef<PresetAlcoholSheetRef>(null);

    const [entries, setEntries] = useState<{ id: string, amount: number, time: string }[]>([]);
    const [editingEntry, setEditingEntry] = useState<any>(null);
    const [presetAmount] = useState(1.5);

    const handleSave = (amount: number, time: string) => {
        if (editingEntry) {
            setEntries(entries.map(e => e.id === editingEntry.id ? { ...e, amount, time } : e));
        } else {
            setEntries([...entries, { id: Date.now().toString(), amount, time }]);
        }
        setEditingEntry(null);
    };

    const handleDelete = () => {
        setEntries(entries.filter(e => e.id !== editingEntry.id));
        setEditingEntry(null);
    };

    const openLogSheet = (entry?: any) => {
        setEditingEntry(entry || null);
        logSheetRef.current?.present();
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

                    <Text className="text-xl font-bold  text-slate-100">Alcohol</Text>

                    <TouchableOpacity
                        onPress={() => presetSheetRef.current?.present()}
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
                                    <Text className="text-4xl  text-white">{totalAmount}</Text>
                                    <Text className="text-base text-slate-500 font-medium">drinks</Text>
                                </View>
                            ) : (
                                <Text className="text-2xl  text-slate-500">- drink</Text>
                            )}
                        </View>
                        <View className="w-16 h-16 bg-rose-500/10 rounded-2xl items-center justify-center border border-rose-500/20">
                            <Text className="text-3xl">🍷</Text>
                        </View>
                    </View>

                    <View className="px-5">
                        {entries.length === 0 ? (
                            <View className="border-2 border-dashed border-[#1E293B] bg-[#151E33]/30 rounded-3xl p-8 items-center justify-center">
                                <Text className="text-slate-300  text-lg mb-2">No logs yet</Text>
                                <Text className="text-slate-500 text-center leading-6 text-sm">
                                    Once you add a log, it will show up here.
                                </Text>
                            </View>
                        ) : (
                            <View className="gap-4">
                                {entries.map(entry => (
                                    <TouchableOpacity
                                        key={entry.id}
                                        onPress={() => openLogSheet(entry)}
                                        activeOpacity={0.8}
                                        className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center"
                                    >
                                        <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center mr-4">
                                            <Text className="text-xl">🍷</Text>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-white  text-base mb-1">Alcohol</Text>
                                            <Text className="text-slate-400 text-xs">{entry.time}</Text>
                                        </View>
                                        <View className="bg-[#1E293B] px-3 py-2 rounded-lg border border-[#2D3748] flex-row items-center gap-2">
                                            <Text className="text-[#4DB9F2]  text-sm">
                                                {entry.amount.toFixed(1).replace('.', ',')} drink
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
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
                        <Text className="text-rose-400 font-semibold text-sm">I did not drink Alcohol today</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => handleSave(presetAmount, '11.09 AM')}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#4DB9F2] border border-[#4DB9F2] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#090D16" />
                            <Text className="text-[#090D16]  text-sm">
                                Add {presetAmount.toFixed(1).replace('.', ',')} drink
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => openLogSheet()}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#1E293B] border border-[#2D3748] py-4 rounded-2xl items-center justify-center flex-row gap-2"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="text-white  text-sm">Add custom</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <LogAlcoholSheet
                    ref={logSheetRef}
                    initialAmount={editingEntry ? editingEntry.amount : presetAmount}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    isEditing={!!editingEntry}
                />
                <PresetAlcoholSheet ref={presetSheetRef} />
            </View>
        </BottomSheetModalProvider>
    );
}