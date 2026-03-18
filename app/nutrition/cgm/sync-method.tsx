import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CGMSyncMethodScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="px-5 py-4 flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                <Text className="flex-1 text-center font-semibold text-gray-500 text-[13px] mr-6">Connect CGM</Text>
            </View>

            <View className="flex-1 px-5 pt-4">
                {/* Hero Graphic */}
                <View className="items-center justify-center mb-10">
                    <View className="w-40 h-40 rounded-full bg-blue-50/60 absolute items-center justify-center">
                        <View className="w-32 h-32 rounded-full bg-blue-100/50 absolute" />
                    </View>
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-lg" style={styles.shadow}>
                        <View className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 text-center mb-8">Select sync method</Text>

                {/* Dexcom Button - UPDATED ROUTE */}
                <TouchableOpacity
                    onPress={() => router.push('/nutrition/cgm/dexcom-step-1')}
                    className="bg-white rounded-2xl p-5 mb-4 border border-gray-100 flex-row items-center justify-between" style={styles.shadow}
                >
                    <View className="flex-1 pr-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <View className="w-5 h-5 bg-[#22C55E] rounded flex-row flex-wrap p-0.5 justify-between content-between">
                                <View className="w-1.5 h-1.5 bg-white rounded-full" /><View className="w-1.5 h-1.5 bg-white rounded-full" />
                                <View className="w-1.5 h-1.5 bg-white rounded-full" /><View className="w-1.5 h-1.5 bg-white rounded-full" />
                            </View>
                            <Text className="font-bold text-gray-900 text-[15px]">Dexcom Follow</Text>
                        </View>
                        <Text className="text-gray-500 text-xs leading-5">Using the follow method ensures your data updates in real time without delays.</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                </TouchableOpacity>

                {/* Apple Health Button */}
                <TouchableOpacity
                    onPress={() => router.push('/nutrition/cgm/apple-health-error')}
                    className="bg-white rounded-2xl p-5 border border-gray-100 flex-row items-center justify-between" style={styles.shadow}
                >
                    <View className="flex-1 pr-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Ionicons name="heart" size={16} color="#EF4444" />
                            <Text className="font-bold text-gray-900 text-[15px]">Apple Health</Text>
                        </View>
                        <Text className="text-gray-500 text-xs leading-5">Pulling glucose data from Apple Health will result in a 3-hour delay.</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });