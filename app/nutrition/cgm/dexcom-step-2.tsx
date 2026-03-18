import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DexcomStep2Screen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top', 'bottom']}>
            <View className="flex-row gap-2 px-5 py-4 mb-4">
                <View className="flex-1 h-1 bg-[#111827] rounded-full" />
                <View className="flex-1 h-1 bg-[#111827] rounded-full" />
                <View className="flex-1 h-1 bg-[#111827] rounded-full" />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                <Text className="text-gray-400 font-semibold text-xs uppercase mb-1">Connect your Dexcom</Text>
                <Text className="text-2xl font-bold text-gray-900 mb-8">Accept follow invitation</Text>

                <View className="gap-4">
                    {/* Card 1 */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-50 overflow-hidden relative min-h-[140px] justify-end" style={styles.shadow}>
                        <Text className="absolute top-2 left-2 text-[60px] font-bold text-gray-100/50 leading-none">5</Text>
                        <View className="absolute top-4 right-4 w-12 h-12 bg-[#22C55E] rounded-xl flex-row flex-wrap p-2 justify-center content-center gap-1">
                            {/* Fake App Icon */}
                            <View className="w-1.5 h-1.5 bg-white rounded-full" /><View className="w-1.5 h-1.5 bg-white rounded-full" /><View className="w-1.5 h-1.5 bg-white rounded-full" />
                        </View>
                        <Text className="font-bold text-gray-900 text-[15px] leading-6 w-[70%]">Install the Dexcom Follow app and log in as the follower.</Text>
                        <Ionicons name="open-outline" size={16} color="#9CA3AF" className="absolute bottom-4 right-4" />
                    </View>

                    {/* Card 2 */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-50 overflow-hidden relative min-h-[140px] justify-end" style={styles.shadow}>
                        <Text className="absolute top-2 left-2 text-[60px] font-bold text-gray-100/50 leading-none">6</Text>
                        {/* Fake UI graphic */}
                        <View className="absolute top-0 right-4 w-40 h-20 bg-gray-50 border border-gray-100 rounded-b-lg items-center pt-2 shadow-sm">
                            <Text className="text-[#22C55E] font-bold text-[10px]">You're invited</Text>
                            <Ionicons name="person-circle" size={24} color="#D1D5DB" className="mt-1" />
                        </View>
                        <Text className="font-bold text-gray-900 text-[15px] leading-6 w-[60%]">Accept the email invite and follow yourself.</Text>
                    </View>

                    {/* Card 3 */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-50 overflow-hidden relative min-h-[140px] justify-end" style={styles.shadow}>
                        <Text className="absolute top-2 left-2 text-[60px] font-bold text-gray-100/50 leading-none">7</Text>
                        {/* Fake integration graphic */}
                        <View className="absolute top-4 right-4 flex-row items-center gap-2">
                            <View className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 items-center justify-center">
                                <View className="w-5 h-5 rounded-full border-4 border-[#22C55E] border-t-transparent -rotate-45" />
                            </View>
                            <View className="flex-row items-center opacity-30 gap-0.5">
                                <View className="w-1 h-1 bg-gray-400 rounded-full" /><View className="w-1 h-1 bg-gray-400 rounded-full" />
                            </View>
                            <View className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 items-center justify-center">
                                <View className="w-5 h-5 bg-gray-800 rounded flex-row">
                                    <View className="w-1/2 h-full bg-white rounded-r-md" />
                                </View>
                            </View>
                        </View>
                        <Text className="font-bold text-gray-900 text-[15px] leading-6 w-[70%]">Connect your Dexcom account with Bevel.</Text>
                    </View>
                </View>
            </ScrollView>

            <View className="flex-row items-center justify-between px-5 pb-6 pt-2 bg-[#F9FAFB]">
                <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100" style={styles.shadow}>
                    <Ionicons name="arrow-back" size={20} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/nutrition/cgm/dexcom-login')} className="bg-[#1A1A1A] px-6 py-3.5 rounded-full flex-row items-center gap-2 shadow-lg">
                    <Text className="text-white font-bold text-[15px]">Next</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });