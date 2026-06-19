import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DescribeFoodModal() {
    const router = useRouter();
    const [text, setText] = useState('');

    const hasText = text.length > 0;

    return (
        <View className="flex-1 bg-[#090D16]">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Dark Minimalist Header */}
                    <View className="px-5 pt-8 pb-4 border-b border-[#1E293B] bg-[#151E33] flex-row justify-between items-center">
                        <View>
                            <Text className="text-xl font-bold text-slate-100">Nutrition log</Text>
                            <Text className="text-xs text-slate-400 mt-1">Manual entry mode</Text>
                        </View>

                        <View className="bg-orange-950/30 px-3 py-1.5 rounded-xl border border-orange-500/20 flex-row items-center gap-1.5">
                            <Ionicons name="sparkles" size={12} color="#F59E0B" />
                            <Text className="text-xs font-semibold text-orange-500">Ai active</Text>
                        </View>
                    </View>

                    <View className="px-5 mt-6 flex-1">

                        {/* Modular Input Card */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-4">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-sm font-semibold text-slate-400">Dietary description</Text>
                                <View className="bg-[#1E293B] px-2 py-1 rounded-lg border border-[#2D3748]">
                                    <Text className="text-[10px] text-slate-400 font-bold">0</Text>
                                </View>
                            </View>

                            <TextInput
                                className="text-white text-lg font-medium leading-7 min-h-[140px]"
                                placeholder="e.g. Protein shake with 2 scoops of whey, 1 banana, and almond milk"
                                placeholderTextColor="#64748B"
                                multiline
                                autoFocus
                                textAlignVertical="top"
                                value={text}
                                onChangeText={setText}
                                selectionColor="#F97316"
                            />
                        </View>

                        {/* Image Action Row (Horizontally Stacked) */}
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

                        {/* Sticky Bottom Action */}
                        <View className="mt-8 mb-8">
                            <TouchableOpacity
                                disabled={!hasText}
                                onPress={() => router.push('/processing-food')}
                                activeOpacity={0.8}
                                className={`w-full h-14 rounded-2xl items-center justify-center flex-row gap-2 border ${hasText
                                    ? 'bg-[#F97316] border-[#F97316]'
                                    : 'bg-[#1E293B] border-[#2D3748]'
                                    }`}
                            >
                                <Text className={`font-bold text-base ${hasText ? 'text-[#090D16]' : 'text-slate-500'}`}>
                                    Process entry
                                </Text>
                                {hasText && <Ionicons name="arrow-forward" size={18} color="#090D16" />}
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}