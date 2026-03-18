import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DexcomLoginScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="px-5 py-4 mb-4">
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-5">
                <View className="items-center mb-10">
                    <View className="w-20 h-20 bg-[#22C55E] rounded-2xl items-center justify-center mb-6 shadow-xl" style={{ shadowColor: '#22C55E', shadowOpacity: 0.3, shadowRadius: 10 }}>
                        <View className="w-10 h-10 rounded-full border-[4px] border-white" style={{ borderTopColor: 'transparent', transform: [{ rotate: '45deg' }] }} />
                        <Text className="text-white font-bold text-[8px] mt-1">dexcom</Text>
                    </View>

                    <Text className="text-2xl font-bold text-gray-900 mb-2">Login</Text>
                    <Text className="text-gray-500 text-center text-sm px-6">
                        Log into your own Dexcom account, not the follower's.
                    </Text>
                </View>

                <View className="gap-4 mb-8">
                    <TextInput
                        placeholder="Email or username"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-[15px] font-medium shadow-sm"
                        style={styles.shadow}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                        className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-[15px] font-medium shadow-sm"
                        style={styles.shadow}
                    />

                    <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between shadow-sm" style={styles.shadow}>
                        <View>
                            <Text className="text-gray-400 text-[10px] font-bold uppercase mb-0.5">Country/Region of Residency</Text>
                            <View className="flex-row items-center gap-2">
                                <Text>🇺🇸</Text>
                                <Text className="font-bold text-gray-900 text-[15px]">United States</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.dismissAll()} // Simulates successful login -> returns to dashboard
                    className="bg-gray-400 py-4 rounded-full items-center mb-4"
                >
                    <Text className="text-white font-bold text-base">Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Text className="text-gray-500 font-bold underline text-sm">Use phone number instead</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });