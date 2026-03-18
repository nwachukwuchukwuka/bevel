import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageCGMScreen() {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(true);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900 flex-1 text-center mr-6">Manage CGM</Text>
            </View>

            <View className="px-5 pt-4">
                <Text className="text-[14px] font-bold text-gray-900 mb-4 ml-1">Sensor</Text>

                {isConnected ? (
                    <>
                        <View className="bg-white rounded-[24px] p-4 flex-row items-center justify-between border border-gray-100 shadow-sm shadow-black/5 mb-6">
                            <View className="flex-row items-center gap-3">
                                <View className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 items-center justify-center">
                                    <Ionicons name="medical" size={20} color="#9CA3AF" />
                                </View>
                                <View>
                                    <Text className="text-[15px] font-bold text-gray-900 mb-0.5">Dexcom G6</Text>
                                    <Text className="text-[13px] font-medium text-gray-500">Apple Health</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setIsConnected(false)} className="border border-gray-200 rounded-full px-3 py-1.5">
                                <Text className="text-[12px] font-bold text-gray-600">Disconnect</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-[11px] text-gray-500 leading-4 ml-1">This device syncs data from Apple Health. Please note that glucose data is delayed by three hours.</Text>
                    </>
                ) : (
                    <View className="bg-white rounded-[24px] p-4 flex-row items-center justify-between border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row items-center gap-3">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center border border-white shadow-sm shadow-black/10">
                                <View className="w-2 h-2 bg-gray-300 rounded-full" />
                            </View>
                            <View>
                                <Text className="text-[15px] font-bold text-gray-900 mb-0.5">Connect CGM</Text>
                                <Text className="text-[13px] font-medium text-gray-500">No device found</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setIsConnected(true)} className="border border-gray-200 rounded-full px-4 py-1.5 shadow-sm bg-white">
                            <Text className="text-[12px] font-bold text-gray-900">Connect</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}