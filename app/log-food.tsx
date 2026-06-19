import { LogSummarySheet } from '@/components/LogSummarySheet';
import { ServingInputModal } from '@/components/ServingInputModal';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const [foods, setFoods] = useState<FoodItem[]>(INITIAL_FOODS);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

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
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Nutrition staging</Text>
                        <Text className="text-xs text-slate-400 mt-1">Review items before commit</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={handleClearAll}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="trash-outline" size={18} color="#EF4444" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="add" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="py-4 border-b border-[#1E293B] bg-[#090D16]">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>

                        <View className="relative w-24 h-32 rounded-2xl border border-[#2D3748] overflow-hidden">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' }}
                                className="w-full h-full"
                            />
                            <View className="absolute inset-0 bg-black/40" />
                            <View className="absolute bottom-2 left-2 bg-[#090D16]/80 px-2 py-1 rounded border border-[#2D3748]">
                                <Text className="text-white text-[9px] font-bold">1:50 PM</Text>
                            </View>
                            <TouchableOpacity className="absolute top-2 right-2 bg-[#090D16]/80 p-1 rounded border border-[#EF4444]">
                                <Ionicons name="close" size={12} color="#EF4444" />
                            </TouchableOpacity>
                        </View>

                        <View className="relative w-24 h-32 rounded-2xl border border-[#2D3748] overflow-hidden">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' }}
                                className="w-full h-full"
                            />
                            <View className="absolute inset-0 bg-black/40" />
                            <View className="absolute bottom-2 left-2 bg-[#090D16]/80 px-2 py-1 rounded border border-[#2D3748]">
                                <Text className="text-white text-[9px] font-bold">1:46 PM</Text>
                            </View>
                            <TouchableOpacity className="absolute top-2 right-2 bg-[#090D16]/80 p-1 rounded border border-[#EF4444]">
                                <Ionicons name="close" size={12} color="#EF4444" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} className="w-24 h-32 rounded-2xl border border-dashed border-[#4DB9F2] bg-[#1E293B40] items-center justify-center">
                            <Ionicons name="camera-outline" size={24} color="#4DB9F2" />
                            <Text className="text-[#4DB9F2] text-[10px] font-semibold mt-2">Capture</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 240 }} showsVerticalScrollIndicator={false}>
                    {foods.length === 0 ? (
                        <View className="bg-[#151E33] border border-dashed border-[#1E293B] rounded-2xl p-6 items-center">
                            <Text className="text-slate-400 font-medium text-sm">No items in staging area.</Text>
                        </View>
                    ) : (
                        <View className="gap-4">
                            {foods.map((food) => (
                                <FoodItemCard
                                    key={food.id}
                                    item={food}
                                    onPressServing={() => handleOpenServingModal(food.id)}
                                    onRemove={() => handleRemoveFood(food.id)}
                                    onEdit={() => handleEditFood(food.id)}
                                />
                            ))}
                        </View>
                    )}
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] border-t border-[#1E293B] pt-4 pb-8 px-5">

                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
                            <Text className="text-slate-400 text-sm font-semibold">Today at 12:48 PM</Text>
                        </View>
                        <TouchableOpacity onPress={() => summarySheetRef.current?.present()} activeOpacity={0.7} className="bg-[#1E293B] border border-[#2D3748] px-3 py-1.5 rounded-lg flex-row items-center gap-1.5">
                            <Ionicons name="analytics" size={14} color="#4DB9F2" />
                            <Text className="text-[#4DB9F2] text-xs font-bold">Metrics breakdown</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-6 flex-row items-center justify-between">
                        <View>
                            <Text className="text-xs text-slate-500 font-semibold mb-1">Total aggregated</Text>
                            <Text className="text-3xl font-bold text-white">{Math.round(totalCalories)} <Text className="text-sm text-slate-500 font-medium">kcal</Text></Text>
                        </View>
                        <View className="flex-col gap-2 items-end">
                            <NutrientItem label="33g protein" color="#4DB9F2" />
                            <NutrientItem label="95g carbs" color="#F59E0B" />
                            <NutrientItem label="27g fat" color="#10B981" />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.dismissAll()}
                        activeOpacity={0.8}
                        className="w-full bg-[#10B981] border border-[#10B981] h-14 rounded-2xl items-center justify-center flex-row gap-2"
                    >
                        <Ionicons name="checkmark-done" size={20} color="#090D16" />
                        <Text className="text-[#090D16] font-bold text-base">Commit to log</Text>
                    </TouchableOpacity>

                </View>

                <ServingInputModal
                    isVisible={modalVisible}
                    initialValue={activeItem ? activeItem.servingSize : '1'}
                    unit={activeItem ? activeItem.unit : 'serving'}
                    onClose={() => setModalVisible(false)}
                    onSave={handleUpdateServing}
                />
                <LogSummarySheet ref={summarySheetRef} />

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

const NutrientItem = ({ label, color }: { label: string, color: string }) => (
    <View className="flex-row items-center gap-1.5">
        <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <Text className="text-slate-300 font-semibold text-xs">{label}</Text>
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
    const currentMultiplier = parseFloat(item.servingSize.replace(',', '.')) || 1;
    const currentCalories = item.unit === 'serving' ? Math.round(item.calories * currentMultiplier) : item.calories;

    return (
        <View className="bg-[#151E33] rounded-2xl border border-[#1E293B] p-4 flex-col gap-4">

            <View className="flex-row items-center justify-between border-b border-[#1E293B] pb-4">
                <View className="flex-row items-center gap-4 flex-1 pr-4">
                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                        <Text className="text-2xl">{item.emoji}</Text>
                    </View>
                    <View className="flex-1">
                        <View className="flex-row items-center gap-1.5 mb-1">
                            <Text className="font-bold text-slate-100 text-sm" numberOfLines={1}>{item.title}</Text>
                            {item.verified && <Ionicons name="shield-checkmark" size={14} color="#10B981" />}
                        </View>
                        <Text className="text-slate-400 text-xs font-medium">
                            {item.subtitle.split('•')[0]} • {currentCalories} kcal
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={onPressServing}
                    activeOpacity={0.7}
                    className="bg-[#1E293B] border border-[#2D3748] rounded-xl px-4 py-2.5 flex-row items-center gap-3"
                >
                    <Text className="font-semibold text-white text-sm">
                        {item.servingSize} {item.unit}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="#4DB9F2" />
                </TouchableOpacity>

                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={onEdit}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B40] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="create-outline" size={18} color="#4DB9F2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onRemove}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B40] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};