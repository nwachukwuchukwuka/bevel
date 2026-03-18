import { LogSummarySheet } from '@/components/LogSummarySheet';
import { ServingInputModal } from '@/components/ServingInputModal';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Data Types ---
type FoodItem = {
    id: string;
    title: string;
    subtitle: string;
    servingSize: string;
    unit: string;
    calories: number;
    emoji: string;
    verified?: boolean;
};

// --- Initial Data ---
const INITIAL_FOODS: FoodItem[] = [
    {
        id: '1',
        title: "Avocado Toast with Fried Egg",
        subtitle: "Common • 577 kcal",
        servingSize: "1",
        unit: "serving",
        calories: 577,
        emoji: "🥑"
    },
    {
        id: '2',
        title: "Coffee Latte",
        subtitle: "Common • 122 kcal",
        servingSize: "236,59",
        unit: "mL",
        calories: 122,
        emoji: "☕️",
        verified: true
    }
];

export default function LogFoodModal() {
    const router = useRouter();
    const summarySheetRef = useRef<BottomSheetModal>(null);


    // --- State ---
    const [foods, setFoods] = useState<FoodItem[]>(INITIAL_FOODS);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

    // --- Handlers ---
    const handleOpenServingModal = (id: string) => {
        setSelectedFoodId(id);
        setModalVisible(true);
    };

    const handleUpdateServing = (newValue: string) => {
        if (selectedFoodId) {
            setFoods(currentFoods =>
                currentFoods.map(item =>
                    item.id === selectedFoodId
                        ? { ...item, servingSize: newValue }
                        : item
                )
            );
        }
    };

    const handleRemoveFood = (id: string) => {
        setFoods(currentFoods => currentFoods.filter(food => food.id !== id));
    };

    const handleEditFood = (id: string) => {
        router.push({ pathname: '/edit-food', params: { id } });
    };

    const handleClearAll = () => {
        setFoods([]);
    };

    const activeItem = foods.find(f => f.id === selectedFoodId);

    const totalCalories = foods.reduce((sum, item) => {

        const multiplier = parseFloat(item.servingSize.replace(',', '.')) || 1;
        return sum + (item.calories * (item.unit === 'serving' ? multiplier : 1));
    }, 0);

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F4F5F9]">
                <SafeAreaView className="flex-1" edges={['top']}>

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-5 py-4">
                        <TouchableOpacity
                            onPress={handleClearAll}
                            className="h-10 w-10 bg-orange-100/50 rounded-full items-center justify-center"
                        >
                            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                        </TouchableOpacity>

                        <Text className="text-lg font-bold text-gray-700">Log food</Text>

                        <TouchableOpacity className="h-10 w-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                            <Ionicons name="add" size={24} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    {/* horizontal image picker */}
                    <View className="px-5 mb-4">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                            <View className="relative">
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' }}
                                    className="w-[100px] h-[100px] rounded-full border border-gray-100"
                                />
                                <View className="absolute bottom-4 left-0 right-0 py-1">
                                    <Text className="text-white text-[10px] text-center font-bold shadow-sm">1.50 PM, 11 Sep</Text>
                                </View>
                                <TouchableOpacity className="absolute -top-1 -left-1 bg-[#FF6B6B] rounded-full w-6 h-6 items-center justify-center border-2 border-white">
                                    <Ionicons name="remove" size={14} color="white" />
                                </TouchableOpacity>
                            </View>

                            <View className="relative">
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' }}
                                    className="w-[100px] h-[100px] rounded-2xl"
                                />
                                <View className="absolute bottom-0 left-0 right-0 bg-black/40 py-1 rounded-b-2xl">
                                    <Text className="text-white text-[10px] text-center font-bold">1.46 PM, 11 Sep</Text>
                                </View>
                                <TouchableOpacity className="absolute -top-1 -left-1 bg-[#FF6B6B] rounded-full w-6 h-6 items-center justify-center border-2 border-white">
                                    <Ionicons name="remove" size={14} color="white" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="w-[100px] h-[100px] rounded-2xl border-2 border-dashed border-gray-200 bg-white items-center justify-center">
                                <View className="w-12 h-12 rounded-full bg-gray-50 items-center justify-center">
                                    <Ionicons name="camera" size={24} color="#9CA3AF" />
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    {/* Scrollable List of Foods */}
                    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
                        {foods.length === 0 ? (
                            <Text className="text-center text-gray-400 mt-10">No foods logged.</Text>
                        ) : (
                            foods.map((food) => (
                                <FoodItemCard
                                    key={food.id}
                                    item={food}
                                    onPressServing={() => handleOpenServingModal(food.id)}
                                    onRemove={() => handleRemoveFood(food.id)}
                                    onEdit={() => handleEditFood(food.id)}
                                />
                            ))
                        )}
                    </ScrollView>

                    {/* Footer Summary */}
                    <View className="bg-white p-6 rounded-t-[32px] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] elevation-10">

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => summarySheetRef.current?.present()}
                            className="flex-row justify-between items-center mb-6"
                        >
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="flame" size={16} color="#6B7280" />
                                <Text className="font-bold text-gray-800">699 kcal</Text>
                            </View>
                            <View className="flex-row gap-4">
                                <NutrientItem label="33g" color="#60A5FA" icon="water" />
                                <NutrientItem label="95g" color="#FBBF24" icon="leaf" />
                                <NutrientItem label="27g" color="#F472B6" icon="nutrition" />
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>

                        <View className="flex-row justify-between items-center mb-6 pl-1">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                                <Text className="font-bold text-gray-800">Date</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Text className="font-semibold text-gray-800">Today at 12.48 PM</Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.dismissAll()}
                            className="w-full bg-[#1A1A1A] py-4 rounded-full items-center active:bg-black"
                        >
                            <Text className="text-white font-bold text-base">Add to log</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>

                {/* The Serving Modal Overlay */}
                <ServingInputModal
                    isVisible={modalVisible}
                    initialValue={activeItem ? activeItem.servingSize : '1'}
                    unit={activeItem ? activeItem.unit : 'serving'}
                    onClose={() => setModalVisible(false)}
                    onSave={handleUpdateServing}
                />
                <LogSummarySheet ref={summarySheetRef} />

            </View>
        </BottomSheetModalProvider>

    );
}

