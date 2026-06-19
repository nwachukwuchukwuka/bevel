import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CGMSyncMethodScreen() {
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
                        <Text className="text-xl font-bold text-slate-100">Connect CGM</Text>
                        <Text className="text-xs text-slate-400 mt-1">Integration protocol</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-5 pt-8">

                <View className="mb-10 flex-row items-center gap-4">
                    <View className="w-14 h-14 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center">
                        <Ionicons name="git-network-outline" size={24} color="#4DB9F2" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-white mb-1">Select sync method</Text>
                        <Text className="text-sm text-slate-400">Choose data pipeline architecture</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/nutrition/cgm/dexcom-login')}
                    activeOpacity={0.8}
                    className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-6 flex-col gap-4"
                >
                    <View className="flex-row items-center justify-between border-b border-[#1E293B] pb-4">
                        <View className="flex-row items-center gap-3">
                            <View className="bg-[#1E293B] p-2 rounded-xl border border-[#2D3748]">
                                <Ionicons name="flash" size={16} color="#10B981" />
                            </View>
                            <Text className="font-bold text-white text-lg">Dexcom Follow</Text>
                        </View>
                        <View className="bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-500/20">
                            <Text className="text-[10px] font-bold text-[#10B981]">REAL-TIME</Text>
                        </View>
                    </View>

                    <Text className="text-slate-400 text-sm leading-6">
                        Using the follow method ensures your data updates in real time without delays.
                    </Text>

                    <View className="bg-[#090D16] p-3 rounded-xl border border-[#1E293B] flex-row items-center justify-between mt-2">
                        <Text className="text-xs font-semibold text-[#4DB9F2]">Initiate pairing</Text>
                        <Ionicons name="arrow-forward" size={14} color="#4DB9F2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push('/nutrition/cgm/apple-health-error')}
                    activeOpacity={0.8}
                    className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 flex-col gap-4"
                >
                    <View className="flex-row items-center justify-between border-b border-[#1E293B] pb-4">
                        <View className="flex-row items-center gap-3">
                            <View className="bg-[#1E293B] p-2 rounded-xl border border-[#2D3748]">
                                <Ionicons name="heart" size={16} color="#EF4444" />
                            </View>
                            <Text className="font-bold text-white text-lg">Apple Health</Text>
                        </View>
                        <View className="bg-amber-950/30 px-2.5 py-1 rounded-md border border-amber-500/20">
                            <Text className="text-[10px] font-bold text-amber-500">DELAYED</Text>
                        </View>
                    </View>

                    <Text className="text-slate-400 text-sm leading-6">
                        Pulling glucose data from Apple Health will result in a 3-hour delay.
                    </Text>

                    <View className="bg-[#090D16] p-3 rounded-xl border border-[#1E293B] flex-row items-center justify-between mt-2">
                        <Text className="text-xs font-semibold text-[#4DB9F2]">Initiate pairing</Text>
                        <Ionicons name="arrow-forward" size={14} color="#4DB9F2" />
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}