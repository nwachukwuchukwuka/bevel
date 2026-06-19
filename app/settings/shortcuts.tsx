import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShortcutsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16] pt-4">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-2 mb-4  pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-slate-100 flex-1 text-center mr-6">Shortcuts</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}>
                {/* Spotlight Automation Card */}
                <View className="bg-indigo-950/20 border border-indigo-900/40 rounded-3xl p-5 mb-6">
                    <View className="flex-row items-center gap-3 mb-4">
                        <View className="w-10 h-10 bg-indigo-600 rounded-2xl items-center justify-center">
                            <Ionicons name="moon-outline" size={20} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[12px] font-semibold text-indigo-400">Sleep Automation</Text>
                            <Text className="text-[16px] font-bold text-slate-100">Sleep Alarm + Focus</Text>
                        </View>
                    </View>

                    <Text className="text-[13px] text-slate-400 leading-5 mb-6">
                        Schedule the alarm and activate Sleep Focus mode at the same time using Apple Shortcuts.
                    </Text>

                    <TouchableOpacity className="flex-row items-center justify-center bg-indigo-600/20 border border-indigo-500/30 rounded-2xl py-3.5 gap-2.5">
                        {/* Apple Shortcuts Icon Mock */}
                        <View className="w-5 h-5 rounded overflow-hidden flex-row flex-wrap">
                            <View className="w-1/2 h-1/2 bg-pink-400" />
                            <View className="w-1/2 h-1/2 bg-purple-400" />
                            <View className="w-1/2 h-1/2 bg-blue-400" />
                            <View className="w-1/2 h-1/2 bg-teal-400" />
                        </View>
                        <Text className="text-[14px] font-bold text-indigo-300">Add to Shortcuts</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}