// --- Sub Components ---

const NutrientItem = ({ label, color, icon }: { label: string, color: string, icon: any }) => (
    <View className="flex-row items-center gap-1">
        <Ionicons name={icon} size={12} color={color} />
        <Text style={{ color }} className="font-bold text-xs">{label}</Text>
    </View>
);

const FoodItemCard = ({
    item,
    onPressServing,
    onRemove,
    onEdit
}: {
    item: FoodItem;
    onPressServing: () => void;
    onRemove: () => void;
    onEdit: () => void;
}) => {

    // Dynamic calculation for display
    const currentMultiplier = parseFloat(item.servingSize.replace(',', '.')) || 1;
    const currentCalories = item.unit === 'serving' ? Math.round(item.calories * currentMultiplier) : item.calories;

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            {/* Top Row: Icon and Title */}
            <View className="flex-row gap-4 mb-4">
                <View className="w-16 h-16 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                    <Text className="text-3xl">{item.emoji}</Text>
                </View>
                <View className="flex-1 justify-center">
                    <View className="flex-row items-center gap-1">
                        <Text className="font-bold text-gray-900 text-[15px]">{item.title}</Text>
                        {item.verified && <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />}
                    </View>
                    <Text className="text-gray-500 text-xs mt-1">
                        {item.subtitle.split('•')[0]} • {currentCalories} kcal
                    </Text>
                </View>
            </View>

            {/* Serving Input Trigger */}
            <TouchableOpacity
                onPress={onPressServing}
                activeOpacity={0.7}
                className="border border-gray-200 rounded-lg flex-row justify-between items-center px-4 py-3 mb-4 bg-gray-50/50"
            >
                <Text className="font-semibold text-gray-800">
                    {item.servingSize} {item.unit}{parseFloat(item.servingSize) !== 1 && item.unit === 'serving' ? 's' : ''}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Action Row: Remove and Edit */}
            <View className="flex-row items-center border-t border-gray-50 pt-2">
                <TouchableOpacity
                    onPress={onRemove}
                    className="flex-1 flex-row items-center justify-center gap-2 py-2 border-r border-gray-100"
                >
                    <Ionicons name="remove-circle-outline" size={16} color="#F87171" />
                    <Text className="text-gray-500 text-xs font-medium">Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onEdit}
                    className="flex-1 flex-row items-center justify-center gap-2 py-2"
                >
                    <Ionicons name="pencil" size={14} color="#6B7280" />
                    <Text className="text-gray-500 text-xs font-medium">Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};