import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppleHealthErrorScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="px-5 pt-6 pb-6 border-b border-[#1E293B]">
                <View className="w-16 h-16 bg-rose-950/30 rounded-2xl items-center justify-center border border-rose-500/20 mb-6">
                    <Ionicons name="warning-outline" size={28} color="#EF4444" />
                </View>
                <Text className="text-3xl font-bold text-slate-100 mb-2">Failed to read glucose data</Text>
                <Text className="text-sm text-slate-400 font-medium">Diagnostic checklist. Please check the following:</Text>
            </View>

            <View className="flex-1 px-5 pt-6">

                <View className="bg-[#151E33] rounded-3xl border border-[#1E293B] p-5 mb-4 flex-row gap-4">
                    <View className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#2D3748] items-center justify-center mt-1">
                        <Text className="text-slate-300 font-bold text-sm">1</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-white text-base leading-6 mb-2">
                            Make sure your CGM is attached and functioning properly.
                        </Text>
                        <View className="bg-[#090D16] border border-[#1E293B] rounded-xl p-3 flex-row items-center gap-2 self-start">
                            <Ionicons name="hardware-chip-outline" size={14} color="#4DB9F2" />
                            <Text className="text-xs font-semibold text-slate-400">Verify hardware</Text>
                        </View>
                    </View>
                </View>

                <View className="bg-[#151E33] rounded-3xl border border-[#1E293B] p-5 mb-8 flex-row gap-4">
                    <View className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#2D3748] items-center justify-center mt-1">
                        <Text className="text-slate-300 font-bold text-sm">2</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-white text-base leading-6 mb-4">
                            Go to Settings and enable blood glucose sharing in Health.
                        </Text>

                        <View className="bg-[#090D16] border border-[#1E293B] rounded-xl p-4 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="pulse" size={16} color="#EF4444" />
                                <Text className="font-bold text-slate-300 text-sm">Blood Glucose</Text>
                            </View>
                            <View className="w-10 h-5 bg-[#10B981] rounded-full justify-center px-0.5 border border-[#10B981]">
                                <View className="w-4 h-4 bg-[#090D16] rounded-full translate-x-5" />
                            </View>
                        </View>
                    </View>
                </View>

            </View>

            <View className="px-5 pb-8 pt-4 bg-[#090D16] border-t border-[#1E293B] flex-col gap-4">
                <TouchableOpacity
                    onPress={() => router.push('/nutrition/cgm/manage')}
                    activeOpacity={0.8}
                    className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-base">Acknowledge & Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="h-14 items-center justify-center"
                >
                    <Text className="font-bold text-slate-500 text-sm">Abort connection</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}