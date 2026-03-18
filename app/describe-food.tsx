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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            className="flex-1 bg-white"
        >
            <StatusBar style="dark" />

            <ScrollView
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-start mb-6">
                    {/* Preview Badge */}
                    <View className="flex-row items-center bg-orange-50/50 border border-orange-100 px-3 py-1.5 rounded-full">
                        <Ionicons name="sparkles" size={10} color="#FFA500" style={{ marginRight: 4 }} />
                        <Text className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Preview</Text>
                    </View>

                    {/* Meal Selector / Counter (Right side) */}
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-1.5 bg-white shadow-sm">
                        <Text className="text-sm font-semibold text-gray-700 mr-2">0</Text>
                        <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
                    </View>
                </View>

                <Text className="text-[22px] font-bold text-gray-900 mb-2">
                    What are you eating?
                </Text>

                <TextInput
                    className="text-lg text-gray-800 leading-7 mt-2 mb-8 font-medium"
                    placeholder="(e.g. breakfast waffles with 2 eggs)"
                    placeholderTextColor="#D1D5DB"
                    multiline
                    autoFocus
                    textAlignVertical="top"
                    value={text}
                    onChangeText={setText}
                    style={{ minHeight: 120 }}
                />

                <View className="gap-5">
                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="camera" size={20} color="#D1D5DB" />
                        <Text className="text-gray-500 font-semibold text-sm">Capture photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="image" size={20} color="#D1D5DB" />
                        <Text className="text-gray-500 font-semibold text-sm">Import photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer to push button to bottom */}
                <View className="flex-1" />

                <View className="mb-8 mt-10">
                    <TouchableOpacity
                        disabled={!hasText}
                        onPress={() => {
                            router.push('/processing-food');
                        }}
                        className={`w-full py-4 rounded-full items-center justify-center ${hasText ? 'bg-[#1A1A1A]' : 'bg-[#9CA3AF]'}`}
                    >
                        <Text className="text-white font-bold text-base">Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}