import { NumericKeypadSheet, NumericKeypadSheetRef } from '@/components/lLogActivity/NumericKeypadSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LogDetailsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const keypadRef = useRef<NumericKeypadSheetRef>(null);

    const [energy, setEnergy] = useState('');
    const [tiringLevel, setTiringLevel] = useState(7); // 1-10

    const handleOpenKeypad = () => keypadRef.current?.present();

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-white" >

                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-red-50 items-center justify-center">
                        <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                    <Text className="font-semibold text-[15px] text-gray-900">Log activity</Text>
                    <View className="w-10" />
                </View>

                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

                    {/* Title Row */}
                    <View className="mt-4 mb-8 gap-4">
                        <View className="w-12 h-12 rounded-full border border-gray-100 items-center justify-center shadow-sm bg-white">
                            <Ionicons name="walk" size={24} color="#F59E0B" />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[24px] font-bold text-gray-900">Indoor Walk</Text>
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="pencil" size={16} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Dropdowns */}
                    <View className="gap-3 mb-8">
                        <TouchableOpacity className="flex-row items-center justify-between border border-gray-200 rounded-[14px] px-4 py-3.5 bg-white">
                            <Text className="text-[15px] font-bold text-gray-900">Indoor Walk</Text>
                            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                        </TouchableOpacity>

                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 flex-row items-center justify-between border border-gray-200 rounded-[14px] px-4 py-3.5 bg-white">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                                    <Text className="text-[14px] font-bold text-gray-900">Today, 8.38 PM</Text>
                                </View>
                                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-[110px] flex-row items-center justify-between border border-gray-200 rounded-[14px] px-4 py-3.5 bg-white">
                                <Text className="text-[14px] font-bold text-gray-900">0h 30m</Text>
                                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="h-[1px] bg-gray-100 mb-6" />

                    {/* Inputs that trigger Bottom Sheet */}
                    <View className="gap-6 mb-8">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[15px] font-bold text-gray-900">Active Energy</Text>
                            <TouchableOpacity onPress={handleOpenKeypad} className="w-[110px] border border-gray-200 rounded-[12px] px-4 py-2.5 flex-row justify-between items-center bg-white shadow-sm shadow-black/5">
                                <Text className={`text-[15px] font-bold ${energy ? 'text-gray-900' : 'text-gray-300'}`}>{energy || '—'}</Text>
                                <Text className="text-[13px] font-medium text-gray-400">kCal</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-[15px] font-bold text-gray-900">Distance</Text>
                            <TouchableOpacity className="w-[110px] border border-gray-200 rounded-[12px] px-4 py-2.5 flex-row justify-between items-center bg-white shadow-sm shadow-black/5">
                                <Text className="text-[15px] font-bold text-gray-300">—</Text>
                                <Text className="text-[13px] font-medium text-gray-400">km</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tiring Slider Mock */}
                    <View className="mb-10">
                        <View className="flex-row items-center justify-between mb-1">
                            <Text className="text-[15px] font-bold text-gray-900">Hard</Text>
                            <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
                        </View>
                        <Text className="text-[13px] text-gray-500 mb-6 leading-5">Strenuous, breathing is labored and talking is difficult.</Text>

                        <View className="relative h-6 justify-center">
                            {/* Gradient Track */}
                            <LinearGradient colors={['#93C5FD', '#FCD34D', '#F97316', '#EF4444']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-2 rounded-full absolute w-full" />

                            {/* Dots Overlay */}
                            <View className="flex-row justify-between absolute w-full px-[2px]">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <TouchableOpacity key={num} onPress={() => setTiringLevel(num)} hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}>
                                        <View className={`w-1.5 h-1.5 rounded-full ${tiringLevel === num ? 'opacity-0' : 'bg-white/50'}`} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Thumb (Positioned based on state for visual accuracy) */}
                            <View className="absolute w-full px-[2px]" pointerEvents="none">
                                <View style={{ marginLeft: `${((tiringLevel - 1) / 9) * 100}%`, transform: [{ translateX: -10 }] }}>
                                    <View className="w-5 h-5 bg-white rounded-full items-center justify-center shadow-md shadow-black/20 border border-gray-100">
                                        <View className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2">
                            <Text className="text-[12px] font-medium text-gray-400">1</Text>
                            <Text className="text-[12px] font-medium text-gray-400">10</Text>
                        </View>
                    </View>

                </ScrollView>

                {/* Bottom Button */}
                <View style={{ paddingBottom: insets.bottom || 20 }} className="px-5 pt-4 bg-white border-t border-gray-50">
                    <TouchableOpacity onPress={() => router.push('/log-activity/summary')} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                        <Text className="text-white font-semibold text-[16px]">Add to log</Text>
                    </TouchableOpacity>
                </View>

                {/* Mount Bottom Sheet */}
                <NumericKeypadSheet ref={keypadRef} title="Active Energy" onSave={(val) => setEnergy(val)} />

            </SafeAreaView>
        </BottomSheetModalProvider>

    );
}