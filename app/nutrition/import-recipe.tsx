import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImportRecipeScreen() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = () => {
        setIsLoading(true);
        // Simulate API Processing
        setTimeout(() => {
            setIsLoading(false);
            router.push('/nutrition/recipe-details');
        }, 2000);
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <View className="w-20 h-20 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mb-6">
                    <Ionicons name="restaurant" size={32} color="#9CA3AF" />
                </View>
                <Text className="text-xl font-bold text-gray-900 mb-2">Importing recipe</Text>
                <Text className="text-gray-500 text-center px-10 leading-5">
                    Just a moment as we find your ingredients and create your recipe.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="w-full items-center pt-3 pb-2"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

            <View className="px-5 mb-4">
                <View className="bg-orange-50 px-3 py-1 rounded-full flex-row items-center self-start gap-1 mb-4 border border-orange-100">
                    <Ionicons name="sparkles" size={12} color="#F59E0B" />
                    <Text className="text-xs font-bold text-gray-800 uppercase tracking-wider">Preview</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2">Import your recipe</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-5">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Write out or paste your recipe details"
                    placeholderTextColor="#D1D5DB"
                    multiline
                    autoFocus
                    className="flex-1 font-medium text-gray-900 text-lg leading-7 mt-2"
                    textAlignVertical="top"
                />

                <View className="gap-4 pb-4 mt-4">
                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="camera" size={20} color="#D1D5DB" />
                        <Text className="text-gray-400 font-semibold text-[15px]">Capture instead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-3">
                        <Ionicons name="image" size={20} color="#D1D5DB" />
                        <Text className="text-gray-400 font-semibold text-[15px]">Import photo instead</Text>
                    </TouchableOpacity>
                </View>

                <View className="py-6 border-t border-transparent">
                    <TouchableOpacity
                        disabled={text.length === 0}
                        onPress={handleContinue}
                        className={`py-4 rounded-full items-center ${text.length > 0 ? 'bg-[#1A1A1A] ' : 'bg-gray-400'}`}
                    >
                        <Text className="text-white font-bold text-base">Continue</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}