import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReportIssueScreen() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isReadyToSubmit = description.trim().length > 0;

    // --- Mock Photo Handlers ---
    const handleAddPhoto = () => {
        // In a real app, this opens ImagePicker
        setPhotos(prev => [...prev, `https://picsum.photos/seed/${Date.now()}/400/300`]);
        setIsMenuOpen(false);
    };

    const handleRemovePhoto = (indexToRemove: number) => {
        setPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSwapPhoto = (indexToSwap: number) => {
        // Mock swapping by just changing the image URL
        setPhotos(prev => prev.map((photo, index) =>
            index === indexToSwap ? `https://picsum.photos/seed/${Date.now()}/400/300` : photo
        ));
    };

    const handleSubmit = () => {
        // Show native alert based on the screenshot
        Alert.alert(
            "Thank you for reporting!",
            "We'll review your submission and make changes accordingly.",
            [
                {
                    text: "OK",
                    onPress: () => router.back()
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50">
                <TouchableOpacity onPress={() => router.back()} className="w-10">
                    <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
                <Text className="font-semibold text-gray-700 text-[15px]">Report issue</Text>
                <View className="w-10" />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>

                    {/* Warning Box */}
                    <View className="mb-6">
                        <Ionicons name="warning-outline" size={28} color="#94A3B8" className="mb-4" />
                        <Text className="text-lg font-bold text-gray-900 leading-6 mb-2">
                            Please include the following details in your report:
                        </Text>
                        <View className="gap-1 ml-1">
                            <Text className="text-gray-500 text-sm">• Brief detail about the issue</Text>
                            <Text className="text-gray-500 text-sm">• Additional photo (optional)</Text>
                        </View>
                    </View>

                    {/* Describe Input */}
                    <Text className="font-bold text-gray-900 mb-3">Describe the issue</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Feel free to provide as much detail as you'd like."
                        placeholderTextColor="#D1D5DB"
                        multiline
                        className="bg-gray-50 rounded-xl p-4 font-medium text-gray-900 min-h-[120px] mb-8 border border-gray-100"
                        textAlignVertical="top"
                    />

                    {/* Photos Section */}
                    {photos.map((photoUrl, index) => (
                        <View key={index} className="mb-6">
                            <View className="flex-row items-center justify-between mb-3">
                                <Text className="font-bold text-gray-900">Photo (optional)</Text>
                                <View className="flex-row items-center gap-3">
                                    <TouchableOpacity onPress={() => handleRemovePhoto(index)} className="w-8 h-8 bg-red-50 rounded-full items-center justify-center">
                                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSwapPhoto(index)} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                                        <Ionicons name="sync" size={16} color="#4B5563" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="border border-dashed border-gray-300 rounded-2xl overflow-hidden h-48 items-center justify-center bg-gray-50/50">
                                <Image source={{ uri: photoUrl }} className="w-full h-full" resizeMode="cover" />
                            </View>
                        </View>
                    ))}

                    {/* Add Photo Button & Popover */}
                    <View className="relative">
                        <Text className="font-bold text-gray-900 mb-3">Photo (optional)</Text>
                        <TouchableOpacity
                            onPress={() => setIsMenuOpen(!isMenuOpen)}
                            className="border border-dashed border-gray-300 rounded-xl px-4 py-4 flex-row justify-between items-center bg-white"
                        >
                            <Text className="text-gray-400 font-medium">Add photo</Text>
                            <Ionicons name="add" size={20} color="#9CA3AF" />
                        </TouchableOpacity>

                        {/* Custom Popover Menu */}
                        {isMenuOpen && (
                            <View className="absolute bottom-16 right-0 bg-white rounded-xl  border border-gray-100 w-48 z-50">
                                <TouchableOpacity onPress={handleAddPhoto} className="flex-row items-center justify-between p-4 border-b border-gray-50">
                                    <Text className="font-medium text-gray-900">Camera</Text>
                                    <Ionicons name="camera" size={20} color="#111827" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAddPhoto} className="flex-row items-center justify-between p-4">
                                    <Text className="font-medium text-gray-900">Photos</Text>
                                    <Ionicons name="images" size={20} color="#111827" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer Submit */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-white px-5 pt-4 pb-8">
                <TouchableOpacity
                    disabled={!isReadyToSubmit}
                    onPress={handleSubmit}
                    className={`py-4 rounded-full items-center ${isReadyToSubmit ? 'bg-[#1A1A1A]' : 'bg-gray-400'}`}
                >
                    <Text className="text-white font-bold text-base">Submit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}