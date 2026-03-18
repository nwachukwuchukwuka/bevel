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


    // State for Keyboard & Value
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [amount, setAmount] = useState('100');
    const [unit, setUnit] = useState('g');

    // Dynamic Kcal calculation (Simulated base on amount)
    const baseKcalPerGram = 2.51;
    const currentKcal = Math.round(parseFloat(amount || '0') * baseKcalPerGram);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-2">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <Ionicons name="chevron-back" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-[15px]">Edit Ingredient</Text>
                    <TouchableOpacity className="border border-gray-200 p-2 rounded-xl bg-white shadow-sm">
                        <Ionicons name="star" size={16} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>

                <View className="p-5 flex-1">
                    <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100 mb-4 shadow-sm">
                        <Text className="text-xl">🌶️</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">Ground Black Pepper</Text>
                    <Text className="text-gray-500 font-medium mb-8">My Foods</Text>

                    <View className="flex-row items-center gap-1 mb-4">
                        <Text className="font-bold text-gray-900 text-base">Nutrition Facts</Text>
                        <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
                    </View>

                    {/* Macros & Chart */}
                    <View className="flex-row items-center justify-between mb-10">
                        <View>
                            <Text className="text-[#60A5FA] font-medium text-[11px] mb-1">Fat</Text>
                            <Text className="font-bold text-gray-900 text-base">3.3g</Text>
                            <Text className="text-[10px] text-gray-400 mt-1">4%</Text>
                        </View>
                        <View>
                            <Text className="text-[#FBBF24] font-medium text-[11px] mb-1">Carbs</Text>
                            <Text className="font-bold text-gray-900 text-base">64g</Text>
                            <Text className="text-[10px] text-gray-400 mt-1">82%</Text>
                        </View>
                        <View>
                            <Text className="text-[#F472B6] font-medium text-[11px] mb-1">Protein</Text>
                            <Text className="font-bold text-gray-900 text-base">10.4g</Text>
                            <Text className="text-[10px] text-gray-400 mt-1">13%</Text>
                        </View>

                        <View className="w-20 h-20 rounded-full border-[6px] border-[#FBBF24] items-center justify-center relative">
                            <View className="absolute inset-0 border-[6px] border-[#60A5FA] rounded-full border-b-transparent border-l-transparent -rotate-45" />
                            <View className="absolute inset-0 border-[6px] border-[#F472B6] rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-[60deg]" />

                            {/* Dynamic Kcal text */}
                            <Text className="font-bold text-xl text-gray-900 leading-6">{currentKcal}</Text>
                            <Text className="text-[10px] text-gray-500 font-medium -mt-1">kcal</Text>
                        </View>
                    </View>

                    {/* Interactive Amount Section */}
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="font-bold text-gray-900 text-base">Amount</Text>
                        <Text className="text-xs text-gray-400">100 g per 100 g</Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => setKeyboardVisible(true)}
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3.5 flex-row justify-between items-center bg-white shadow-sm"
                        >
                            <Text className="font-semibold text-gray-900 text-[15px]">{amount} {unit}</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-[50px] border border-gray-200 rounded-xl items-center justify-center bg-white shadow-sm">
                            <Ionicons name="remove" size={20} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-[50px] border border-gray-200 rounded-xl items-center justify-center bg-white shadow-sm">
                            <Ionicons name="add" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer Fixed Buttons */}
                <View className="bg-white p-5 gap-3 pt-4 pb-8">
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="bg-gray-100 py-3.5 rounded-full items-center flex-1">
                            <Text className="text-[#F87171] font-bold text-[15px]">Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => editFoodSheetRef.current?.present()} // Trigger the modal
                            className="bg-gray-100 py-3.5 rounded-full items-center flex-1"
                        >
                            <Text className="text-gray-700 font-bold text-[15px]">Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => router.back()} className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg">
                        <Text className="text-white font-bold text-[15px]">Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Custom Keyboard Modal Overlay */}
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