import { AddIngredientSheet } from '@/components/AddIngredientSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#1E293B] bg-[#151E33]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-lg font-bold text-slate-100">Edit food details</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="star-outline" size={18} color="#F59E0B" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                <View className="px-5 py-6 bg-[#151E33] border-b border-[#1E293B] flex-row items-center gap-4">
                    <View className="w-16 h-16 bg-[#1E293B] rounded-2xl items-center justify-center border border-[#2D3748]">
                        <Text className="text-3xl">🥑</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-white leading-6 mb-1">Avocado Toast with Fried Egg</Text>
                        <Text className="text-sm font-semibold text-[#4DB9F2]">Common</Text>
                    </View>
                </View>

                <View className="px-5 py-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="pie-chart-outline" size={18} color="#4DB9F2" />
                            <Text className="font-bold text-white text-base">Nutrition Facts</Text>
                        </View>
                        <Ionicons name="information-circle-outline" size={18} color="#94A3B8" />
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-5 mb-8 flex-row items-center justify-between">
                        <View className="w-24 h-24 rounded-full border-[8px] border-[#F59E0B] items-center justify-center relative">
                            <View className="absolute inset-0 border-[8px] border-[#4DB9F2] rounded-full border-b-transparent border-l-transparent -rotate-45" />
                            <View className="absolute inset-0 border-[8px] border-[#EF4444] rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-45" />

                            <Text className="font-bold text-2xl text-white">577</Text>
                            <Text className="text-xs text-slate-500 font-semibold -mt-1">kcal</Text>
                        </View>

                        <View className="flex-1 ml-6 gap-3">
                            <MacroItem label="Fat" value="26.8g" pct="20%" color="#4DB9F2" />
                            <MacroItem label="Carbs" value="85.1g" pct="64%" color="#F59E0B" />
                            <MacroItem label="Protein" value="20.7g" pct="16%" color="#EF4444" />
                        </View>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-8 flex-row items-center justify-between">
                        <View>
                            <Text className="text-xs font-semibold text-slate-400 mb-1">Portion size</Text>
                            <Text className="font-bold text-white text-lg">1 serving</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity className="w-10 h-10 border border-[#2D3748] rounded-xl items-center justify-center bg-[#1E293B]">
                                <Ionicons name="remove" size={18} color="#4DB9F2" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 h-10 border border-[#2D3748] rounded-xl items-center justify-center bg-[#1E293B]">
                                <Ionicons name="add" size={18} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="font-bold text-white text-base">Ingredients</Text>
                        <TouchableOpacity className="w-8 h-8 bg-[#1E293B] rounded-lg items-center justify-center border border-[#2D3748]">
                            <Ionicons name="add" size={16} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xs text-slate-500 mb-4 leading-5">The listed ingredient amounts are measured for a single serving.</Text>

                    <View className="gap-3">
                        {INGREDIENTS.map(ing => (
                            <TouchableOpacity
                                key={ing.id}
                                onPress={() => router.push({ pathname: '/edit-ingredient', params: { name: ing.name } })}
                                activeOpacity={0.8}
                                className="flex-row items-center justify-between border border-[#1E293B] bg-[#151E33] p-4 rounded-2xl"
                            >
                                <View className="flex-row items-center gap-4 flex-1">
                                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                        <Text className="text-xl">{ing.icon}</Text>
                                    </View>
                                    <View className="flex-1 pr-2">
                                        <View className="flex-row items-center gap-1.5 mb-1">
                                            <Text className="font-bold text-slate-100 text-sm" numberOfLines={1}>{ing.name}</Text>
                                            {ing.verified && <Ionicons name="shield-checkmark" size={14} color="#10B981" />}
                                        </View>
                                        <Text className="text-xs font-semibold text-slate-500">{ing.amount}</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            onPress={() => addIngredientRef.current?.present()}
                            activeOpacity={0.7}
                            className="border border-dashed border-[#4DB9F2] bg-[#151E33]/50 p-4 rounded-2xl flex-row items-center justify-center gap-2 mt-2"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="font-bold text-[#4DB9F2] text-sm">Add ingredient</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] border-t border-[#1E293B] p-5 pt-4 pb-8 flex-row gap-3">
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-1 bg-rose-950/20 border border-rose-500/20 py-4 rounded-2xl items-center justify-center"
                >
                    <Text className="text-rose-500 font-bold text-sm">Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-[2] bg-[#4DB9F2] border border-[#4DB9F2] py-4 rounded-2xl items-center justify-center"
                >
                    <Text className="text-[#090D16] font-bold text-base">Save configuration</Text>
                </TouchableOpacity>
            </View>

            <AddIngredientSheet ref={addIngredientRef} />

        </SafeAreaView>
    );
}

const MacroItem = ({ label, value, pct, color }: any) => (
    <View className="flex-row items-center justify-between w-full">
        <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <Text className="font-semibold text-slate-400 text-xs w-10">{label}</Text>
        </View>
        <Text className="font-bold text-white text-sm">{value}</Text>
        <View className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#2D3748] w-10 items-center">
            <Text className="text-[10px] font-bold" style={{ color }}>{pct}</Text>
        </View>
    </View>
);