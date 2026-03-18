import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppleHealthErrorScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
            <View className="w-full items-center pt-3 pb-8"><View className="w-10 h-1.5 bg-gray-300 rounded-full" /></View>

            <View className="flex-1 px-5">
                <View className="items-center mb-8">
                    <View className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mb-4 relative">
                        <View className="w-8 h-8 border-[3px] border-gray-300 rounded-lg" />
                        <View className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full p-1 border-2 border-white">
                            <Text className="text-[10px] text-white font-bold leading-none">x</Text>
                        </View>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 mb-2">Failed to read glucose data</Text>
                    <Text className="text-gray-500 text-sm">Please check the following:</Text>
                </View>

                {/* Steps */}
                <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100 overflow-hidden relative" style={styles.shadow}>
                    <Text className="text-5xl font-bold text-gray-100 absolute -left-2 top-2">1</Text>
                    <Text className="font-bold text-gray-900 text-base leading-6 mt-8 relative z-10 w-[60%]">Make sure your CGM is attached and functioning properly.</Text>
                    {/* Mock Image graphic on right */}
                    <View className="absolute -right-10 top-0 w-32 h-32 bg-gray-50 rounded-full opacity-50" />
                </View>

                <View className="bg-white rounded-3xl p-5 mb-8 border border-gray-100 overflow-hidden relative" style={styles.shadow}>
                    <Text className="text-5xl font-bold text-gray-100 absolute -left-2 top-2">2</Text>

                    {/* Mock Settings Toggle Graphic */}
                    <View className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex-row items-center justify-between mb-4 relative z-10 mx-4 mt-2">
                        <View className="flex-row items-center gap-2"><Text>📈</Text><Text className="font-bold text-xs">Blood Glucose</Text></View>
                        <View className="w-10 h-5 bg-[#22C55E] rounded-full justify-center px-0.5"><View className="w-4 h-4 bg-white rounded-full translate-x-5" /></View>
                    </View>

                    <Text className="font-bold text-gray-900 text-base leading-6 relative z-10 w-[80%]">Go to Settings and enable blood glucose sharing in Health.</Text>
                </View>
            </View>

            <View className="px-5 pb-8">
                <TouchableOpacity onPress={() => router.push('/nutrition/cgm/manage')} className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg mb-4">
                    <Text className="text-white font-bold text-base">Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} className="py-2 items-center">
                    <Text className="font-bold text-gray-500">Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });