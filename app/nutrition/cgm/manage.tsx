import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageCGMScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="px-5 pt-4 pb-6 border-b border-[#1E293B] bg-[#151E33] flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Manage CGM</Text>
                        <Text className="text-xs text-slate-400 mt-1">Hardware configuration</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-5 pt-8">
                <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Connected sensor</Text>

                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-4 flex-col gap-6">
                    <View className="flex-row items-start justify-between border-b border-[#1E293B] pb-6">
                        <View className="flex-row items-center gap-4">
                            <View className="w-14 h-14 bg-[#1E293B] rounded-2xl border border-[#2D3748] items-center justify-center">
                                <Ionicons name="hardware-chip" size={24} color="#4DB9F2" />
                            </View>
                            <View>
                                <Text className="font-bold text-white text-lg mb-1">Dexcom G6</Text>
                                <View className="flex-row items-center gap-1.5 bg-[#090D16] px-2 py-1 rounded-md border border-[#1E293B] self-start">
                                    <Ionicons name="heart" size={10} color="#EF4444" />
                                    <Text className="text-[10px] text-slate-400 font-semibold">Apple Health</Text>
                                </View>
                            </View>
                        </View>

                        <View className="w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#151E33] mt-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-full bg-[#1E293B] border border-[#2D3748] py-3.5 rounded-xl items-center justify-center flex-row gap-2"
                    >
                        <Ionicons name="link" size={16} color="#EF4444" />
                        <Text className="text-rose-500 font-bold text-sm">Disconnect node</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-amber-950/20 border border-amber-500/10 rounded-2xl p-4 flex-row gap-4 items-start mx-1">
                    <Ionicons name="warning-outline" size={20} color="#F59E0B" />
                    <Text className="flex-1 text-slate-400 text-xs leading-5">
                        This device syncs data from Apple Health. Please note that glucose data is delayed by three hours.
                    </Text>
                </View>
            </View>

        </SafeAreaView>
    );
}