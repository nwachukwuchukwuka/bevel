import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageCGMScreen() {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(true);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">

            <View className="flex-row items-start justify-between px-5 pt-6 pb-8">
                <View className="flex-1 pr-4">
                    <Text className="text-[28px] font-bold text-slate-100 mb-1">Manage CGM</Text>
                    <Text className="text-[13px] font-medium text-slate-400">Configure glucose monitoring</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center mt-1"
                >
                    <Ionicons name="arrow-back" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <View className="px-5">
                <Text className="text-slate-500 font-bold text-[13px] mb-3 ml-1">Sensor</Text>

                {isConnected ? (
                    <>
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5 mb-4">
                            <View className="flex-row items-center justify-between mb-6">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-emerald-950/20 border border-emerald-500/30 rounded-[14px] items-center justify-center">
                                        <Ionicons name="medical" size={20} color="#10B981" />
                                    </View>
                                    <View>
                                        <Text className="text-[16px] font-bold text-slate-100 mb-1">Dexcom G6</Text>
                                        <View className="flex-row items-center gap-1.5">
                                            <View className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <Text className="text-[13px] font-medium text-slate-400">Apple Health</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsConnected(false)}
                                className="w-full bg-[#090D16] border border-[#2D3748] rounded-[12px] py-4 items-center justify-center"
                            >
                                <Text className="text-rose-400 font-bold text-[14px]">Disconnect</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Structured Information Box */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[16px] p-4 flex-row gap-3">
                            <View className="mt-0.5">
                                <Ionicons name="information-circle" size={18} color="#4DB9F2" />
                            </View>
                            <Text className="flex-1 text-[13px] text-slate-400 font-medium leading-5 pr-2">
                                This device syncs data from Apple Health. Please note that glucose data is delayed by three hours.
                            </Text>
                        </View>
                    </>
                ) : (
                    /* Inactive / Empty State Card */
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5">
                        <View className="flex-row items-center justify-between mb-6">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#090D16] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                    <Ionicons name="medical-outline" size={20} color="#64748B" />
                                </View>
                                <View>
                                    <Text className="text-[16px] font-bold text-slate-100 mb-1">Connect CGM</Text>
                                    <View className="flex-row items-center gap-1.5">
                                        <View className="w-2 h-2 rounded-full bg-slate-700" />
                                        <Text className="text-[13px] font-medium text-slate-500">No device found</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => setIsConnected(true)}
                            className="w-full bg-[#4DB9F2]/10 border border-[#4DB9F2]/30 rounded-[12px] py-4 items-center justify-center"
                        >
                            <Text className="text-[#4DB9F2] font-bold text-[14px]">Connect</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}