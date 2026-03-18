import { NutrientData, NutrientFocusSheet } from '@/components/nutrition/NutrientFocusSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NutritionalDetailsScreen() {
    const router = useRouter();
    const focusSheetRef = useRef<BottomSheetModal>(null);
    const [selectedNutrient, setSelectedNutrient] = useState<NutrientData | null>(null);

    const handleRowClick = (data: NutrientData) => {
        setSelectedNutrient(data);
        focusSheetRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>

                {/* Header Container */}
                <View className="bg-[#F9FAFB] pb-2 z-10 px-5 pt-2">
                    <View className="w-full items-center pb-4">
                        <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
                    </View>

                    <View className="flex-row items-center justify-between mb-4">
                        <View>
                            <Text className="font-bold text-gray-900 text-2xl mb-0.5">Nutritional Details</Text>
                            <Text className="text-gray-400 font-medium text-sm">14 September 2025</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-white border border-gray-200 rounded-lg items-center justify-center shadow-sm">
                            <Ionicons name="close" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center mb-2">
                        <Ionicons name="search" size={18} color="#9CA3AF" />
                        <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-[15px]" />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>

                    <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50" style={styles.shadow}>

                        {/* Calories Main Row */}
                        <TouchableOpacity
                            onPress={() => handleRowClick({ id: 'cal', name: 'Calories', current: 699, target: 1892, unit: 'kcal', color: '#D1D5DB', type: 'macro' })}
                            className="flex-row justify-between items-center pb-4 border-b border-gray-100 mb-2"
                        >
                            <Text className="font-bold text-gray-900 text-lg">Calories</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="font-bold text-gray-900 text-lg">699 kcal</Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>

                        {/* List Items */}
                        <View className="gap-0">
                            {/* We add onPress to specific ones to match your screenshots */}
                            <NutrientRow
                                label="Total Fat" value="38,3g" isBold
                                onPress={() => handleRowClick({ id: 'fat', name: 'Fat', current: 38.3, target: 63.1, unit: 'g', color: '#60A5FA', type: 'macro' })}
                            />
                            <NutrientRow label="Saturated Fat" value="10,2g" indent />
                            <NutrientRow label="Trans Fat" value="0g" indent />
                            <NutrientRow label="Polyunsaturated Fat" value="5,4g" indent />
                            <NutrientRow label="Monounsaturated Fat" value="14,9g" indent />

                            <NutrientRow
                                label="Cholesterol" value="256,7mg" isBold
                                onPress={() => handleRowClick({ id: 'chol', name: 'Cholesterol', current: 256.7, target: 300, unit: 'mg', color: '#F97316', type: 'limit' })}
                            />
                            <NutrientRow label="Sodium" value="388,1mg" isBold />

                            <NutrientRow label="Total Carbohydrates" value="94,7g" isBold />
                            <NutrientRow label="Dietary Fiber" value="32,7g" indent />
                            <NutrientRow label="Total Sugars" value="13,3g" indent />
                            <NutrientRow label="Added Sugars" value="0g" indent />

                            <NutrientRow label="Protein" value="27g" isBold />
                            <NutrientRow label="Caffeine" value="16mg" isBold />
                            <NutrientRow label="Alcohol" value="0g" isBold />
                        </View>

                    </View>

                </ScrollView>

                {/* Bottom Sheet Overlay */}
                <NutrientFocusSheet ref={focusSheetRef} data={selectedNutrient} />

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

// Reusable List Row Component
const NutrientRow = ({ label, value, indent, isBold, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        className={`flex-row justify-between items-center py-3.5 border-b border-gray-50 ${indent ? 'pl-4' : ''}`}
    >
        <Text className={`text-[15px] ${isBold ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>{label}</Text>
        <View className="flex-row items-center gap-2">
            <Text className={`text-[14px] ${isBold ? 'font-bold text-gray-800' : 'font-medium text-gray-500'}`}>{value}</Text>
            <Ionicons name="chevron-forward" size={14} color="#D1D5DB" />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });