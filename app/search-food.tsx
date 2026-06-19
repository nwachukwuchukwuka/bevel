import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FoodItem = {
    id: string;
    name: string;
    kcal: number;
    amount: string;
    icon: string;
    verified: boolean;
    tag?: string;
};

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

    const [activeTab, setActiveTab] = useState<'Search' | 'My Foods'>('Search');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

    const isSearching = searchQuery.length > 0;
    const dataToDisplay = isSearching ? SEARCH_RESULTS : RECENT_FOODS;

    const toggleSelection = (item: FoodItem) => {
        const exists = selectedItems.find(i => i.id === item.id);
        if (exists) {
            setSelectedItems(prev => prev.filter(i => i.id !== item.id));
        } else {
            setSelectedItems(prev => [...prev, item]);
        }
    };

    const handleAdd = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            {/* Custom Technical Header */}
            <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-bold text-slate-100">Nutrition database</Text>
                    <Text className="text-xs text-slate-400 mt-1">Search or select from history</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                >
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            {/* Tabs (Pill style instead of bottom borders) */}
            <View className="px-5 py-4 border-b border-[#1E293B]">
                <View className="bg-[#151E33] p-1 rounded-xl flex-row border border-[#1E293B]">
                    <TouchableOpacity
                        onPress={() => setActiveTab('Search')}
                        className={`flex-1 items-center justify-center py-2.5 rounded-lg ${activeTab === 'Search' ? 'bg-[#1E293B] border border-[#2D3748]' : ''}`}
                    >
                        <Text className={`text-sm font-semibold ${activeTab === 'Search' ? 'text-white' : 'text-slate-500'}`}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('My Foods')}
                        className={`flex-1 items-center justify-center py-2.5 rounded-lg ${activeTab === 'My Foods' ? 'bg-[#1E293B] border border-[#2D3748]' : ''}`}
                    >
                        <Text className={`text-sm font-semibold ${activeTab === 'My Foods' ? 'text-white' : 'text-slate-500'}`}>My Foods</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Input (Modular Block) */}
            <View className="px-5 pt-6 pb-2">
                <View className="bg-[#151E33] rounded-2xl px-4 py-4 border border-[#1E293B] flex-row items-center">
                    <Ionicons name="search" size={20} color="#4DB9F2" />
                    <TextInput
                        placeholder="Search for foods & drinks"
                        placeholderTextColor="#64748B"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-3  font-medium text-slate-200"
                        selectionColor="#4DB9F2"
                    />
                    {isSearching && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} className="p-2">
                            <Ionicons name="close-circle" size={16} color="#64748B" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Selected Items Staging Area */}
            <View className="px-5 mt-4 mb-4 min-h-[50px] justify-center">
                {selectedItems.length === 0 ? (
                    <View className="border border-dashed border-[#1E293B] rounded-xl py-3 items-center justify-center bg-[#151E33]/50">
                        <Text className="text-slate-500 text-xs font-semibold">Staging area empty</Text>
                    </View>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {selectedItems.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => toggleSelection(item)}
                                className="flex-row items-center bg-[#151E33] border border-[#4DB9F2] rounded-xl pl-3 pr-2 py-2 gap-2"
                            >
                                <Text className="text-sm">{item.icon}</Text>
                                <Text className="font-semibold text-slate-200 text-xs max-w-[120px]" numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Ionicons name="close" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* Results / List Area (Card Based) */}
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {Object.entries(dataToDisplay).map(([sectionTitle, items]) => (
                    <View key={sectionTitle} className="mb-8">
                        <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">
                            {sectionTitle}
                        </Text>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                            {items.map((item, idx) => {
                                const isSelected = selectedItems.some(i => i.id === item.id);
                                const isLast = idx === items.length - 1;

                                return (
                                    <View
                                        key={item.id}
                                        className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}
                                    >
                                        <View className="flex-row items-center gap-4 flex-1 pr-4">
                                            {/* Left Meta Group */}
                                            <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                                <Text className="text-xl">{item.icon}</Text>
                                            </View>

                                            <View className="flex-1 justify-center">
                                                <View className="flex-row items-center gap-1.5 mb-1">
                                                    <Text className="font-bold text-white text-base" numberOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                    {/* {item.verified && <Ionicons name="shield-checkmark" size={14} color="#10B981" />} */}
                                                </View>

                                                <View className="flex-row items-center">
                                                    <Text className="text-slate-400 text-xs font-medium">
                                                        {item.kcal} kcal • {item.amount}
                                                    </Text>
                                                    {item.tag && (
                                                        <View className="ml-2 bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#2D3748]">
                                                            <Text className="text-slate-500 text-[10px] font-semibold">
                                                                {item.tag}
                                                            </Text>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        </View>

                                        {/* Select Toggle Box */}
                                        <TouchableOpacity
                                            onPress={() => toggleSelection(item)}
                                            activeOpacity={0.8}
                                            className={`w-8 h-8 rounded-lg items-center justify-center border-2 ${isSelected
                                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                                : 'bg-[#090D16] border-[#2D3748]'
                                                }`}
                                        >
                                            {isSelected ? (
                                                <Ionicons name="checkmark" size={18} color="#090D16" />
                                            ) : (
                                                <Ionicons name="add" size={18} color="#4DB9F2" />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>

                        {isSearching && sectionTitle === 'Common' && (
                            <TouchableOpacity className="flex-row items-center justify-center gap-2 mt-4 bg-[#1E293B40] py-3 rounded-xl border border-[#1E293B]">
                                <Text className="text-slate-300 font-semibold text-sm">Expand list</Text>
                                <Ionicons name="chevron-down" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Floating Action Bar */}
            {selectedItems.length > 0 && (
                <View className="absolute bottom-0 left-0 right-0 p-5 bg-[#090D16] border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={handleAdd}
                        activeOpacity={0.8}
                        className="w-full bg-[#10B981] h-14 rounded-2xl items-center justify-center flex-row gap-2"
                    >
                        <Text className="text-[#090D16] font-bold text-base">
                            Commit {selectedItems.length} items
                        </Text>
                        <Ionicons name="checkmark-done" size={20} color="#090D16" />
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
}