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
        <View className="flex-1 bg-[#090D16]">
            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-5 pb-6 pt-6 border-b border-[#1E293B] bg-[#151E33]">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-2xl font-bold text-slate-100">My Food</Text>
                            <Text className="text-xs text-slate-400 mt-1">0 favorites • 0 recipes • 1 food</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsAddMenuOpen(true)}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="add" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-4 py-3 flex-row items-center">
                        <Ionicons name="search-outline" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Search library..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 font-medium text-slate-200 text-sm"
                        />
                    </View>
                </View>

                <View className="px-5 py-4 bg-[#090D16] border-b border-[#1E293B]">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {TABS.map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.7}
                                className={`px-4 py-2 rounded-lg border ${activeTab === tab
                                    ? 'bg-[#1E293B] border-[#2D3748]'
                                    : 'border-transparent'
                                    }`}
                            >
                                <Text className={`font-semibold text-sm ${activeTab === tab ? 'text-[#4DB9F2]' : 'text-slate-500'
                                    }`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {activeTab === 'Historical' && (
                        <View className="px-5 py-6">
                            <SectionHeader title="A" />
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-6">
                                <FoodListItem icon="🥑" name="Avocado Toast with Fried Egg" calories="577" serving="1 serving" tag="Today" />
                                <FoodListItem icon="🥑" name="Avocado Toast with Fried Egg" calories="241" serving="1 serving" tag="11 Sep" />
                            </View>

                            <SectionHeader title="C" />
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                                <FoodListItem icon="🍝" name="Carbonara" calories="417" serving="1 serving" tag="11 Sep" />
                            </View>
                        </View>
                    )}

                    {activeTab === 'Favorites' && (
                        <EmptyState icon="heart-outline" title="No favorites yet" desc="Items you favorite will be indexed here for quick access." />
                    )}

                    {activeTab === 'Recipes' && (
                        <EmptyState
                            icon="document-text-outline"
                            title="No recipes built"
                            desc="Create your own custom formula by compiling and adjusting raw ingredients."
                            actionText="Create new recipe"
                            onAction={() => setIsAddMenuOpen(true)}
                        />
                    )}

                    {activeTab === 'Custom' && (
                        <View className="px-5 py-6">
                            {customFoods.length === 0 ? (
                                <EmptyState
                                    icon="cube-outline"
                                    title="No custom nodes"
                                    desc="Construct custom nutritional entities by manually defining parameters."
                                    actionText="Create custom entry"
                                    onAction={() => setIsAddCustomOpen(true)}
                                />
                            ) : (
                                <View>
                                    <SectionHeader title="Your configurations" />
                                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-6">
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
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => setIsAddCustomOpen(true)}
                                        activeOpacity={0.7}
                                        className="bg-[#1E293B40] border border-dashed border-[#4DB9F2] py-4 rounded-xl items-center"
                                    >
                                        <Text className="text-[#4DB9F2] font-bold text-sm">Deploy another node</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>

            {isAddMenuOpen && (
                <View className="absolute inset-0 z-50">
                    <Pressable className="flex-1 bg-black/60" onPress={() => setIsAddMenuOpen(false)} />
                    <View className="absolute bottom-10 right-5 left-5 bg-[#151E33] rounded-3xl border border-[#1E293B] overflow-hidden">
                        <TouchableOpacity
                            onPress={() => { setIsAddMenuOpen(false); router.push('/nutrition/import-recipe'); }}
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between p-5 border-b border-[#1E293B]"
                        >
                            <Text className="font-semibold text-slate-200 text-base">Import recipe data</Text>
                            <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center"><Ionicons name="download-outline" size={16} color="#4DB9F2" /></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between p-5 border-b border-[#1E293B]"
                        >
                            <Text className="font-semibold text-slate-200 text-base">Scan barcode</Text>
                            <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center"><Ionicons name="barcode-outline" size={16} color="#4DB9F2" /></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsAddMenuOpen(false); setIsSearchOpen(true); }}
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between p-5 border-b border-[#1E293B]"
                        >
                            <Text className="font-semibold text-slate-200 text-base">Query database</Text>
                            <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center"><Ionicons name="search-outline" size={16} color="#4DB9F2" /></View>
                        </TouchableOpacity>

                        <View className="p-4 bg-[#090D16]">
                            <TouchableOpacity
                                onPress={() => { setIsAddMenuOpen(false); setIsAddRecipeOpen(true); }}
                                activeOpacity={0.8}
                                className="bg-[#4DB9F2] py-4 rounded-xl items-center border border-[#4DB9F2]"
                            >
                                <Text className="text-[#090D16] font-bold text-base">Construct new recipe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {isSearchOpen && <SearchFoodView onClose={() => setIsSearchOpen(false)} />}
            {isAddCustomOpen && <AddCustomFoodView onClose={() => setIsAddCustomOpen(false)} onSave={handleSaveCustomFood} />}
            {isAddRecipeOpen && <AddRecipeView onClose={() => setIsAddRecipeOpen(false)} />}
        </View>
    );
}

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

    const filteredCommon = COMMON_ITEMS.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    const displayedCommon = showMoreCommon ? filteredCommon : filteredCommon.slice(0, 5);

    const toggleSelection = (item: any) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(prev => prev.filter(i => i.id !== item.id));
        } else {
            setSelectedItems(prev => [...prev, item]);
        }
    };

    return (
        <View className="absolute inset-0 bg-[#090D16] z-[60]">
            <SafeAreaView className="flex-1" edges={['top']}>

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B]">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-2xl font-bold text-slate-100">Database Query</Text>
                            <Text className="text-xs text-slate-400 mt-1">Locate and select nodes</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B] mb-6">
                        {['Search', 'My Foods'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSearchTab(tab)}
                                activeOpacity={0.7}
                                className={`flex-1 py-2 items-center rounded-lg border ${searchTab === tab ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}
                            >
                                <Text className={`text-sm font-semibold ${searchTab === tab ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-4 py-3 flex-row items-center">
                        <Ionicons name="search-outline" size={18} color="#94A3B8" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Input query parameters..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 text-sm font-medium text-slate-200"
                        />
                    </View>
                </View>

                <View className="px-5 py-4 border-b border-[#1E293B] min-h-[70px] justify-center bg-[#090D16]">
                    {selectedItems.length === 0 ? (
                        <Text className="text-slate-500 text-xs font-semibold">No nodes queued.</Text>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                            {selectedItems.map(item => (
                                <View key={item.id} className="flex-row items-center bg-[#151E33] border border-[#4DB9F2] rounded-xl pl-3 pr-2 py-2 gap-2">
                                    <Text className="text-sm">{item.icon}</Text>
                                    <Text className="font-semibold text-slate-200 text-xs">{item.name}</Text>
                                    <TouchableOpacity onPress={() => toggleSelection(item)} className="ml-1">
                                        <Ionicons name="close-circle" size={16} color="#4DB9F2" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="px-5 py-6">
                        <SectionHeader title="Common instances" />
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-4">
                            {displayedCommon.map((item, idx) => (
                                <SearchItem
                                    key={item.id}
                                    {...item}
                                    isSelected={!!selectedItems.find(i => i.id === item.id)}
                                    onToggle={() => toggleSelection(item)}
                                    isLast={idx === displayedCommon.length - 1}
                                />
                            ))}
                        </View>

                        {filteredCommon.length > 5 && (
                            <TouchableOpacity
                                onPress={() => setShowMoreCommon(!showMoreCommon)}
                                activeOpacity={0.7}
                                className="flex-row items-center justify-center py-4 bg-[#1E293B40] border border-[#1E293B] rounded-xl mb-8"
                            >
                                <Text className="text-slate-300 font-semibold text-sm mr-2">
                                    {showMoreCommon ? 'Collapse view' : 'Expand view'}
                                </Text>
                                <Ionicons name={showMoreCommon ? "chevron-up" : "chevron-down"} size={16} color="#94A3B8" />
                            </TouchableOpacity>
                        )}

                        <SectionHeader title="Branded instances" />
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden mb-8">
                            {BRANDED_ITEMS.map((item, idx) => (
                                <SearchItem
                                    key={item.id}
                                    {...item}
                                    isSelected={!!selectedItems.find(i => i.id === item.id)}
                                    onToggle={() => toggleSelection(item)}
                                    isLast={idx === BRANDED_ITEMS.length - 1}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 px-5 pt-4 pb-8 bg-[#090D16] border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={onClose}
                        disabled={selectedItems.length === 0}
                        activeOpacity={0.8}
                        className={`w-full h-14 rounded-2xl items-center justify-center border flex-row gap-2 ${selectedItems.length > 0 ? 'bg-[#10B981] border-[#10B981]' : 'bg-[#1E293B] border-[#2D3748]'
                            }`}
                    >
                        <Text className={`font-bold text-base ${selectedItems.length > 0 ? 'text-[#090D16]' : 'text-slate-500'}`}>
                            Commit selection ({selectedItems.length})
                        </Text>
                        {selectedItems.length > 0 && <Ionicons name="checkmark-done" size={20} color="#090D16" />}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
};

const SearchItem = ({ icon, name, calories, serving, verified, isSelected, onToggle, isLast }: any) => (
    <View className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}>
        <View className="flex-row items-center flex-1 pr-4">
            <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                <Text className="text-xl">{icon}</Text>
            </View>
            <View className="ml-4 flex-1">
                <View className="flex-row items-center gap-1.5 mb-1">
                    <Text className="font-bold text-slate-100 text-sm" numberOfLines={1}>{name}</Text>
                    {verified && <Ionicons name="shield-checkmark" size={12} color="#10B981" />}
                </View>
                <Text className="text-slate-500 text-xs">{calories} • {serving}</Text>
            </View>
        </View>
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            className={`w-8 h-8 rounded-lg items-center justify-center border-2 ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#090D16] border-[#2D3748]'
                }`}
        >
            {isSelected ? (
                <Ionicons name="checkmark" size={16} color="#090D16" />
            ) : (
                <Ionicons name="add" size={16} color="#4DB9F2" />
            )}
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
        onSave({ name, brand, servingAmount: servingAmount ? `${servingAmount} g` : "1 serving", energy, fat, carbs, protein });
    };

    return (
        <View className="absolute inset-0 bg-[#090D16] z-[70]">
            <SafeAreaView className="flex-1" edges={['top']}>

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Custom Entity</Text>
                        <Text className="text-xs text-slate-400 mt-1">Manual node construction</Text>
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity activeOpacity={0.7} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                            <Ionicons name="barcode-outline" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>

                    <View className="px-5 py-8 items-center bg-[#090D16] border-b border-[#1E293B]">
                        <View className="flex-row gap-4 items-center">
                            <View className="w-20 h-20 bg-[#151E33] rounded-2xl items-center justify-center border border-[#1E293B] relative">
                                <Text className="text-4xl">🥗</Text>
                                <TouchableOpacity className="absolute -bottom-2 -right-2 bg-[#1E293B] w-8 h-8 rounded-lg items-center justify-center border border-[#2D3748]">
                                    <Ionicons name="pencil" size={14} color="#4DB9F2" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl px-4 justify-center h-20">
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter node identifier..."
                                    placeholderTextColor="#64748B"
                                    className="text-lg font-bold text-white w-full"
                                    selectionColor="#4DB9F2"
                                />
                            </View>
                        </View>
                    </View>

                    <View className="px-5 py-6 flex-col gap-6">

                        <View className="flex-row gap-4">
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-4">
                                <Text className="text-xs font-semibold text-slate-500 mb-3">Serving definition</Text>
                                <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-3 py-2 flex-row justify-between items-center">
                                    <Text className="font-semibold text-white">1 unit</Text>
                                    <Ionicons name="chevron-down" size={14} color="#94A3B8" />
                                </View>
                            </View>
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-4">
                                <Text className="text-xs font-semibold text-slate-500 mb-3">Serving mass</Text>
                                <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-3 py-2 flex-row justify-between items-center">
                                    <TextInput
                                        value={servingAmount}
                                        onChangeText={setServingAmount}
                                        placeholder="0"
                                        placeholderTextColor="#64748B"
                                        keyboardType="numeric"
                                        className="flex-1 font-semibold text-white"
                                        selectionColor="#4DB9F2"
                                    />
                                    <Text className="text-slate-500 font-bold ml-2">g</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4">
                            <Text className="text-xs font-semibold text-slate-500 mb-3">Manufacturer / Origin</Text>
                            <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-4 py-3">
                                <TextInput
                                    value={brand}
                                    onChangeText={setBrand}
                                    placeholder="Optional data..."
                                    placeholderTextColor="#64748B"
                                    className="font-semibold text-white w-full"
                                    selectionColor="#4DB9F2"
                                />
                            </View>
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-2 mt-4">
                            <NutrientInput label="Energy" value={energy} onChange={setEnergy} unit="kCal" />
                            <NutrientInput label="Fat" value={fat} onChange={setFat} unit="g" percentage="0%" color="#4DB9F2" />
                            <NutrientInput label="Carbs" value={carbs} onChange={setCarbs} unit="g" percentage="0%" color="#F59E0B" />
                            <NutrientInput label="Protein" value={protein} onChange={setProtein} unit="g" percentage="0%" color="#EF4444" isLast={true} />
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 px-5 pt-4 pb-8 bg-[#090D16] border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={!name || !energy}
                        activeOpacity={0.8}
                        className={`w-full h-14 rounded-2xl items-center justify-center border flex-row gap-2 ${name && energy ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#1E293B] border-[#2D3748]'
                            }`}
                    >
                        <Text className={`font-bold text-base ${name && energy ? 'text-[#090D16]' : 'text-slate-500'}`}>
                            Store node
                        </Text>
                        {name && energy && <Ionicons name="save-outline" size={18} color="#090D16" />}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const NutrientInput = ({ label, value, onChange, unit, percentage, color, isLast }: any) => (
    <View className={`flex-row items-center justify-between p-3 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}>
        <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-sm text-slate-200">{label}</Text>
            {percentage && <View className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#2D3748]"><Text className="text-[10px] font-bold" style={{ color: color }}>{percentage}</Text></View>}
        </View>
        <View className="flex-row items-center gap-3">
            <View className="bg-[#090D16] border border-[#1E293B] rounded-lg px-3 py-1.5 w-20">
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="0"
                    placeholderTextColor="#64748B"
                    keyboardType="numeric"
                    className="text-right font-bold text-white w-full"
                    selectionColor="#4DB9F2"
                />
            </View>
            <Text className="text-slate-500 text-xs font-semibold w-8">{unit}</Text>
        </View>
    </View>
);

const AddRecipeView = ({ onClose }: { onClose: () => void }) => {
    return (
        <View className="absolute inset-0 bg-[#090D16] z-[80]">
            <SafeAreaView className="flex-1" edges={['top']}>

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Recipe Constructor</Text>
                        <Text className="text-xs text-slate-400 mt-1">Combine raw components</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>

                    <View className="px-5 py-8 items-center bg-[#090D16] border-b border-[#1E293B]">
                        <View className="w-24 h-24 bg-[#151E33] rounded-2xl items-center justify-center border border-dashed border-[#4DB9F2] relative mb-4">
                            <Text className="text-4xl">📖</Text>
                            <TouchableOpacity className="absolute -bottom-2 -right-2 bg-[#1E293B] w-8 h-8 rounded-lg items-center justify-center border border-[#2D3748]">
                                <Ionicons name="pencil" size={14} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-xl font-bold text-white mb-2">Unidentified Formula</Text>
                        <TouchableOpacity className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748]">
                            <Text className="text-slate-400 font-semibold text-xs">Define identifier</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5 py-6 gap-6">

                        <View className="flex-row gap-4">
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-4">
                                <Text className="text-xs font-semibold text-slate-500 mb-3">Yield multiplier</Text>
                                <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-4 py-3 flex-row justify-between items-center opacity-50">
                                    <Text className="font-bold text-slate-400">1</Text>
                                    <Ionicons name="lock-closed-outline" size={14} color="#64748B" />
                                </View>
                            </View>
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-4">
                                <Text className="text-xs font-semibold text-slate-500 mb-3">Cumulative mass</Text>
                                <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-4 py-3 flex-row justify-between items-center opacity-50">
                                    <Text className="font-bold text-slate-400">148 g</Text>
                                    <Ionicons name="lock-closed-outline" size={14} color="#64748B" />
                                </View>
                            </View>
                        </View>

                        <View className="bg-[#1E293B40] border border-[#1E293B] rounded-xl p-3 flex-row justify-center items-center gap-2">
                            <Ionicons name="information-circle" size={16} color="#4DB9F2" />
                            <Text className="text-slate-300 text-xs font-medium">Formula currently scales to 148g per yield</Text>
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                            <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                                <Text className="text-sm font-bold text-white">Aggregated telemetry</Text>
                                <View className="bg-[#1E293B] px-2 py-1 rounded-md border border-[#2D3748]">
                                    <Text className="text-[10px] font-bold text-slate-400">Per 1 yield</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center justify-between">
                                <View className="relative w-28 h-28 items-center justify-center">
                                    <View className="absolute inset-0 border-[6px] border-[#1E293B] rounded-full" />
                                    <View className="absolute inset-0 border-[6px] border-[#F59E0B] rounded-full" style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent' }} />
                                    <View className="items-center">
                                        <Text className="text-2xl font-bold text-white">27</Text>
                                        <Text className="text-xs text-slate-500 font-semibold">kCal</Text>
                                    </View>
                                </View>

                                <View className="flex-1 ml-8 gap-4">
                                    <MacroRow label="Fat" percentage="4%" value="0,3g" color="#4DB9F2" />
                                    <MacroRow label="Carbs" percentage="78%" value="5,8g" color="#F59E0B" />
                                    <MacroRow label="Protein" percentage="18%" value="1,3g" color="#EF4444" />
                                </View>
                            </View>
                        </View>

                        <View>
                            <View className="flex-row justify-between items-center mb-4 pl-1">
                                <Text className="text-sm font-bold text-slate-300">Component inputs</Text>
                                <TouchableOpacity activeOpacity={0.7} className="w-8 h-8 bg-[#1E293B] border border-[#2D3748] rounded-lg items-center justify-center">
                                    <Ionicons name="add" size={16} color="#4DB9F2" />
                                </TouchableOpacity>
                            </View>

                            <View className="bg-[#151E33] border border-dashed border-[#1E293B] rounded-2xl py-12 items-center justify-center">
                                <Ionicons name="cube-outline" size={28} color="#64748B" className="mb-3" />
                                <Text className="text-slate-500 text-xs font-medium">Input registry empty</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 px-5 pt-4 pb-8 bg-[#090D16] border-t border-[#1E293B]">
                    <TouchableOpacity activeOpacity={0.8} className="bg-[#1E293B] h-14 rounded-2xl items-center justify-center border border-[#2D3748]">
                        <Text className="text-slate-500 font-bold text-base">Compile recipe</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const MacroRow = ({ label, percentage, value, color }: any) => (
    <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <Text className="text-slate-400 font-semibold text-xs w-10">{label}</Text>
            <View className="bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#2D3748]"><Text className="text-[10px] font-bold" style={{ color }}>{percentage}</Text></View>
        </View>
        <Text className="font-bold text-white text-sm">{value}</Text>
    </View>
);

const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-slate-500 font-semibold text-xs mb-3 ml-1 uppercase tracking-widest">{title}</Text>
);

const FoodListItem = ({ icon, name, calories, serving, tag }: any) => (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1E293B]">
        <View className="flex-row items-center gap-4 flex-1 pr-4">
            <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                <Text className="text-lg">{icon}</Text>
            </View>
            <View className="flex-1">
                <Text className="font-bold text-slate-100 text-sm mb-0.5" numberOfLines={1}>{name}</Text>
                <Text className="text-slate-500 text-[10px] font-medium">{calories} kcal • {serving}</Text>
            </View>
        </View>
        <View className="bg-[#090D16] border border-[#1E293B] px-2 py-1 rounded-md">
            <Text className="text-slate-400 text-[10px] font-semibold">{tag}</Text>
        </View>
    </View>
);

const EmptyState = ({ icon, title, desc, actionText, onAction }: any) => (
    <View className="items-center justify-center pt-32 px-10">
        <View className="w-16 h-16 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center mb-6">
            <Ionicons name={icon} size={28} color="#4DB9F2" />
        </View>
        <Text className="text-xl font-bold text-white mb-3">{title}</Text>
        <Text className="text-slate-400 text-center text-sm leading-6 mb-8">{desc}</Text>
        {actionText && (
            <TouchableOpacity
                onPress={onAction}
                activeOpacity={0.8}
                className="bg-[#4DB9F2] py-3.5 px-6 rounded-xl border border-[#4DB9F2] flex-row items-center gap-2"
            >
                <Ionicons name="add" size={16} color="#090D16" />
                <Text className="text-[#090D16] font-bold text-sm">{actionText}</Text>
            </TouchableOpacity>
        )}
    </View>
);