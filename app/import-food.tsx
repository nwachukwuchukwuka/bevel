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
            className="flex-1 bg-white"
        >
            <StatusBar style="light" />

            {/* Black Header with Photo Previews */}
            <View style={{ paddingTop: insets.top }} className="bg-black pb-6">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }} className="pt-4">
                    {/* Add Button */}
                    <TouchableOpacity className="w-16 h-16 rounded-xl border border-gray-800 bg-gray-900/50 items-center justify-center">
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Image Thumbnails */}
                    {SELECTED_IMAGES.map((img) => (
                        <View key={img.id} className="relative">
                            <Image
                                source={{ uri: img.url }}
                                className="w-16 h-16 rounded-xl"
                                style={{ backgroundColor: '#333' }}
                            />
                            <TouchableOpacity className="absolute -top-1.5 -left-1.5 bg-[#FF6B6B] rounded-full w-5 h-5 items-center justify-center border-2 border-black">
                                <Ionicons name="remove" size={12} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Main Content Area */}
            <ScrollView
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-start mb-6">
                    {/* Preview Badge */}
                    <View className="flex-row items-center bg-gray-100/50 border border-gray-200 px-3 py-1.5 rounded-full">
                        <Ionicons name="sparkles-outline" size={10} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Preview</Text>
                    </View>

                    {/* Dropdown / Counter (Right side) */}
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-2 py-1 bg-white">
                        <View className="w-6 h-6 bg-gray-50 rounded-lg items-center justify-center border border-gray-100 mr-2">
                             <Image 
                                source={{ uri: SELECTED_IMAGES[0].url }} 
                                className="w-full h-full rounded-lg"
                             />
                        </View>
                        <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
                    </View>
                </View>

                <Text className="text-[22px] font-bold text-gray-900 mb-2">
                    What are you eating?
                </Text>

                <TextInput
                    className="text-lg text-gray-800 leading-7 mt-2 mb-8 font-medium"
                    placeholder="Add an optional description to improve AI accuracy."
                    placeholderTextColor="#D1D5DB"
                    multiline
                    textAlignVertical="top"
                    value={text}
                    onChangeText={setText}
                    style={{ minHeight: 120 }}
                />

                <View className="gap-5">
                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="camera" size={20} color="#D1D5DB" />
                        <Text className="text-gray-400 font-semibold text-sm">Capture photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="image" size={20} color="#D1D5DB" />
                        <Text className="text-gray-400 font-semibold text-sm">Import photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer to push button to bottom */}
                <View className="flex-1" />

                <View className="mb-8 mt-10">
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/processing-food');
                        }}
                        className="w-full py-4 rounded-full items-center justify-center bg-[#1A1A1A]"
                    >
                        <Text className="text-white font-bold text-base">Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
