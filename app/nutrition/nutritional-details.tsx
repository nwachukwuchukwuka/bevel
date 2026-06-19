import { NutrientData, NutrientFocusSheet } from '@/components/nutrition/NutrientFocusSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                <View className="px-5 pt-6 pb-6 border-b border-[#1E293B] bg-[#151E33]">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-2xl font-bold text-slate-100">Nutritional Details</Text>
                            <Text className="text-sm text-slate-400 mt-1">14 September 2025</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center bg-[#090D16] rounded-xl px-4 h-12 border border-[#1E293B]">
                        <Ionicons name="search-outline" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Search..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 text-base text-slate-200 font-medium"
                        />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    <View className="px-5 mt-6 mb-8">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleRowClick({ id: 'cal', name: 'Calories', current: 699, target: 1892, unit: 'kcal', color: '#10B981', type: 'macro' })}
                            className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center"
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-emerald-950/30 rounded-xl border border-emerald-500/20 items-center justify-center">
                                    <Ionicons name="flame" size={20} color="#10B981" />
                                </View>
                                <Text className="text-lg font-bold text-slate-100">Calories</Text>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Text className="text-xl font-bold text-emerald-400">699 <Text className="text-xs text-slate-400">kcal</Text></Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5">
                        <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Micros & Macros</Text>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-6">
                            <NutrientRow
                                label="Total Fat" value="38,3g" isBold icon="water" iconColor="#4DB9F2"
                                onPress={() => handleRowClick({ id: 'fat', name: 'Fat', current: 38.3, target: 63.1, unit: 'g', color: '#4DB9F2', type: 'macro' })}
                            />
                            <NutrientRow label="Saturated Fat" value="10,2g" indent />
                            <NutrientRow label="Trans Fat" value="0g" indent />
                            <NutrientRow label="Polyunsaturated Fat" value="5,4g" indent />
                            <NutrientRow label="Monounsaturated Fat" value="14,9g" indent />
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-6">
                            <NutrientRow
                                label="Cholesterol" value="256,7mg" isBold icon="warning" iconColor="#F59E0B"
                                onPress={() => handleRowClick({ id: 'chol', name: 'Cholesterol', current: 256.7, target: 300, unit: 'mg', color: '#F59E0B', type: 'limit' })}
                            />
                            <NutrientRow label="Sodium" value="388,1mg" isBold icon="medical" iconColor="#A855F7" />
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-6">
                            <NutrientRow label="Total Carbohydrates" value="94,7g" isBold icon="leaf" iconColor="#F97316" />
                            <NutrientRow label="Dietary Fiber" value="32,7g" indent />
                            <NutrientRow label="Total Sugars" value="13,3g" indent />
                            <NutrientRow label="Added Sugars" value="0g" indent />
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                            <NutrientRow label="Protein" value="27g" isBold icon="fitness" iconColor="#EF4444" />
                            <NutrientRow label="Caffeine" value="16mg" isBold icon="cafe" iconColor="#8B5CF6" />
                            <NutrientRow label="Alcohol" value="0g" isBold icon="wine" iconColor="#EC4899" />
                        </View>
                    </View>

                </ScrollView>

                <NutrientFocusSheet ref={focusSheetRef} data={selectedNutrient} />

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

const NutrientRow = ({ label, value, indent, isBold, icon, iconColor, onPress }: any) => {
    const Component = onPress ? TouchableOpacity : View;
    return (
        <Component
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row justify-between items-center py-4 border-b border-[#1E293B] ${indent ? 'pl-16 pr-5' : 'px-5'}`}
        >
            <View className="flex-row items-center gap-3">
                {icon && !indent && (
                    <View className="w-8 h-8 rounded-lg bg-[#1E293B] items-center justify-center border border-[#2D3748]">
                        <Ionicons name={icon} size={14} color={iconColor} />
                    </View>
                )}
                <Text className={`text-base ${isBold ? 'font-bold text-slate-200' : 'font-medium text-slate-400'}`}>
                    {label}
                </Text>
            </View>

            <View className="flex-row items-center gap-3">
                <Text className={`text-sm ${isBold ? 'font-bold text-white' : 'font-medium text-slate-400'}`}>
                    {value}
                </Text>
                {onPress && <Ionicons name="chevron-forward" size={14} color="#94A3B8" />}
            </View>
        </Component>
    );
};