import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImportRecipeScreen() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push('/nutrition/recipe-details');
        }, 2000);
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-[#090D16] justify-center items-center px-6">
                <View className="w-24 h-24 bg-[#151E33] rounded-[24px] border border-[#1E293B] items-center justify-center mb-8">
                    <View className="w-14 h-14 bg-[#1E293B] rounded-[16px] border border-[#2D3748] items-center justify-center">
                        <Ionicons name="restaurant" size={28} color="#4DB9F2" />
                    </View>
                </View>
                <Text className="text-[24px] font-bold text-slate-100 mb-4 text-center">
                    Importing recipe
                </Text>
                <Text className="text-slate-400 text-center text-[15px] leading-6 font-medium px-4">
                    Just a moment as we find your ingredients and create your recipe.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} >
                <View className="px-5 pt-8 pb-6">
                    <View className="bg-amber-950/30 border border-amber-500/20 px-3 py-1.5 rounded-xl flex-row items-center self-start gap-1.5 mb-5">
                        <Ionicons name="sparkles" size={14} color="#F59E0B" />
                        <Text className="text-[12px] font-semibold text-amber-500">Preview</Text>
                    </View>
                    <Text className="text-[28px] font-bold text-slate-100">
                        Import your recipe
                    </Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <View className="flex-1 px-5 mb-5">
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5">
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                placeholder="Write out or paste your recipe details"
                                placeholderTextColor="#64748B"
                                multiline
                                autoFocus
                                className="flex-1 font-medium text-slate-100 text-[17px] leading-7"
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    <View className="px-5 gap-3 mb-6">
                        <TouchableOpacity className="bg-[#151E33] border border-[#1E293B] rounded-[16px] p-4 flex-row items-center gap-4">
                            <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                <Ionicons name="camera" size={20} color="#4DB9F2" />
                            </View>
                            <Text className="text-slate-200 font-medium text-[15px]">Capture instead</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#151E33] border border-[#1E293B] rounded-[16px] p-4 flex-row items-center gap-4">
                            <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                <Ionicons name="image" size={20} color="#4DB9F2" />
                            </View>
                            <Text className="text-slate-200 font-medium text-[15px]">Import photo instead</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5 pb-6 pt-2">
                        <TouchableOpacity
                            disabled={text.length === 0}
                            onPress={handleContinue}
                            className={`py-4 rounded-[16px] items-center border ${text.length > 0
                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                : 'bg-[#151E33] border-[#1E293B]'
                                }`}
                        >
                            <Text className={`font-bold text-[16px] ${text.length > 0 ? 'text-[#090D16]' : 'text-slate-500'
                                }`}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>
    );
}