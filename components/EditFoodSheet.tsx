import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const IconSelectorSheet = forwardRef<BottomSheetModal, { onSelect: (icon: string) => void }>((props, ref) => {
    const categories = ['All', 'Baked Goods', 'Condiments', 'Cultural', 'Dairy'];
    const emojis = ['🍅', '🌶️', '🥗', '🍲', '🥫', '🍯', '🧄', '🧈', '🥞', '🧀'];

    return (
        <BottomSheetModal ref={ref} snapPoints={['70%']} backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />} enableDynamicSizing={false} stackBehavior='push'>
            <BottomSheetView className="flex-1 pt-2">
                {/* Search */}
                <View className="mx-5 mb-4 bg-gray-50 rounded-xl flex-row items-center px-4 py-2">
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput placeholder="Search for icon" className="flex-1 ml-2 font-medium" />
                </View>
                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-100 px-5 mb-4" contentContainerStyle={{ gap: 20 }}>
                    {categories.map(c => <Text key={c} className={`font-bold pb-2 ${c === 'Condiments' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>{c}</Text>)}
                </ScrollView>
                {/* Grid */}
                <BottomSheetScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 16 }}>
                    {emojis.map((e, i) => (
                        <TouchableOpacity key={i} onPress={() => { props.onSelect(e); (ref as any).current?.dismiss(); }} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Text className="text-xl">{e}</Text>
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const AddNutrientSheet = forwardRef<BottomSheetModal, { onDone: (selected: string[]) => void }>((props, ref) => {
    const [selected, setSelected] = useState<string[]>([]);
    const minerals = ['Chloride', 'Chromium', 'Copper', 'Iodine', 'Magnesium'];

    const toggle = (m: string) => setSelected(p => p.includes(m) ? p.filter(i => i !== m) : [...p, m]);

    return (
        <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />} stackBehavior='push' enableDynamicSizing={false}>
            <BottomSheetView className="flex-1 px-5 pt-2">
                <View className="flex-row justify-between items-center mb-6">
                    <View className="w-10" />
                    <Text className="font-bold text-gray-900 text-base">Nutrients</Text>
                    <TouchableOpacity onPress={() => { props.onDone(selected); (ref as any).current?.dismiss(); }}>
                        <Text className="font-bold text-gray-900 text-base">Done</Text>
                    </TouchableOpacity>
                </View>

                <Text className="font-bold text-gray-400 text-xs uppercase mb-4">Minerals</Text>

                <BottomSheetScrollView contentContainerStyle={{ gap: 20, paddingBottom: 40 }}>
                    {minerals.map(m => {
                        const isSel = selected.includes(m);
                        return (
                            <TouchableOpacity key={m} onPress={() => toggle(m)} className="flex-row justify-between items-center border-b border-gray-50 pb-4">
                                <Text className="font-bold text-gray-900">{m}</Text>
                                <View className={`w-6 h-6 rounded-full items-center justify-center border ${isSel ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'}`}>
                                    <Ionicons name={isSel ? "checkmark" : "add"} size={14} color={isSel ? "white" : "#9CA3AF"} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export const EditFoodSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const iconSheetRef = useRef<BottomSheetModal>(null);
    const nutrientSheetRef = useRef<BottomSheetModal>(null);

    const [icon, setIcon] = useState('🌶️');
    const [nutrients, setNutrients] = useState<{ name: string, value: string, unit: string }[]>([
        { name: 'Energy', value: '251', unit: 'kCal' },
        { name: 'Fat', value: '3,3', unit: 'g' },
        { name: 'Carbs', value: '64', unit: 'g' }
    ]);

    const handleAddNutrients = (selected: string[]) => {
        const newFields = selected.map(n => ({ name: n, value: '', unit: 'mg' }));
        setNutrients(prev => [...prev, ...newFields]);
    };

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    return (
        <>
            <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }} stackBehavior='push' enableDynamicSizing={false}>
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-5 py-4">
                        <TouchableOpacity className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
                            <Ionicons name="trash-outline" size={18} color="#F87171" />
                        </TouchableOpacity>
                        <Text className="font-bold text-gray-900 text-base">Edit food</Text>
                        <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-200">
                            <Ionicons name="scan-outline" size={18} color="#4B5563" />
                        </TouchableOpacity>
                    </View>

                    <BottomSheetScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* Icon & Name Editor */}
                        <View className="items-center mb-8">
                            <TouchableOpacity onPress={() => iconSheetRef.current?.present()} className="relative mb-4">
                                <View className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 items-center justify-center">
                                    <Text className="text-4xl">{icon}</Text>
                                </View>
                                <View className="absolute bottom-0 right-0 bg-gray-200 w-6 h-6 rounded-full items-center justify-center border border-white">
                                    <Ionicons name="pencil" size={12} color="#4B5563" />
                                </View>
                            </TouchableOpacity>
                            <Text className="text-xl font-bold text-gray-900">Ground Black Pepper</Text>
                            <Text className="text-gray-400 text-sm mt-1">Edit Name</Text>
                        </View>

                        {/* Serving Inputs */}
                        <View className="flex-row gap-4 mb-6">
                            <View className="flex-1">
                                <Text className="text-xs font-bold text-gray-500 mb-2">Serving Size</Text>
                                <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
                                    <Text className="font-semibold text-gray-900 text-[15px]">100 g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                                </View>
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs font-bold text-gray-500 mb-2">Serving Amount</Text>
                                <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
                                    <Text className="font-semibold text-gray-900 text-[15px]">100 g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                                </View>
                            </View>
                        </View>

                        {/* Brand Input */}
                        <Text className="text-xs font-bold text-gray-500 mb-2">Brand</Text>
                        <TextInput
                            placeholder="Name (optional)"
                            placeholderTextColor="#D1D5DB"
                            className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white font-medium text-[15px] shadow-sm mb-10"
                        />

                        <View className="h-[2px] bg-black w-full mb-6" />

                        {/* Nutrients List */}
                        <View className="gap-4 mb-6">
                            {nutrients.map((n, i) => (
                                <View key={i} className="flex-row justify-between items-center">
                                    <Text className="font-bold text-gray-800">{n.name}</Text>
                                    <View className="border border-gray-200 rounded-xl px-4 py-2.5 flex-row justify-between items-center bg-white w-28">
                                        <TextInput
                                            value={n.value}
                                            placeholder="0"
                                            keyboardType="numeric"
                                            className="font-semibold text-gray-900 flex-1 text-right mr-2"
                                        />
                                        <Text className="text-gray-400 font-medium text-xs">{n.unit}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Add Additional */}
                        <TouchableOpacity onPress={() => nutrientSheetRef.current?.present()} className="border border-dashed border-gray-300 rounded-xl p-4 flex-row justify-between items-center bg-gray-50 mb-10">
                            <Text className="text-gray-400 font-medium">Add additional</Text>
                            <Ionicons name="add" size={18} color="#4B5563" />
                        </TouchableOpacity>

                    </BottomSheetScrollView>

                    {/* Fixed Footer */}
                    <View className="p-5 pb-10 border-t border-gray-100 bg-white">
                        <TouchableOpacity className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg active:bg-black">
                            <Text className="text-white font-bold text-base">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>


            <IconSelectorSheet ref={iconSheetRef} onSelect={setIcon} />
            <AddNutrientSheet ref={nutrientSheetRef} onDone={handleAddNutrients} />
        </>
    );
});