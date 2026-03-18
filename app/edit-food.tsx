import { AddIngredientSheet } from '@/components/AddIngredientSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function EditFoodScreen() {
    const router = useRouter();
    const addIngredientRef = useRef<BottomSheetModal>(null);

    const INGREDIENTS = [
        { id: '1', name: 'Ground Black Pepper', amount: '100 g', icon: '🌶️' },
        { id: '2', name: 'Avocado', amount: '0.5 x 1 avocado', icon: '🥑', verified: true },
        { id: '3', name: 'Toast', amount: '1 slice', icon: '🍞', verified: true },
        { id: '4', name: 'Whole Fried Eggs', amount: '1 large', icon: '🍳', verified: true },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-2">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="chevron-back" size={24} color="#6B7280" />
                </TouchableOpacity>
                <Text className="font-bold text-gray-900 text-[15px]">Edit food details</Text>
                <TouchableOpacity className="border border-gray-200 p-2 rounded-xl shadow-sm bg-white">
                    <Ionicons name="star" size={16} color="#D1D5DB" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                {/* Title Section */}
                <View className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mb-4 shadow-sm">
                    <Text className="text-2xl">🥑</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-900">Avocado Toast with Fried Egg</Text>
                <Text className="text-gray-500 font-medium mb-8">Common</Text>

                {/* Nutrition Facts Header */}
                <View className="flex-row items-center gap-1 mb-4">
                    <Text className="font-bold text-gray-900 text-base">Nutrition Facts</Text>
                    <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
                </View>

                {/* Macro Nutrients Data Row */}
                <View className="flex-row items-center justify-between mb-8">
                    <MacroItem label="Fat" value="26.8g" pct="20%" color="#60A5FA" />
                    <MacroItem label="Carbs" value="85.1g" pct="64%" color="#FBBF24" />
                    <MacroItem label="Protein" value="20.7g" pct="16%" color="#F472B6" />

                    {/* Fake Ring Chart */}
                    <View className="w-20 h-20 rounded-full border-[6px] border-[#FBBF24] items-center justify-center relative">
                        {/* Overlay borders to fake segments */}
                        <View className="absolute inset-0 border-[6px] border-[#60A5FA] rounded-full border-b-transparent border-l-transparent -rotate-45" />
                        <View className="absolute inset-0 border-[6px] border-[#F472B6] rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-45" />

                        <Text className="font-bold text-xl text-gray-900 leading-6">577</Text>
                        <Text className="text-[10px] text-gray-500 font-medium -mt-1">kcal</Text>
                    </View>
                </View>

                {/* Portion Size */}
                <Text className="font-bold text-gray-900 text-base mb-3">Portion size</Text>
                <View className="flex-row items-center gap-3 mb-8">
                    <TouchableOpacity className="flex-1 border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
                        <Text className="font-semibold text-gray-900">1 serving</Text>
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-12 h-12 border border-gray-200 rounded-xl items-center justify-center bg-white shadow-sm">
                        <Ionicons name="remove" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-12 h-12 border border-gray-200 rounded-xl items-center justify-center bg-white shadow-sm">
                        <Ionicons name="add" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* Ingredients */}
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-bold text-gray-900 text-base">Ingredients</Text>
                    <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                        <Ionicons name="add" size={18} color="#4B5563" />
                    </TouchableOpacity>
                </View>
                <Text className="text-sm text-gray-400 mb-4 leading-5">The listed ingredient amounts are measured for a single serving.</Text>

                <View className="gap-3">
                    {INGREDIENTS.map(ing => (
                        <TouchableOpacity
                            key={ing.id}
                            onPress={() => router.push({ pathname: '/edit-ingredient', params: { name: ing.name } })}
                            className="flex-row items-center justify-between border border-gray-100 bg-white p-3 rounded-2xl shadow-sm"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                                    <Text>{ing.icon}</Text>
                                </View>
                                <View>
                                    <View className="flex-row items-center gap-1">
                                        <Text className="font-bold text-gray-900">{ing.name}</Text>
                                        {ing.verified && <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />}
                                    </View>
                                    <Text className="text-xs text-gray-500">{ing.amount}</Text>
                                </View>
                            </View>
                            <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}

                    {/* Add Custom Ingredient Trigger */}
                    <TouchableOpacity
                        onPress={() => addIngredientRef.current?.present()}
                        className="border border-dashed border-gray-300 bg-gray-50/50 p-4 rounded-2xl flex-row items-center justify-between mt-2">
                        <Text className="font-medium text-gray-500">Add ingredient</Text>
                        <Ionicons name="add" size={20} color="#4B5563" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer Fixed Buttons */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 gap-3 pt-4 pb-8">
                <TouchableOpacity className="bg-gray-100 py-4 rounded-full items-center">
                    <Text className="text-[#F87171] font-bold text-[15px]">Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg">
                    <Text className="text-white font-bold text-[15px]">Save</Text>
                </TouchableOpacity>
            </View>

            <AddIngredientSheet ref={addIngredientRef} />

        </SafeAreaView>
    );
}

// Sub Component
const MacroItem = ({ label, value, pct, color }: any) => (
    <View>
        <Text style={{ color }} className="font-medium text-[11px] mb-1">{label}</Text>
        <Text className="font-bold text-gray-900 text-lg">{value}</Text>
        <Text className="text-xs text-gray-400 mt-1">{pct}</Text>
    </View>
);