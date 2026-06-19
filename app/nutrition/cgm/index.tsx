import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const SENSORS = [
    { name: 'Dexcom G6', iconColor: '#4DB9F2' },
    { name: 'Dexcom G7', iconColor: '#3B82F6' },
    { name: 'Dexcom Stelo', iconColor: '#10B981' },
    { name: 'Lingo', iconColor: '#F59E0B' },
    { name: 'FreeStyle Libre 2', iconColor: '#F97316' },
    { name: 'FreeStyle Libre 3', iconColor: '#EF4444' },
];

export default function ChooseSensorScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
            <View className="px-5 pt-4 pb-6 flex-row items-center justify-between border-b border-[#1E293B] bg-[#151E33]">
                <View>
                    <Text className="text-xl font-bold text-slate-100">Connect CGM</Text>
                    <Text className="text-xs text-slate-400 mt-1">Hardware selection</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>

                <Animated.View entering={FadeIn.duration(500)} className="items-start mb-8 mt-8">
                    <View className="w-16 h-16 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center mb-4">
                        <Ionicons name="hardware-chip-outline" size={28} color="#4DB9F2" />
                    </View>
                    <Text className="text-3xl font-bold text-white mb-2">Choose your sensor</Text>
                    <Text className="text-slate-400 text-sm">Select your active monitoring hardware to begin synchronization.</Text>
                </Animated.View>

                <Animated.View entering={SlideInDown.delay(200)} className="flex-row flex-wrap justify-between gap-y-4 mb-6">
                    {SENSORS.map((sensor, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => router.push('/nutrition/cgm/sync-method')}
                            activeOpacity={0.8}
                            className="w-[48%] bg-[#151E33] rounded-2xl p-4 border border-[#1E293B] flex-col min-h-[110px] justify-between"
                        >
                            <View className="flex-row justify-between items-start">
                                <View className="w-8 h-8 rounded-lg border border-[#2D3748] bg-[#1E293B] items-center justify-center">
                                    <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sensor.iconColor }} />
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </View>
                            <Text className="font-bold text-white text-sm leading-5 pr-4">{sensor.name}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                <Animated.View entering={SlideInDown.delay(300)}>
                    <TouchableOpacity
                        onPress={() => router.push('/nutrition/cgm/sync-method')}
                        activeOpacity={0.8}
                        className="bg-[#1E293B40] rounded-2xl p-5 border border-[#1E293B] flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="search-outline" size={18} color="#94A3B8" />
                            <Text className="font-bold text-slate-300 text-base">Other</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
}