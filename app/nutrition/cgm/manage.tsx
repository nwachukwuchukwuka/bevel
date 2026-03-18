import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageCGMScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="px-5 py-4 flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color="#6B7280" /></TouchableOpacity>
                <Text className="flex-1 text-center font-semibold text-gray-900 text-[15px] mr-6">Manage CGM</Text>
            </View>

            <View className="px-5">
                <Text className="font-bold text-gray-900 text-base mb-3">Sensor</Text>

                <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-gray-100 mb-4" style={styles.shadow}>
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-6 bg-gray-200 rounded-full items-center justify-center border border-gray-300"><View className="w-1 h-1 bg-white rounded-full" /></View>
                        <View>
                            <Text className="font-bold text-gray-900 text-[15px]">Dexcom G6</Text>
                            <Text className="text-gray-400 text-xs">Apple Health</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="border border-gray-200 px-3 py-1.5 rounded-lg bg-white shadow-sm">
                        <Text className="text-gray-600 font-semibold text-xs">Disconnect</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-400 text-xs leading-5">This device syncs data from Apple Health. Please note that glucose data is delayed by three hours.</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } }); 