import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const NUTRIENTS = [
    { id: '1', name: 'Added Sugars', icon: '🍬', defaultEnabled: true },
    { id: '2', name: 'Cholesterol', icon: '🍳', defaultEnabled: true },
    { id: '3', name: 'Fiber', icon: '🥦', defaultEnabled: true },
    { id: '4', name: 'Sodium', icon: '🧂', defaultEnabled: false },
    { id: '5', name: 'Sugar', icon: '🍯', defaultEnabled: false },
];

export default function NutrientSetupScreen() {
    const router = useRouter();
    const settingsSheetRef = useRef<BottomSheetModal>(null);

    const [enabledItems, setEnabledItems] = useState<string[]>(['1', '2', '3']);
    const [activeNutrient, setActiveNutrient] = useState<string | null>(null);

    const toggleNutrient = (id: string) => {
        setEnabledItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const openSettings = (name: string) => {
        setActiveNutrient(name);
        settingsSheetRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>

                {/* Modal Drag Handle Mock */}
                <View className="w-full items-center pt-3 pb-2"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

                {/* Header */}
                <View className="items-center pb-4 border-b border-gray-100">
                    <Text className="font-semibold text-gray-700 text-[15px]">Target Nutrients</Text>
                </View>

                {/* Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-100 max-h-12" contentContainerStyle={{ paddingHorizontal: 10 }}>
                    {['All', 'Core', 'Fats', 'Minerals', 'Vitamins', 'Other'].map(tab => (
                        <TouchableOpacity key={tab} className={`px-4 py-3 border-b-2 ${tab === 'Core' ? 'border-gray-900' : 'border-transparent'}`}>
                            <Text className={`font-bold text-[13px] ${tab === 'Core' ? 'text-gray-900' : 'text-gray-400'}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* List Content */}
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                    {NUTRIENTS.map(item => {
                        const isEnabled = enabledItems.includes(item.id);
                        return (
                            <View key={item.id} className="flex-row items-center justify-between mb-6">
                                <View className="flex-row items-center gap-3">
                                    <Text className="text-xl">{item.icon}</Text>
                                    <Text className="font-bold text-gray-900 text-[15px]">{item.name}</Text>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity
                                        onPress={() => openSettings(item.name)}
                                        className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center border border-gray-200"
                                    >
                                        <Ionicons name="settings-sharp" size={14} color="#6B7280" />
                                    </TouchableOpacity>

                                    {/* Custom Toggle Switch */}
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => toggleNutrient(item.id)}
                                        className={`w-[50px] h-[30px] rounded-full justify-center px-1 ${isEnabled ? 'bg-[#22C55E]' : 'bg-gray-200'}`}
                                    >
                                        <View className={`w-6 h-6 bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-5 shadow-sm' : 'translate-x-0'}`} style={styles.shadow} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Settings Bottom Sheet */}
                <BottomSheetModal
                    ref={settingsSheetRef}
                    snapPoints={['55%']}
                    backdropComponent={p => (
                        <BottomSheetBackdrop
                            {...p}
                            disappearsOnIndex={-1}
                            appearsOnIndex={0}
                            opacity={0.4}
                        />
                    )}
                    handleIndicatorStyle={{ display: 'none' }}
                    backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
                    enableDynamicSizing={false}
                    stackBehavior='push'
                >
                    <BottomSheetView className="flex-1 pt-2">
                        {/* Sheet Header */}
                        <View className="flex-row justify-between items-center px-5 mb-6">
                            <TouchableOpacity onPress={() => settingsSheetRef.current?.dismiss()}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                            <Text className="font-semibold text-gray-700 text-[15px]">{activeNutrient}</Text>
                            <View className="w-6" />
                        </View>

                        <View className="px-5 gap-3 mb-8">
                            <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center" style={styles.shadow}>
                                <View>
                                    <Text className="font-bold text-gray-900 text-[15px]">Daily Target</Text>
                                    <Text className="text-gray-400 text-xs">Aim to meet or exceed</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-gray-700 font-medium">20g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                                </View>
                            </View>

                            <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center" style={styles.shadow}>
                                <View>
                                    <Text className="font-bold text-gray-900 text-[15px]">Quick Add Amount</Text>
                                    <Text className="text-gray-400 text-xs">Set default add amount</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-gray-700 font-medium">5g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                                </View>
                            </View>
                        </View>

                        <Text className="text-center text-gray-500 text-xs font-medium mb-4">Recommended <Text className="font-bold text-gray-900">25g</Text> daily</Text>

                        {/* Save Button */}
                        <View className="px-5">
                            <TouchableOpacity
                                onPress={() => settingsSheetRef.current?.dismiss()}
                                className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg"
                            >
                                <Text className="text-white font-bold text-base">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    }
});