import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_FOODS = [
    { id: '1', name: 'American Cheese', cals: 77, amount: '1 slice', icon: '🧀' },
    { id: '2', name: 'Cottage Cheese', cals: 221, amount: '1 cup', icon: '🥣' },
    { id: '3', name: 'String Cheese', cals: 45, amount: '1 piece', icon: '🧀' },
];

export const AddIngredientSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [tab, setTab] = useState<'Search' | 'My Foods'>('Search');

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    return (
        <BottomSheetModal ref={ref} snapPoints={['90%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}>
            <BottomSheetView className="flex-1 px-5 pt-2">

                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={selectedIds.length === 0}>
                        <Text className={`font-bold text-base ${selectedIds.length > 0 ? 'text-gray-900' : 'text-gray-300'}`}>Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Custom Tabs */}
                <View className="flex-row mb-6 border-b border-gray-100">
                    <TouchableOpacity onPress={() => setTab('Search')} className={`flex-1 pb-3 items-center ${tab === 'Search' ? 'border-b-2 border-gray-900' : ''}`}>
                        <Text className={`font-bold ${tab === 'Search' ? 'text-gray-900' : 'text-gray-400'}`}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('My Foods')} className={`flex-1 pb-3 items-center ${tab === 'My Foods' ? 'border-b-2 border-gray-900' : ''}`}>
                        <Text className={`font-bold ${tab === 'My Foods' ? 'text-gray-900' : 'text-gray-400'}`}>My Foods</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-6">
                    <Ionicons name="search" size={20} color="#9CA3AF" />
                    <TextInput placeholder="Cheese" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-base" />
                </View>

                {/* Selected Pills */}
                {selectedIds.length > 0 && (
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {selectedIds.map(id => {
                            const item = DUMMY_FOODS.find(f => f.id === id);
                            return (
                                <TouchableOpacity key={id} onPress={() => toggleSelect(id)} className="flex-row items-center bg-gray-100 rounded-full px-3 py-1.5 gap-1">
                                    <Text>{item?.icon}</Text>
                                    <Text className="font-semibold text-gray-800 text-xs">{item?.name}</Text>
                                    <Ionicons name="close" size={14} color="#6B7280" />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )}

                <Text className="text-gray-400 font-bold text-xs mb-4 uppercase">Common</Text>

                {/* List */}
                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
                    {DUMMY_FOODS.map(food => {
                        const isSelected = selectedIds.includes(food.id);
                        return (
                            <View key={food.id} className="flex-row items-center justify-between border-b border-gray-50 pb-4">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text>{food.icon}</Text></View>
                                    <View>
                                        <View className="flex-row items-center gap-1">
                                            <Text className="font-bold text-gray-900 text-[15px]">{food.name}</Text>
                                            <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                                        </View>
                                        <Text className="text-gray-500 text-xs">{food.cals} kcal • {food.amount}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => toggleSelect(food.id)}
                                    className={`w-8 h-8 rounded-full items-center justify-center border ${isSelected ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'}`}
                                >
                                    <Ionicons name={isSelected ? "checkmark" : "add"} size={16} color={isSelected ? "white" : "#6B7280"} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});