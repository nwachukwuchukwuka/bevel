import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
type FoodItem = {
    id: string;
    name: string;
    kcal: number;
    amount: string;
    icon: string;
    verified: boolean;
    tag?: string; // e.g., "Yesterday", "Mcdonald's"
};

// --- Mock Data ---
const RECENT_FOODS: Record<string, FoodItem[]> = {
    "Today": [
        { id: '1', name: 'Coffee Latte', kcal: 122, amount: '236,59 mL', icon: '☕️', verified: true },
        { id: '2', name: 'Avocado Toast with Fried Egg', kcal: 315, amount: '1 serving', icon: '🥑', verified: false },
    ],
    "Yesterday": [
        { id: '3', name: 'Matcha Latte', kcal: 320, amount: '591,47 mL', icon: '🍵', verified: true },
        { id: '4', name: 'Yoghurt', kcal: 124, amount: '1 serving', icon: '🧁', verified: true },
        { id: '5', name: 'Crumbed Chicken Breast Steaks', kcal: 192, amount: '1 steak', icon: '🍗', verified: true },
        { id: '6', name: 'Chicken Porridge', kcal: 240, amount: '1 serving', icon: '🍲', verified: true, tag: "Mcdonald's" },
    ]
};

const SEARCH_RESULTS: Record<string, FoodItem[]> = {
    "Common": [
        { id: '7', name: 'Birchwood Breaded Chicken Steaks', kcal: 302, amount: '1 serving', icon: '🍞', verified: true },
        { id: '5', name: 'Crumbed Chicken Breast Steaks', kcal: 192, amount: '1 steak', icon: '🍗', verified: true, tag: 'Yesterday' },
        { id: '8', name: "Flamin' Hot Chicken Steaks in a Fiery Coating Roosters", kcal: 242, amount: '1 steak', icon: '🍗', verified: true },
        { id: '9', name: 'Chicken Fried Steak', kcal: 228, amount: '3 oz', icon: '🥩', verified: true },
        { id: '10', name: 'Chicken Fried Steak', kcal: 228, amount: '3 oz', icon: '🥩', verified: true },
    ]
};

export default function SearchFoodScreen() {
    const router = useRouter();

    // --- State ---
    const [activeTab, setActiveTab] = useState<'Search' | 'My Foods'>('Search');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

    const isSearching = searchQuery.length > 0;
    const dataToDisplay = isSearching ? SEARCH_RESULTS : RECENT_FOODS;

    // --- Handlers ---
    const toggleSelection = (item: FoodItem) => {
        const exists = selectedItems.find(i => i.id === item.id);
        if (exists) {
            setSelectedItems(prev => prev.filter(i => i.id !== item.id));
        } else {
            setSelectedItems(prev => [...prev, item]);
        }
    };

    const handleAdd = () => {
        // Here you would normally pass the selectedItems back to your global state/log
        console.log("Adding items:", selectedItems.map(i => i.name));
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>

            {/* Header */}
            <View className="flex-row justify-between items-center px-5 pt-4 pb-4">
                <TouchableOpacity onPress={() => router.back()} className="">
                    <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                </TouchableOpacity>
                <View className="w-10 h-1 bg-gray-200 rounded-full" />
                <TouchableOpacity
                    onPress={handleAdd}
                    disabled={selectedItems.length === 0}
                    className="w-16 items-end"
                >
                    <Text className={`font-bold text-base ${selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="flex-row mx-5 border-b border-gray-100 mb-4">
                <TouchableOpacity
                    onPress={() => setActiveTab('Search')}
                    className={`flex-1 items-center pb-3 ${activeTab === 'Search' ? 'border-b-2 border-gray-900' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'Search' ? 'text-gray-900' : 'text-gray-400'}`}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('My Foods')}
                    className={`flex-1 items-center pb-3 ${activeTab === 'My Foods' ? 'border-b-2 border-gray-900' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'My Foods' ? 'text-gray-900' : 'text-gray-400'}`}>My Foods</Text>
                </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="mx-5 bg-gray-50 rounded-xl px-4 py-3 flex-row items-center mb-4">
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput
                    placeholder="Search for foods & drinks"
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-2 font-medium text-gray-900 text-[15px]"
                />
            </View>

            {/* Selected Items Area */}
            <View className="px-5 mb-6">
                {selectedItems.length === 0 ? (
                    <View className="border border-dashed border-gray-200 rounded-full py-2.5 items-center justify-center bg-gray-50/50">
                        <Text className="text-gray-300 font-medium text-xs">No items selected</Text>
                    </View>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {selectedItems.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => toggleSelection(item)}
                                className="flex-row items-center bg-gray-100 rounded-full pl-3 pr-2 py-1.5 gap-2"
                            >
                                <Text className="text-sm">{item.icon}</Text>
                                <Text className="font-semibold text-gray-800 text-[13px] max-w-[120px]" numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Ionicons name="close" size={14} color="#9CA3AF" />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* List Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {Object.entries(dataToDisplay).map(([sectionTitle, items]) => (
                    <View key={sectionTitle} className="mb-6">
                        <Text className="px-5 text-gray-400 font-bold text-xs uppercase mb-3">
                            {sectionTitle}
                        </Text>

                        <View className="gap-5 px-5">
                            {items.map(item => {
                                const isSelected = selectedItems.some(i => i.id === item.id);
                                return (
                                    <View key={item.id} className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-3 flex-1 pr-4">
                                            {/* Icon */}
                                            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                                                <Text className="text-lg">{item.icon}</Text>
                                            </View>

                                            {/* Details */}
                                            <View className="flex-1 justify-center">
                                                <View className="flex-row items-center gap-1 flex-wrap">
                                                    <Text className="font-bold text-gray-900 text-[14px]" numberOfLines={2}>
                                                        {item.name}
                                                    </Text>
                                                    {item.verified && <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />}
                                                </View>
                                                <View className="flex-row items-center mt-0.5">
                                                    <Text className="text-gray-500 text-[12px]">
                                                        {item.kcal} kcal • {item.amount}
                                                    </Text>
                                                    {item.tag && (
                                                        <Text className="text-gray-400 text-[10px] ml-2 font-medium">
                                                            {item.tag}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                        </View>

                                        {/* Action Button */}
                                        <TouchableOpacity
                                            onPress={() => toggleSelection(item)}
                                            className={`w-7 h-7 rounded-full items-center justify-center border ${isSelected
                                                ? 'bg-[#1A1A1A] border-[#1A1A1A]'
                                                : 'bg-white border-gray-300'
                                                }`}
                                        >
                                            <Ionicons
                                                name={isSelected ? "checkmark" : "add"}
                                                size={16}
                                                color={isSelected ? "white" : "#6B7280"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>

                        {/* See More (Only show if searching to match screenshot) */}
                        {isSearching && sectionTitle === 'Common' && (
                            <TouchableOpacity className="flex-row items-center justify-center gap-1 mt-6">
                                <Text className="text-gray-500 font-semibold text-sm">See more</Text>
                                <Ionicons name="chevron-down" size={14} color="#6B7280" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>

        </SafeAreaView>
    );
}