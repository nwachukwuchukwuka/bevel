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
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            {/* Header / Title Area Left Aligned Rule */}
            <View className="flex-row items-start justify-between px-5 pt-6 pb-6">
                <View className="flex-row items-center flex-1">
                    <View className="w-14 h-14 bg-[#1E293B] border border-[#2D3748] rounded-[16px] items-center justify-center mr-4">
                        <Text className="text-[28px]">🥗</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Caprese Salad</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[13px] font-medium text-[#4DB9F2]">Add recipe</Text>
                            <View className="w-[4px] h-[4px] rounded-full bg-slate-600" />
                            <Text className="text-[13px] font-medium text-slate-400">Edit Name</Text>
                            <Ionicons name="pencil" size={12} color="#94A3B8" />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => router.dismissAll()}
                    className="w-10 h-10 bg-rose-950/20 border border-rose-500/30 rounded-[12px] items-center justify-center ml-2 mt-1"
                >
                    <Ionicons name="trash" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

                {/* Serving Data Grid */}
                <View className="flex-row gap-3 mb-2">
                    <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4">
                        <Text className="text-slate-500 text-[12px] font-semibold mb-3">Serving Quantity</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-slate-100 text-[20px] font-bold">4</Text>
                            <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                        </View>
                    </View>
                    <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4">
                        <Text className="text-slate-500 text-[12px] font-semibold mb-3">Total Amount</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-slate-100 text-[20px] font-bold">
                                640,89 <Text className="text-[14px] font-medium text-slate-500">g</Text>
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                        </View>
                    </View>
                </View>
                <Text className="text-slate-400 text-[13px] font-medium mb-8 px-2">
                    This recipe is <Text className="font-bold text-slate-200">160,22 g</Text> per serving
                </Text>

                {/* Nutritional Information (Segmented Bar Design) */}
                <View className="mb-10">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="font-bold text-slate-100 text-[18px]">Nutritional Information</Text>
                        <View className="w-8 h-8 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center">
                            <Ionicons name="information" size={16} color="#94A3B8" />
                        </View>
                    </View>
                    <Text className="text-slate-500 text-[13px] mb-4 font-medium">1 serving</Text>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5">
                        <View className="flex-row items-end gap-1 mb-5">
                            <Text className="text-[48px] font-bold text-slate-100 leading-[52px]">228</Text>
                            <Text className="text-slate-500 font-medium text-[15px] mb-1">kcal</Text>
                        </View>

                        {/* Flat segmented horizontal bar replacing donut chart */}
                        <View className="flex-row h-2 w-full mb-6 rounded-full overflow-hidden">
                            <View className="bg-blue-500 h-full flex-[47]" />
                            <View className="bg-[#090D16] w-1 h-full" />
                            <View className="bg-amber-500 h-full flex-[22]" />
                            <View className="bg-[#090D16] w-1 h-full" />
                            <View className="bg-rose-500 h-full flex-[30]" />
                        </View>

                        {/* Breakdown */}
                        <View className="gap-2">
                            <View className="flex-row justify-between items-center bg-[#090D16] px-4 py-3 rounded-[16px] border border-[#1E293B]">
                                <View className="flex-row items-center gap-2.5">
                                    <View className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                                    <Text className="text-slate-300 font-semibold text-[13px]">
                                        Fat <Text className="text-slate-500 font-normal ml-1">47%</Text>
                                    </Text>
                                </View>
                                <Text className="font-bold text-slate-100 text-[14px]">17g</Text>
                            </View>

                            <View className="flex-row justify-between items-center bg-[#090D16] px-4 py-3 rounded-[16px] border border-[#1E293B]">
                                <View className="flex-row items-center gap-2.5">
                                    <View className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                                    <Text className="text-slate-300 font-semibold text-[13px]">
                                        Carbs <Text className="text-slate-500 font-normal ml-1">22%</Text>
                                    </Text>
                                </View>
                                <Text className="font-bold text-slate-100 text-[14px]">8,1g</Text>
                            </View>

                            <View className="flex-row justify-between items-center bg-[#090D16] px-4 py-3 rounded-[16px] border border-[#1E293B]">
                                <View className="flex-row items-center gap-2.5">
                                    <View className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                                    <Text className="text-slate-300 font-semibold text-[13px]">
                                        Protein <Text className="text-slate-500 font-normal ml-1">30%</Text>
                                    </Text>
                                </View>
                                <Text className="font-bold text-slate-100 text-[14px]">10,9g</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Ingredients List */}
                <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="font-bold text-slate-100 text-[18px]">Ingredients</Text>
                        <TouchableOpacity className="w-8 h-8 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center">
                            <Ionicons name="add" size={16} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-slate-500 text-[13px] font-medium leading-5 mb-5 pr-4">
                        The listed ingredient amounts are measured for the entire recipe.
                    </Text>

                    <View className="gap-3">
                        {INGREDIENTS.map((ing, i) => (
                            <View
                                key={i}
                                className="flex-row items-center justify-between bg-[#151E33] border border-[#1E293B] p-4 rounded-[20px]"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                        <Text className="text-[20px]">{ing.icon}</Text>
                                    </View>
                                    <View>
                                        <View className="flex-row items-center gap-1.5 mb-1">
                                            <Text className="font-bold text-slate-100 text-[15px]">{ing.name}</Text>
                                            <Ionicons name="checkmark-circle" size={14} color="#4DB9F2" />
                                        </View>
                                        <Text className="text-slate-400 text-[13px] font-medium">{ing.detail}</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#64748B" />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Hard Boxed Footer Area */}
            <View className="absolute bottom-0 w-full bg-[#090D16] px-5 pt-4 pb-8 flex-row gap-3">
                <TouchableOpacity className="bg-[#1E293B] border border-[#2D3748] py-4 rounded-[16px] items-center flex-1">
                    <Text className="text-slate-100 font-bold text-[16px]">Redo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.dismissAll()}
                    className="bg-[#4DB9F2] border border-[#4DB9F2] py-4 rounded-[16px] items-center flex-[2]"
                >
                    <Text className="text-[#090D16] font-bold text-[16px]">Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}