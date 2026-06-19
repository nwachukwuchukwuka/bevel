import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                {/* Modal Drag Handle Mock */}
                <View className="w-full items-center pt-4 pb-2">
                    <View className="w-12 h-1.5 bg-[#1E2D4A] rounded-full" />
                </View>

                {/* Header */}
                <View className="items-center pb-6 pt-2">
                    <Text className="font-bold text-[#F1F5F9] text-[16px]">Target Nutrients</Text>
                </View>

                {/* Tabs */}
                <View className="mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-12" contentContainerStyle={{ paddingHorizontal: 24 }}>
                        {['All', 'Core', 'Fats', 'Minerals', 'Vitamins', 'Other'].map(tab => {
                            const isSelected = tab === 'Core';
                            return (
                                <TouchableOpacity 
                                    key={tab} 
                                    className={`px-5 py-2.5 mr-3 rounded-full border ${isSelected ? 'bg-[#15233A] border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                                >
                                    <Text className={`font-bold text-[13px] ${isSelected ? 'text-[#4DB9F2]' : 'text-[#64748B]'}`}>{tab}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* List Content */}
                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    {NUTRIENTS.map(item => {
                        const isEnabled = enabledItems.includes(item.id);
                        return (
                            <View key={item.id} className="flex-row items-center justify-between p-4 mb-4 bg-[#151E33] border border-[#1E2D4A] rounded-[24px]">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-14 h-14 bg-[#0F172A] border border-[#1E2D4A] rounded-[16px] items-center justify-center">
                                        <Text className="text-[22px]">{item.icon}</Text>
                                    </View>
                                    <Text className="font-bold text-[#F1F5F9] text-[15px]">{item.name}</Text>
                                </View>
                                <View className="flex-row items-center gap-3">
                                    <TouchableOpacity
                                        onPress={() => openSettings(item.name)}
                                        className="w-10 h-10 bg-[#0F172A] rounded-[12px] items-center justify-center border border-[#1E2D4A]"
                                    >
                                        <Ionicons name="settings-outline" size={18} color="#94A3B8" />
                                    </TouchableOpacity>

                                    {/* Custom Toggle Switch */}
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => toggleNutrient(item.id)}
                                        className={`w-14 h-8 rounded-full flex-row items-center px-1 border ${isEnabled ? 'bg-[#15233A] border-[#4DB9F2] justify-end' : 'bg-[#0F172A] border-[#1E2D4A] justify-start'}`}
                                    >
                                        <View className={`w-6 h-6 rounded-full items-center justify-center ${isEnabled ? 'bg-[#4DB9F2]' : 'bg-[#1E2D4A]'}`}>
                                            {isEnabled && <Ionicons name="checkmark" size={12} color="#090D16" />}
                                        </View>
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
                            opacity={0.6}
                        />
                    )}
                    handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
                    backgroundStyle={{ backgroundColor: '#090D16' }}
                    enableDynamicSizing={false}
                    stackBehavior='push'
                >
                    <BottomSheetView className="flex-1 px-6 pt-4">
                        {/* Sheet Header */}
                        <View className="flex-row justify-between items-center mb-8">
                            <Text className="font-bold text-[#F1F5F9] text-[20px]">{activeNutrient}</Text>
                            <TouchableOpacity onPress={() => settingsSheetRef.current?.dismiss()} className="w-8 h-8 bg-[#151E33] border border-[#1E2D4A] rounded-full items-center justify-center">
                                <Ionicons name="close" size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-4 mb-8">
                            <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-5 flex-row justify-between items-center">
                                <View>
                                    <Text className="font-bold text-[#F1F5F9] text-[15px] mb-1">Daily Target</Text>
                                    <Text className="text-[#64748B] font-medium text-[12px]">Aim to meet or exceed</Text>
                                </View>
                                <View className="flex-row items-center gap-3">
                                    <Text className="text-[#4DB9F2] font-bold text-[15px]">20g</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#4DB9F2" />
                                </View>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-5 flex-row justify-between items-center">
                                <View>
                                    <Text className="font-bold text-[#F1F5F9] text-[15px] mb-1">Quick Add Amount</Text>
                                    <Text className="text-[#64748B] font-medium text-[12px]">Set default add amount</Text>
                                </View>
                                <View className="flex-row items-center gap-3">
                                    <Text className="text-[#4DB9F2] font-bold text-[15px]">5g</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#4DB9F2" />
                                </View>
                            </View>
                        </View>

                        <View className="items-center mb-6">
                            <Text className="text-[#64748B] text-[12px] font-medium">Recommended <Text className="font-bold text-[#F1F5F9]">25g</Text> daily</Text>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={() => settingsSheetRef.current?.dismiss()}
                            className="bg-[#4DB9F2] py-4 rounded-[16px] items-center"
                        >
                            <Text className="text-[#090D16] font-bold text-[15px]">Save</Text>
                        </TouchableOpacity>

                    </BottomSheetView>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}