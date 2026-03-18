import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DexcomStep1Screen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top', 'bottom']}>
            {/* Progress Bars */}
            <View className="flex-row gap-2 px-5 py-4 mb-10">
                <View className="flex-1 h-1 bg-[#111827] rounded-full" />
                <View className="flex-1 h-1 bg-gray-200 rounded-full" />
                <View className="flex-1 h-1 bg-gray-200 rounded-full" />
            </View>

            <View className="flex-1 px-5 items-center justify-center mb-20">
                {/* Dexcom Logo Mock */}
                <View className="w-24 h-24 bg-[#22C55E] rounded-3xl items-center justify-center mb-8 shadow-xl" style={{ shadowColor: '#22C55E', shadowOpacity: 0.4, shadowRadius: 15 }}>
                    <View className="w-12 h-12 rounded-full border-[5px] border-white" style={{ borderTopColor: 'transparent', transform: [{ rotate: '45deg' }] }} />
                    <Text className="text-white font-bold text-[10px] mt-1">dexcom</Text>
                </View>

                <Text className="text-2xl font-bold text-gray-900 text-center mb-4 leading-8 px-4">
                    Set up live data sharing on your Dexcom
                </Text>
                <Text className="text-gray-500 text-center text-[15px] leading-6 px-4 mb-8">
                    Compatible with all Dexcom devices, excluding Dexcom One and Stelo.
                </Text>

                <Text className="text-gray-900 font-medium text-sm mb-1">Already have sharing enabled?</Text>
                <TouchableOpacity onPress={() => router.push('/nutrition/cgm/dexcom-login')}>
                    <Text className="font-bold text-gray-900 underline">Log in instead</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-between px-5 pb-6">
                <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100" style={styles.shadow}>
                    <Ionicons name="arrow-back" size={20} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/nutrition/cgm/dexcom-step-2')} className="bg-[#1A1A1A] px-6 py-3.5 rounded-full flex-row items-center gap-2 shadow-lg">
                    <Text className="text-white font-bold text-[15px]">Next</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });