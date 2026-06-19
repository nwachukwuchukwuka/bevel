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
            <SafeAreaView className="flex-1 bg-[#090D16]" >

                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-[12px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                        <Ionicons name="trash-outline" size={20} color="#F87171" />
                    </TouchableOpacity>
                    <Text className="font-bold text-[16px] text-[#F1F5F9]">Log activity</Text>
                    <View className="w-10" />
                </View>

                <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>

                    {/* Title Row */}
                    <View className="flex-row items-center gap-4 mb-8 bg-[#151E33] p-4 rounded-[20px] border border-[#1E2D4A]">
                        <View className="w-14 h-14 rounded-[14px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                            <Ionicons name="walk" size={28} color="#4DB9F2" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[20px]  text-[#F1F5F9]">Indoor Walk</Text>
                            <Text className="text-[14px] text-[#94A3B8] font-medium mt-1">Ready to log</Text>
                        </View>
                        <TouchableOpacity className="w-9 h-9 rounded-[10px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                            <Ionicons name="pencil" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    {/* Dropdowns Container */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-4 gap-4 mb-8">
                        <TouchableOpacity className="flex-row items-center justify-between border border-[#1E2D4A] rounded-[16px] px-4 py-4 bg-[#0F172A]">
                            <Text className="text-[15px]  text-[#F1F5F9]">Indoor Walk</Text>
                            <Ionicons name="chevron-down" size={18} color="#64748B" />
                        </TouchableOpacity>

                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 flex-row items-center justify-between border border-[#1E2D4A] rounded-[16px] px-4 py-4 bg-[#0F172A]">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="calendar-outline" size={18} color="#4DB9F2" />
                                    <Text className="text-[14px]  text-[#F1F5F9]">Today, 8.38 PM</Text>
                                </View>
                                <Ionicons name="chevron-down" size={18} color="#64748B" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-[110px] flex-row items-center justify-between border border-[#1E2D4A] rounded-[16px] px-4 py-4 bg-[#0F172A]">
                                <Text className="text-[14px]  text-[#F1F5F9]">0h 30m</Text>
                                <Ionicons name="chevron-down" size={18} color="#64748B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Inputs that trigger Bottom Sheet */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-5 gap-6 mb-8">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[15px]  text-[#F1F5F9]">Active Energy</Text>
                            <TouchableOpacity onPress={handleOpenKeypad} className="w-[120px] border border-[#4DB9F2] rounded-[14px] px-4 py-3 flex-row justify-between items-center bg-[#090D16]">
                                <Text className={`text-[16px]  ${energy ? 'text-[#F1F5F9]' : 'text-[#475569]'}`}>{energy || '—'}</Text>
                                <Text className="text-[13px] font-semibold text-[#4DB9F2]">kCal</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="h-[1px] bg-[#1E2D4A]" />

                        <View className="flex-row items-center justify-between">
                            <Text className="text-[15px]  text-[#F1F5F9]">Distance</Text>
                            <TouchableOpacity className="w-[120px] border border-[#1E2D4A] rounded-[14px] px-4 py-3 flex-row justify-between items-center bg-[#0F172A]">
                                <Text className="text-[16px]  text-[#475569]">—</Text>
                                <Text className="text-[13px] font-semibold text-[#64748B]">km</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tiring Slider Mock */}
                    <View className="mb-10 bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-5">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-[16px]  text-[#F1F5F9]">Intensity Level</Text>
                            <Ionicons name="information-circle-outline" size={20} color="#4DB9F2" />
                        </View>
                        <Text className="text-[13px] text-[#94A3B8] mb-8 font-medium">Strenuous, breathing is labored and talking is difficult.</Text>

                        <View className="relative h-10 justify-center mb-2">
                            {/* Gradient Track */}
                            <LinearGradient colors={['#38BDF8', '#FACC15', '#FB923C', '#F87171']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-4 rounded-full absolute w-full opacity-80" />

                            {/* Thumb (Positioned based on state for visual accuracy) */}
                            <View className="absolute w-full px-[2px]">
                                <View style={{ marginLeft: `${((tiringLevel - 1) / 9) * 100}%`, transform: [{ translateX: -14 }] }}>
                                    <View className="w-7 h-7 bg-[#090D16] rounded-full items-center justify-center border-2 border-[#F1F5F9]">
                                        <Text className="text-[10px]  text-[#F1F5F9]">{tiringLevel}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Invisible touch targets */}
                            <View className="flex-row justify-between absolute w-full h-full">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <TouchableOpacity key={num} onPress={() => setTiringLevel(num)} className="flex-1 h-full" />
                                ))}
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-[13px]  text-[#64748B]">Low</Text>
                            <Text className="text-[13px]  text-[#64748B]">High</Text>
                        </View>
                    </View>

                </ScrollView>

                {/* Bottom Button */}
                <View style={{ paddingBottom: insets.bottom || 20 }} className="px-5 pt-4 bg-[#090D16] ">
                    <TouchableOpacity onPress={() => router.push('/log-activity/summary')} className="bg-[#4DB9F2] h-[56px] rounded-[16px] items-center justify-center">
                        <Text className="text-[#090D16]  text-[16px]">Add to log</Text>
                    </TouchableOpacity>
                </View>

                {/* Mount Bottom Sheet */}
                <NumericKeypadSheet ref={keypadRef} title="Active Energy" onSave={(val) => setEnergy(val)} />

            </SafeAreaView>
        </BottomSheetModalProvider>

    );
}