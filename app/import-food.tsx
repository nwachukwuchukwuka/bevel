import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SELECTED_IMAGES = [
    { id: '1', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
    { id: '2', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' }
];

export default function ImportFoodScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [text, setText] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-[#090D16]"
        >
            <StatusBar style="light" />

            <View className="bg-[#151E33] border-b border-[#1E293B]">
                <View className="px-5 py-4 flex-row items-center justify-between border-b border-[#1E293B]">
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Visual import</Text>
                        <Text className="text-xs text-slate-400 mt-1">Image analysis pipeline</Text>
                    </View>
                    <View className="bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex-row items-center gap-1.5">
                        <Ionicons name="scan" size={12} color="#10B981" />
                        <Text className="text-xs font-semibold text-emerald-500">Ai active</Text>
                    </View>
                </View>

                <View className="py-5 bg-[#090D16]">
                    <Text className="text-xs font-semibold text-slate-400 px-5 mb-3">Scanned sources</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>

                        {SELECTED_IMAGES.map((img) => (
                            <View key={img.id} className="relative w-20 h-28 rounded-2xl border border-[#2D3748] overflow-hidden">
                                <Image
                                    source={{ uri: img.url }}
                                    className="w-full h-full"
                                />
                                <View className="absolute inset-0 bg-black/20" />
                                <TouchableOpacity className="absolute bottom-2 right-2 bg-[#090D16]/80 p-1.5 rounded-lg border border-[#EF4444]">
                                    <Ionicons name="trash-outline" size={14} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-20 h-28 rounded-2xl border border-dashed border-[#4DB9F2] bg-[#1E293B40] items-center justify-center"
                        >
                            <Ionicons name="add" size={24} color="#4DB9F2" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-5 pt-6"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-sm font-semibold text-slate-400">Contextual override</Text>
                        <View className="bg-[#1E293B] px-2 py-1 rounded-lg border border-[#2D3748]">
                            <Text className="text-[10px] text-slate-400 font-bold">Optional</Text>
                        </View>
                    </View>

                    <TextInput
                        className="text-white text-lg font-medium leading-7 min-h-[120px]"
                        placeholder="Add descriptive context to override or assist the image analysis engine."
                        placeholderTextColor="#64748B"
                        multiline
                        textAlignVertical="top"
                        value={text}
                        onChangeText={setText}
                        selectionColor="#F97316"
                    />
                </View>

                <View className="flex-row gap-3">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row justify-center items-center gap-2"
                    >
                        <Ionicons name="camera-outline" size={18} color="#94A3B8" />
                        <Text className="text-sm font-semibold text-slate-300">Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row justify-center items-center gap-2"
                    >
                        <Ionicons name="image-outline" size={18} color="#94A3B8" />
                        <Text className="text-sm font-semibold text-slate-300">Gallery</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1" />

                <View className="mb-8 mt-10">
                    <TouchableOpacity
                        onPress={() => router.push('/processing-food')}
                        activeOpacity={0.8}
                        className="w-full h-14 rounded-2xl items-center justify-center flex-row gap-2 border bg-[#4DB9F2] border-[#4DB9F2]"
                    >
                        <Text className="font-bold text-base text-[#090D16]">
                            continue
                        </Text>
                        <Ionicons name="scan-outline" size={18} color="#090D16" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}