import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ['Historical', 'Favorites', 'Recipes', 'Custom'];

export default function MyFoodsScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Historical');
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
    const [customFoods, setCustomFoods] = useState<any[]>([]);

    const handleSaveCustomFood = (food: any) => {
        setCustomFoods(prev => [food, ...prev]);
        setIsAddCustomOpen(false);
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Drag Handle */}
                <View className="w-full items-center pt-3 pb-2">
                    <View className="w-10 h-1 bg-gray-300 rounded-full" />
                </View>

                {/* Header */}
                <View className="px-5 py-2 flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-2xl font-bold text-gray-900 mb-1">My Foods</Text>
                        <Text className="text-gray-500 text-xs font-medium">0 favorites • 0 recipes • 1 food</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setIsAddMenuOpen(true)}
                        className="flex-row items-center border border-gray-200 rounded-full px-3 py-1.5 bg-white shadow-sm"
                    >
                        <Ionicons name="add" size={16} color="#111827" />
                        <Text className="font-bold text-gray-900 ml-1">Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View className="px-5 mb-4">
                    <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                        <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-base" />
                    </View>
                </View>

                {/* Tabs */}
                <View className="px-5 mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {TABS.map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}
                            >
                                <Text className={`font-semibold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Content Area */}
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {activeTab === 'Historical' && (
                        <View>
                            <SectionHeader title="A" />
                            <FoodListItem icon="🥑" name="Avocado Toast with Fried Egg" calories="577" serving="1 serving" tag="Today" />
                            <FoodListItem icon="🥑" name="Avocado Toast with Fried Egg" calories="241" serving="1 serving" tag="11 Sep" />
                            <SectionHeader title="C" />
                            <FoodListItem icon="🍝" name="Carbonara" calories="417" serving="1 serving" tag="11 Sep" />
                        </View>
                    )}

                    {activeTab === 'Favorites' && (
                        <EmptyState icon="document-text" title="No foods yet" desc="Favorited foods will be added here." />
                    )}

                    {activeTab === 'Recipes' && (
                        <EmptyState
                            icon="receipt"
                            title="No foods yet"
                            desc="Create your own recipe by adding and customizing ingredients."
                            actionText="+ Add recipe"
                            onAction={() => setIsAddMenuOpen(true)}
                        />
                    )}

                    {activeTab === 'Custom' && (
                        <View>
                            {customFoods.length === 0 ? (
                                <EmptyState
                                    icon="cube"
                                    title="No foods yet"
                                    desc="Create your own custom food by adding and customizing nutrients."
                                    actionText="+ Add custom food"
                                    onAction={() => setIsAddCustomOpen(true)}
                                />
                            ) : (
                                <View>
                                    <SectionHeader title="Your Custom Foods" />
                                    {customFoods.map((food, index) => (
                                        <FoodListItem
                                            key={index}
                                            icon="🥗"
                                            name={food.name}
                                            calories={food.energy}
                                            serving={food.servingAmount || "1 serving"}
                                            tag="Custom"
                                        />
                                    ))}
                                    <TouchableOpacity
                                        onPress={() => setIsAddCustomOpen(true)}
                                        className="m-5 bg-white border border-dashed border-gray-300 py-3 rounded-xl items-center"
                                    >
                                        <Text className="text-gray-500 font-bold">+ Add another custom food</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>

            </SafeAreaView>

            {/* Add Menu Popover */}
            {isAddMenuOpen && (
                <View className="absolute inset-0 z-50">
                    <Pressable className="flex-1 bg-black/10" onPress={() => setIsAddMenuOpen(false)} />
                    <View className="absolute bottom-10 right-5 left-5 bg-white rounded-[24px] shadow-2xl shadow-black/20 p-2 border border-gray-100">
                        <TouchableOpacity onPress={() => { setIsAddMenuOpen(false); router.push('/nutrition/import-recipe'); }} className="flex-row items-center justify-between p-4 border-b border-gray-50">
                            <Text className="font-medium text-gray-900 text-base">Import recipe</Text>
                            <Ionicons name="download-outline" size={22} color="#111827" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                            <Text className="font-medium text-gray-900 text-base">Scan barcode</Text>
                            <Ionicons name="scan-outline" size={22} color="#111827" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsAddMenuOpen(false); setIsSearchOpen(true); }}
                            className="flex-row items-center justify-between p-4 mb-2"
                        >
                            <Text className="font-medium text-gray-900 text-base">Search food</Text>
                            <Ionicons name="search" size={22} color="#111827" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setIsAddMenuOpen(false); setIsAddRecipeOpen(true); }}
                            className="bg-[#1A1A1A] py-4 rounded-full items-center"
                        >
                            <Text className="text-white font-bold text-base">+ Add recipe</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Search Food View */}
            {isSearchOpen && (
                <SearchFoodView onClose={() => setIsSearchOpen(false)} />
            )}

            {/* Add Custom Food View */}
            {isAddCustomOpen && (
                <AddCustomFoodView
                    onClose={() => setIsAddCustomOpen(false)}
                    onSave={handleSaveCustomFood}
                />
            )}

            {/* Add Recipe View */}
            {isAddRecipeOpen && (
                <AddRecipeView onClose={() => setIsAddRecipeOpen(false)} />
            )}
        </View>
    );
}

// Sub-views
const SearchFoodView = ({ onClose }: { onClose: () => void }) => {
    const [searchTab, setSearchTab] = useState('Search');
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [showMoreCommon, setShowMoreCommon] = useState(false);

    const COMMON_ITEMS = [
        { id: 1, icon: "🍅", name: "Tomatoes", calories: "27 kcal", serving: "1 serving", verified: true },
        { id: 2, icon: "🍅", name: "Kumato Tomatoes", calories: "25 kcal", serving: "1 serving", verified: true },
        { id: 3, icon: "🥫", name: "Tomato Sauce", calories: "59 kcal", serving: "1 cup", verified: true },
        { id: 4, icon: "🍅", name: "Roma Tomatoes", calories: "10 kcal", serving: "1 serving", verified: true },
        { id: 5, icon: "🧴", name: "Tomato Ketchup", calories: "15 kcal", serving: "1 tbsp", verified: true },
        { id: 6, icon: "🍅", name: "Cherry Tomatoes", calories: "18 kcal", serving: "1 cup", verified: true },
        { id: 7, icon: "🍅", name: "Sun-dried Tomatoes", calories: "139 kcal", serving: "1/2 cup", verified: true },
    ];

    const BRANDED_ITEMS = [
        { id: 101, icon: "🍅", name: "Heinz Tomato Soup", calories: "95 kcal", serving: "1 can", verified: true },
        { id: 102, icon: "🥫", name: "Hunt's Tomato Paste", calories: "30 kcal", serving: "2 tbsp", verified: true },
    ];

    const filteredCommon = COMMON_ITEMS.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    const displayedCommon = showMoreCommon ? filteredCommon : filteredCommon.slice(0, 5);

    const toggleSelection = (item: any) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(prev => prev.filter(i => i.id !== item.id));
        } else {
            setSelectedItems(prev => [...prev, item]);
        }
    };

    return (
        <View className="absolute inset-0 bg-white z-[60]">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                    </TouchableOpacity>
                    <View className="w-10 h-1 bg-gray-300 rounded-full" />
                    <TouchableOpacity onPress={onClose} disabled={selectedItems.length === 0}>
                        <Text className={`font-bold text-base ${selectedItems.length > 0 ? 'text-black' : 'text-gray-300'}`}>Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View className="flex-row border-b border-gray-100">
                    {['Search', 'My Foods'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setSearchTab(tab)}
                            className={`flex-1 py-4 items-center ${searchTab === tab ? 'border-b-2 border-black' : ''}`}
                        >
                            <Text className={`font-bold ${searchTab === tab ? 'text-black' : 'text-gray-400'}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Search Bar */}
                <View className="px-5 mt-4">
                    <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
                        <Ionicons name="search" size={20} color="#6B7280" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search for foods & drinks"
                            className="flex-1 ml-2 font-medium text-gray-900"
                        />
                    </View>
                </View>

                {/* Selected Items Placeholder / Tags */}
                <View className="px-5 mt-4 mb-2">
                    {selectedItems.length === 0 ? (
                        <View className="border border-dashed border-gray-200 rounded-2xl py-4 items-center justify-center">
                            <Text className="text-gray-400 font-medium">No items selected</Text>
                        </View>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
                            {selectedItems.map(item => (
                                <View key={item.id} className="flex-row items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
                                    <Text className="text-lg mr-1.5">{item.icon}</Text>
                                    <Text className="font-bold text-gray-900 mr-2">{item.name}</Text>
                                    <TouchableOpacity onPress={() => toggleSelection(item)}>
                                        <Ionicons name="close" size={16} color="#9CA3AF" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>

                <ScrollView className="flex-1">
                    <View className="px-5 py-2">
                        <Text className="text-gray-400 font-bold text-xs uppercase mb-4">Common</Text>

                        {displayedCommon.map(item => (
                            <SearchItem
                                key={item.id}
                                {...item}
                                isSelected={!!selectedItems.find(i => i.id === item.id)}
                                onToggle={() => toggleSelection(item)}
                            />
                        ))}

                        {filteredCommon.length > 5 && (
                            <TouchableOpacity
                                onPress={() => setShowMoreCommon(!showMoreCommon)}
                                className="flex-row items-center justify-center py-4"
                            >
                                <Text className="text-gray-500 font-bold mr-1">
                                    {showMoreCommon ? 'Show less' : 'See more'}
                                </Text>
                                <Ionicons name={showMoreCommon ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
                            </TouchableOpacity>
                        )}

                        <Text className="text-gray-400 font-bold text-xs uppercase my-4">Branded</Text>
                        {BRANDED_ITEMS.map(item => (
                            <SearchItem
                                key={item.id}
                                {...item}
                                isSelected={!!selectedItems.find(i => i.id === item.id)}
                                onToggle={() => toggleSelection(item)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const SearchItem = ({ icon, name, calories, serving, verified, isSelected, onToggle }: any) => (
    <View className="flex-row items-center justify-between py-3 border-b border-gray-50">
        <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                <Text className="text-lg">{icon}</Text>
            </View>
            <View className="ml-3">
                <View className="flex-row items-center">
                    <Text className="font-bold text-gray-900 text-base">{name}</Text>
                    {verified && <Ionicons name="checkmark-circle" size={14} color="#60A5FA" style={{ marginLeft: 4 }} />}
                </View>
                <Text className="text-gray-500 text-xs">{calories} • {serving}</Text>
            </View>
        </View>
        <TouchableOpacity
            onPress={onToggle}
            className={`w-8 h-8 rounded-full border items-center justify-center ${isSelected ? 'bg-black border-black' : 'border-gray-200'}`}
        >
            <Ionicons name={isSelected ? "checkmark" : "add"} size={isSelected ? 16 : 20} color={isSelected ? "white" : "#111827"} />
        </TouchableOpacity>
    </View>
);

const AddCustomFoodView = ({ onClose, onSave }: { onClose: () => void, onSave: (food: any) => void }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [servingAmount, setServingAmount] = useState('');
    const [energy, setEnergy] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');

    const handleSave = () => {
        if (!name || !energy) return;
        onSave({
            name,
            brand,
            servingAmount: servingAmount ? `${servingAmount} g` : "1 serving",
            energy,
            fat,
            carbs,
            protein
        });
    };

    return (
        <View className="absolute inset-0 bg-white z-[70]">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="trash-outline" size={24} color="#EF4444" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Add food</Text>
                    <TouchableOpacity>
                        <Ionicons name="scan-outline" size={24} color="#111827" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
                    {/* Icon and Name */}
                    <View className="items-center py-8">
                        <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center border border-gray-100 relative">
                            <Text className="text-4xl">🥗</Text>
                            <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-200 w-8 h-8 rounded-full items-center justify-center border-2 border-white">
                                <Ionicons name="pencil" size={14} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Your Food"
                            placeholderTextColor="#D1D5DB"
                            className="text-2xl font-bold text-gray-900 mt-4 text-center"
                        />
                        <Text className="text-gray-500 font-medium text-sm mt-1">Edit Name</Text>
                    </View>

                    {/* Inputs */}
                    <View className="px-5 gap-4">
                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Text className="text-gray-500 font-bold text-xs mb-2 uppercase">Serving Size</Text>
                                <TouchableOpacity className="flex-row items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 h-14">
                                    <Text className="font-bold text-gray-900">1 serving</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-500 font-bold text-xs mb-2 uppercase">Serving Amount</Text>
                                <View className="flex-row items-center justify-between bg-white border border-gray-100 rounded-xl px-4 h-14">
                                    <TextInput
                                        value={servingAmount}
                                        onChangeText={setServingAmount}
                                        placeholder="—"
                                        placeholderTextColor="#D1D5DB"
                                        keyboardType="numeric"
                                        className="flex-1 font-bold text-gray-900 h-full"
                                    />
                                    <Text className="text-gray-400 font-bold ml-1">g</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text className="text-gray-500 font-bold text-xs mb-2 uppercase">Brand</Text>
                            <TextInput
                                value={brand}
                                onChangeText={setBrand}
                                placeholder="Name (optional)"
                                placeholderTextColor="#D1D5DB"
                                className="bg-white border border-gray-100 rounded-xl px-4 py-3 h-14 font-bold text-gray-900"
                            />
                        </View>

                        <View className="h-[1px] bg-gray-100 my-4" />

                        {/* Nutrients */}
                        <NutrientInput label="Energy" value={energy} onChange={setEnergy} unit="kCal" />
                        <NutrientInput label="Fat" value={fat} onChange={setFat} unit="g" percentage="0%" color="#60A5FA" />
                        <NutrientInput label="Carbs" value={carbs} onChange={setCarbs} unit="g" percentage="0%" color="#FBBF24" />
                        <NutrientInput label="Protein" value={protein} onChange={setProtein} unit="g" percentage="0%" color="#F472B6" />
                    </View>
                </ScrollView>

                {/* Footer Action */}
                <View className="absolute bottom-10 left-5 right-5">
                    <TouchableOpacity
                        onPress={handleSave}
                        className={`py-4 rounded-full items-center ${name && energy ? 'bg-black' : 'bg-gray-400'}`}
                    >
                        <Text className="text-white font-bold text-lg">Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const NutrientInput = ({ label, value, onChange, unit, percentage, color }: any) => (
    <View className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center overflow-hidden">
            <Text className="font-bold text-base text-gray-900" numberOfLines={1}>{label}</Text>
            {percentage && <Text className="ml-2 text-xs font-bold" style={{ color: color }}>{percentage}</Text>}
        </View>
        <View className="flex-row items-center gap-2">
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="—"
                placeholderTextColor="#D1D5DB"
                keyboardType="numeric"
                className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 w-20 text-right font-bold text-gray-900"
            />
            <Text className="text-gray-400 text-sm  w-10">{unit}</Text>
        </View>
    </View>
);

const AddRecipeView = ({ onClose }: { onClose: () => void }) => {
    return (
        <View className="absolute inset-0 bg-white z-[80]">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="trash-outline" size={24} color="#EF4444" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Add recipe</Text>
                    <View className="w-6" />
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
                    {/* Icon and Name */}
                    <View className="items-center py-6">
                        <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center border border-gray-100 relative border-dashed">
                            <Text className="text-4xl">📖</Text>
                            <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-200 w-8 h-8 rounded-full items-center justify-center border-2 border-white">
                                <Ionicons name="pencil" size={14} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-2xl font-bold text-gray-300 mt-4">New Recipe</Text>
                        <TouchableOpacity>
                            <Text className="text-gray-500 font-medium text-sm">Edit Name</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Quantity and Amount */}
                    <View className="px-5 flex-row gap-4 mb-6">
                        <View className="flex-1">
                            <Text className="text-gray-500 font-bold text-xs mb-2 uppercase">Serving Quantity</Text>
                            <TouchableOpacity className="flex-row items-center justify-between border border-gray-100 rounded-xl px-4 h-14 bg-white" disabled>
                                <Text className="font-bold text-gray-900">1</Text>
                                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-500 font-bold text-xs mb-2 uppercase">Total Amount</Text>
                            <TouchableOpacity className="flex-row items-center justify-between border border-gray-100 rounded-xl px-4 h-14 bg-white" disabled>
                                <Text className="font-bold text-gray-900">148 g</Text>
                                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text className="text-center text-gray-400 text-xs font-bold mb-6">This recipe is 148 g per serving</Text>

                    {/* Nutritional Information */}
                    <View className="px-5 mb-8">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-900">Nutritional Information</Text>
                            <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
                        </View>
                        <Text className="text-gray-400 text-xs font-bold mb-4">1 serving</Text>

                        <View className="flex-row items-center justify-between">
                            <View className="relative w-32 h-32 items-center justify-center">
                                <View className="absolute inset-0 border-8 border-gray-100 rounded-full" />
                                <View className="absolute inset-0 border-8 border-[#FBBF24] rounded-full" style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent' }} />
                                <View className="items-center">
                                    <Text className="text-2xl font-bold text-gray-900">27</Text>
                                    <Text className="text-xs text-gray-400 font-medium">kcal</Text>
                                </View>
                            </View>

                            <View className="flex-1 ml-10 gap-3">
                                <MacroRow label="Fat" percentage="4%" value="0,3g" color="#60A5FA" />
                                <MacroRow label="Carbs" percentage="78%" value="5,8g" color="#FBBF24" />
                                <MacroRow label="Protein" percentage="18%" value="1,3g" color="#F472B6" />
                            </View>
                        </View>
                    </View>

                    {/* Ingredients */}
                    <View className="px-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-900">Ingredients</Text>
                            <TouchableOpacity className="w-8 h-8 items-center justify-center">
                                <Ionicons name="add" size={24} color="#D1D5DB" />
                            </TouchableOpacity>
                        </View>
                        <View className="py-20 items-center justify-center">
                            <Ionicons name="receipt-outline" size={32} color="#E5E7EB" />
                            <Text className="text-gray-400 text-sm mt-2">No ingredients yet</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Action */}
                <View className="absolute bottom-10 left-5 right-5">
                    <TouchableOpacity onPress={onClose} className="bg-[#1A1A1A] py-4 rounded-full items-center">
                        <Text className="text-white font-bold text-lg">Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const MacroRow = ({ label, percentage, value, color }: any) => (
    <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-12">{label}</Text>
            <Text className="text-xs font-bold ml-2" style={{ color }}>{percentage}</Text>
        </View>
        <Text className="font-bold text-gray-900">{value}</Text>
    </View>
);

// Helpers
const SectionHeader = ({ title }: { title: string }) => (
    <Text className="bg-gray-50 text-gray-500 font-bold text-xs uppercase px-5 py-2">{title}</Text>
);

const FoodListItem = ({ icon, name, calories, serving, tag }: any) => (
    <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-50 bg-white">
        <View className="flex-row items-center gap-3 flex-1 pr-4">
            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                <Text className="text-lg">{icon}</Text>
            </View>
            <View>
                <Text className="font-bold text-gray-900 text-[15px]" numberOfLines={1}>{name}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{calories} kcal • {serving}</Text>
            </View>
        </View>
        <Text className="text-gray-400 text-xs font-medium">{tag}</Text>
    </View>
);

const EmptyState = ({ icon, title, desc, actionText, onAction }: any) => (
    <View className="items-center justify-center pt-32 px-10">
        <Ionicons name={icon} size={32} color="#D1D5DB" className="mb-4" />
        <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
        <Text className="text-gray-500 text-center text-sm leading-5 mb-6">{desc}</Text>
        {actionText && (
            <TouchableOpacity onPress={onAction} className="bg-[#1A1A1A] py-3.5 px-8 rounded-full shadow-lg">
                <Text className="text-white font-bold">{actionText}</Text>
            </TouchableOpacity>
        )}
    </View>
);