import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DexcomSetupScreen() {
    const router = useRouter();
    const [currentView, setCurrentView] = useState<'info' | 'instructions' | 'login'>('info');

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top', 'bottom']}>

            <View className="px-5 pt-4 pb-6 border-b border-[#1E293B] bg-[#151E33] flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        onPress={() => {
                            if (currentView === 'login') setCurrentView('instructions');
                            else if (currentView === 'instructions') setCurrentView('info');
                            else router.back();
                        }}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Dexcom integration</Text>
                        <Text className="text-xs text-slate-400 mt-1">Live data sharing protocol</Text>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 24 }} className="flex-1">

                    {currentView === 'info' && (
                        <View className="px-5">
                            <View className="mb-10 items-center justify-center py-6 border-b border-[#1E293B]">
                                <View className="w-24 h-24 bg-[#1E293B] border border-[#10B981] rounded-2xl items-center justify-center mb-6">
                                    <Ionicons name="hardware-chip-outline" size={36} color="#10B981" />
                                    <View className="absolute -bottom-2 -right-2 bg-[#090D16] border border-[#1E293B] px-2 py-0.5 rounded-lg">
                                        <Text className="text-[10px] font-bold text-[#10B981]">DEX</Text>
                                    </View>
                                </View>
                                <Text className="text-3xl font-bold text-white text-center mb-3">
                                    Set up live data sharing on your Dexcom
                                </Text>
                                <Text className="text-slate-400 text-sm text-center leading-6">
                                    Compatible with all Dexcom devices, excluding Dexcom One and Stelo.
                                </Text>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                                <Text className="text-sm font-semibold text-slate-400 mb-2">Account status</Text>
                                <Text className="text-lg font-bold text-white mb-6">Already have sharing enabled?</Text>
                                <TouchableOpacity
                                    onPress={() => setCurrentView('login')}
                                    activeOpacity={0.8}
                                    className="w-full bg-[#1E293B] border border-[#2D3748] h-14 rounded-2xl items-center justify-center flex-row gap-2"
                                >
                                    <Text className="text-[#4DB9F2] font-bold text-sm">Bypass setup and log in</Text>
                                    <Ionicons name="log-in-outline" size={16} color="#4DB9F2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {currentView === 'instructions' && (
                        <View className="px-5">
                            <Text className="text-2xl font-bold text-white mb-6">Accept follow invitation</Text>

                            <View className="flex-col gap-4 mb-8">
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 flex-row gap-4">
                                    <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Text className="text-lg font-bold text-[#4DB9F2]">1</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-white text-base leading-6 mb-3">
                                            Install the Dexcom Follow app and log in as the follower.
                                        </Text>
                                        <View className="bg-[#090D16] border border-[#1E293B] px-3 py-2 rounded-xl self-start flex-row items-center gap-2">
                                            <Ionicons name="cloud-download-outline" size={14} color="#10B981" />
                                            <Text className="text-xs font-semibold text-slate-400">Download required</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 flex-row gap-4">
                                    <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Text className="text-lg font-bold text-[#4DB9F2]">2</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-white text-base leading-6 mb-3">
                                            Accept the email invite and follow yourself.
                                        </Text>
                                        <View className="bg-[#090D16] border border-[#1E293B] px-3 py-2 rounded-xl self-start flex-row items-center gap-2">
                                            <Ionicons name="mail-unread-outline" size={14} color="#F59E0B" />
                                            <Text className="text-xs font-semibold text-slate-400">Action required</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 flex-row gap-4">
                                    <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Text className="text-lg font-bold text-[#4DB9F2]">3</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-white text-base leading-6 mb-3">
                                            Connect your Dexcom account with Bevel.
                                        </Text>
                                        <View className="bg-[#090D16] border border-[#1E293B] px-3 py-2 rounded-xl self-start flex-row items-center gap-2">
                                            <Ionicons name="link-outline" size={14} color="#4DB9F2" />
                                            <Text className="text-xs font-semibold text-slate-400">Final step</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {currentView === 'login' && (
                        <View className="px-5">
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8">
                                <View className="flex-row items-center gap-4 border-b border-[#1E293B] pb-6 mb-6">
                                    <View className="w-16 h-16 bg-[#1E293B] border border-[#10B981] rounded-2xl items-center justify-center">
                                        <Ionicons name="pulse" size={24} color="#10B981" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-xl font-bold text-white mb-1">Authentication</Text>
                                        <Text className="text-xs text-slate-400">Secure connection gateway</Text>
                                    </View>
                                </View>

                                <View className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-xl flex-row gap-3 items-start mb-8">
                                    <Ionicons name="warning-outline" size={18} color="#F59E0B" />
                                    <Text className="flex-1 text-sm text-slate-300 leading-5">
                                        Log into your own Dexcom account, not the follower's.
                                    </Text>
                                </View>

                                <View className="flex-col gap-4">
                                    <View className="bg-[#090D16] border border-[#1E293B] rounded-2xl px-4 py-2 justify-center">
                                        <TextInput
                                            placeholder="Email or username"
                                            placeholderTextColor="#64748B"
                                            className="text-base text-white h-12 font-medium"
                                            selectionColor="#4DB9F2"
                                            autoCapitalize="none"
                                        />
                                    </View>

                                    <View className="bg-[#090D16] border border-[#1E293B] rounded-2xl px-4 py-2 justify-center">
                                        <TextInput
                                            placeholder="Password"
                                            placeholderTextColor="#64748B"
                                            secureTextEntry
                                            className="text-base text-white h-12 font-medium"
                                            selectionColor="#4DB9F2"
                                        />
                                    </View>

                                    <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between mt-2">
                                        <View>
                                            <Text className="text-xs font-semibold text-slate-500 mb-1">Country/Region of Residency</Text>
                                            <View className="flex-row items-center gap-2">
                                                <Text className="text-lg">🇺🇸</Text>
                                                <Text className="font-bold text-slate-200 text-sm">United States</Text>
                                            </View>
                                        </View>
                                        <Ionicons name="chevron-down" size={16} color="#4DB9F2" />
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="items-center py-2"
                            >
                                <Text className="text-slate-400 font-semibold text-sm">Use phone number instead</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

                <View className="px-5 pt-4 bg-[#090D16] border-t border-[#1E293B]">
                    {currentView === 'info' && (
                        <TouchableOpacity
                            onPress={() => setCurrentView('instructions')}
                            activeOpacity={0.8}
                            className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-row gap-2"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Begin configuration</Text>
                            <Ionicons name="arrow-forward" size={18} color="#090D16" />
                        </TouchableOpacity>
                    )}

                    {currentView === 'instructions' && (
                        <TouchableOpacity
                            onPress={() => setCurrentView('login')}
                            activeOpacity={0.8}
                            className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-row gap-2"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Proceed to authentication</Text>
                            <Ionicons name="arrow-forward" size={18} color="#090D16" />
                        </TouchableOpacity>
                    )}

                    {currentView === 'login' && (
                        <TouchableOpacity
                            onPress={() => router.dismissAll()}
                            activeOpacity={0.8}
                            className="w-full bg-[#10B981] h-14 rounded-2xl items-center justify-center border border-[#10B981]"
                        >
                            <Text className="text-[#090D16] font-bold text-base">Log in</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}