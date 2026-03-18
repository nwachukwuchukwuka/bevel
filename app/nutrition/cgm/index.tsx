import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const SENSORS = [
    { name: 'Dexcom G6', iconColor: '#6B7280' },
    { name: 'Dexcom G7', iconColor: '#D1D5DB' },
    { name: 'Dexcom Stelo', iconColor: '#9CA3AF' },
    { name: 'Lingo', iconColor: '#E5E7EB' },
    { name: 'FreeStyle Libre 2', iconColor: '#E5E7EB' },
    { name: 'FreeStyle Libre 3', iconColor: '#F3F4F6' },
];

export default function ChooseSensorScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="px-5 py-4 flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#111827" /></TouchableOpacity>
                <Text className="flex-1 text-center font-semibold text-gray-500 text-[13px] mr-6">Connect CGM</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>

                {/* Animated Central Graphic */}
                <Animated.View entering={FadeIn.duration(500)} className="items-center justify-center mb-10 mt-4">
                    <View className="w-40 h-40 rounded-full bg-blue-50/60 absolute items-center justify-center">
                        <View className="w-32 h-32 rounded-full bg-blue-100/50 absolute" />
                    </View>
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-xl" style={styles.shadow}>
                        <View className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    </View>
                </Animated.View>

                <Animated.Text entering={SlideInDown.delay(200)} className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Choose your sensor
                </Animated.Text>

                {/* Sensor List */}
                <Animated.View entering={SlideInDown.delay(300)} className="gap-3">
                    {SENSORS.map((sensor, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => router.push('/nutrition/cgm/sync-method')}
                            className="bg-white rounded-2xl p-4 border border-gray-50 flex-row items-center justify-between"
                            style={styles.shadow}
                        >
                            <View className="flex-row items-center gap-3">
                                {/* Mock Sensor Icon */}
                                <View className="w-8 h-5 rounded-full items-center justify-center border border-gray-200" style={{ backgroundColor: sensor.iconColor }}>
                                    <View className="w-1 h-1 bg-white/50 rounded-full" />
                                </View>
                                <Text className="font-bold text-gray-900 text-[15px]">{sensor.name}</Text>
                            </View>
                            <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        onPress={() => router.push('/nutrition/cgm/sync-method')}
                        className="bg-white rounded-2xl p-4 border border-gray-50 flex-row items-center justify-between mt-2"
                        style={styles.shadow}
                    >
                        <Text className="font-bold text-gray-900 text-[15px] ml-2">Other</Text>
                        <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });