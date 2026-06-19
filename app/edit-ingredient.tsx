import { EditFoodSheet } from '@/components/EditFoodSheet';
import { UnitInputModal } from '@/components/UnitInputModal';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditIngredientScreen() {
    const router = useRouter();
    const editFoodSheetRef = useRef<BottomSheetModal>(null);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [amount, setAmount] = useState('100');
    const [unit, setUnit] = useState('g');

    const baseKcalPerGram = 2.51;
    const currentKcal = Math.round(parseFloat(amount || '0') * baseKcalPerGram);

    return (
        <BottomSheetModalProvider>
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
                        <Text className="text-lg font-bold text-slate-100">Edit Ingredient</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="star-outline" size={18} color="#F59E0B" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-5 pt-8">

                    <View className="flex-row items-center gap-4 mb-8">
                        <View className="w-16 h-16 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center">
                            <Text className="text-3xl">🌶️</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-white leading-7 mb-1">Ground Black Pepper</Text>
                            <Text className="text-sm font-semibold text-[#4DB9F2]">My Foods Database</Text>
                        </View>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-5 mb-8">
                        <View className="flex-row items-center justify-between mb-6 border-b border-[#1E293B] pb-4">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="pie-chart-outline" size={18} color="#4DB9F2" />
                                <Text className="font-bold text-white text-base">Nutrition Facts</Text>
                            </View>
                            <Ionicons name="information-circle-outline" size={18} color="#94A3B8" />
                        </View>

                        <View className="flex-row items-center justify-between">
                            <View className="w-24 h-24 rounded-full border-[8px] border-[#F59E0B] items-center justify-center relative">
                                <View className="absolute inset-0 border-[8px] border-[#4DB9F2] rounded-full border-b-transparent border-l-transparent -rotate-45" />
                                <View className="absolute inset-0 border-[8px] border-[#EF4444] rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-[60deg]" />

                                <Text className="font-bold text-2xl text-white">{currentKcal}</Text>
                                <Text className="text-[10px] text-slate-500 font-semibold -mt-1">kcal</Text>
                            </View>

                            <View className="flex-1 ml-6 gap-3">
                                <View className="bg-[#1E293B40] border border-[#1E293B] p-2 rounded-xl flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-2 h-2 rounded-full bg-[#4DB9F2]" />
                                        <Text className="text-xs font-semibold text-slate-300">Fat</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-white">3.3g <Text className="text-[10px] text-[#4DB9F2] ml-1">4%</Text></Text>
                                </View>
                                <View className="bg-[#1E293B40] border border-[#1E293B] p-2 rounded-xl flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                        <Text className="text-xs font-semibold text-slate-300">Carbs</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-white">64g <Text className="text-[10px] text-[#F59E0B] ml-1">82%</Text></Text>
                                </View>
                                <View className="bg-[#1E293B40] border border-[#1E293B] p-2 rounded-xl flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-2 h-2 rounded-full bg-[#EF4444]" />
                                        <Text className="text-xs font-semibold text-slate-300">Protein</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-white">10.4g <Text className="text-[10px] text-[#EF4444] ml-1">13%</Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-bold text-white text-base">Amount</Text>
                            <View className="bg-[#1E293B] px-2 py-1 rounded border border-[#2D3748]">
                                <Text className="text-[10px] text-slate-400 font-semibold">100 g per 100 g</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center gap-4">
                            <TouchableOpacity
                                onPress={() => setKeyboardVisible(true)}
                                activeOpacity={0.8}
                                className="flex-1 border border-[#1E293B] rounded-xl px-4 py-3.5 flex-row justify-between items-center bg-[#090D16]"
                            >
                                <Text className="font-bold text-white text-base">{amount} {unit}</Text>
                                <Ionicons name="chevron-down" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                            <View className="flex-row gap-2">
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    className="w-12 h-12 border border-[#2D3748] rounded-xl items-center justify-center bg-[#1E293B]"
                                >
                                    <Ionicons name="remove" size={20} color="#4DB9F2" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    className="w-12 h-12 border border-[#2D3748] rounded-xl items-center justify-center bg-[#1E293B]"
                                >
                                    <Ionicons name="add" size={20} color="#4DB9F2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="bg-[#090D16] border-t border-[#1E293B] p-5 pt-4 pb-8 flex-col gap-3">
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-rose-950/20 border border-rose-500/20 py-3.5 rounded-2xl items-center flex-1"
                        >
                            <Text className="text-rose-500 font-bold text-sm">Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => editFoodSheetRef.current?.present()}
                            activeOpacity={0.8}
                            className="bg-[#1E293B] border border-[#2D3748] py-3.5 rounded-2xl items-center flex-1"
                        >
                            <Text className="text-white font-bold text-sm">Modify Data</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] py-4 rounded-2xl items-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save configuration</Text>
                    </TouchableOpacity>
                </View>

                <UnitInputModal
                    isVisible={isKeyboardVisible}
                    initialValue={amount}
                    initialUnit={unit}
                    availableUnits={['100 g', 'g', 'oz', 'lb']}
                    onClose={() => setKeyboardVisible(false)}
                    onSave={(newAmt, newUnit) => {
                        setAmount(newAmt);
                        setUnit(newUnit);
                    }}
                />

                <EditFoodSheet ref={editFoodSheetRef} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}