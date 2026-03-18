import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INGREDIENTS = [
    { name: 'Tomatoes', detail: '2 x 1 large whole', icon: '🍅' },
    { name: 'Mozzarella Cheese Fresh', detail: '8 x 1 serving', icon: '🧀' },
    { name: 'Fresh Basil', detail: '0.25 cups', icon: '🌿' },
    { name: 'Extra Virgin Olive Oil', detail: '2 tbsp', icon: '🫒' },
];

export default function RecipeDetailsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50">
                <TouchableOpacity onPress={() => router.dismissAll()} className="w-8 h-8 bg-orange-50 rounded-full items-center justify-center">
                    <Ionicons name="trash-outline" size={16} color="#EA580C" />
                </TouchableOpacity>
                <Text className="font-semibold text-gray-500 text-[13px]">Add recipe</Text>
                <View className="w-8" />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>

                {/* Title Section */}
                <View className="items-center mb-8 relative">
                    <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center border border-gray-100 mb-4 shadow-sm">
                        <Text className="text-4xl">🥗</Text>
                    </View>
                    <View className="absolute top-14 ml-12 bg-gray-200 w-6 h-6 rounded-full items-center justify-center border border-white shadow-sm">
                        <Ionicons name="pencil" size={12} color="#4B5563" />
                    </View>

                    <Text className="text-2xl font-bold text-gray-900 mb-1">Caprese Salad</Text>
                    <Text className="text-gray-400 text-sm font-medium">Edit Name</Text>
                </View>

                {/* Serving Inputs */}
                <View className="flex-row gap-4 mb-3">
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-gray-500 mb-2">Serving Quantity</Text>
                        <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
                            <Text className="font-semibold text-gray-900 text-[15px]">4</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-gray-500 mb-2">Total Amount</Text>
                        <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
                            <Text className="font-semibold text-gray-900 text-[15px]">640,89 g</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </View>
                    </View>
                </View>
                <Text className="text-center text-gray-400 text-xs mb-8">This recipe is <Text className="font-bold text-gray-700">160,22 g</Text> per serving</Text>

                {/* Nutritional Info */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="font-bold text-gray-900 text-[15px]">Nutritional Information</Text>
                    <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
                </View>
                <Text className="text-gray-400 text-xs mb-4">1 serving</Text>

                <View className="flex-row items-center mb-8">
                    {/* Ring Mock */}
                    <View className="w-24 h-24 rounded-full border-[8px] border-yellow-400 items-center justify-center relative mr-8">
                        <View className="absolute inset-0 border-[8px] border-blue-400 rounded-full border-b-transparent border-l-transparent -rotate-45" />
                        <View className="absolute inset-0 border-[8px] border-pink-400 rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-45" />
                        <Text className="font-bold text-2xl text-gray-900 leading-6 mt-1">228</Text>
                        <Text className="text-[10px] text-gray-500 font-medium">kcal</Text>
                    </View>

                    <View className="flex-1 gap-2">
                        <View className="flex-row justify-between"><Text className="text-blue-400 font-semibold text-xs">Fat <Text className="text-gray-400 font-normal">47%</Text></Text><Text className="font-bold text-gray-900 text-sm">17g</Text></View>
                        <View className="flex-row justify-between"><Text className="text-yellow-400 font-semibold text-xs">Carbs <Text className="text-gray-400 font-normal">22%</Text></Text><Text className="font-bold text-gray-900 text-sm">8,1g</Text></View>
                        <View className="flex-row justify-between"><Text className="text-pink-400 font-semibold text-xs">Protein <Text className="text-gray-400 font-normal">30%</Text></Text><Text className="font-bold text-gray-900 text-sm">10,9g</Text></View>
                    </View>
                </View>

                {/* Ingredients List */}
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-bold text-gray-900 text-[15px]">Ingredients</Text>
                    <TouchableOpacity className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center"><Ionicons name="add" size={16} color="#4B5563" /></TouchableOpacity>
                </View>
                <Text className="text-gray-400 text-xs mb-4 leading-4 pr-10">The listed ingredient amounts are measured for the entire recipe.</Text>

                <View className="gap-3">
                    {INGREDIENTS.map((ing, i) => (
                        <View key={i} className="flex-row items-center justify-between bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center"><Text>{ing.icon}</Text></View>
                                <View>
                                    <View className="flex-row items-center gap-1">
                                        <Text className="font-bold text-gray-900">{ing.name}</Text>
                                        <Ionicons name="checkmark-circle" size={12} color="#3B82F6" />
                                    </View>
                                    <Text className="text-gray-400 text-xs">{ing.detail}</Text>
                                </View>
                            </View>
                            <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Footer Buttons */}
            <View className="absolute bottom-0 w-full bg-white px-5 pt-4 pb-8 border-t border-white flex-row gap-3">
                <TouchableOpacity className="bg-gray-100 py-4 rounded-full items-center flex-1">
                    <Text className="text-gray-900 font-bold text-base">Redo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.dismissAll()} className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg flex-[2]">
                    <Text className="text-white font-bold text-base">Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}