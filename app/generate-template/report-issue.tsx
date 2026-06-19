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

    const handleAddPhoto = () => {
        setPhotos(prev => [...prev, `https://picsum.photos/seed/${Date.now()}/400/300`]);
        setIsMenuOpen(false);
    };

    const handleRemovePhoto = (indexToRemove: number) => {
        setPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSwapPhoto = (indexToSwap: number) => {
        setPhotos(prev => prev.map((photo, index) =>
            index === indexToSwap ? `https://picsum.photos/seed/${Date.now()}/400/300` : photo
        ));
    };

    const handleSubmit = () => {
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
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                <View className="flex-1 mr-4">
                    <Text className="text-3xl font-bold text-white">Report issue</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center mt-1">
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-5 flex-row gap-4 mb-8">
                        <View className="w-12 h-12 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl items-center justify-center">
                            <Ionicons name="warning" size={20} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-semibold text-base mb-3 leading-6">
                                Please include the following details in your report:
                            </Text>
                            <View className="gap-2">
                                <Text className="text-slate-400 font-medium text-sm">• Brief detail about the issue</Text>
                                <Text className="text-slate-400 font-medium text-sm">• Additional photo (optional)</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="font-semibold text-slate-100 text-sm mb-3">Describe the issue</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Feel free to provide as much detail as you'd like."
                            placeholderTextColor="#475569"
                            multiline
                            className="bg-[#1E293B] border border-[#2D3748] rounded-2xl p-4 font-medium text-white text-base min-h-[140px]"
                            textAlignVertical="top"
                        />
                    </View>

                    {photos.map((photoUrl, index) => (
                        <View key={index} className="mb-8">
                            <View className="flex-row items-center justify-between mb-3">
                                <Text className="font-semibold text-slate-100 text-sm">Photo (optional)</Text>
                                <View className="flex-row items-center gap-3">
                                    <TouchableOpacity onPress={() => handleRemovePhoto(index)} className="w-10 h-10 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl items-center justify-center">
                                        <Ionicons name="trash" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSwapPhoto(index)} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Ionicons name="sync" size={16} color="#4DB9F2" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="border border-[#2D3748] rounded-2xl overflow-hidden h-56 bg-[#1E293B] items-center justify-center">
                                <Image source={{ uri: photoUrl }} className="w-full h-full" resizeMode="cover" />
                            </View>
                        </View>
                    ))}

                    <View className="relative">
                        <Text className="font-semibold text-slate-100 text-sm mb-3">Photo (optional)</Text>
                        <TouchableOpacity
                            onPress={() => setIsMenuOpen(!isMenuOpen)}
                            className="bg-[#151E33]/50 border border-dashed border-[#2D3748] rounded-2xl p-5 flex-row justify-between items-center"
                        >
                            <Text className="text-slate-300 font-medium text-base">Add photo</Text>
                            <View className="w-8 h-8 bg-[#1E293B] border border-[#2D3748] rounded-lg items-center justify-center">
                                <Ionicons name="add" size={16} color="#4DB9F2" />
                            </View>
                        </TouchableOpacity>

                        {isMenuOpen && (
                            <View className="absolute bottom-[88px] right-0 bg-[#151E33] border border-[#2D3748] rounded-2xl w-48 z-50 overflow-hidden">
                                <TouchableOpacity onPress={handleAddPhoto} className="flex-row items-center justify-between p-4 border-b border-[#2D3748]">
                                    <Text className="font-semibold text-white text-sm">Camera</Text>
                                    <Ionicons name="camera" size={18} color="#4DB9F2" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAddPhoto} className="flex-row items-center justify-between p-4">
                                    <Text className="font-semibold text-white text-sm">Photos</Text>
                                    <Ionicons name="images" size={18} color="#4DB9F2" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            <View className="absolute bottom-0 left-0 right-0 bg-[#090D16]  px-5 pt-4 pb-8">
                <TouchableOpacity
                    disabled={!isReadyToSubmit}
                    onPress={handleSubmit}
                    className={`py-4 rounded-xl items-center border ${isReadyToSubmit ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'}`}
                >
                    <Text className={`font-bold text-base ${isReadyToSubmit ? 'text-[#090D16]' : 'text-slate-500'}`}>Submit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}